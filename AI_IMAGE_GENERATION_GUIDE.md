# دليل توليد الصور بالذكاء الاصطناعي للمقالات
# AI Image Generation Guide for Blog Posts

## نظرة عامة | Overview

تم إضافة ميزة توليد الصور تلقائياً بالذكاء الاصطناعي عند إضافة مقالة جديدة. الميزة تستخدم **OpenAI DALL-E 3** لإنشاء صور احترافية مناسبة لمحتوى المقالة.

This feature automatically generates professional images using **OpenAI DALL-E 3** when creating a new blog post.

---

## الملفات المضافة | Files Added

### Frontend (Admin Panel)
1. **`zynk-admin/src/lib/api/image-generation.ts`**
   - وظائف API لتوليد الصور
   - `generatePostImage()` - توليد صورة من prompt
   - `generateImageFromTitle()` - توليد صورة من عنوان المقالة

2. **`zynk-admin/src/pages/dashboard/posts/PostForm.tsx`** (معدّل)
   - إضافة زر "AI Image" في قسم الصورة المصغرة
   - معالج `handleGenerateImage()` لتوليد الصور

### Backend (Laravel API)
1. **`backend-zynk/app/Services/ImageGenerationService.php`**
   - خدمة توليد الصور باستخدام OpenAI DALL-E
   - دعم Stability AI كخيار بديل
   - تحسين تلقائي للـ prompts حسب الفئة والأسلوب

2. **`backend-zynk/app/Http/Controllers/Api/V1/PostController.php`** (معدّل)
   - إضافة endpoint `generateImage()`
   - معالجة طلبات توليد الصور

3. **`backend-zynk/routes/api.php`** (معدّل)
   - إضافة route: `POST /v1/admin/posts/generate-image`

---

## الإعداد | Setup

### 1. إضافة OpenAI API Key

أضف المفتاح في ملف `.env` الخاص بالـ backend:

```env
# OpenAI Configuration for Image Generation
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Choose provider (openai or stability)
IMAGE_GENERATION_PROVIDER=openai

# Optional: Stability AI (if using as alternative)
STABILITY_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. الحصول على OpenAI API Key

1. اذهب إلى: https://platform.openai.com/api-keys
2. سجل دخول أو أنشئ حساب جديد
3. انقر على "Create new secret key"
4. انسخ المفتاح وأضفه في `.env`

### 3. تفعيل DALL-E 3 API

تأكد من أن حسابك في OpenAI:
- ✅ مفعّل ومدفوع (Paid account)
- ✅ لديه رصيد كافٍ ($5 على الأقل)
- ✅ DALL-E 3 API متاح في منطقتك

**التكلفة:**
- DALL-E 3 Standard: **$0.040** لكل صورة (1024x1024)
- DALL-E 3 HD: **$0.080** لكل صورة (1024x1024)

---

## كيفية الاستخدام | How to Use

### في لوحة التحكم (Admin Panel)

1. **إضافة مقالة جديدة:**
   - اذهب إلى Dashboard → Posts → New Post

2. **أدخل عنوان المقالة:**
   - اكتب العنوان بالإنجليزية أو العربية
   - اختر الفئة (Category)

3. **توليد الصورة:**
   - في قسم "Thumbnail"
   - انقر على زر **"AI Image"** بجانب حقل رفع الصورة
   - انتظر 5-10 ثوانٍ حتى يتم التوليد

4. **معاينة الصورة:**
   - ستظهر الصورة المولدة تلقائياً
   - يمكنك إعادة التوليد إذا لم تعجبك النتيجة

5. **حفظ المقالة:**
   - انقر على "Create Post" لحفظ المقالة مع الصورة

---

## الميزات | Features

### ✨ تحسين تلقائي للـ Prompts

الخدمة تحسن الـ prompt تلقائياً حسب:

1. **الأسلوب (Style):**
   - `professional` - أسلوب احترافي للأعمال
   - `realistic` - صور واقعية فوتوغرافية
   - `artistic` - تصاميم فنية إبداعية
   - `minimalist` - تصميم بسيط ونظيف

2. **الفئة (Category):**
   - Digital Marketing → صور عن النمو والتحليلات
   - SEO → صور عن محركات البحث والترتيب
   - Social Media → صور عن التفاعل والمجتمع
   - Branding → صور عن الهوية والعلامة التجارية

3. **اللغة (Locale):**
   - دعم الإنجليزية والعربية
   - تحسين السياق حسب اللغة

### 📐 مواصفات الصور

- **الحجم:** 1792x1024 (يتم تحويلها إلى 1200x800)
- **الجودة:** Standard (يمكن تغييرها إلى HD)
- **الصيغة:** PNG
- **التخزين:** `storage/posts/ai-generated/`

---

## أمثلة | Examples

### مثال 1: مقالة عن SEO

**العنوان:**
```
Top SEO Strategies for 2024
```

**الـ Prompt المحسّن:**
```
Create a professional business style, clean, corporate, modern image representing: 
Top SEO Strategies for 2024. Context: SEO concept, search engine, ranking, optimization. 
The image should be suitable for a blog article thumbnail, 1200x800 pixels, with no text overlay.
```

### مثال 2: مقالة عن التسويق الرقمي

**العنوان:**
```
أفضل استراتيجيات التسويق الرقمي لعام 2024
```

**الـ Prompt المحسّن:**
```
Create a professional business style, clean, corporate, modern image representing: 
أفضل استراتيجيات التسويق الرقمي لعام 2024. Context: digital marketing concept, 
business growth, analytics. The image should be suitable for a blog article thumbnail, 
1200x800 pixels, with no text overlay.
```

---

## API Reference

### Endpoint

```http
POST /api/v1/admin/posts/generate-image
```

### Request Body

```json
{
  "prompt": "Article title or description",
  "title": "Optional: Article title",
  "category": "Optional: digital-marketing, seo, social-media, etc.",
  "style": "Optional: professional, realistic, artistic, minimalist",
  "locale": "Optional: en or ar"
}
```

### Response (Success)

```json
{
  "success": true,
  "message": "Image generated successfully",
  "data": {
    "image_url": "https://backend.zynk-adv.com/storage/posts/ai-generated/seo-strategies-2024-1234567890.png",
    "image_path": "posts/ai-generated/seo-strategies-2024-1234567890.png",
    "prompt_used": "Create a professional business style...",
    "generation_time": 8542.35
  }
}
```

### Response (Error)

```json
{
  "success": false,
  "message": "Image generation service is not configured. Please add OPENAI_API_KEY to your .env file."
}
```

---

## استكشاف الأخطاء | Troubleshooting

### ❌ "Image generation service is not configured"

**الحل:**
1. تأكد من إضافة `OPENAI_API_KEY` في `.env`
2. أعد تشغيل الـ backend: `php artisan config:clear`

### ❌ "OpenAI API error: 401 Unauthorized"

**الحل:**
1. تحقق من صحة الـ API key
2. تأكد من أن الحساب مفعّل ومدفوع

### ❌ "OpenAI API error: 429 Rate Limit"

**الحل:**
1. انتظر دقيقة وحاول مرة أخرى
2. ترقية الحساب لزيادة الحد الأقصى للطلبات

### ❌ "Failed to download and save image"

**الحل:**
1. تحقق من صلاحيات المجلد: `storage/app/posts/ai-generated/`
2. تأكد من وجود مساحة كافية على السيرفر

### ❌ الصورة لا تظهر في الـ Admin Panel

**الحل:**
1. تحقق من إعدادات CORS في الـ backend
2. تأكد من أن `NEXT_PUBLIC_API_URL` صحيح في frontend

---

## التكاليف والحدود | Costs & Limits

### OpenAI DALL-E 3

| الخطة | التكلفة | الحد الأقصى |
|-------|---------|-------------|
| Free Trial | $5 رصيد مجاني | 125 صورة |
| Pay-as-you-go | $0.040/صورة | غير محدود |
| HD Quality | $0.080/صورة | غير محدود |

### نصائح لتقليل التكلفة:

1. ✅ استخدم Standard quality بدلاً من HD
2. ✅ راجع الصورة قبل التوليد مرة أخرى
3. ✅ احفظ الصور الجيدة لإعادة استخدامها
4. ✅ استخدم Stability AI كبديل أرخص ($0.002/صورة)

---

## البدائل | Alternatives

### Stability AI (أرخص)

إذا أردت استخدام Stability AI بدلاً من OpenAI:

```env
IMAGE_GENERATION_PROVIDER=stability
STABILITY_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**المميزات:**
- ✅ أرخص بكثير ($0.002/صورة)
- ✅ تحكم أكبر في المعاملات
- ✅ لا توجد قيود على المحتوى

