# Change Log

All notable changes to the "mongodb-objectid-parser" extension will be documented in this file.

## [0.1.0] - 2025-07-14

### Added
- **🆕 Timestamp to ObjectId Generation**: New reverse functionality to generate ObjectIds from timestamps and dates
- **📅 Multiple Timestamp Formats**: Support for Unix timestamps (10 digits), JavaScript timestamps (13 digits), and date strings
- **🌍 Timezone Offset Support**: Full support for ISO date strings with timezone offsets (e.g., "+08:00", "-05:00")
- **🔢 Underscore-Separated Numbers**: Support for numeric formats with underscores (e.g., `1752_4657_977_06`)
- **🔄 Bi-directional Parsing**: Can now both parse ObjectIds to show timestamps AND generate ObjectIds from timestamps
- **📝 Enhanced Documentation**: Updated README and test files with examples for the new functionality

### Technical Changes
- Added `TimestampParser` class for reverse ObjectId generation
- Enhanced `HoverProvider` to detect and handle timestamps, date strings, and timezone offsets
- Comprehensive test suite with 28+ test cases covering all timestamp parsing scenarios
- Updated hover content to clearly distinguish between ObjectId parsing and timestamp generation

### Supported Timestamp Formats
- Unix timestamps: 10-digit numbers (e.g., `1672531200`)
- JavaScript timestamps: 13-digit numbers (e.g., `1672531200000`)
- Underscore-separated numbers: Any numeric format with underscores (e.g., `1752_4657_977_06`)
- **ISO 8601 date strings only**: Standard ISO formats for maximum reliability
  - Date only: `"2023-01-01"`
  - Date with time: `"2023-01-01T10:30:00"`
  - Date with time and milliseconds: `"2023-01-01T10:30:00.123"`
  - Date with UTC timezone: `"2023-01-01T10:30:00Z"`
  - Date with timezone offset: `"2023-01-01T10:30:00+08:00"`, `"2023-01-01T10:30:00-05:00"`

### Important Note
- **Date format restriction**: Only ISO 8601 formats are supported for date strings to ensure cross-platform compatibility and reliability
- **Non-ISO formats rejected**: MM/DD/YYYY, DD.MM.YYYY, month names, and other locale-specific formats are not supported

## [0.0.5] - 2025-07-14

### Fixed
- **GitHub Actions Release**: Fixed permissions issue preventing GitHub Release creation
- **Automated Workflow**: Updated to use modern GitHub Actions for reliable release automation

### Technical Changes
- Added explicit `contents: write` and `packages: write` permissions to workflow
- Replaced deprecated `actions/create-release@v1` with `softprops/action-gh-release@v1`
- Ensures complete end-to-end automation from tag push to marketplace publishing and GitHub release

## [0.0.4] - 2025-07-14

### Fixed
- **GitHub Actions CI/CD**: Fixed virtual display issue for VS Code tests in Linux CI environment
- **Timezone-Independent Tests**: Improved test validation to work correctly across all timezones
- **Test Reliability**: Enhanced test approach with proper content parsing and validation

### Technical Changes
- Added `xvfb` virtual display support for headless VS Code testing in GitHub Actions
- Redesigned hover content test to parse actual results and validate independently
- Ensures consistent test results in local development and CI environments

## [0.0.3] - 2025-07-14

### Added
- **GitHub Actions Automation**: Automatic publishing to VS Code Marketplace when version tags are pushed
- **Release Automation Script**: New `scripts/release.sh` for streamlined version releases
- **GitHub Actions Setup Documentation**: Comprehensive guide for setting up automated publishing

### Improved
- **Optimized Package Size**: Extension package reduced to only 6.49 KB with 4 essential files
- **Precise File Control**: Using `package.json` `files` field instead of `.vscodeignore` for better packaging control
- **Streamlined Release Process**: Automated testing, building, and publishing workflow

### Removed
- `.vscodeignore` file (replaced by `package.json` files field)
- `test-objectids.md` from packaging (test file not needed in release)
- Redundant publish guide documentation

### Technical Changes
- Switched from `.vscodeignore` blacklist to `package.json` files whitelist approach
- Added GitHub Actions workflow with Node.js 22 for automated publishing
- Package now includes only: `dist/extension.js`, `README.md`, `CHANGELOG.md`, `LICENSE`

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