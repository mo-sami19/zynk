"use client"

import { Button } from '@/components/ui/button';
import blogData from '@/data/blog.json';
import { usePost, usePosts } from '@/lib/hooks';
import { getLocalizedText } from '@/lib/utils/localized';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Loader2, User } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import '../blog-content.css';

export default function BlogPostContent({ slug }: { slug: string }) {
  const locale = useLocale();
  const { data: apiPost, loading, error } = usePost(slug);
  const { data: apiPosts } = usePosts();
  
  // Use API data if available, fallback to local JSON
  const post = apiPost || blogData.find(p => p.slug === slug);
  const allPosts = apiPosts && apiPosts.length > 0 ? apiPosts : blogData;
  
  // Generate JSON-LD structured data for SEO
  const generateStructuredData = () => {
    if (!post) return null;
    
    const title = getLocalizedText(post.title, locale);
    const description = getLocalizedText(post.excerpt, locale) || (post as any).content ? getLocalizedText((post as any).content, locale)?.substring(0, 200) : '';
    const thumbnailUrl = typeof post.thumbnail === 'object' && post.thumbnail ? ((post.thumbnail as any).default || (post.thumbnail as any).webp) : post.thumbnail;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      image: thumbnailUrl ? [thumbnailUrl] : undefined,
      datePublished: (post as any).published_at || (post as any).date,
      dateModified: (post as any).updated_at || (post as any).published_at || (post as any).date,
      author: {
        '@type': 'Person',
        name: typeof post.author === 'object' ? post.author.name : post.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Zynk',
        logo: {
          '@type': 'ImageObject',
          url: 'http://localhost:3000/images/logo/zynk-logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `http://localhost:3000/${locale}/blog/${slug}`
      },
      keywords: (post as any).tags?.join(', '),
      articleSection: post.category,
      inLanguage: locale,
      wordCount: (post as any).content ? getLocalizedText((post as any).content, locale)?.split(' ').length : undefined
    };
  };

  // Show 404 if post not found
  useEffect(() => {
    if (!loading && !post) {
      notFound();
    }
  }, [loading, post]);
  
  if (loading) {
    return (
      <div className="w-full py-24">
        <div className="container mx-auto px-4 flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null; // Will be handled by useEffect -> notFound()
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
      
      <div className="w-full py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href={`/${locale}/blog`}>
            <Button variant="ghost" size="sm" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'en' ? 'Back to Blog' : 'العودة إلى المدونة'}
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="mb-6">
              <span className="px-4 py-2 rounded-full glass-card text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {getLocalizedText(post.title, locale)}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{typeof post.author === 'object' ? post.author.name : post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date((post as any).published_at || (post as any).date).toLocaleDateString(locale === 'en' ? 'en-US' : 'ar-SA')}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{(post as any).reading_time ? `${(post as any).reading_time} min` : (post as any).readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="h-96 rounded-3xl bg-gradient-neon relative overflow-hidden">
              {post.thumbnail ? (
                <Image
                  src={typeof post.thumbnail === 'object' && post.thumbnail ? ((post.thumbnail as any).default || (post.thumbnail as any).webp) : (post.thumbnail || '')}
                  alt={getLocalizedText(post.title, locale)}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
                  <div className="text-9xl font-bold text-white/20">
                    {post.category?.charAt(0).toUpperCase() || 'B'}
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-dark/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold">{post.category}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
          >
            {/* Excerpt - only show if not empty */}
            {post.excerpt && getLocalizedText(post.excerpt, locale) && (
              <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                {getLocalizedText(post.excerpt, locale)}
              </p>
            )}

            {/* Full Content from API */}
            {(post as any).content && (
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ 
                  __html: getLocalizedText((post as any).content, locale) 
                }}
              />
            )}

            {/* Tags */}
            {(post as any).tags && (post as any).tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {(post as any).tags.map((tag: string, idx: number) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-full glass-card text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'en' ? 'Related Articles' : 'مقالات ذات صلة'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Link key={relatedPost.id} href={`/${locale}/blog/${relatedPost.slug}`}>
                  <div className="glass-card p-6 rounded-xl hover:border-neon-purple/50 transition-all">
                    <div className="text-sm text-muted-foreground mb-2">{relatedPost.category}</div>
                    <h3 className="text-lg font-bold mb-2">
                      {getLocalizedText(relatedPost.title, locale)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getLocalizedText(relatedPost.excerpt, locale)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
