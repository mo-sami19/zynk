import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BlogPageContent from './blog-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const title = locale === 'en' ? 'Our Blog - Zynk' : 'مدونتنا - زينك';
  const description = locale === 'en' 
    ? 'Insights, tips, and strategies to help you succeed in digital marketing'
    : 'رؤى ونصائح واستراتيجيات لمساعدتك على النجاح في التسويق الرقمي';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'ar': `${baseUrl}/ar/blog`,
        'x-default': `${baseUrl}/en/blog`,
      }
    },
  };
}

export default function BlogPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <BlogPageContent />;
}
