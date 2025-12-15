# Deployment Guide - Zynk Website

## Environment Configuration

### Development Environment
- **API URL**: `http://localhost:8000/api`
- **Site URL**: `http://localhost:3000`
- **Backend**: Local Laravel server
- **Images**: Served from `http://localhost:8000/storage/`

### Production Environment
- **API URL**: `https://backend.zynk-adv.com/api`
- **Site URL**: `https://zynk-adv.com`
- **Backend**: Production Laravel server
- **Images**: Served from `https://backend.zynk-adv.com/storage/`

---

## Setup Instructions

### 1. Development Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with development settings
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

---

### 2. Production Build

```bash
# Ensure .env.production exists with correct values
# .env.production should contain:
NEXT_PUBLIC_API_URL=https://backend.zynk-adv.com/api
NEXT_PUBLIC_SITE_URL=https://zynk-adv.com

# Build for production
npm run build:production

# Start production server
npm run start:production
```

---

## Backend Configuration

### Development Backend (Laravel)

```bash
cd backend-zynk

# Start Laravel development server
php artisan serve
# Server will run on http://localhost:8000

# Ensure storage link exists
php artisan storage:link

# Set correct permissions
chmod -R 775 storage bootstrap/cache
```

### Production Backend

Ensure the following on production server:

1. **Laravel Configuration**
```bash
# Set production environment
cp .env.example .env
php artisan key:generate

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Storage link
php artisan storage:link

# Permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

2. **CORS Configuration**
Update `config/cors.php` to allow frontend domain:
```php
'allowed_origins' => [
    'https://zynk-adv.com',
    'http://localhost:3000', // For development
],
```

3. **SSL Certificate**
Ensure SSL is properly configured for `https://backend.zynk-adv.com`

---

## Deployment Steps

### Option 1: Manual Deployment

1. **Build the project**
```bash
npm run build:production
```

2. **Upload files to server**
Upload the following to your hosting:
- `.next/` folder
- `public/` folder
- `package.json`
- `next.config.js`
- `.env.production`

3. **Install dependencies on server**
```bash
npm install --production
```

4. **Start the application**
```bash
npm run start:production
```

### Option 2: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "zynk-website" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Option 3: Using Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build:production

EXPOSE 3000

CMD ["npm", "run", "start:production"]
```

---

## Environment Variables Reference

### Required Variables

| Variable | Development | Production |
|----------|-------------|------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | `https://backend.zynk-adv.com/api` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://zynk-adv.com` |

---

## Verification Checklist

### Before Deployment

- [ ] All environment variables are set correctly
- [ ] Backend API is accessible from frontend
- [ ] CORS is configured on backend
- [ ] SSL certificates are valid
- [ ] Storage link exists on backend
- [ ] Database migrations are run
- [ ] All dependencies are installed

### After Deployment

- [ ] Website loads correctly
- [ ] API calls are working
- [ ] Images are loading
- [ ] Both languages (en/ar) work
- [ ] Contact form submits successfully
- [ ] Blog posts display correctly
- [ ] SEO meta tags are present
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] robots.txt is accessible

---

## Troubleshooting

### Issue: API calls failing

**Check:**
1. Backend server is running
2. CORS is configured correctly
3. SSL certificate is valid
4. Environment variables are correct

### Issue: Images not loading

**Check:**
1. Storage link exists: `php artisan storage:link`
2. Images are in `storage/app/public/posts/`
3. Correct permissions on storage folder
4. `next.config.js` has correct remotePatterns

### Issue: 404 errors

**Check:**
1. `.next` folder is uploaded
2. `next.config.js` is present
3. Server is running on correct port
4. Domain DNS is configured correctly

---

## Performance Optimization

### 1. Enable Caching
```javascript
// next.config.js
const nextConfig = {
  // ... existing config
  compress: true,
  poweredByHeader: false,
};
```

### 2. Use CDN for Static Assets
Configure your hosting to serve static files from CDN

### 3. Enable Image Optimization
Remove `unoptimized: true` from `next.config.js` when using a proper image service

---

## Monitoring

### Recommended Tools
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Performance**: Lighthouse CI

---

## Support

For issues or questions:
- Check logs: `pm2 logs zynk-website`
- Backend logs: `tail -f storage/logs/laravel.log`
- Contact: dev@zynk-adv.com