**العيوب:**
- ❌ جودة أقل من DALL-E 3
- ❌ يحتاج ضبط معاملات أكثر

---

## الأمان | Security

### حماية API Keys

1. ✅ لا تشارك الـ API keys أبداً
2. ✅ استخدم `.env` ولا ترفعه على Git
3. ✅ قم بتدوير المفاتيح بشكل دوري
4. ✅ راقب الاستخدام في OpenAI Dashboard

### التحقق من الصلاحيات

الـ endpoint محمي بـ:
- ✅ Authentication (Sanctum)
- ✅ Admin role check
- ✅ Rate limiting

---

## التطوير المستقبلي | Future Enhancements

### مخطط للتحسينات:

1. **اختيار أنماط متعددة:**
   - إضافة واجهة لاختيار الأسلوب
   - معاينة أنماط مختلفة

2. **تحرير الصور:**
   - اقتصاص وتعديل الصور المولدة
   - إضافة نصوص وشعارات

3. **مكتبة الصور:**
   - حفظ الصور المولدة في مكتبة
   - إعادة استخدام الصور السابقة

4. **توليد متعدد:**
   - توليد 3-4 خيارات واختيار الأفضل
   - مقارنة الصور جنباً إلى جنب

---

## الدعم | Support

إذا واجهت أي مشاكل:

1. تحقق من الـ logs:
   ```bash
   tail -f storage/logs/laravel.log
   ```

2. تحقق من OpenAI Dashboard:
   - https://platform.openai.com/usage

3. اختبر الـ API مباشرة:
   ```bash
   curl -X POST https://backend.zynk-adv.com/api/v1/admin/posts/generate-image \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Test image", "style": "professional"}'
   ```

---

## الخلاصة | Summary

✅ **تم إضافة:**
- خدمة توليد صور AI كاملة
- واجهة مستخدم في Admin Panel
- API endpoint محمي
- دعم OpenAI DALL-E 3 و Stability AI
- تحسين تلقائي للـ prompts
- معالجة أخطاء شاملة

✅ **الخطوات التالية:**
1. أضف `OPENAI_API_KEY` في `.env`
2. أعد تشغيل الـ backend
3. جرب توليد صورة من Admin Panel
4. راقب التكاليف في OpenAI Dashboard

🎉 **الميزة جاهزة للاستخدام!**
