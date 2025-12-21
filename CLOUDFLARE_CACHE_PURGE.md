# Cloudflare Cache Purge Instructions

## Why This Is Critical

Cloudflare is currently caching the **500 Internal Server Error** responses for your favicon files. Even after fixing the server-side issues, visitors and Google will continue to see the 500 error until you purge Cloudflare's cache.

## Method 1: Purge via Cloudflare Dashboard (Easiest)

### Option A: Purge Everything (Recommended)

1. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain: **zynk-adv.com**
3. Click **Caching** in the left sidebar
4. Click **Configuration** tab
5. Scroll to **Purge Cache** section
6. Click **Purge Everything** button
7. Confirm the action

**⚠️ Note:** This will clear ALL cached content. Your site may be slower for the next few hours as cache rebuilds.

### Option B: Custom Purge (Selective)

1. Login to Cloudflare Dashboard
2. Select your domain: **zynk-adv.com**
3. Click **Caching** → **Configuration**
4. Scroll to **Purge Cache**
5. Click **Custom Purge**
6. Select **Purge by URL**
7. Enter these URLs (one per line):

```
https://zynk-adv.com/favicon.ico
https://www.zynk-adv.com/favicon.ico
https://zynk-adv.com/favicon-16x16.png
https://www.zynk-adv.com/favicon-16x16.png
https://zynk-adv.com/favicon-32x32.png
https://www.zynk-adv.com/favicon-32x32.png
https://zynk-adv.com/apple-touch-icon.png
https://www.zynk-adv.com/apple-touch-icon.png
https://zynk-adv.com/android-chrome-192x192.png
https://zynk-adv.com/android-chrome-512x512.png
https://zynk-adv.com/site.webmanifest
```

8. Click **Purge**

## Method 2: Purge via Cloudflare API

### Prerequisites
- Cloudflare API Token with Cache Purge permission
- Your Zone ID

### Get Your Zone ID
1. Login to Cloudflare Dashboard
2. Select your domain
3. Scroll down on Overview page
4. Copy **Zone ID** from the right sidebar

### Create API Token
1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Edit zone DNS** template or create custom
4. Permissions needed: **Zone → Cache Purge → Purge**
5. Zone Resources: **Include → Specific zone → zynk-adv.com**
6. Create and copy the token

### Purge Everything
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Purge Specific Files
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "files": [
      "https://zynk-adv.com/favicon.ico",
      "https://www.zynk-adv.com/favicon.ico",
      "https://zynk-adv.com/favicon-16x16.png",
      "https://www.zynk-adv.com/favicon-16x16.png",
      "https://zynk-adv.com/favicon-32x32.png",
      "https://www.zynk-adv.com/favicon-32x32.png",
      "https://zynk-adv.com/apple-touch-icon.png",
      "https://zynk-adv.com/site.webmanifest"
    ]
  }'
```

### Purge by Tag (if you use cache tags)
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"tags":["favicon","static-assets"]}'
```

## Method 3: Development Mode (Temporary)

If you need to test changes without waiting for cache purge:

1. Login to Cloudflare Dashboard
2. Select your domain
3. Click **Caching** → **Configuration**
4. Toggle **Development Mode** to **ON**
5. This bypasses cache for 3 hours

**⚠️ Warning:** Development Mode disables ALL Cloudflare optimizations. Only use for testing.

## Verification After Purge

### 1. Check HTTP Headers
```bash
curl -I https://zynk-adv.com/favicon.ico
```

**Look for:**
- `HTTP/2 200` (not 500)
- `cf-cache-status: MISS` (first request after purge)
- `cf-cache-status: HIT` (subsequent requests)

### 2. Test in Multiple Locations
Use these tools to test from different geographic locations:
- https://www.whatsmydns.net/
- https://tools.keycdn.com/performance
- https://www.webpagetest.org/

### 3. Browser Test
1. Open **Incognito/Private window**
2. Visit: `https://zynk-adv.com/favicon.ico`
3. Should display the image (not error)
4. Check browser DevTools → Network tab
5. Status should be **200**

### 4. Google Test
```bash
# Test with Google's user agent
curl -I -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  https://zynk-adv.com/favicon.ico
```

## Cloudflare Page Rules (Optional)

To prevent future caching issues with static assets, create a Page Rule:

1. Go to **Rules** → **Page Rules**
2. Click **Create Page Rule**
3. URL pattern: `zynk-adv.com/*.ico`
4. Settings:
   - **Cache Level:** Standard
   - **Edge Cache TTL:** 1 month
   - **Browser Cache TTL:** 1 month
5. Save and Deploy

Repeat for other static file patterns:
- `zynk-adv.com/*.png`
- `zynk-adv.com/*.jpg`
- `zynk-adv.com/*.svg`

## Troubleshooting

### Cache Still Showing 500 Error?

1. **Wait 5 minutes** - Purge takes time to propagate
2. **Check if you purged both www and non-www versions**
3. **Verify the file actually exists on server** (test via SSH/FTP)
4. **Check Apache logs** for actual server errors
5. **Disable Cloudflare temporarily** (set DNS to "DNS Only" mode)

### Purge Not Working?

1. **Check API token permissions** - Must have Cache Purge permission
2. **Verify Zone ID is correct**
3. **Check API response** for error messages
4. **Try "Purge Everything" instead of selective purge**

### Still Getting Cached Errors?

**Possible causes:**
1. **Browser cache** - Clear browser cache or use incognito
2. **ISP cache** - Some ISPs cache DNS/content
3. **CDN in front of Cloudflare** - Check if you have another CDN
4. **Cloudflare Workers** - Check if any Workers are caching responses

## Post-Purge Checklist

After purging Cloudflare cache:

- [ ] Test favicon.ico returns HTTP 200
- [ ] Test in incognito mode
- [ ] Check cf-cache-status header
- [ ] Test with Google's user agent
- [ ] Verify in Google Search Console
- [ ] Request re-indexing in Search Console
- [ ] Monitor for 24 hours

## Automated Purge Script

Save this as `purge-cloudflare.sh`:

```bash
#!/bin/bash

ZONE_ID="your_zone_id_here"
API_TOKEN="your_api_token_here"

echo "Purging Cloudflare cache for favicon files..."

response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "files": [
      "https://zynk-adv.com/favicon.ico",
      "https://www.zynk-adv.com/favicon.ico",
      "https://zynk-adv.com/favicon-16x16.png",
      "https://zynk-adv.com/favicon-32x32.png",
      "https://zynk-adv.com/apple-touch-icon.png"
    ]
  }')

if echo "$response" | grep -q '"success":true'; then
    echo "✅ Cache purged successfully!"
else
    echo "❌ Error purging cache:"
    echo "$response"
fi
```

Make executable: `chmod +x purge-cloudflare.sh`

## Support

If cache purge doesn't resolve the issue:
1. Check server-side fixes are deployed
2. Verify .htaccess changes are live
3. Check Apache error logs
4. Contact Cloudflare support if CDN-level issue
