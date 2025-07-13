// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ObjectIdHoverProvider } from './hoverProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('MongoDB ObjectId Parser extension is now active!');

	// Register hover provider for all file types that might contain ObjectIds
	const hoverProvider = new ObjectIdHoverProvider();
	
	// Register for all files - ObjectIds can appear anywhere!
	const disposable = vscode.languages.registerHoverProvider(
		{ scheme: 'file' },  // All files, regardless of language
		hoverProvider
	);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
