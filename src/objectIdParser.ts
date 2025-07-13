/**
 * MongoDB ObjectId parser utility
 */
export interface ObjectIdInfo {
  timestamp: number;
  machineId: string;
  processId: string;
  counter: string;
  createdAt: Date;
  formattedTime: string;
}

export class ObjectIdParser {
  private static readonly OBJECTID_REGEX = /\b[0-9a-fA-F]{24}\b/g;

  /**
   * Check if a string is a valid MongoDB ObjectId
   */
  static isValidObjectId(str: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(str);
  }

  /**
   * Parse a MongoDB ObjectId string into its components
   */
  static parse(objectId: string): ObjectIdInfo | null {
    if (!this.isValidObjectId(objectId)) {
      return null;
    }

    // ObjectId structure: 4-byte timestamp + 5-byte random value + 3-byte incrementing counter
    // First 8 hex chars (4 bytes) = timestamp
    const timestampHex = objectId.substring(0, 8);
    const timestamp = parseInt(timestampHex, 16);
    const createdAt = new Date(timestamp * 1000);

    // Next 10 hex chars (5 bytes) = machine identifier + process id
    const machineAndProcess = objectId.substring(8, 18);
    const machineId = machineAndProcess.substring(0, 6); // 3 bytes
    const processId = machineAndProcess.substring(6, 10); // 2 bytes

    // Last 6 hex chars (3 bytes) = counter
    const counter = objectId.substring(18, 24);

    // Format creation time in a user-friendly way
    const formattedTime = createdAt.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    return {
      timestamp,
      machineId,
      processId,
      counter,
      createdAt,
      formattedTime
    };
  }

  /**
   * Find all ObjectIds in a text
   */
  static findObjectIds(text: string): Array<{ objectId: string; start: number; end: number }> {
    const matches: Array<{ objectId: string; start: number; end: number }> = [];
    let match;

    // Reset regex lastIndex to ensure proper matching
    this.OBJECTID_REGEX.lastIndex = 0;
    
    while ((match = this.OBJECTID_REGEX.exec(text)) !== null) {
      matches.push({
        objectId: match[0],
        start: match.index,
        end: match.index + match[0].length
      });
    }

    return matches;
  }

  /**
   * Generate hover content for an ObjectId
   */
  static generateHoverContent(objectId: string): string {
    const info = this.parse(objectId);
    if (!info) {
      return 'Invalid ObjectId';
    }

    // Format creation time as ISO string with local timezone (correct approach)
    // First convert to local time, then format as ISO string with timezone offset
    const localDate = new Date(info.createdAt.getTime() - info.createdAt.getTimezoneOffset() * 60000);
    const localTime = localDate.toISOString().replace('Z', '') + 
      (info.createdAt.getTimezoneOffset() > 0 ? '-' : '+') +
      String(Math.floor(Math.abs(info.createdAt.getTimezoneOffset()) / 60)).padStart(2, '0') + ':' +
      String(Math.abs(info.createdAt.getTimezoneOffset()) % 60).padStart(2, '0');

    return `**MongoDB ObjectId**: \`${objectId}\`

📅 **Created At**: ${localTime}  
🌐 **ISO String**: ${info.createdAt.toISOString()}  
🔧 **Details**: Timestamp: ${info.timestamp} | Machine: ${info.machineId} | Process: ${info.processId} | Counter: ${info.counter}`;
  }
}
