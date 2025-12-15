import blogData from '@/data/blog.json';
import { postsApi } from '@/lib/api';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BlogPostContent from './blog-post-content';

// Generate static paths for local blog data
// API data will be fetched at runtime
export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug
  }));
}

// Enable dynamic rendering for API-based posts
export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
    // Fetch post data from API
    const response = await postsApi.getBySlug(params.slug);
    const post = response as any; // Use any to handle dynamic API response
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      };
    }

    // Get localized SEO data
    const locale = params.locale as 'en' | 'ar';
    const title = post.seo?.meta_title?.[locale] || post.title?.[locale] || post.title?.en || 'Blog Post';
    const description = post.seo?.meta_description?.[locale] || post.excerpt?.[locale] || post.excerpt?.en || '';
    const keywords = post.tags?.join(', ') || '';
    const thumbnail = typeof post.thumbnail === 'object' ? post.thumbnail.default : post.thumbnail;

    return {
      title,
      description,
      keywords,
      authors: post.author?.name ? [{ name: post.author.name }] : undefined,
      openGraph: {
        title: post.seo?.og_tags?.['og:title'] || title,
        description: post.seo?.og_tags?.['og:description'] || description,
        type: 'article',
        publishedTime: post.published_at,
        authors: post.author?.name ? [post.author.name] : undefined,
        tags: post.tags,
        images: thumbnail ? [{
          url: thumbnail,
          alt: title
        }] : undefined,
        locale: locale === 'ar' ? 'ar_SA' : 'en_US',
        alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seo?.og_tags?.['og:title'] || title,
        description: post.seo?.og_tags?.['og:description'] || description,
        images: thumbnail ? [thumbnail] : undefined,
      },
      alternates: {
        canonical: post.seo?.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${locale}/blog/${params.slug}`,
        languages: {
          'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/en/blog/${params.slug}`,
          'ar': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/ar/blog/${params.slug}`,
          'x-default': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/en/blog/${params.slug}`,
        }
      },
      other: {
        'article:published_time': post.published_at || '',
        'article:modified_time': post.updated_at || '',
        'article:author': post.author?.name || '',
        'article:section': post.category || '',
        'article:tag': post.tags?.join(', ') || '',
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post'
    };
  }
}

export default function BlogPostPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  return <BlogPostContent slug={slug} />;
}
