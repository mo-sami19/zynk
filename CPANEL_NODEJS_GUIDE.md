# دليل رفع Next.js SSR على cPanel مع Node.js

## ✅ المتطلبات:

- ✅ cPanel يدعم **Node.js Application**
- ✅ Node.js 18 أو أحدث
- ✅ SSH Access (اختياري لكن موصى به)

---

## 📋 خطوات الرفع على cPanel:

### الخطوة 1: التحقق من دعم Node.js

1. افتح **cPanel**
2. ابحث عن **"Setup Node.js App"** أو **"Node.js Selector"**
3. إذا وجدته، فـ cPanel يدعم Node.js ✅

---

### الخطوة 2: رفع الملفات

#### الطريقة الأولى: FTP (الأسهل)

1. استخدم **FileZilla** أو أي برنامج FTP
2. اتصل بالسيرفر
3. ارفع **جميع ملفات المشروع** إلى مجلد خارج `public_html`
   - مثال: `/home/username/zynk-website/`
   
**⚠️ مهم:** لا ترفع إلى `public_html` مباشرة!

#### الطريقة الثانية: File Manager

1. افتح **File Manager** في cPanel
2. أنشئ مجلد جديد (مثل `zynk-website`)
3. ارفع جميع الملفات إليه
4. أو ارفع ملف ZIP وفك الضغط

---

### الخطوة 3: إعداد Node.js Application

1. **افتح "Setup Node.js App"** في cPanel

2. **اضغط "Create Application"**

3. **املأ البيانات:**
   ```
   Node.js version: 18.x أو أحدث
   Application mode: Production
   Application root: /home/username/zynk-website
   Application URL: yourdomain.com (أو subdomain)
   Application startup file: server.js
   ```

4. **اضغط "Create"**

---

### الخطوة 4: إنشاء ملف server.js

في مجلد المشروع، أنشئ ملف `server.js`:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

---

### الخطوة 5: تثبيت Dependencies

#### عبر SSH (الطريقة الموصى بها):

```bash
# اتصل بالسيرفر عبر SSH
ssh username@yourdomain.com

# اذهب إلى مجلد المشروع
cd ~/zynk-website

# ثبت Dependencies
npm install

# ابنِ المشروع
npm run build
```

#### عبر cPanel Terminal:

1. افتح **Terminal** في cPanel
2. نفذ الأوامر:
   ```bash
   cd ~/zynk-website
   npm install
   npm run build
   ```

---

### الخطوة 6: تشغيل التطبيق

1. ارجع إلى **"Setup Node.js App"**
2. اضغط على **"Restart"** بجانب تطبيقك
3. انتظر حتى يصبح Status: **Running**

---

### الخطوة 7: إعداد .htaccess (للـ Domain الرئيسي)

إذا كنت تستخدم Domain رئيسي، أضف في `public_html/.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^(.*)$ http://localhost:PORT/$1 [P,L]
```

**⚠️ استبدل `PORT` برقم البورت من cPanel**

---

## 📁 بنية الملفات المطلوبة:

```
~/zynk-website/
├── app/                  ✅
├── components/           ✅
├── data/                 ✅
├── lib/                  ✅
├── locales/              ✅
├── public/               ✅
├── i18n.ts               ✅
├── middleware.ts         ✅
├── next.config.js        ✅
├── package.json          ✅
├── package-lock.json     ✅
├── server.js             ✅ (أنشئه)
├── tailwind.config.ts    ✅
└── tsconfig.json         ✅
```

**❌ لا ترفع:**
- `node_modules/` (سيتم تثبيتها على السيرفر)
- `.next/` (سيتم بناؤها على السيرفر)
- `out/`

---

## 🔧 حل المشاكل الشائعة:

### المشكلة 1: "Setup Node.js App" غير موجود
**الحل:**
- cPanel الخاص بك لا يدعم Node.js
- اتصل بالدعم الفني لتفعيله
- أو استخدم Vercel/Netlify بدلاً منه

### المشكلة 2: npm install يفشل
**الحل:**
```bash
# امسح node_modules وأعد المحاولة
rm -rf node_modules package-lock.json
npm install
```

### المشكلة 3: التطبيق لا يعمل
**الحل:**
1. تحقق من Logs في cPanel
2. تأكد من تشغيل `npm run build`
3. تأكد من وجود ملف `server.js`
4. أعد تشغيل التطبيق

### المشكلة 4: Port مشغول
**الحل:**
- cPanel سيعطيك Port تلقائياً
- استخدم `process.env.PORT` في server.js

---

## 📊 متغيرات البيئة:

إذا كنت تحتاج متغيرات بيئة:

1. في **"Setup Node.js App"**
2. اذهب إلى **"Environment Variables"**
3. أضف المتغيرات:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

---

## ✅ قائمة التحقق:

- [ ] تم رفع جميع الملفات
- [ ] تم إنشاء ملف `server.js`
- [ ] تم تشغيل `npm install`
- [ ] تم تشغيل `npm run build`
- [ ] تم إنشاء Node.js App في cPanel
- [ ] التطبيق يعمل (Status: Running)
- [ ] تم اختبار الموقع في المتصفح

---

## 🎯 بعد الرفع الناجح:

- ✅ اختبر جميع الصفحات
- ✅ اختبر تبديل اللغات
- ✅ فعّل SSL Certificate
- ✅ راقب الأداء

---

## 💡 نصائح إضافية:

1. **استخدم PM2** (إذا كان متاحاً):
   ```bash
   npm install -g pm2
   pm2 start server.js --name zynk
   pm2 save
   ```

2. **راقب Logs**:
   ```bash
   pm2 logs zynk
   ```

3. **أعد التشغيل عند التحديث**:
   ```bash
   npm run build
   pm2 restart zynk
   ```

---

## ⚠️ ملاحظة مهمة:

إذا كان cPanel لا يدعم Node.js بشكل جيد، **استخدم Vercel** بدلاً منه:
- ✅ أسهل بكثير
- ✅ أسرع
- ✅ مجاني
- ✅ أداء أفضل

```bash
vercel
```

---

**موقعك جاهز للرفع على cPanel مع Node.js! 🚀**
