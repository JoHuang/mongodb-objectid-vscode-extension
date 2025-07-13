# MongoDB ObjectId Parser

A VS Code extension that parses MongoDB ObjectIds and provides detailed information on hover, including creation timestamp, machine ID, process ID, and counter.

## Features

- **Hover Detection**: Automatically detects 24-character hexadecimal strings that match MongoDB ObjectId format
- **Creation Time**: Shows when the ObjectId was created in a user-friendly format
- **Detailed Parsing**: Displays machine ID, process ID, and counter information
- **Multi-language Support**: Works in JavaScript, TypeScript, JSON, Python, and many other file types
- **Real-time Information**: Instantly shows ObjectId details without needing to manually parse

### Example

When you hover over a MongoDB ObjectId like `507f1f77bcf86cd799439011`, you'll see:

```
MongoDB ObjectId: 507f1f77bcf86cd799439011

📅 Created At: 2012-10-17T01:00:07 GMT
🌐 ISO String: 2012-10-17T01:00:07.000Z
🔧 Details: Timestamp: 1350508407 | Machine: bcf86c | Process: d799 | Counter: 439011
```

## How to Use

1. Install the extension
2. Open any file containing MongoDB ObjectIds
3. Hover over any 24-character hexadecimal string
4. View the detailed ObjectId information in the tooltip

## Supported File Types

- JavaScript (.js)
- TypeScript (.ts)
- JSON (.json, .jsonc)
- YAML (.yaml, .yml)
- Python (.py)
- Java (.java)
- C# (.cs)
- Go (.go)
- Rust (.rs)
- PHP (.php)
- Ruby (.rb)
- Plain text (.txt)
- Log files (.log)
- And more...

## MongoDB ObjectId Format

MongoDB ObjectIds are 12-byte identifiers consisting of:
- **4-byte timestamp** (seconds since Unix epoch)
- **5-byte random value** (unique to machine and process)
- **3-byte incrementing counter** (initialized randomly)

## Requirements

- VS Code 1.74.0 or higher
- No additional dependencies required

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "MongoDB ObjectId Parser"
4. Click Install

## Testing

A test file `test-objectids.md` is included with sample ObjectIds to test the functionality.

## Known Issues

- Currently only supports 24-character hexadecimal ObjectIds (standard MongoDB format)
- Hover detection requires exact 24-character hex strings (no partial matches)

## Release Notes

### 0.0.1

- Initial release
- Basic ObjectId parsing and hover functionality
- Support for multiple file types
- Creation time display in user-friendly format

---

## For Developers

This extension demonstrates:
- VS Code Hover Provider implementation
- MongoDB ObjectId parsing
- TypeScript best practices for VS Code extensions
- Multi-language file support

## License

MIT

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
