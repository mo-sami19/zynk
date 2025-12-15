import { servicesApi } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServiceDetailContent from './service-detail-content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
    const response = await servicesApi.getBySlug(params.slug);
    const service = response as any;
    
    if (!service) {
      return {
        title: 'Service Not Found',
        description: 'The requested service could not be found.'
      };
    }

    const locale = params.locale as 'en' | 'ar';
    const title = service.seo?.meta_title?.[locale] || service.title?.[locale] || service.title?.en || 'Service';
    const description = service.seo?.meta_description?.[locale] || service.description?.[locale] || service.description?.en || '';
    const keywords = service.tags?.join(', ') || '';
    const thumbnail = typeof service.thumbnail === 'object' ? service.thumbnail.default : service.thumbnail;

    return generatePageMetadata({
      locale,
      title,
      description,
      keywords,
      path: `/services/${params.slug}`,
      image: thumbnail,
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Service',
      description: 'Explore our digital marketing service'
    };
  }
}

export default function ServiceDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  return <ServiceDetailContent slug={slug} />;
}
