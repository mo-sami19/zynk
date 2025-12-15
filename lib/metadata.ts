import { Metadata } from 'next';

interface MetadataParams {
  locale: 'en' | 'ar';
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generatePageMetadata({
  locale,
  title,
  description,
  path = '',
  image,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: MetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zynk-adv.com';
  const fullUrl = `${baseUrl}/${locale}${path}`;
  const defaultImage = `${baseUrl}/images/logo/zynk-logo.png`;
  const ogImage = image || defaultImage;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    authors: authors?.map(name => ({ name })),
    icons: {
      icon: [
        { url: '/zynk.png', type: 'image/png' },
      ],
      apple: [
        { url: '/zynk.png', type: 'image/png' },
      ],
    },
    openGraph: {
      title,
      description,
      type,
      url: fullUrl,
      siteName: 'Zynk Digital Agency',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@zynk_adv',
      site: '@zynk_adv',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'ar': `${baseUrl}/ar${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors || [],
      tags: tags || [],
    };
  }

  return metadata;
}

export const defaultMetadata = {
  en: {
    title: 'Zynk - Digital Marketing Agency | Think Big, Zynk Bigger',
    description: 'Transform your digital presence with Zynk. We offer comprehensive digital marketing solutions including SEO, social media marketing, web development, and branding services.',
    keywords: 'digital marketing, SEO, social media marketing, web development, branding, content marketing, digital agency, marketing strategy',
  },
  ar: {
    title: 'زينك - وكالة التسويق الرقمي | فكر كبير، زينك أكبر',
    description: 'حوّل حضورك الرقمي مع زينك. نقدم حلول تسويق رقمي شاملة تشمل تحسين محركات البحث، التسويق عبر وسائل التواصل الاجتماعي، تطوير المواقع، وخدمات العلامات التجارية.',
    keywords: 'التسويق الرقمي, تحسين محركات البحث, التسويق عبر وسائل التواصل الاجتماعي, تطوير المواقع, العلامات التجارية, تسويق المحتوى, وكالة رقمية, استراتيجية التسويق',
  },
};
