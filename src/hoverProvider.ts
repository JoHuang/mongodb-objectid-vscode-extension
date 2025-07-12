import * as vscode from 'vscode';
import { ObjectIdParser } from './objectIdParser';

export class ObjectIdHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    // Get the word at the current position
    const wordRange = document.getWordRangeAtPosition(position, /\b[0-9a-fA-F]{24}\b/);
    
    if (!wordRange) {
      return null;
    }

    const word = document.getText(wordRange);
    
    // Check if the word is a valid ObjectId
    if (!ObjectIdParser.isValidObjectId(word)) {
      return null;
    }

    // Generate hover content
    const hoverContent = ObjectIdParser.generateHoverContent(word);
    
    // Create hover object with markdown content
    const hover = new vscode.Hover(
      new vscode.MarkdownString(hoverContent),
      wordRange
    );

    return hover;
  }
}
