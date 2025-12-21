import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServicesPageContent from './services-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Digital Marketing Services Egypt | ZYNK Advertising Cairo'
    : 'خدمات التسويق الرقمي مصر | زينك للإعلان القاهرة';
  
  const description = locale === 'en'
    ? 'ZYNK Advertising offers comprehensive digital marketing services in Egypt: SEO, social media marketing, performance marketing, web development, branding, and content creation. Professional solutions for Egyptian businesses in Cairo, Alexandria & beyond.'
    : 'تقدم زينك للإعلان خدمات تسويق رقمي شاملة في مصر: تحسين محركات البحث، التسويق عبر وسائل التواصل الاجتماعي، التسويق بالأداء، تطوير المواقع، العلامات التجارية، وإنشاء المحتوى. حلول احترافية للشركات المصرية في القاهرة والإسكندرية وما بعدها.';
  
  const keywords = locale === 'en'
    ? 'digital marketing services Egypt, SEO services Cairo, social media marketing Egypt, web development Cairo, branding agency Egypt, ZYNK Advertising services, performance marketing Egypt, content marketing Cairo'
    : 'خدمات التسويق الرقمي مصر, خدمات SEO القاهرة, التسويق عبر وسائل التواصل الاجتماعي مصر, تطوير المواقع القاهرة, وكالة علامات تجارية مصر, خدمات زينك للإعلان, التسويق بالأداء مصر, تسويق المحتوى القاهرة';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/services',
  });
}

export default function ServicesPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <ServicesPageContent />;
}
