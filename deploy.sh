#!/bin/bash
# Deploy script for KFLIX

echo "🚀 Starting KFLIX deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📂 Initializing git repository..."
    git init
    git branch -M main
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/daovinhkhang/kflix-new.git
fi

# Stage all files
echo "📝 Staging files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "🎬 Complete KFLIX streaming platform with Railway deployment

Features:
- ✅ Next.js 15 with App Router
- ✅ 40+ movies/shows per category
- ✅ Plex-style TV show interface
- ✅ Watchlist & Share functionality
- ✅ Multi-language SEO optimization
- ✅ Railway deployment ready
- ✅ Custom favicon and PWA support
- ✅ Responsive design with Tailwind CSS"

# Push to main branch
echo "🚢 Pushing to GitHub..."
git push -u origin main

echo "✅ Deployment complete! 
🌐 Repository: https://github.com/daovinhkhang/kflix-new.git
🚀 Next steps: Deploy on Railway using this repository"