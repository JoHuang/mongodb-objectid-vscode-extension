import * as assert from 'assert';
import * as vscode from 'vscode';

suite('MongoDB ObjectId Parser Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start MongoDB ObjectId Parser tests.');

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('Jo Huang.mongodb-objectid-parser'));
	});
});
