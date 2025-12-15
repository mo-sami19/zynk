import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServicesPageContent from './services-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Our Services - Digital Marketing Solutions | Zynk'
    : 'خدماتنا - حلول التسويق الرقمي | زينك';
  
  const description = locale === 'en'
    ? 'Explore our comprehensive digital marketing services: SEO, social media marketing, web development, content creation, branding, and more. Tailored solutions for your business growth.'
    : 'استكشف خدمات التسويق الرقمي الشاملة لدينا: تحسين محركات البحث، التسويق عبر وسائل التواصل الاجتماعي، تطوير المواقع، إنشاء المحتوى، العلامات التجارية، والمزيد. حلول مخصصة لنمو عملك.';
  
  const keywords = locale === 'en'
    ? 'digital marketing services, SEO services, social media marketing, web development, content marketing, branding services, digital solutions'
    : 'خدمات التسويق الرقمي, خدمات تحسين محركات البحث, التسويق عبر وسائل التواصل الاجتماعي, تطوير المواقع, تسويق المحتوى, خدمات العلامات التجارية, الحلول الرقمية';
  
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
