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
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'manifest', url: '/site.webmanifest' },
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
    title: 'ZYNK Advertising - Digital Marketing Agency in Egypt & Middle East | Arab World',
    description: 'ZYNK Advertising is a leading digital marketing and advertising agency serving Egypt, UAE, Saudi Arabia, and the entire Arab World. We deliver SEO, social media marketing, performance marketing, web development, and branding services across Cairo, Dubai, Riyadh, and the Middle East region.',
    keywords: 'ZYNK Advertising, digital marketing agency Egypt, advertising agency Middle East, social media marketing Arab World, SEO services UAE, performance marketing Saudi Arabia, branding agency GCC, web development Egypt, digital agency Dubai, marketing agency Cairo, advertising Riyadh, digital marketing Kuwait, marketing Qatar, advertising Bahrain, digital agency Oman, marketing Jordan, advertising Lebanon, digital marketing Morocco',
  },
  ar: {
    title: 'زينك للإعلان - وكالة التسويق الرقمي في مصر والشرق الأوسط | الوطن العربي',
    description: 'زينك للإعلان هي وكالة تسويق رقمي وإعلان رائدة تخدم مصر والإمارات والسعودية والوطن العربي بأكمله. نقدم خدمات تحسين محركات البحث، التسويق عبر وسائل التواصل الاجتماعي، التسويق بالأداء، تطوير المواقع، والعلامات التجارية في القاهرة ودبي والرياض ومنطقة الشرق الأوسط.',
    keywords: 'زينك للإعلان, وكالة تسويق رقمي مصر, وكالة إعلان الشرق الأوسط, تسويق وسائل التواصل الاجتماعي الوطن العربي, خدمات SEO الإمارات, تسويق بالأداء السعودية, وكالة علامات تجارية الخليج, تطوير مواقع مصر, وكالة رقمية دبي, وكالة تسويق القاهرة, إعلان الرياض, تسويق رقمي الكويت, تسويق قطر, إعلان البحرين, وكالة رقمية عمان, تسويق الأردن, إعلان لبنان, تسويق رقمي المغرب',
  },
};
