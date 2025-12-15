import { defaultMetadata, generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomePageContent from './home-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  const metadata = defaultMetadata[locale];
  
  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: '',
  });
}

export default function HomePage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <HomePageContent />;
}
