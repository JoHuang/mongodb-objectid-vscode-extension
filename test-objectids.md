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

## Instructions
- Hover over any of the ObjectIds above to see the parsed information
- The hover tooltip should show creation time, machine ID, process ID, and counter
- Try hovering over ObjectIds in different contexts (JSON, JavaScript, plain text)

Note: These are sample ObjectIds - hover over them to see when they were created!
