<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a VS Code extension project. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Overview
This VS Code extension parses MongoDB ObjectIds and provides hover information including:
- Creation timestamp
- Process ID
- Machine ID
- Increment counter
- Formatted creation time for easy reading

## Key Features
- Detects MongoDB ObjectId strings (24-character hexadecimal strings)
- Shows hover tooltip with parsed ObjectId information
- Focus on displaying creation time in a user-friendly format
- Supports ObjectIds in various file types (JavaScript, TypeScript, JSON, etc.)

## Development Guidelines
- Use TypeScript for type safety
- Follow VS Code extension best practices
- Implement hover provider for ObjectId detection
- Use regex to identify valid ObjectId patterns
- Parse ObjectId according to MongoDB specifications
