#!/bin/bash

echo "🚀 Starting deployment process..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build the project
echo "🔨 Building production version..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready in 'dist' folder:"
    ls -lh dist/ | head -10
    echo ""
    echo "📋 Next steps:"
    echo "1. Access Hostinger File Manager"
    echo "2. Navigate to public_html directory"
    echo "3. Upload ALL contents from the 'dist' folder"
    echo "4. Upload the '.htaccess' file to public_html"
    echo "5. Test your website!"
    echo ""
    echo "📄 See DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
