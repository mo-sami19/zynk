#!/bin/bash
# File Permission Checker for Favicon Files
# Run this via SSH on your FastComet server

echo "==================================="
echo "Favicon Files Permission Check"
echo "==================================="
echo ""

PUBLIC_DIR="public"

# Check if public directory exists
if [ ! -d "$PUBLIC_DIR" ]; then
    echo "❌ ERROR: public/ directory not found!"
    echo "Current directory: $(pwd)"
    exit 1
fi

echo "✓ Found public/ directory"
echo ""

# Files to check
FILES=(
    "favicon.ico"
    "favicon-16x16.png"
    "favicon-32x32.png"
    "apple-touch-icon.png"
    "android-chrome-192x192.png"
    "android-chrome-512x512.png"
    "site.webmanifest"
    "zynk.png"
)

echo "Checking files..."
echo ""

MISSING_FILES=0
WRONG_PERMISSIONS=0

for file in "${FILES[@]}"; do
    filepath="$PUBLIC_DIR/$file"
    
    if [ -f "$filepath" ]; then
        perms=$(stat -c "%a" "$filepath" 2>/dev/null || stat -f "%A" "$filepath" 2>/dev/null)
        size=$(stat -c "%s" "$filepath" 2>/dev/null || stat -f "%z" "$filepath" 2>/dev/null)
        
        if [ "$perms" = "644" ]; then
            echo "✅ $file - Permissions: $perms, Size: $size bytes"
        else
            echo "⚠️  $file - Permissions: $perms (should be 644), Size: $size bytes"
            WRONG_PERMISSIONS=$((WRONG_PERMISSIONS + 1))
        fi
    else
        echo "❌ $file - MISSING"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

echo ""
echo "==================================="
echo "Summary:"
echo "==================================="
echo "Missing files: $MISSING_FILES"
echo "Wrong permissions: $WRONG_PERMISSIONS"
echo ""

if [ $MISSING_FILES -gt 0 ] || [ $WRONG_PERMISSIONS -gt 0 ]; then
    echo "⚠️  Action Required!"
    
    if [ $MISSING_FILES -gt 0 ]; then
        echo "   - Upload missing favicon files"
    fi
    
    if [ $WRONG_PERMISSIONS -gt 0 ]; then
        echo "   - Fix permissions with: chmod 644 $PUBLIC_DIR/favicon*.png $PUBLIC_DIR/*.ico $PUBLIC_DIR/*.webmanifest"
    fi
else
    echo "✅ All files present with correct permissions!"
fi

echo ""
echo "Testing HTTP access..."
echo ""

# Test if files are accessible via HTTP
DOMAIN=${1:-"zynk-adv.com"}

echo "Testing: https://$DOMAIN/favicon.ico"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/favicon.ico")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ favicon.ico returns HTTP 200"
elif [ "$HTTP_STATUS" = "500" ]; then
    echo "❌ favicon.ico returns HTTP 500 - Check .htaccess and Apache logs"
elif [ "$HTTP_STATUS" = "404" ]; then
    echo "❌ favicon.ico returns HTTP 404 - File not found or wrong path"
else
    echo "⚠️  favicon.ico returns HTTP $HTTP_STATUS"
fi

echo ""
echo "Done!"
