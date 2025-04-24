const fs = require('fs');
const path = require('path');

// Check if both source file and output directory paths are provided
if (process.argv.length < 4) {
    console.error('Usage: node process_workflows.js <source-json-file> <output-directory>');
    process.exit(1);
}

const sourceFile = process.argv[2];
const outputDir = process.argv[3];

// Verify the source file exists
if (!fs.existsSync(sourceFile)) {
    console.error(`Error: Source file "${sourceFile}" does not exist`);
    process.exit(1);
}

try {
    // Read the source JSON file
    const workflows = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process each workflow
    workflows.forEach(workflow => {
        if (!workflow.name) {
            console.warn('Workflow without name found, skipping...');
            return;
        }

        // Create a safe filename from the workflow name
        const safeFileName = workflow.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') + '.json';

        const outputPath = path.join(outputDir, safeFileName);
        
        // Write the workflow to its own file
        fs.writeFileSync(outputPath, JSON.stringify(workflow, null, 2));
        console.log(`Created workflow file: ${outputPath}`);
    });

    console.log(`\nProcessing complete! All workflows have been saved to: ${outputDir}`);
} catch (error) {
    console.error('Error processing workflows:', error.message);
    process.exit(1);
} 