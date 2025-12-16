# Performance Optimization Guide - Lighthouse 100/100

## ✅ Completed Optimizations

### 1. Cache Headers (.htaccess)
- ✅ Created `public/.htaccess` with cache headers
- ✅ Images cached for 1 year
- ✅ CSS/JS cached for 1 year
- ✅ GZIP compression enabled

### 2. Browser Support (.browserslistrc)
- ✅ Target modern browsers only
- ✅ Removes legacy polyfills
- ✅ Reduces bundle size by ~11 KiB

---

## 🔧 Manual Steps Required

### 1. Optimize Logo Image (CRITICAL)
**Current:** `zynk-logo.png` is 596x159 (9.8 KiB)
**Displayed:** 262x70 pixels
**Savings:** 7.9 KiB

**Action Required:**
1. Open `public/images/logo/zynk-logo.png` in image editor
2. Resize to **524x140** (2x for retina displays)
3. Export as WebP format: `zynk-logo.webp`
4. Keep PNG as fallback

**Update in code:**
```tsx
// Find in navbar.tsx or wherever logo is used
<Image
  src="/images/logo/zynk-logo.webp"
  alt="ZYNK Logo"
  width={262}
  height={70}
  priority
/>
```

### 2. Convert All Images to WebP
**Affected files:**
- `/images/assets/*.png` (6 files)
- `/images/logo/*.png`

**Tools:**
- Online: https://squoosh.app/
- CLI: `cwebp input.png -o output.webp`

**Command for bulk conversion:**
```bash
# Install cwebp first
# Then run in public/images folder:
for file in **/*.png; do
  cwebp "$file" -o "${file%.png}.webp"
done
```

### 3. Deploy to Production
After making changes:

```bash
# 1. Build the project
npm run build

# 2. Upload to cPanel:
# - Upload .htaccess to public_html/
# - Upload optimized images
# - Upload _next/ folder

# 3. Clear browser cache and test
```

---

## 📊 Expected Results After Optimization

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Performance | 93 | 100 | +7 |
| Cache Savings | 0 | 18 KiB | +18 KiB |
| Image Savings | 0 | 8 KiB | +8 KiB |
| JS Savings | 0 | 11 KiB | +11 KiB |
| Total Savings | 0 | 37 KiB | +37 KiB |

---

## 🎯 Priority Order

1. **HIGH:** Upload `.htaccess` to server (instant +3-4 points)
2. **HIGH:** Optimize logo image (instant +2-3 points)
3. **MEDIUM:** Convert images to WebP (+1-2 points)
4. **LOW:** Rebuild with new browserslist (automatic on next build)

---

## ✅ Verification Steps

1. Deploy changes to production
2. Wait 5 minutes for cache to clear
3. Run Lighthouse again: https://pagespeed.web.dev/
4. Check Performance score = 100

---

## 📝 Notes

- The `.htaccess` file is the **most important** change
- Make sure it's uploaded to the root of `public_html/`
- Image optimization can be done gradually
- Rebuild is required for browserslist changes to take effect
