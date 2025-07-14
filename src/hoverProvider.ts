import * as vscode from 'vscode';
import { ObjectIdParser } from './objectIdParser';
import { TimestampParser } from './timestampParser';

export class ObjectIdHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    // Try to match various patterns - ObjectIds, timestamps, and dates
    const objectIdRange = document.getWordRangeAtPosition(position, /\b[0-9a-fA-F]{24}\b/);
    
    // Enhanced timestamp patterns to support underscores and various formats
    const timestampRange = document.getWordRangeAtPosition(position, /\b\d+(_\d+)*\b/) || 
                          document.getWordRangeAtPosition(position, /\b\d{10,}\b/);
    
    // ISO 8601 date patterns only (most reliable and standardized)
    const dateRange = 
      // ISO 8601 with timezone offset: YYYY-MM-DDTHH:mm:ss±HH:mm
      document.getWordRangeAtPosition(position, /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[+-]\d{2}:\d{2}\b/) ||
      // ISO 8601 with Z timezone: YYYY-MM-DDTHH:mm:ssZ
      document.getWordRangeAtPosition(position, /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z\b/) ||
      // ISO 8601 without timezone: YYYY-MM-DDTHH:mm:ss
      document.getWordRangeAtPosition(position, /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?\b/) ||
      // ISO 8601 date only: YYYY-MM-DD
      document.getWordRangeAtPosition(position, /\b\d{4}-\d{2}-\d{2}\b/) ||
      // Quoted ISO 8601 strings
      document.getWordRangeAtPosition(position, /"(\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?(Z|[+-]\d{2}:\d{2})?)"|'(\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?(Z|[+-]\d{2}:\d{2})?)'/);
    
    // Check for ObjectId first
    if (objectIdRange) {
      const objectId = document.getText(objectIdRange);
      if (ObjectIdParser.isValidObjectId(objectId)) {
        const hoverContent = ObjectIdParser.generateHoverContent(objectId);
        return new vscode.Hover(
          new vscode.MarkdownString(hoverContent),
          objectIdRange
        );
      }
    }
    
    // Check for timestamp (including underscore-separated numbers)
    if (timestampRange) {
      const timestamp = document.getText(timestampRange);
      if (TimestampParser.isValidTimestamp(timestamp)) {
        const hoverContent = TimestampParser.generateHoverContent(timestamp);
        return new vscode.Hover(
          new vscode.MarkdownString(hoverContent),
          timestampRange
        );
      }
    }
    
    // Check for date string
    if (dateRange) {
      const dateStr = document.getText(dateRange);
      if (TimestampParser.isValidTimestamp(dateStr)) {
        const hoverContent = TimestampParser.generateHoverContent(dateStr);
        return new vscode.Hover(
          new vscode.MarkdownString(hoverContent),
          dateRange
        );
      }
    }

    return null;
  }
}
