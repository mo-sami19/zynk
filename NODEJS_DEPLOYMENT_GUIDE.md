# دليل رفع موقع Zynk على استضافة Node.js (SSR)

## ✅ الموقع معد للعمل كـ SSR (Server-Side Rendering)

---

## 📋 المتطلبات:

### استضافة تدعم:
- ✅ Node.js (الإصدار 18 أو أحدث)
- ✅ npm أو yarn
- ✅ Port للتطبيق (عادة 3000 أو حسب الاستضافة)

### خيارات الاستضافة الموصى بها:
1. **Vercel** (الأسهل - مجاني)
2. **Netlify** (سهل - مجاني)
3. **Railway** (سهل - مجاني)
4. **DigitalOcean App Platform**
5. **AWS Amplify**
6. **Heroku**
7. **VPS مع Node.js** (للمحترفين)

---

## 🚀 طريقة الرفع على Vercel (الأسهل والأسرع):

### الخطوة 1: تثبيت Vercel CLI
```bash
npm install -g vercel
```

### الخطوة 2: تسجيل الدخول
```bash
vercel login
```

### الخطوة 3: الرفع
```bash
vercel
```

### الخطوة 4: اتبع التعليمات
- اختر اسم المشروع
- اختر الإعدادات الافتراضية
- انتظر حتى ينتهي الرفع

**✅ تم! موقعك الآن على الإنترنت!**

---

## 🚀 طريقة الرفع على Netlify:

### الطريقة الأولى: عبر Git (موصى بها)

1. **رفع المشروع على GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **ربط Netlify بـ GitHub**
   - اذهب إلى [netlify.com](https://netlify.com)
   - اضغط "New site from Git"
   - اختر GitHub واختر المشروع
   - Build command: `npm run build`
   - Publish directory: `.next`
   - اضغط "Deploy"

### الطريقة الثانية: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 🚀 طريقة الرفع على Railway:

1. **اذهب إلى** [railway.app](https://railway.app)
2. **اضغط** "New Project"
3. **اختر** "Deploy from GitHub repo"
4. **اختر** المشروع
5. **Railway سيكتشف** Next.js تلقائياً
6. **✅ تم!** موقعك سيكون جاهز في دقائق

---

## 🚀 طريقة الرفع على VPS (للمحترفين):

### المتطلبات:
- VPS مع Ubuntu/Debian
- SSH access
- Domain name (اختياري)

### الخطوات:

#### 1. تثبيت Node.js على السيرفر
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. تثبيت PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

#### 3. رفع الملفات
استخدم FTP أو Git لرفع المشروع إلى السيرفر

#### 4. تثبيت Dependencies
```bash
cd /path/to/your/project
npm install
```

#### 5. بناء المشروع
```bash
npm run build
```

#### 6. تشغيل التطبيق مع PM2
```bash
pm2 start npm --name "zynk-website" -- start
pm2 save
pm2 startup
```

#### 7. إعداد Nginx كـ Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 8. تفعيل SSL مع Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 📦 الملفات المطلوبة للرفع:

### الملفات الأساسية:
```
zynk-website/
├── app/                  ✅ (مجلد الصفحات)
├── components/           ✅ (المكونات)
├── data/                 ✅ (البيانات)
├── lib/                  ✅ (المكتبات)
├── locales/              ✅ (الترجمات)
├── public/               ✅ (الملفات العامة)
├── i18n.ts               ✅
├── middleware.ts         ✅
├── next.config.js        ✅
├── package.json          ✅
├── package-lock.json     ✅
├── tailwind.config.ts    ✅
├── tsconfig.json         ✅
└── .env.local            ⚠️ (إذا كان موجود)
```

### ⚠️ الملفات التي لا تُرفع:
- ❌ `node_modules/` (سيتم تثبيتها على السيرفر)
- ❌ `.next/` (سيتم بناؤها على السيرفر)
- ❌ `out/` (غير مطلوب لـ SSR)

---

## 🔧 متغيرات البيئة (Environment Variables):

إذا كان موقعك يستخدم API keys أو متغيرات بيئة، أضفها في لوحة التحكم:

### Vercel:
Settings → Environment Variables

### Netlify:
Site settings → Build & deploy → Environment

### Railway:
Variables tab

### مثال:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=your_database_url
```

---

## 📊 مقارنة خيارات الاستضافة:

| الخدمة | السهولة | السعر | الأداء | التوصية |
|--------|---------|-------|--------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | مجاني | ⭐⭐⭐⭐⭐ | الأفضل لـ Next.js |
| **Netlify** | ⭐⭐⭐⭐⭐ | مجاني | ⭐⭐⭐⭐ | ممتاز |
| **Railway** | ⭐⭐⭐⭐ | مجاني | ⭐⭐⭐⭐ | جيد جداً |
| **VPS** | ⭐⭐ | متوسط | ⭐⭐⭐⭐⭐ | للمحترفين |

---

## ✅ قائمة التحقق بعد الرفع:

- □ الموقع يعمل ويفتح بشكل صحيح
- □ تبديل اللغة (عربي/إنجليزي) يعمل
- □ جميع الصفحات تعمل
- □ الصور تظهر
- □ النماذج تعمل
- □ SSL/HTTPS مفعل
- □ Domain مربوط (إذا كان لديك)

---

## 🔍 حل المشاكل الشائعة:

### المشكلة: Build يفشل
**الحل:**
```bash
# امسح node_modules وأعد التثبيت
rm -rf node_modules package-lock.json
npm install
npm run build
```

### المشكلة: الموقع بطيء
**الحل:**
- استخدم CDN (Vercel/Netlify يوفرون CDN تلقائياً)
- فعّل Image Optimization
- استخدم caching

### المشكلة: خطأ في الترجمة
**الحل:**
- تأكد من رفع مجلد `locales/`
- تأكد من وجود ملفات `common.json` للغتين

---

## 📞 الدعم:

### Vercel:
- [التوثيق](https://vercel.com/docs)
- [الدعم](https://vercel.com/support)

### Netlify:
- [التوثيق](https://docs.netlify.com)
- [Community](https://answers.netlify.com)

### Railway:
- [التوثيق](https://docs.railway.app)
- [Discord](https://discord.gg/railway)

---

## 🎉 بعد الرفع الناجح:

موقعك الآن يعمل بـ SSR! يمكنك:
- ✅ مشاركة الرابط مع العملاء
- ✅ ربط Domain مخصص
- ✅ تفعيل Analytics
- ✅ إضافة المزيد من الميزات
- ✅ تحديث المحتوى بسهولة

---

## 💡 نصائح إضافية:

1. **استخدم Git** لتتبع التغييرات
2. **فعّل Auto-Deploy** من Git
3. **راقب الأداء** باستخدام Analytics
4. **احتفظ بنسخة احتياطية** من البيانات
5. **اختبر قبل الرفع** على localhost

---

**موقعك جاهز للرفع كـ SSR! 🚀**
