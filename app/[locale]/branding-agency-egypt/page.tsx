import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Branding Agency Egypt | Brand Identity Design Cairo | ZYNK Advertising'
    : 'وكالة علامات تجارية مصر | تصميم هوية العلامة التجارية القاهرة | زينك للإعلان';
  
  const description = locale === 'en'
    ? 'Professional branding agency in Egypt by ZYNK Advertising. We create powerful brand identities, logos, and visual branding for Egyptian businesses in Cairo, Alexandria & across Egypt. Build a memorable brand that stands out.'
    : 'وكالة علامات تجارية احترافية في مصر من زينك للإعلان. نقوم بإنشاء هويات علامات تجارية قوية وشعارات وعلامات تجارية بصرية للشركات المصرية في القاهرة والإسكندرية وجميع أنحاء مصر. ابنِ علامة تجارية لا تُنسى تبرز.';
  
  const keywords = locale === 'en'
    ? 'branding agency Egypt, brand identity Cairo, logo design Egypt, visual branding Cairo, brand strategy Egypt, ZYNK Advertising branding, corporate identity Egypt, brand design Cairo'
    : 'وكالة علامات تجارية مصر, هوية العلامة التجارية القاهرة, تصميم شعار مصر, العلامات التجارية البصرية القاهرة, استراتيجية العلامة التجارية مصر, زينك للإعلان العلامات التجارية, الهوية المؤسسية مصر';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/branding-agency-egypt',
  });
}

export default function BrandingAgencyEgyptPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const isArabic = locale === 'ar';
  
  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {isArabic ? 'وكالة العلامات التجارية في مصر' : 'Branding Agency in Egypt'}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          {isArabic 
            ? 'زينك للإعلان - وكالة العلامات التجارية الرائدة في مصر. نساعد الشركات على بناء علامات تجارية قوية ومميزة تترك انطباعًا دائمًا في السوق المصري.'
            : 'ZYNK Advertising - Leading branding agency in Egypt. We help businesses build strong, distinctive brands that leave a lasting impression in the Egyptian market.'}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>{isArabic ? 'خدمات العلامات التجارية لدينا' : 'Our Branding Services'}</h2>
          
          <h3>{isArabic ? '1. استراتيجية العلامة التجارية' : '1. Brand Strategy'}</h3>
          <p>
            {isArabic
              ? 'نبدأ بفهم عميق لعملك والسوق المصري والجمهور المستهدف. نقوم بتطوير استراتيجية علامة تجارية شاملة تحدد موقع علامتك التجارية وقيمها وشخصيتها ورسالتها.'
              : 'We start with a deep understanding of your business, the Egyptian market, and target audience. We develop a comprehensive brand strategy that defines your brand positioning, values, personality, and messaging.'}
          </p>
          <ul>
            <li>{isArabic ? 'بحث السوق والمنافسين' : 'Market and competitor research'}</li>
            <li>{isArabic ? 'تحديد موقع العلامة التجارية' : 'Brand positioning'}</li>
            <li>{isArabic ? 'تطوير شخصية العلامة التجارية' : 'Brand personality development'}</li>
            <li>{isArabic ? 'استراتيجية الرسائل' : 'Messaging strategy'}</li>
          </ul>

          <h3>{isArabic ? '2. تصميم الشعار والهوية البصرية' : '2. Logo Design & Visual Identity'}</h3>
          <p>
            {isArabic
              ? 'نصمم شعارات فريدة ولا تُنسى تعكس جوهر علامتك التجارية. نقوم بإنشاء نظام هوية بصرية كامل يشمل الألوان والخطوط والأيقونات والعناصر الجرافيكية.'
              : 'We design unique, memorable logos that reflect your brand essence. We create a complete visual identity system including colors, fonts, icons, and graphic elements.'}
          </p>
          <ul>
            <li>{isArabic ? 'تصميم شعار احترافي' : 'Professional logo design'}</li>
            <li>{isArabic ? 'لوحة الألوان والطباعة' : 'Color palette and typography'}</li>
            <li>{isArabic ? 'أنماط وعناصر جرافيكية' : 'Patterns and graphic elements'}</li>
            <li>{isArabic ? 'دليل الهوية البصرية' : 'Visual identity guidelines'}</li>
          </ul>

          <h3>{isArabic ? '3. دليل العلامة التجارية' : '3. Brand Guidelines'}</h3>
          <p>
            {isArabic
              ? 'نقوم بإنشاء دليل شامل للعلامة التجارية يضمن الاتساق عبر جميع نقاط الاتصال. يتضمن هذا قواعد استخدام الشعار والألوان والخطوط ونبرة الصوت والمزيد.'
              : 'We create a comprehensive brand guideline that ensures consistency across all touchpoints. This includes logo usage rules, colors, fonts, tone of voice, and more.'}
          </p>

          <h3>{isArabic ? '4. المواد التسويقية' : '4. Marketing Collateral'}</h3>
          <p>
            {isArabic
              ? 'نصمم جميع المواد التسويقية التي تحتاجها علامتك التجارية - من بطاقات العمل إلى الكتيبات والعروض التقديمية ومواد التواصل الاجتماعي.'
              : 'We design all marketing materials your brand needs - from business cards to brochures, presentations, and social media materials.'}
          </p>
          <ul>
            <li>{isArabic ? 'بطاقات العمل والقرطاسية' : 'Business cards and stationery'}</li>
            <li>{isArabic ? 'الكتيبات والنشرات' : 'Brochures and flyers'}</li>
            <li>{isArabic ? 'قوالب العروض التقديمية' : 'Presentation templates'}</li>
            <li>{isArabic ? 'قوالب وسائل التواصل الاجتماعي' : 'Social media templates'}</li>
            <li>{isArabic ? 'التغليف والملصقات' : 'Packaging and labels'}</li>
          </ul>

          <h3>{isArabic ? '5. العلامات التجارية الرقمية' : '5. Digital Branding'}</h3>
          <p>
            {isArabic
              ? 'نضمن أن علامتك التجارية تبرز في العالم الرقمي. من تصميم المواقع إلى وسائل التواصل الاجتماعي - نطبق هويتك البصرية بشكل متسق عبر جميع القنوات الرقمية.'
              : 'We ensure your brand stands out in the digital world. From website design to social media - we apply your visual identity consistently across all digital channels.'}
          </p>

          <h2>{isArabic ? 'لماذا العلامة التجارية القوية مهمة في مصر؟' : 'Why Strong Branding Matters in Egypt?'}</h2>
          <p>
            {isArabic
              ? 'في السوق المصري التنافسي، العلامة التجارية القوية هي ما يميزك عن المنافسين. علامة تجارية جيدة التصميم:'
              : 'In the competitive Egyptian market, a strong brand is what sets you apart from competitors. A well-designed brand:'}
          </p>
          <ul>
            <li>{isArabic ? 'تبني الثقة والمصداقية' : 'Builds trust and credibility'}</li>
            <li>{isArabic ? 'تخلق التعرف والتذكر' : 'Creates recognition and recall'}</li>
            <li>{isArabic ? 'تميزك عن المنافسين' : 'Differentiates you from competitors'}</li>
            <li>{isArabic ? 'تجذب العملاء المناسبين' : 'Attracts the right customers'}</li>
            <li>{isArabic ? 'تزيد من قيمة عملك' : 'Increases your business value'}</li>
          </ul>

          <h2>{isArabic ? 'خبرتنا في العلامات التجارية المصرية' : 'Our Egyptian Branding Expertise'}</h2>
          <p>
            {isArabic
              ? 'كوكالة علامات تجارية مقرها في القاهرة، نفهم:'
              : 'As a Cairo-based branding agency, we understand:'}
          </p>
          <ul>
            <li>{isArabic ? 'التفضيلات الثقافية المصرية' : 'Egyptian cultural preferences'}</li>
            <li>{isArabic ? 'اتجاهات التصميم المحلية' : 'Local design trends'}</li>
            <li>{isArabic ? 'التصميم ثنائي اللغة (عربي/إنجليزي)' : 'Bilingual design (Arabic/English)'}</li>
            <li>{isArabic ? 'توقعات المستهلك المصري' : 'Egyptian consumer expectations'}</li>
            <li>{isArabic ? 'معايير الصناعة المحلية' : 'Local industry standards'}</li>
          </ul>

          <h2>{isArabic ? 'عملية العلامات التجارية لدينا' : 'Our Branding Process'}</h2>
          <ol>
            <li><strong>{isArabic ? 'الاكتشاف:' : 'Discovery:'}</strong> {isArabic ? 'نتعلم عن عملك وأهدافك وجمهورك' : 'We learn about your business, goals, and audience'}</li>
            <li><strong>{isArabic ? 'البحث:' : 'Research:'}</strong> {isArabic ? 'نحلل السوق والمنافسين والاتجاهات' : 'We analyze market, competitors, and trends'}</li>
            <li><strong>{isArabic ? 'الاستراتيجية:' : 'Strategy:'}</strong> {isArabic ? 'نطور استراتيجية علامة تجارية شاملة' : 'We develop comprehensive brand strategy'}</li>
            <li><strong>{isArabic ? 'التصميم:' : 'Design:'}</strong> {isArabic ? 'نقوم بإنشاء هويتك البصرية' : 'We create your visual identity'}</li>
            <li><strong>{isArabic ? 'التطوير:' : 'Development:'}</strong> {isArabic ? 'نصمم جميع المواد التسويقية' : 'We design all marketing materials'}</li>
            <li><strong>{isArabic ? 'التسليم:' : 'Delivery:'}</strong> {isArabic ? 'نقدم دليل العلامة التجارية الكامل وجميع الملفات' : 'We deliver complete brand guideline and all files'}</li>
          </ol>

          <h2>{isArabic ? 'الصناعات التي نخدمها' : 'Industries We Serve'}</h2>
          <p>{isArabic ? 'نقدم خدمات العلامات التجارية لمختلف الصناعات في مصر:' : 'We provide branding services to various industries in Egypt:'}</p>
          <ul>
            <li>{isArabic ? 'التكنولوجيا والشركات الناشئة' : 'Technology & Startups'}</li>
            <li>{isArabic ? 'العقارات والتطوير' : 'Real Estate & Development'}</li>
            <li>{isArabic ? 'الضيافة والمطاعم' : 'Hospitality & Restaurants'}</li>
            <li>{isArabic ? 'التجزئة والتجارة الإلكترونية' : 'Retail & E-commerce'}</li>
            <li>{isArabic ? 'الرعاية الصحية والعافية' : 'Healthcare & Wellness'}</li>
            <li>{isArabic ? 'التعليم والتدريب' : 'Education & Training'}</li>
            <li>{isArabic ? 'الخدمات المهنية' : 'Professional Services'}</li>
          </ul>

          <div className="mt-8 p-6 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {isArabic ? 'ابنِ علامة تجارية قوية مع زينك للإعلان' : 'Build a Strong Brand with ZYNK Advertising'}
            </h3>
            <p className="mb-4">
              {isArabic
                ? 'هل أنت مستعد لإنشاء علامة تجارية تبرز في السوق المصري؟ تواصل معنا اليوم.'
                : 'Ready to create a brand that stands out in the Egyptian market? Contact us today.'}
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {isArabic ? 'ابدأ مشروع العلامة التجارية الخاص بك' : 'Start Your Branding Project'}
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            {isArabic ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href={`/${locale}/services/web-development`} className="p-6 border rounded-lg hover:border-primary transition-colors">
              <h4 className="text-xl font-bold mb-2">
                {isArabic ? 'تطوير المواقع' : 'Web Development'}
              </h4>
              <p className="text-muted-foreground">
                {isArabic ? 'مواقع ويب تعكس هوية علامتك التجارية' : 'Websites that reflect your brand identity'}
              </p>
            </Link>
            
            <Link href={`/${locale}/digital-marketing-egypt`} className="p-6 border rounded-lg hover:border-primary transition-colors">
              <h4 className="text-xl font-bold mb-2">
                {isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}
              </h4>
              <p className="text-muted-foreground">
                {isArabic ? 'روّج لعلامتك التجارية الجديدة' : 'Promote your new brand'}
              </p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
