#!/bin/bash

# Version release script
# Usage: ./scripts/release.sh 0.0.3

set -e

if [ $# -eq 0 ]; then
    echo "Error: Please provide version number"
    echo "Usage: $0 <version>"
    echo "Example: $0 0.0.3"
    exit 1
fi

VERSION=$1
TAG="v$VERSION"

echo "🚀 Preparing to release version $VERSION"

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ Error: There are uncommitted changes, please commit all changes first"
    exit 1
fi

# Update package.json version
echo "📝 Updating package.json version to $VERSION"
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# Check if CHANGELOG.md has been updated
if ! grep -q "\[$VERSION\]" CHANGELOG.md; then
    echo "⚠️  Warning: Version $VERSION not found in CHANGELOG.md"
    echo "Please make sure CHANGELOG.md has been updated"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run tests
echo "🧪 Running tests..."
yarn test

# Commit version changes
echo "💾 Committing version changes..."
git add package.json
git commit -m "Bump version to $VERSION"

# Create tag
echo "🏷️  Creating version tag $TAG"
git tag $TAG

# Push changes and tags
echo "⬆️  Pushing to GitHub..."
git push origin main
git push origin $TAG

echo "✅ Version $VERSION release completed!"
echo "📦 GitHub Actions will automatically publish to VS Code Marketplace"
echo "🔗 Check progress: https://github.com/JoHuang/mongodb-objectid-vscode-extension/actions"
