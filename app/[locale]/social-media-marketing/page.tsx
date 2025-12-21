import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Social Media Marketing Egypt | ZYNK Advertising Cairo'
    : 'التسويق عبر وسائل التواصل الاجتماعي مصر | زينك للإعلان القاهرة';
  
  const description = locale === 'en'
    ? 'Expert social media marketing services in Egypt by ZYNK Advertising. We manage Facebook, Instagram, LinkedIn & Twitter campaigns for Egyptian businesses. Grow your brand presence in Cairo, Alexandria & across Egypt.'
    : 'خدمات تسويق احترافية عبر وسائل التواصل الاجتماعي في مصر من زينك للإعلان. نقوم بإدارة حملات فيسبوك وإنستجرام ولينكد إن وتويتر للشركات المصرية. نمِّ حضور علامتك التجارية في القاهرة والإسكندرية وجميع أنحاء مصر.';
  
  const keywords = locale === 'en'
    ? 'social media marketing Egypt, Facebook marketing Cairo, Instagram marketing Egypt, social media agency Egypt, social media management Cairo, ZYNK Advertising social media, digital marketing Egypt'
    : 'التسويق عبر وسائل التواصل الاجتماعي مصر, تسويق فيسبوك القاهرة, تسويق إنستجرام مصر, وكالة وسائل التواصل الاجتماعي مصر, إدارة وسائل التواصل الاجتماعي القاهرة, زينك للإعلان وسائل التواصل';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/social-media-marketing',
  });
}

export default function SocialMediaMarketingPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const isArabic = locale === 'ar';
  
  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {isArabic ? 'التسويق عبر وسائل التواصل الاجتماعي في مصر' : 'Social Media Marketing in Egypt'}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          {isArabic 
            ? 'زينك للإعلان - وكالتك المتخصصة في التسويق عبر وسائل التواصل الاجتماعي في مصر. نبني حضورًا قويًا لعلامتك التجارية على فيسبوك، إنستجرام، لينكد إن، وتويتر.'
            : 'ZYNK Advertising - Your specialized social media marketing agency in Egypt. We build a strong brand presence on Facebook, Instagram, LinkedIn, and Twitter.'}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>{isArabic ? 'خدمات وسائل التواصل الاجتماعي' : 'Social Media Services'}</h2>
          
          <h3>{isArabic ? 'إدارة حسابات وسائل التواصل الاجتماعي' : 'Social Media Account Management'}</h3>
          <p>
            {isArabic
              ? 'نقوم بإدارة حساباتك على جميع منصات التواصل الاجتماعي بشكل احترافي. من إنشاء المحتوى إلى التفاعل مع المتابعين وتحليل الأداء - نتعامل مع كل شيء.'
              : 'We professionally manage your accounts on all social media platforms. From content creation to follower engagement and performance analysis - we handle everything.'}
          </p>

          <h3>{isArabic ? 'إعلانات فيسبوك وإنستجرام' : 'Facebook & Instagram Advertising'}</h3>
          <p>
            {isArabic
              ? 'حملات إعلانية مستهدفة على فيسبوك وإنستجرام تصل إلى جمهورك المصري المثالي. نستخدم استراتيجيات متقدمة لتحقيق أفضل عائد على الاستثمار.'
              : 'Targeted advertising campaigns on Facebook and Instagram that reach your ideal Egyptian audience. We use advanced strategies to achieve the best ROI.'}
          </p>

          <h3>{isArabic ? 'إنشاء محتوى باللغتين' : 'Bilingual Content Creation'}</h3>
          <p>
            {isArabic
              ? 'نقوم بإنشاء محتوى جذاب باللغتين العربية والإنجليزية يتناسب مع جمهورك المصري. من التصاميم الجرافيكية إلى مقاطع الفيديو والنصوص الإبداعية.'
              : 'We create engaging content in both Arabic and English that resonates with your Egyptian audience. From graphic designs to videos and creative copy.'}
          </p>

          <h2>{isArabic ? 'المنصات التي نديرها' : 'Platforms We Manage'}</h2>
          <ul>
            <li><strong>Facebook:</strong> {isArabic ? 'المنصة الأكثر شعبية في مصر' : 'Most popular platform in Egypt'}</li>
            <li><strong>Instagram:</strong> {isArabic ? 'مثالي للعلامات التجارية البصرية' : 'Perfect for visual brands'}</li>
            <li><strong>LinkedIn:</strong> {isArabic ? 'للتسويق B2B والتوظيف' : 'For B2B marketing and recruitment'}</li>
            <li><strong>Twitter:</strong> {isArabic ? 'للأخبار والتفاعل الفوري' : 'For news and real-time engagement'}</li>
            <li><strong>TikTok:</strong> {isArabic ? 'للوصول إلى الجيل الشاب' : 'To reach younger generation'}</li>
          </ul>

          <div className="mt-8 p-6 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {isArabic ? 'ابدأ حملتك على وسائل التواصل الاجتماعي' : 'Start Your Social Media Campaign'}
            </h3>
            <Link 
              href={`/${locale}/contact`}
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {isArabic ? 'تواصل معنا الآن' : 'Contact Us Now'}
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            {isArabic ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href={`/${locale}/digital-marketing-egypt`} className="p-6 border rounded-lg hover:border-primary transition-colors">
              <h4 className="text-xl font-bold mb-2">
                {isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}
              </h4>
              <p className="text-muted-foreground">
                {isArabic ? 'استراتيجيات تسويق رقمي شاملة' : 'Comprehensive digital marketing strategies'}
              </p>
            </Link>
            
            <Link href={`/${locale}/performance-marketing`} className="p-6 border rounded-lg hover:border-primary transition-colors">
              <h4 className="text-xl font-bold mb-2">
                {isArabic ? 'التسويق بالأداء' : 'Performance Marketing'}
              </h4>
              <p className="text-muted-foreground">
                {isArabic ? 'حملات إعلانية مدفوعة تحقق النتائج' : 'Paid campaigns that deliver results'}
              </p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
