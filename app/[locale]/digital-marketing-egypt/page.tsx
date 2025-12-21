import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Digital Marketing Services in Egypt | ZYNK Advertising Cairo'
    : 'خدمات التسويق الرقمي في مصر | زينك للإعلان القاهرة';
  
  const description = locale === 'en'
    ? 'ZYNK Advertising offers comprehensive digital marketing services across Egypt, UAE, Saudi Arabia, and the Arab World. From SEO to social media marketing, performance marketing, web development, and branding - we help businesses grow online in Cairo, Dubai, Riyadh, and throughout the Middle East region.'
    : 'تقدم زينك للإعلان خدمات تسويق رقمي شاملة في مصر والإمارات والسعودية والوطن العربي. من تحسين محركات البحث إلى التسويق عبر وسائل التواصل الاجتماعي، التسويق بالأداء، تطوير المواقع، والعلامات التجارية - نساعد الشركات على النمو عبر الإنترنت في القاهرة ودبي والرياض وفي جميع أنحاء منطقة الشرق الأوسط.';
  
  const keywords = locale === 'en'
    ? 'digital marketing Egypt, digital marketing agency Cairo, online marketing Egypt, digital marketing services Egypt, social media marketing Egypt, SEO Egypt, performance marketing Cairo, ZYNK Advertising Egypt'
    : 'التسويق الرقمي مصر, وكالة تسويق رقمي القاهرة, التسويق الإلكتروني مصر, خدمات التسويق الرقمي مصر, تسويق وسائل التواصل الاجتماعي مصر, SEO مصر, تسويق الأداء القاهرة, زينك للإعلان مصر';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/digital-marketing-egypt',
  });
}

export default function DigitalMarketingEgyptPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const isArabic = locale === 'ar';
  
  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {isArabic ? 'خدمات التسويق الرقمي في مصر' : 'Digital Marketing Services in Egypt'}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          {isArabic 
            ? 'زينك للإعلان - شريكك الموثوق للتسويق الرقمي في مصر. نساعد الشركات على النمو من خلال استراتيجيات تسويقية مبتكرة ومدفوعة بالنتائج.'
            : 'ZYNK Advertising - Your trusted digital marketing partner in Egypt. We help businesses grow through innovative, results-driven marketing strategies.'}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>{isArabic ? 'لماذا تختار زينك للإعلان؟' : 'Why Choose ZYNK Advertising?'}</h2>
          <p>
            {isArabic
              ? 'في زينك للإعلان، نفهم السوق المصري والشرق أوسطي. نحن وكالة تسويق رقمي متكاملة الخدمات مقرها في القاهرة، متخصصة في مساعدة الشركات على تحقيق أهدافها الرقمية من خلال استراتيجيات مخصصة وقائمة على البيانات.'
              : 'At ZYNK Advertising, we understand the Egyptian and Middle Eastern market. We are a full-service digital marketing agency based in Cairo, specializing in helping businesses achieve their digital goals through customized, data-driven strategies.'}
          </p>

          <h2>{isArabic ? 'خدماتنا الرقمية' : 'Our Digital Services'}</h2>
          
          <h3>{isArabic ? '1. تحسين محركات البحث (SEO)' : '1. Search Engine Optimization (SEO)'}</h3>
          <p>
            {isArabic
              ? 'نحسن ظهور موقعك في نتائج البحث على جوجل ومحركات البحث الأخرى. خدماتنا تشمل البحث عن الكلمات المفتاحية، التحسين التقني، بناء الروابط، وتحسين المحتوى لزيادة حركة المرور العضوية.'
              : 'We improve your website visibility in Google and other search engines. Our services include keyword research, technical optimization, link building, and content optimization to increase organic traffic.'}
          </p>
          <ul>
            <li>{isArabic ? 'بحث وتحليل الكلمات المفتاحية للسوق المصري' : 'Keyword research and analysis for Egyptian market'}</li>
            <li>{isArabic ? 'تحسين تقني شامل للموقع' : 'Comprehensive technical SEO'}</li>
            <li>{isArabic ? 'استراتيجيات بناء الروابط المحلية' : 'Local link building strategies'}</li>
            <li>{isArabic ? 'تحسين محركات البحث المحلية للقاهرة والإسكندرية' : 'Local SEO for Cairo and Alexandria'}</li>
          </ul>

          <h3>{isArabic ? '2. التسويق عبر وسائل التواصل الاجتماعي' : '2. Social Media Marketing'}</h3>
          <p>
            {isArabic
              ? 'نبني حضورًا قويًا لعلامتك التجارية على فيسبوك، إنستجرام، لينكد إن، وتويتر. نقوم بإنشاء محتوى جذاب، وإدارة المجتمعات، وتشغيل حملات إعلانية مستهدفة للوصول إلى جمهورك المصري.'
              : 'We build a strong brand presence on Facebook, Instagram, LinkedIn, and Twitter. We create engaging content, manage communities, and run targeted ad campaigns to reach your Egyptian audience.'}
          </p>
          <ul>
            <li>{isArabic ? 'إدارة حسابات وسائل التواصل الاجتماعي' : 'Social media account management'}</li>
            <li>{isArabic ? 'إنشاء محتوى باللغتين العربية والإنجليزية' : 'Content creation in Arabic and English'}</li>
            <li>{isArabic ? 'إعلانات فيسبوك وإنستجرام المستهدفة' : 'Targeted Facebook and Instagram ads'}</li>
            <li>{isArabic ? 'تحليل الأداء والتقارير الشهرية' : 'Performance analytics and monthly reporting'}</li>
          </ul>

          <h3>{isArabic ? '3. التسويق بالأداء' : '3. Performance Marketing'}</h3>
          <p>
            {isArabic
              ? 'حملات إعلانية مدفوعة تركز على النتائج. نقوم بتشغيل حملات Google Ads، وإعلانات فيسبوك، وإعلانات العرض لتحقيق أهداف عملك - سواء كانت مبيعات، عملاء محتملين، أو وعي بالعلامة التجارية.'
              : 'Results-focused paid advertising campaigns. We run Google Ads, Facebook Ads, and display advertising to achieve your business goals - whether sales, leads, or brand awareness.'}
          </p>

          <h3>{isArabic ? '4. تطوير المواقع الإلكترونية' : '4. Web Development'}</h3>
          <p>
            {isArabic
              ? 'نصمم ونطور مواقع ويب سريعة وآمنة ومتجاوبة تحول الزوار إلى عملاء. من المواقع المؤسسية إلى منصات التجارة الإلكترونية - نبني حلولًا رقمية تدعم نمو عملك.'
              : 'We design and develop fast, secure, and responsive websites that convert visitors into customers. From corporate websites to e-commerce platforms - we build digital solutions that support your business growth.'}
          </p>

          <h3>{isArabic ? '5. العلامات التجارية والهوية البصرية' : '5. Branding & Visual Identity'}</h3>
          <p>
            {isArabic
              ? 'نساعدك في بناء علامة تجارية قوية ومميزة. من تصميم الشعار إلى دليل الهوية البصرية الكامل - نضمن أن علامتك التجارية تبرز في السوق المصري التنافسي.'
              : 'We help you build a strong and distinctive brand. From logo design to complete visual identity guidelines - we ensure your brand stands out in the competitive Egyptian market.'}
          </p>

          <h2>{isArabic ? 'خبرتنا في السوق المصري' : 'Our Egyptian Market Expertise'}</h2>
          <p>
            {isArabic
              ? 'كوكالة تسويق رقمي مقرها في القاهرة، نفهم تمامًا:'
              : 'As a Cairo-based digital marketing agency, we fully understand:'}
          </p>
          <ul>
            <li>{isArabic ? 'سلوك المستهلك المصري والتفضيلات الثقافية' : 'Egyptian consumer behavior and cultural preferences'}</li>
            <li>{isArabic ? 'المنافسة المحلية واتجاهات السوق' : 'Local competition and market trends'}</li>
            <li>{isArabic ? 'أفضل منصات التواصل الاجتماعي للجمهور المصري' : 'Best social media platforms for Egyptian audience'}</li>
            <li>{isArabic ? 'استراتيجيات المحتوى باللغتين العربية والإنجليزية' : 'Content strategies in both Arabic and English'}</li>
            <li>{isArabic ? 'التسويق المحلي للقاهرة والإسكندرية والجيزة' : 'Local marketing for Cairo, Alexandria, and Giza'}</li>
          </ul>

          <h2>{isArabic ? 'المناطق التي نخدمها' : 'Areas We Serve'}</h2>
          <p>
            {isArabic
              ? 'نقدم خدمات التسويق الرقمي في جميع أنحاء مصر، بما في ذلك:'
              : 'We provide digital marketing services throughout Egypt, including:'}
          </p>
          <ul>
            <li>{isArabic ? 'القاهرة الكبرى' : 'Greater Cairo'}</li>
            <li>{isArabic ? 'الإسكندرية' : 'Alexandria'}</li>
            <li>{isArabic ? 'الجيزة' : 'Giza'}</li>
            <li>{isArabic ? 'المدن الجديدة (التجمع الخامس، الشيخ زايد، 6 أكتوبر)' : 'New Cities (New Cairo, Sheikh Zayed, 6th of October)'}</li>
            <li>{isArabic ? 'جميع المحافظات المصرية' : 'All Egyptian governorates'}</li>
          </ul>

          <h2>{isArabic ? 'ابدأ رحلتك الرقمية اليوم' : 'Start Your Digital Journey Today'}</h2>
          <p>
            {isArabic
              ? 'هل أنت مستعد لتنمية عملك في مصر؟ تواصل مع زينك للإعلان اليوم للحصول على استشارة مجانية. دعنا نساعدك في بناء استراتيجية تسويق رقمي تحقق نتائج حقيقية.'
              : 'Ready to grow your business in Egypt? Contact ZYNK Advertising today for a free consultation. Let us help you build a digital marketing strategy that delivers real results.'}
          </p>

          <div className="mt-8 p-6 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {isArabic ? 'تواصل مع زينك للإعلان' : 'Contact ZYNK Advertising'}
            </h3>
            <p className="mb-4">
              {isArabic
                ? 'وكالة التسويق الرقمي الرائدة في مصر'
                : 'Leading Digital Marketing Agency in Egypt'}
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {isArabic ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
            </Link>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link href={`/${locale}/services/seo`} className="p-6 border rounded-lg hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">
              {isArabic ? 'خدمات SEO' : 'SEO Services'}
            </h3>
            <p className="text-muted-foreground">
              {isArabic ? 'تحسين محركات البحث في مصر' : 'Search engine optimization in Egypt'}
            </p>
          </Link>
          
          <Link href={`/${locale}/services/digital-marketing`} className="p-6 border rounded-lg hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">
              {isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}
            </h3>
            <p className="text-muted-foreground">
              {isArabic ? 'استراتيجيات تسويق شاملة' : 'Comprehensive marketing strategies'}
            </p>
          </Link>
          
          <Link href={`/${locale}/services/web-development`} className="p-6 border rounded-lg hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">
              {isArabic ? 'تطوير المواقع' : 'Web Development'}
            </h3>
            <p className="text-muted-foreground">
              {isArabic ? 'مواقع احترافية ومتجاوبة' : 'Professional responsive websites'}
            </p>
          </Link>
        </div>
      </article>
    </div>
  );
}
