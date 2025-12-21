import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Performance Marketing Cairo | PPC & Paid Ads Egypt | ZYNK Advertising'
    : 'التسويق بالأداء القاهرة | إعلانات مدفوعة مصر | زينك للإعلان';
  
  const description = locale === 'en'
    ? 'Results-driven performance marketing in Egypt by ZYNK Advertising. Expert Google Ads, Facebook Ads, and PPC campaigns in Cairo. Maximize ROI with data-driven paid advertising strategies for Egyptian businesses.'
    : 'تسويق بالأداء موجه بالنتائج في مصر من زينك للإعلان. خبراء في إعلانات جوجل وفيسبوك وحملات PPC في القاهرة. حقق أقصى عائد على الاستثمار من خلال استراتيجيات إعلانية مدفوعة مدفوعة بالبيانات للشركات المصرية.';
  
  const keywords = locale === 'en'
    ? 'performance marketing Egypt, PPC Cairo, Google Ads Egypt, Facebook Ads Cairo, paid advertising Egypt, performance marketing agency Cairo, ZYNK Advertising performance marketing, ROI marketing Egypt'
    : 'التسويق بالأداء مصر, PPC القاهرة, إعلانات جوجل مصر, إعلانات فيسبوك القاهرة, الإعلانات المدفوعة مصر, وكالة تسويق بالأداء القاهرة, زينك للإعلان التسويق بالأداء';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/performance-marketing',
  });
}

