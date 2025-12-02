"use client"

import { Button } from '@/components/ui/button';
import blogData from '@/data/blog.json';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const post = blogData.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
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
              {post.title[locale as 'en' | 'ar']}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString(locale)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
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
            <p className="text-xl leading-relaxed text-muted-foreground">
              {post.excerpt[locale as 'en' | 'ar']}
            </p>

            <div className="my-8 glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">
                {locale === 'en' ? 'Key Takeaways' : 'النقاط الرئيسية'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'en'
                  ? 'This article provides comprehensive insights into the latest trends and best practices in digital marketing.'
                  : 'تقدم هذه المقالة رؤى شاملة حول أحدث الاتجاهات وأفضل الممارسات في التسويق الرقمي.'
                }
              </p>
            </div>
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
              {blogData.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Link key={relatedPost.id} href={`/${locale}/blog/${relatedPost.slug}`}>
                  <div className="glass-card p-6 rounded-xl hover:border-neon-purple/50 transition-all">
                    <div className="text-sm text-muted-foreground mb-2">{relatedPost.category}</div>
                    <h3 className="text-lg font-bold mb-2">
                      {relatedPost.title[locale as 'en' | 'ar']}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {relatedPost.excerpt[locale as 'en' | 'ar']}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
