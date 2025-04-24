# n8n
A repository to store my local n8n projects and workflows for safety

## How to export and save
The `process_workflow.js` script processes a JSON file containing workflows and saves each workflow to its own file in a specified output directory.
> NOTE: Use the exporter workflow (projects/exporter.json) to export the workflows from n8n to a compiled JSON file.

### How it works
It checks if both the source file and output directory paths are provided, verifies the source file exists, and creates the output directory if it doesn't exist.
It then reads the source JSON file, processes each workflow, creates a safe filename from the workflow name, and writes the workflow to its own file in the output directory.

### How to use
```bash
# node process_workflows.js <source-json-file> <output-directory>
# Example:
node process_workflows.js projects/whatsapp-chatbot/example.json projects/whatsapp-chatbot/workflows
```