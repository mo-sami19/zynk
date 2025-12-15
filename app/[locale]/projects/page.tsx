import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProjectsPageContent from './projects-page-content';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  
  const title = locale === 'en' 
    ? 'Our Projects - Success Stories & Portfolio | Zynk'
    : 'مشاريعنا - قصص النجاح والمعرض | زينك';
  
  const description = locale === 'en'
    ? 'Discover our portfolio of successful digital marketing projects. See how we helped businesses achieve their goals through innovative strategies and creative solutions.'
    : 'اكتشف معرض مشاريع التسويق الرقمي الناجحة لدينا. شاهد كيف ساعدنا الشركات على تحقيق أهدافها من خلال استراتيجيات مبتكرة وحلول إبداعية.';
  
  const keywords = locale === 'en'
    ? 'portfolio, case studies, success stories, digital marketing projects, client work, marketing campaigns'
    : 'معرض الأعمال, دراسات الحالة, قصص النجاح, مشاريع التسويق الرقمي, أعمال العملاء, حملات التسويق';
  
  return generatePageMetadata({
    locale,
    title,
    description,
    keywords,
    path: '/projects',
  });
}

export default function ProjectsPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <ProjectsPageContent />;
}
