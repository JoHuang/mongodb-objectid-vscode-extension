# Change Log

All notable changes to the "mongodb-objectid-parser" extension will be documented in this file.

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