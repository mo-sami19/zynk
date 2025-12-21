# Favicon Setup Instructions

## Required Files to Create

You need to convert your existing `zynk.png` file into multiple favicon formats. Use one of these methods:

### Method 1: Online Converter (Recommended for Shared Hosting)
1. Go to https://realfavicongenerator.net/
2. Upload your `public/zynk.png` file
3. Download the generated favicon package
4. Extract and upload these files to your `public/` directory:
   - `favicon.ico` (16x16, 32x32, 48x48)
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

### Method 2: Using ImageMagick (If Available on Server)
```bash
# SSH into your server, then run:
cd public_html/public

# Create favicon.ico with multiple sizes
convert zynk.png -resize 16x16 favicon-16.png
convert zynk.png -resize 32x32 favicon-32.png
convert zynk.png -resize 48x48 favicon-48.png
convert favicon-16.png favicon-32.png favicon-48.png favicon.ico

# Create other sizes
convert zynk.png -resize 16x16 favicon-16x16.png
convert zynk.png -resize 32x32 favicon-32x32.png
convert zynk.png -resize 180x180 apple-touch-icon.png
convert zynk.png -resize 192x192 android-chrome-192x192.png
convert zynk.png -resize 512x512 android-chrome-512x512.png

# Clean up temporary files
rm favicon-16.png favicon-32.png favicon-48.png
```

### Method 3: Using Node.js (Local Development)
```bash
npm install sharp --save-dev
node generate-favicons.js
```

## File Permissions
After uploading, set correct permissions via cPanel File Manager or SSH:
```bash
chmod 644 public/favicon.ico
chmod 644 public/favicon-*.png
chmod 644 public/apple-touch-icon.png
chmod 644 public/android-chrome-*.png
chmod 644 public/site.webmanifest
```

## Verification
After uploading, test these URLs:
- https://zynk-adv.com/favicon.ico
- https://zynk-adv.com/favicon-32x32.png
- https://zynk-adv.com/apple-touch-icon.png
