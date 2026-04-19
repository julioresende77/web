#!/bin/bash
#
# Setup script for GitHub repository
# Run this script to create the GitHub repository and configure auto-sync
#

set -e

REPO_NAME="restech-ai"
GITHUB_USER=""  # Will be detected

echo "🚀 Setting up GitHub repository for restech-ai..."

# Detect GitHub username from git config
current_email=$(git config user.email)
if [ -z "$current_email" ]; then
    echo "❌ Git user email not configured. Run: git config user.email 'your@email.com'"
    exit 1
fi

echo "Git user email: $current_email"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) is not installed."
    echo ""
    echo "To install GitHub CLI:"
    echo "  - Windows: winget install --id GitHub.cli"
    echo "  - macOS: brew install gh"
    echo "  - Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    echo ""
    echo "After installing, run: gh auth login"
    echo ""
    echo "Or manually create the repository at: https://github.com/new"
    echo "Then run: git remote add origin https://github.com/YOUR_USERNAME/restech-ai.git"
    exit 1
fi

# Check if authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub first:"
    gh auth login
fi

GITHUB_USER=$(gh api user -q .login)
echo "✅ Authenticated as: $GITHUB_USER"

# Check if repo already exists
if gh repo view "$GITHUB_USER/$REPO_NAME" &> /dev/null; then
    echo "⚠️  Repository $GITHUB_USER/$REPO_NAME already exists."
else
    echo "📦 Creating repository: $REPO_NAME"
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
    echo "✅ Repository created successfully!"
fi

# Ensure remote is set
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 Adding remote origin..."
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Repository URL: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "📝 Next steps:"
echo "  1. Copy .env.example to .env.local and fill in your API keys"
echo "  2. Make your first commit: git add -A && git commit -m 'Initial commit'"
echo "  3. The post-commit hook will auto-sync to GitHub"
