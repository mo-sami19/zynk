import { projectsApi } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProjectDetailContentClient from './project-detail-content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
    const response = await projectsApi.getBySlug(params.slug);
    const projectData = (response as any)?.data || response;
    const project = projectData;
    
    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.'
      };
    }

    const locale = params.locale as 'en' | 'ar';
    
    // Extract title with multiple fallback options
    let title = '';
    if (project.seo?.meta_title) {
      title = typeof project.seo.meta_title === 'string' 
        ? project.seo.meta_title 
        : (project.seo.meta_title[locale] || project.seo.meta_title.en || project.seo.meta_title.ar);
    }
    if (!title && project.title) {
      title = typeof project.title === 'string' 
        ? project.title 
        : (project.title[locale] || project.title.en || project.title.ar);
    }
    if (!title) {
      title = locale === 'ar' ? 'مشروع' : 'Project';
    }
    
    // Extract description with multiple fallback options
    let description = '';
    if (project.seo?.meta_description) {
      description = typeof project.seo.meta_description === 'string'
        ? project.seo.meta_description
        : (project.seo.meta_description[locale] || project.seo.meta_description.en || project.seo.meta_description.ar);
    }
    if (!description && project.description) {
      description = typeof project.description === 'string'
        ? project.description
        : (project.description[locale] || project.description.en || project.description.ar);
    }
    
    const keywords = project.tags?.join(', ') || '';
    const thumbnail = typeof project.thumbnail === 'object' ? project.thumbnail.default : project.thumbnail;

    return generatePageMetadata({
      locale,
      title,
      description,
      keywords,
      path: `/projects/${params.slug}`,
      image: thumbnail,
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Project',
      description: 'View our project case study'
    };
  }
}

export default function ProjectDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  return <ProjectDetailContentClient slug={slug} />;
}
