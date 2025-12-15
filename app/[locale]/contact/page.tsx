import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ContactPageContent from './contact-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Contact Us - Get in Touch with Zynk Digital Agency'
    : 'اتصل بنا - تواصل مع وكالة زينك الرقمية';
  
  const description = locale === 'en'
    ? 'Ready to transform your digital presence? Contact Zynk Digital Agency today. Get a free consultation and discover how we can help your business grow online.'
    : 'هل أنت مستعد لتحويل حضورك الرقمي؟ اتصل بوكالة زينك الرقمية اليوم. احصل على استشارة مجانية واكتشف كيف يمكننا مساعدة عملك على النمو عبر الإنترنت.';
  
  const keywords = locale === 'en'
    ? 'contact zynk, get in touch, digital marketing consultation, free quote, contact agency, business inquiry'
    : 'اتصل بزينك, تواصل معنا, استشارة التسويق الرقمي, عرض سعر مجاني, الاتصال بالوكالة, استفسار تجاري';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/contact',
  });
}

export default function ContactPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <ContactPageContent />;
}
