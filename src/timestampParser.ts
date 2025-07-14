/**
 * Timestamp parser utility for generating MongoDB ObjectIds from timestamps and dates
 */
export interface TimestampInfo {
  timestamp: number;
  date: Date;
  generatedObjectId: string;
  formattedDate: string;
}

export class TimestampParser {
  /**
   * Check if a string is a valid timestamp or ISO 8601 date
   */
  static isValidTimestamp(str: string): boolean {
    // Clean and normalize the input
    const cleaned = this.cleanInput(str);
    
    // Unix timestamp (10 digits) or JavaScript timestamp (13 digits)
    if (/^\d{10}$/.test(cleaned) || /^\d{13}$/.test(cleaned)) {
      const num = parseInt(cleaned, 10);
      const date = new Date(cleaned.length === 10 ? num * 1000 : num);
      return !isNaN(date.getTime()) && date.getFullYear() > 1970 && date.getFullYear() < 2100;
    }
    
    // Only accept ISO 8601 formats for date strings
    if (this.isISO8601Format(cleaned)) {
      const date = new Date(cleaned);
      return !isNaN(date.getTime()) && date.getFullYear() > 1970 && date.getFullYear() < 2100;
    }
    
    return false;
  }

  /**
   * Check if a string matches ISO 8601 format
   */
  private static isISO8601Format(str: string): boolean {
    // ISO 8601 patterns:
    // YYYY-MM-DD
    // YYYY-MM-DDTHH:mm:ss
    // YYYY-MM-DDTHH:mm:ss.sss
    // YYYY-MM-DDTHH:mm:ssZ
    // YYYY-MM-DDTHH:mm:ss.sssZ
    // YYYY-MM-DDTHH:mm:ss±HH:mm
    // YYYY-MM-DDTHH:mm:ss.sss±HH:mm
    const iso8601Pattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
    return iso8601Pattern.test(str);
  }

  /**
   * Clean and normalize input string for parsing
   */
  private static cleanInput(str: string): string {
    // Remove quotes if present
    let cleaned = str.replace(/^["']|["']$/g, '');
    
    // Handle underscore-separated numbers (e.g., 1752_4657_977_06)
    // Remove underscores from numeric strings
    if (/^\d+(_\d+)*$/.test(cleaned)) {
      cleaned = cleaned.replace(/_/g, '');
    }
    
    return cleaned;
  }

  /**
   * Parse timestamp or date string into components
   */
  static parse(input: string): TimestampInfo | null {
    const cleaned = this.cleanInput(input);
    let timestamp: number;
    let date: Date;

    // Handle numeric timestamps (after cleaning underscores)
    if (/^\d{10}$/.test(cleaned)) {
      // Unix timestamp (seconds)
      timestamp = parseInt(cleaned, 10);
      date = new Date(timestamp * 1000);
    } else if (/^\d{13}$/.test(cleaned)) {
      // JavaScript timestamp (milliseconds)
      timestamp = Math.floor(parseInt(cleaned, 10) / 1000);
      date = new Date(parseInt(cleaned, 10));
    } else if (/^\d{14,}$/.test(cleaned)) {
      // Very long numbers - treat as milliseconds and truncate if needed
      const num = parseInt(cleaned, 10);
      // If it's too long, take first 13 digits
      const ms = cleaned.length > 13 ? parseInt(cleaned.substring(0, 13), 10) : num;
      timestamp = Math.floor(ms / 1000);
      date = new Date(ms);
    } else {
      // Only try to parse ISO 8601 format date strings
      if (!this.isISO8601Format(cleaned)) {
        return null;
      }
      
      date = new Date(cleaned);
      if (isNaN(date.getTime())) {
        return null;
      }
      timestamp = Math.floor(date.getTime() / 1000);
    }

    // Validate date range
    if (isNaN(date.getTime()) || date.getFullYear() < 1970 || date.getFullYear() > 2100) {
      return null;
    }

    // Generate ObjectId with timestamp and zeros for other fields
    const hexTimestamp = timestamp.toString(16).padStart(8, '0');
    const generatedObjectId = hexTimestamp + '0000000000000000';

    // Format date for display
    const formattedDate = date.toISOString();

    return {
      timestamp,
      date,
      generatedObjectId,
      formattedDate
    };
  }

  /**
   * Generate hover content for a timestamp
   */
  static generateHoverContent(input: string): string {
    const info = this.parse(input);
    if (!info) {
      return 'Invalid timestamp or date format';
    }

    return `🕐 **Timestamp**: ${info.timestamp} (${info.formattedDate})

📦 **Generated ObjectId**: \`${info.generatedObjectId}\``;
  }
}
