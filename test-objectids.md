# MongoDB ObjectId Parser Test File

This file contains various MongoDB ObjectIds for testing the hover functionality.

## Sample ObjectIds

Here are some sample MongoDB ObjectIds to test:

1. **Recent ObjectId**: `507f1f77bcf86cd799439011`
2. **Another ObjectId**: `507f191e810c19729de860ea`
3. **Third ObjectId**: `5f8a7b234e123456789abcde`

## In JSON format:
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "profile_id": "507f191e810c19729de860ea"
  },
  "posts": [
    {
      "_id": "5f8a7b234e123456789abcde",
      "author_id": "507f1f77bcf86cd799439011"
    }
  ]
}
```

## In JavaScript:
```javascript
const mongoose = require('mongoose');

const userId = '507f1f77bcf86cd799439011';
const postId = '5f8a7b234e123456789abcde';

// Find user by ObjectId
User.findById(userId).then(user => {
  console.log('Found user:', user);
});
```

## Timestamp to ObjectId Generation

You can also generate ObjectIds from timestamps or dates:

```javascript
// Unix timestamps (10 digits)
const unixTimestamp1 = 1672531200;  // 2023-01-01 00:00:00 UTC
const unixTimestamp2 = 1609459200;  // 2021-01-01 00:00:00 UTC

// JavaScript timestamps (13 digits)
const jsTimestamp1 = 1672531200000;  // 2023-01-01 00:00:00.000 UTC
const jsTimestamp2 = 1609459200000;  // 2021-01-01 00:00:00.000 UTC

// Underscore-separated timestamps
const underscoreTimestamp1 = 1752_4657_977_06;  // Long timestamp with underscores
const underscoreTimestamp2 = 1672_531_200;      // Unix timestamp with underscores
const underscoreTimestamp3 = 1609_459_200_000;  // JS timestamp with underscores

// Date strings (ISO 8601 format)
const dateString1 = "2023-01-01";
const dateString2 = "2021-12-25T10:30:00Z";
const dateString3 = "2022-06-15T15:45:30.123Z";

// Date strings with timezone offsets (ISO 8601)
const dateWithTz1 = "2023-01-01T10:30:00+08:00";    // UTC+8 (Asia/Shanghai)
const dateWithTz2 = "2022-06-15T15:45:30-05:00";    // UTC-5 (US Eastern)
const dateWithTz3 = "2021-12-25T23:59:59+09:00";    // UTC+9 (Japan)
const dateWithTz4 = "2023-07-04T12:00:00-07:00";    // UTC-7 (US Pacific)

// Note: Only ISO 8601 formats are supported for date-to-ObjectId conversion
// Non-ISO formats like MM/DD/YYYY, DD.MM.YYYY, month names are not supported
```

## Instructions
- **ObjectId Parsing**: Hover over any of the ObjectIds above to see the parsed information (creation time, machine ID, process ID, and counter)
- **Timestamp to ObjectId**: Hover over timestamps or date strings to see what the corresponding ObjectId would be
- Try hovering over ObjectIds and timestamps in different contexts (JSON, JavaScript, plain text)

Note: These are sample ObjectIds and timestamps - hover over them to see the parsing results!
