# Change Log

All notable changes to the "mongodb-objectid-parser" extension will be documented in this file.

## [0.0.2] - 2025-07-14

### Improved
- **Universal File Support**: Now supports ALL file types (previously limited to specific languages)
- **Optimized Hover Provider**: Simplified registration to single provider for better performance
- **Fixed Duplicate Content**: Resolved issue where hover content appeared twice in TypeScript files
- **Updated Documentation**: README now accurately reflects universal file type support

### Technical Changes
- Simplified hover provider registration from multiple language-specific providers to single universal provider
- Improved extension test with correct publisher ID format
- Removed template residual content and commands

## [0.0.1] - 2025-07-14

### Added
- Initial release
- MongoDB ObjectId hover provider
- Parse and display creation timestamp in user-friendly format
- Support for multiple file types (JavaScript, TypeScript, JSON, Python, etc.)
- Real-time ObjectId parsing with detailed information