export default function PerformanceMarketingPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const isArabic = locale === 'ar';
  
  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {isArabic ? 'التسويق بالأداء في القاهرة' : 'Performance Marketing in Cairo'}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          {isArabic 
            ? 'زينك للإعلان - وكالة التسويق بالأداء الرائدة في مصر. نحقق نتائج قابلة للقياس من خلال حملات إعلانية مدفوعة مدفوعة بالبيانات على جوجل وفيسبوك ومنصات أخرى.'
            : 'ZYNK Advertising - Leading performance marketing agency in Egypt. We deliver measurable results through data-driven paid advertising campaigns on Google, Facebook, and other platforms.'}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>{isArabic ? 'ما هو التسويق بالأداء؟' : 'What is Performance Marketing?'}</h2>
          <p>
            {isArabic
              ? 'التسويق بالأداء هو نهج تسويق رقمي يركز على النتائج القابلة للقياس. تدفع فقط مقابل الإجراءات المحددة - مثل النقرات أو العملاء المحتملين أو المبيعات. في زينك للإعلان، نتخصص في إنشاء حملات عالية الأداء تحقق عائدًا إيجابيًا على الاستثمار للشركات المصرية.'
              : 'Performance marketing is a digital marketing approach focused on measurable results. You only pay for specific actions - like clicks, leads, or sales. At ZYNK Advertising, we specialize in creating high-performance campaigns that deliver positive ROI for Egyptian businesses.'}
          </p>

          <h2>{isArabic ? 'خدمات التسويق بالأداء لدينا' : 'Our Performance Marketing Services'}</h2>
          
          <h3>{isArabic ? '1. إعلانات جوجل (Google Ads)' : '1. Google Ads'}</h3>
          <p>
            {isArabic
              ? 'حملات إعلانات جوجل احترافية تستهدف العملاء المصريين الذين يبحثون بنشاط عن منتجاتك أو خدماتك. نقوم بتحسين حملات البحث والعرض وشبكة البحث للحصول على أفضل النتائج.'
              : 'Professional Google Ads campaigns targeting Egyptian customers actively searching for your products or services. We optimize search, display, and shopping campaigns for best results.'}
          </p>
          <ul>
            <li>{isArabic ? 'حملات إعلانات البحث (Search Ads)' : 'Search Ads campaigns'}</li>
            <li>{isArabic ? 'إعلانات العرض (Display Ads)' : 'Display Ads'}</li>
            <li>{isArabic ? 'إعلانات التسوق (Shopping Ads)' : 'Shopping Ads'}</li>
            <li>{isArabic ? 'إعلانات الفيديو على يوتيوب' : 'YouTube Video Ads'}</li>
            <li>{isArabic ? 'حملات إعادة الاستهداف' : 'Remarketing campaigns'}</li>
          </ul>

          <h3>{isArabic ? '2. إعلانات فيسبوك وإنستجرام' : '2. Facebook & Instagram Ads'}</h3>
          <p>
            {isArabic
              ? 'حملات إعلانية مستهدفة على فيسبوك وإنستجرام تصل إلى جمهورك المثالي في مصر. نستخدم خيارات الاستهداف المتقدمة لتحقيق أقصى عائد على الاستثمار.'
              : 'Targeted advertising campaigns on Facebook and Instagram that reach your ideal audience in Egypt. We use advanced targeting options to maximize ROI.'}
          </p>

          <h3>{isArabic ? '3. إعلانات لينكد إن (LinkedIn Ads)' : '3. LinkedIn Ads'}</h3>
          <p>
            {isArabic
              ? 'للشركات B2B في مصر، نقدم حملات إعلانية احترافية على لينكد إن تستهدف صناع القرار والمحترفين.'
              : 'For B2B companies in Egypt, we offer professional LinkedIn advertising campaigns targeting decision-makers and professionals.'}
          </p>

          <h2>{isArabic ? 'لماذا تختار زينك للإعلان للتسويق بالأداء؟' : 'Why Choose ZYNK Advertising for Performance Marketing?'}</h2>
          <ul>
            <li><strong>{isArabic ? 'خبرة محلية:' : 'Local Expertise:'}</strong> {isArabic ? 'نفهم السوق المصري وسلوك المستهلك' : 'We understand Egyptian market and consumer behavior'}</li>
            <li><strong>{isArabic ? 'مدفوع بالبيانات:' : 'Data-Driven:'}</strong> {isArabic ? 'كل قرار مبني على البيانات والتحليلات' : 'Every decision based on data and analytics'}</li>
            <li><strong>{isArabic ? 'شفافية كاملة:' : 'Full Transparency:'}</strong> {isArabic ? 'تقارير مفصلة وإمكانية الوصول إلى جميع البيانات' : 'Detailed reports and access to all data'}</li>
            <li><strong>{isArabic ? 'تحسين مستمر:' : 'Continuous Optimization:'}</strong> {isArabic ? 'نحسن الحملات باستمرار لتحسين الأداء' : 'We continuously optimize campaigns for better performance'}</li>
            <li><strong>{isArabic ? 'عائد استثمار مثبت:' : 'Proven ROI:'}</strong> {isArabic ? 'سجل حافل في تحقيق نتائج إيجابية' : 'Track record of delivering positive results'}</li>
          </ul>

          <h2>{isArabic ? 'عملية التسويق بالأداء لدينا' : 'Our Performance Marketing Process'}</h2>
          <ol>
            <li><strong>{isArabic ? 'التحليل والاستراتيجية:' : 'Analysis & Strategy:'}</strong> {isArabic ? 'نحلل عملك والمنافسين والجمهور المستهدف' : 'We analyze your business, competitors, and target audience'}</li>
            <li><strong>{isArabic ? 'إعداد الحملة:' : 'Campaign Setup:'}</strong> {isArabic ? 'نقوم بإنشاء حملات محسنة بالكامل' : 'We create fully optimized campaigns'}</li>
            <li><strong>{isArabic ? 'الإطلاق والمراقبة:' : 'Launch & Monitor:'}</strong> {isArabic ? 'نطلق الحملات ونراقب الأداء عن كثب' : 'We launch campaigns and closely monitor performance'}</li>
            <li><strong>{isArabic ? 'التحسين:' : 'Optimization:'}</strong> {isArabic ? 'نحسن باستمرار للحصول على نتائج أفضل' : 'We continuously optimize for better results'}</li>
            <li><strong>{isArabic ? 'التقارير:' : 'Reporting:'}</strong> {isArabic ? 'تقارير شفافة ومفصلة عن الأداء' : 'Transparent, detailed performance reports'}</li>
          </ol>

          <h2>{isArabic ? 'الصناعات التي نخدمها' : 'Industries We Serve'}</h2>
          <p>{isArabic ? 'نقدم خدمات التسويق بالأداء لمختلف الصناعات في مصر:' : 'We provide performance marketing services to various industries in Egypt:'}</p>
          <ul>
            <li>{isArabic ? 'التجارة الإلكترونية' : 'E-commerce'}</li>
            <li>{isArabic ? 'العقارات' : 'Real Estate'}</li>
            <li>{isArabic ? 'التعليم' : 'Education'}</li>
            <li>{isArabic ? 'الرعاية الصحية' : 'Healthcare'}</li>
            <li>{isArabic ? 'الضيافة والسياحة' : 'Hospitality & Tourism'}</li>
            <li>{isArabic ? 'الخدمات المالية' : 'Financial Services'}</li>
            <li>{isArabic ? 'B2B والخدمات المهنية' : 'B2B & Professional Services'}</li>
          </ul>

          <div className="mt-8 p-6 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {isArabic ? 'ابدأ حملة التسويق بالأداء الخاصة بك' : 'Start Your Performance Marketing Campaign'}
            </h3>
            <p className="mb-4">
              {isArabic
                ? 'هل أنت مستعد لتحقيق نتائج قابلة للقياس؟ تواصل مع زينك للإعلان اليوم.'
                : 'Ready to achieve measurable results? Contact ZYNK Advertising today.'}
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {isArabic ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
