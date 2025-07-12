import * as assert from 'assert';
import { ObjectIdParser } from '../objectIdParser';

suite('ObjectIdParser Test Suite', () => {
    test('Should validate correct ObjectId format', () => {
        const validObjectId = '507f1f77bcf86cd799439011';
        assert.strictEqual(ObjectIdParser.isValidObjectId(validObjectId), true);
    });

    test('Should reject invalid ObjectId format', () => {
        const invalidObjectIds = [
            '507f1f77bcf86cd79943901',      // Too short
            '507f1f77bcf86cd7994390111',    // Too long
            '507f1f77bcf86cd79943901g',     // Invalid character
            'not-an-objectid',              // Completely invalid
            ''                              // Empty string
        ];

        invalidObjectIds.forEach(id => {
            assert.strictEqual(ObjectIdParser.isValidObjectId(id), false, `Should reject: ${id}`);
        });
    });

    test('Should parse ObjectId correctly', () => {
        const objectId = '507f1f77bcf86cd799439011';
        const parsed = ObjectIdParser.parse(objectId);
        
        assert.ok(parsed, 'Should return parsed result');
        // The actual timestamp from the ObjectId (first 8 hex chars)
        const expectedTimestamp = parseInt('507f1f77', 16);
        assert.strictEqual(parsed!.timestamp, expectedTimestamp);
        assert.strictEqual(parsed!.machineId, 'bcf86c');
        assert.strictEqual(parsed!.processId, 'd799');
        assert.strictEqual(parsed!.counter, '439011');
        
        // Check if createdAt is a valid Date
        assert.ok(parsed!.createdAt instanceof Date);
        assert.strictEqual(parsed!.createdAt.getTime(), expectedTimestamp * 1000);
    });

    test('Should return null for invalid ObjectId', () => {
        const parsed = ObjectIdParser.parse('invalid-id');
        assert.strictEqual(parsed, null);
    });

    test('Should find ObjectIds in text', () => {
        const text = `
        Here are some ObjectIds:
        - User ID: 507f1f77bcf86cd799439011
        - Post ID: 507f191e810c19729de860ea
        - Invalid: not-an-id
        - Another: 5f8a7b234e123456789abcde
        `;

        const found = ObjectIdParser.findObjectIds(text);
        assert.strictEqual(found.length, 3);
        
        assert.strictEqual(found[0].objectId, '507f1f77bcf86cd799439011');
        assert.strictEqual(found[1].objectId, '507f191e810c19729de860ea');
        assert.strictEqual(found[2].objectId, '5f8a7b234e123456789abcde');
        
        // Check positions
        assert.ok(found[0].start >= 0);
        assert.ok(found[0].end > found[0].start);
    });

    test('Should generate hover content', () => {
        const objectId = '507f1f77bcf86cd799439011';
        const content = ObjectIdParser.generateHoverContent(objectId);
        
        assert.ok(content.includes('MongoDB ObjectId'));
        assert.ok(content.includes(objectId));
        assert.ok(content.includes('Created'));
        assert.ok(content.includes('Timestamp'));
        assert.ok(content.includes('Machine ID'));
        assert.ok(content.includes('Process ID'));
        assert.ok(content.includes('Counter'));
    });

    test('Should handle various ObjectId timestamps', () => {
        // Test with a more recent ObjectId (approximate timestamp: 2020)
        const recentObjectId = '5f8a7b234e123456789abcde';
        const parsed = ObjectIdParser.parse(recentObjectId);
        
        assert.ok(parsed);
        assert.ok(parsed.createdAt.getFullYear() >= 2020);
        assert.ok(parsed.formattedTime.includes('2020') || parsed.formattedTime.includes('2021'));
    });
});
