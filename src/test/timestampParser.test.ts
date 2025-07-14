import * as assert from 'assert';
import { TimestampParser } from '../timestampParser';

suite('TimestampParser Test Suite', () => {
    test('Should validate Unix timestamp format', () => {
        assert.strictEqual(TimestampParser.isValidTimestamp('1350508407'), true);
        assert.strictEqual(TimestampParser.isValidTimestamp('1609459200'), true); // 2021-01-01
    });

    test('Should validate JavaScript timestamp format', () => {
        assert.strictEqual(TimestampParser.isValidTimestamp('1350508407000'), true);
        assert.strictEqual(TimestampParser.isValidTimestamp('1609459200000'), true); // 2021-01-01
    });

    test('Should validate ISO 8601 date string formats only', () => {
        // ISO 8601 formats
        assert.strictEqual(TimestampParser.isValidTimestamp('2012-10-17'), true);
        assert.strictEqual(TimestampParser.isValidTimestamp('2012-10-17T21:13:27'), true);
        assert.strictEqual(TimestampParser.isValidTimestamp('2012-10-17T21:13:27.000Z'), true);
        assert.strictEqual(TimestampParser.isValidTimestamp('2023-01-01T10:30:00+08:00'), true);
        assert.strictEqual(TimestampParser.isValidTimestamp('2022-06-15T15:45:30-05:00'), true);
        
        // Non-ISO formats should be rejected
        assert.strictEqual(TimestampParser.isValidTimestamp('Oct 17, 2012'), false);
        assert.strictEqual(TimestampParser.isValidTimestamp('10/17/2012'), false);
        assert.strictEqual(TimestampParser.isValidTimestamp('17.10.2012'), false);
        assert.strictEqual(TimestampParser.isValidTimestamp('Jan 1, 2023'), false);
    });

    test('Should validate underscore-separated timestamp formats', () => {
        assert.strictEqual(TimestampParser.isValidTimestamp('1672_531_200'), true);      // Unix with underscores
        assert.strictEqual(TimestampParser.isValidTimestamp('1672_531_200_000'), true);  // JS timestamp with underscores
        assert.strictEqual(TimestampParser.isValidTimestamp('1752_4657_977_06'), true);  // Long number with underscores
    });

    test('Should validate various local date formats', () => {
        // Only ISO 8601 formats should be accepted now
        assert.strictEqual(TimestampParser.isValidTimestamp('2023-01-01'), true);            // ISO date
        assert.strictEqual(TimestampParser.isValidTimestamp('2023-01-01T10:30:00'), true);   // ISO datetime
        assert.strictEqual(TimestampParser.isValidTimestamp('"2023-01-01"'), true);          // Quoted ISO date
        assert.strictEqual(TimestampParser.isValidTimestamp("'2023-01-01'"), true);          // Single quoted date
        
        // Non-ISO formats should be rejected
        assert.strictEqual(TimestampParser.isValidTimestamp('12/25/2023'), false);    // MM/DD/YYYY
        assert.strictEqual(TimestampParser.isValidTimestamp('1/1/2024'), false);      // M/D/YYYY
        assert.strictEqual(TimestampParser.isValidTimestamp('25.12.2023'), false);    // DD.MM.YYYY
        assert.strictEqual(TimestampParser.isValidTimestamp('Jan 1, 2023'), false);   // Month name with comma
        assert.strictEqual(TimestampParser.isValidTimestamp('Dec 25 2023'), false);   // Month name without comma
    });

    test('Should validate timezone offset date formats', () => {
        // ISO dates with timezone offsets
        assert.strictEqual(TimestampParser.isValidTimestamp('2023-01-01T10:30:00+08:00'), true);  // UTC+8
        assert.strictEqual(TimestampParser.isValidTimestamp('2022-06-15T15:45:30-05:00'), true);  // UTC-5
        assert.strictEqual(TimestampParser.isValidTimestamp('2021-12-25T23:59:59+09:00'), true);  // UTC+9
        assert.strictEqual(TimestampParser.isValidTimestamp('2023-07-04T12:00:00-07:00'), true);  // UTC-7
        assert.strictEqual(TimestampParser.isValidTimestamp('"2023-01-01T10:30:00+08:00"'), true); // Quoted with timezone
    });

    test('Should reject invalid timestamp formats', () => {
        const invalidTimestamps = [
            '123',           // Too short
            '12345678901234567890', // Too long
            'not-a-date',    // Invalid string
            '1350508407a',   // Mixed chars
            '',              // Empty string
            '999999999',     // Too old (before 1970)
            '9999999999999999' // Too far in future
        ];

        invalidTimestamps.forEach(timestamp => {
            assert.strictEqual(TimestampParser.isValidTimestamp(timestamp), false, `Should reject: ${timestamp}`);
        });
    });

    test('Should parse Unix timestamp correctly', () => {
        const timestamp = '1350508407';
        const parsed = TimestampParser.parse(timestamp);
        
        assert.ok(parsed, 'Should return parsed result');
        assert.strictEqual(parsed!.timestamp, 1350508407);
        assert.strictEqual(parsed!.generatedObjectId, '507f1f770000000000000000');
        
        // Check if date is correct
        const expectedDate = new Date(1350508407 * 1000);
        assert.strictEqual(parsed!.date.getTime(), expectedDate.getTime());
    });

    test('Should parse JavaScript timestamp correctly', () => {
        const timestamp = '1350508407000';
        const parsed = TimestampParser.parse(timestamp);
        
        assert.ok(parsed, 'Should return parsed result');
        assert.strictEqual(parsed!.timestamp, 1350508407);
        assert.strictEqual(parsed!.generatedObjectId, '507f1f770000000000000000');
    });

    test('Should parse ISO date string correctly', () => {
        const dateStr = '2012-10-17T21:13:27.000Z';
        const parsed = TimestampParser.parse(dateStr);
        
        assert.ok(parsed, 'Should return parsed result');
        assert.strictEqual(parsed!.timestamp, 1350508407);
        assert.strictEqual(parsed!.generatedObjectId, '507f1f770000000000000000');
    });

    test('Should parse simple date string correctly', () => {
        const dateStr = '2012-10-17';
        const parsed = TimestampParser.parse(dateStr);
        
        assert.ok(parsed, 'Should return parsed result');
        assert.ok(parsed!.timestamp > 0);
        assert.ok(parsed!.generatedObjectId.length === 24);
        assert.ok(parsed!.generatedObjectId.endsWith('0000000000000000'));
    });

    test('Should parse underscore-separated timestamps correctly', () => {
        // Test Unix timestamp with underscores
        const unixWithUnderscores = '1672_531_200';
        const parsed1 = TimestampParser.parse(unixWithUnderscores);
        
        assert.ok(parsed1, 'Should return parsed result for Unix with underscores');
        assert.strictEqual(parsed1!.timestamp, 1672531200);
        assert.strictEqual(parsed1!.generatedObjectId, '63b0cd000000000000000000');
        
        // Test JavaScript timestamp with underscores
        const jsWithUnderscores = '1672_531_200_000';
        const parsed2 = TimestampParser.parse(jsWithUnderscores);
        
        assert.ok(parsed2, 'Should return parsed result for JS timestamp with underscores');
        assert.strictEqual(parsed2!.timestamp, 1672531200);
        assert.strictEqual(parsed2!.generatedObjectId, '63b0cd000000000000000000');
        
        // Test long number with underscores (treat as milliseconds, truncate if needed)
        const longWithUnderscores = '1752_4657_977_06';
        const parsed3 = TimestampParser.parse(longWithUnderscores);
        
        assert.ok(parsed3, 'Should return parsed result for long number with underscores');
        // Should take first 13 digits: 1752465797706 -> 1752465797 seconds
        assert.strictEqual(parsed3!.timestamp, 1752465797);
    });

    test('Should parse quoted date strings correctly', () => {
        const quotedDate = '"2023-01-01T00:00:00.000Z"'; // Use explicit UTC to avoid timezone issues
        const parsed = TimestampParser.parse(quotedDate);
        
        assert.ok(parsed, 'Should return parsed result for quoted date');
        assert.strictEqual(parsed!.timestamp, 1672531200);
        assert.strictEqual(parsed!.generatedObjectId, '63b0cd000000000000000000');
    });

    test('Should parse various ISO 8601 date formats correctly', () => {
        // ISO 8601 formats only
        const isoDate = '2023-01-01';
        const parsed1 = TimestampParser.parse(isoDate);
        assert.ok(parsed1, 'Should parse ISO date format');
        
        // ISO datetime format
        const isoDateTime = '2023-01-01T10:30:00';
        const parsed2 = TimestampParser.parse(isoDateTime);
        assert.ok(parsed2, 'Should parse ISO datetime format');
        
        // Non-ISO formats should return null
        const usDate = '1/1/2023';
        const parsed3 = TimestampParser.parse(usDate);
        assert.strictEqual(parsed3, null, 'Should reject non-ISO US date format');
        
        const monthNameDate = 'Jan 1, 2023';
        const parsed4 = TimestampParser.parse(monthNameDate);
        assert.strictEqual(parsed4, null, 'Should reject non-ISO month name format');
        
        // Verify ISO formats produce valid ObjectIds
        assert.ok(parsed1!.generatedObjectId.length === 24, 'Should generate 24-char ObjectId');
        assert.ok(parsed2!.generatedObjectId.length === 24, 'Should generate 24-char ObjectId');
    });

    test('Should return null for invalid input', () => {
        const parsed = TimestampParser.parse('invalid-input');
        assert.strictEqual(parsed, null);
    });

    test('Should generate hover content', () => {
        const timestamp = '1350508407';
        const content = TimestampParser.generateHoverContent(timestamp);
        
        assert.ok(content.includes('Timestamp'));
        assert.ok(content.includes('1350508407'));
        assert.ok(content.includes('Generated ObjectId'));
        assert.ok(content.includes('507f1f770000000000000000'));
        assert.ok(content.includes('2012-10-17T21:13:27.000Z'));
    });

    test('Should generate correct hover content format', () => {
        const timestamp = '1350508407';
        const content = TimestampParser.generateHoverContent(timestamp);
        
        const expectedContent = `🕐 **Timestamp**: 1350508407 (2012-10-17T21:13:27.000Z)

📦 **Generated ObjectId**: \`507f1f770000000000000000\``;
        
        assert.strictEqual(content, expectedContent);
    });

    test('Should handle various date formats consistently', () => {
        const inputs = [
            '1350508407',
            '1350508407000',
            '2012-10-17T21:13:27.000Z'
        ];
        
        inputs.forEach(input => {
            const parsed = TimestampParser.parse(input);
            assert.ok(parsed, `Should parse ${input}`);
            assert.strictEqual(parsed!.timestamp, 1350508407, `Timestamp should be consistent for ${input}`);
            assert.strictEqual(parsed!.generatedObjectId, '507f1f770000000000000000', `ObjectId should be consistent for ${input}`);
        });
    });

    test('Should parse timezone offset date formats correctly', () => {
        // Test UTC+8 timezone
        const utcPlus8 = '2023-01-01T08:00:00+08:00'; // This equals 2023-01-01T00:00:00Z
        const parsed1 = TimestampParser.parse(utcPlus8);
        assert.ok(parsed1, 'Should parse UTC+8 timezone format');
        assert.strictEqual(parsed1!.timestamp, 1672531200); // Same as 2023-01-01T00:00:00Z
        
        // Test UTC-5 timezone
        const utcMinus5 = '2022-12-31T19:00:00-05:00'; // This equals 2023-01-01T00:00:00Z
        const parsed2 = TimestampParser.parse(utcMinus5);
        assert.ok(parsed2, 'Should parse UTC-5 timezone format');
        assert.strictEqual(parsed2!.timestamp, 1672531200); // Same as 2023-01-01T00:00:00Z
        
        // Test quoted timezone format
        const quotedTz = '"2023-01-01T10:30:00+08:00"';
        const parsed3 = TimestampParser.parse(quotedTz);
        assert.ok(parsed3, 'Should parse quoted timezone format');
        
        // Verify all generate valid ObjectIds
        assert.ok(parsed1!.generatedObjectId.length === 24, 'Should generate 24-char ObjectId');
        assert.ok(parsed2!.generatedObjectId.length === 24, 'Should generate 24-char ObjectId');
        assert.ok(parsed3!.generatedObjectId.length === 24, 'Should generate 24-char ObjectId');
    });
});
