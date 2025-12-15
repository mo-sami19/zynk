import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AboutPageContent from './about-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'About Us - Zynk Digital Agency | Our Story & Mission'
    : 'من نحن - وكالة زينك الرقمية | قصتنا ورسالتنا';
  
  const description = locale === 'en'
    ? 'Learn about Zynk Digital Agency - a leading digital marketing company dedicated to helping businesses grow through innovative strategies, creative solutions, and data-driven results.'
    : 'تعرف على وكالة زينك الرقمية - شركة تسويق رقمي رائدة مكرسة لمساعدة الشركات على النمو من خلال استراتيجيات مبتكرة وحلول إبداعية ونتائج قائمة على البيانات.';
  
  const keywords = locale === 'en'
    ? 'about zynk, digital agency, marketing company, our team, our mission, digital marketing experts, agency story'
    : 'عن زينك, وكالة رقمية, شركة تسويق, فريقنا, رسالتنا, خبراء التسويق الرقمي, قصة الوكالة';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/about',
  });
}

export default function AboutPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <AboutPageContent />;
}
