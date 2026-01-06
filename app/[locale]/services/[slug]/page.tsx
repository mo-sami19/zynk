import { servicesApi } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServiceDetailContent from './service-detail-content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
    const response = await servicesApi.getBySlug(params.slug);
    const serviceData = (response as any)?.data || response;
    const service = serviceData;
    
    if (!service) {
      return {
        title: 'Service Not Found',
        description: 'The requested service could not be found.'
      };
    }

    const locale = params.locale as 'en' | 'ar';
    
    // Extract title with multiple fallback options
    let title = '';
    if (service.seo?.meta_title) {
      title = typeof service.seo.meta_title === 'string' 
        ? service.seo.meta_title 
        : (service.seo.meta_title[locale] || service.seo.meta_title.en || service.seo.meta_title.ar);
    }
    if (!title && service.title) {
      title = typeof service.title === 'string' 
        ? service.title 
        : (service.title[locale] || service.title.en || service.title.ar);
    }
    if (!title) {
      title = locale === 'ar' ? 'خدمة' : 'Service';
    }
    
    // Extract description with multiple fallback options
    let description = '';
    if (service.seo?.meta_description) {
      description = typeof service.seo.meta_description === 'string'
        ? service.seo.meta_description
        : (service.seo.meta_description[locale] || service.seo.meta_description.en || service.seo.meta_description.ar);
    }
    if (!description && service.description) {
      description = typeof service.description === 'string'
        ? service.description
        : (service.description[locale] || service.description.en || service.description.ar);
    }
    
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
