# GitHub Actions Release Setup

This document explains how to set up GitHub Actions for automatic VS Code extension publishing.

## Required GitHub Secret

You need to add your VS Code Marketplace Personal Access Token as a GitHub repository secret:

### Steps to add the secret:

1. **Go to your GitHub repository**: https://github.com/JoHuang/mongodb-objectid-vscode-extension

2. **Navigate to Settings**:
   - Click on "Settings" tab in your repository
   - Click on "Secrets and variables" in the left sidebar
   - Click on "Actions"

3. **Add new repository secret**:
   - Click "New repository secret"
   - **Name**: `VSCE_PAT`
   - **Secret**: Paste your Personal Access Token (the one you used for manual publishing)
   - Click "Add secret"

## How the automation works:

1. **Create a release**: Run `./scripts/release.sh <version>` (e.g., `./scripts/release.sh 0.0.3`)
2. **Automatic trigger**: The script creates a git tag, which triggers the GitHub Action
3. **Automatic publishing**: GitHub Actions will automatically:
   - Install dependencies
   - Run tests
   - Build the extension
   - Publish to VS Code Marketplace
   - Create a GitHub Release

## Manual release (if needed):

If you prefer to create tags manually:

```bash
# Update version in package.json first, then:
git add package.json
git commit -m "Bump version to 0.0.3"
git tag v0.0.3
git push origin main
git push origin v0.0.3
```

## Troubleshooting:

- **Publishing fails**: Check that your VSCE_PAT secret is correctly set
- **Tests fail**: Make sure all tests pass locally before creating a release
- **Action not triggered**: Ensure the tag follows the format `v*` (e.g., `v0.0.3`)

## View release status:

Check the progress at: https://github.com/JoHuang/mongodb-objectid-vscode-extension/actions
