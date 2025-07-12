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
	
	// Register for common file types that might contain MongoDB ObjectIds
	const supportedLanguages = [
		'javascript',
		'typescript',
		'json',
		'jsonc',
		'yaml',
		'yml',
		'python',
		'java',
		'csharp',
		'go',
		'rust',
		'php',
		'ruby',
		'plaintext',
		'text',
		'log'
	];

	// Register hover provider for each supported language
	supportedLanguages.forEach(language => {
		const disposable = vscode.languages.registerHoverProvider(
			{ language: language },
			hoverProvider
		);
		context.subscriptions.push(disposable);
	});

	// Also register for all files (*) as a fallback
	const fallbackDisposable = vscode.languages.registerHoverProvider(
		{ scheme: 'file', pattern: '**/*' },
		hoverProvider
	);
	context.subscriptions.push(fallbackDisposable);

	// Keep the original command for demonstration
	const commandDisposable = vscode.commands.registerCommand('mongodb-objectid-parser.helloWorld', () => {
		vscode.window.showInformationMessage('MongoDB ObjectId Parser is ready! Hover over any 24-character hex string to see ObjectId details.');
	});

	context.subscriptions.push(commandDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
