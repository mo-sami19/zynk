import { projectsApi } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProjectDetailContentClient from './project-detail-content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
    const response = await projectsApi.getBySlug(params.slug);
    const project = response as any;
    
    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.'
      };
    }

    const locale = params.locale as 'en' | 'ar';
    const title = project.seo?.meta_title?.[locale] || project.title?.[locale] || project.title?.en || 'Project';
    const description = project.seo?.meta_description?.[locale] || project.description?.[locale] || project.description?.en || '';
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
