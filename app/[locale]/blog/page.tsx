"use client"

import blogData from '@/data/blog.json';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function BlogPage() {
  const locale = useLocale();

  return (
    <div className="w-full py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {locale === 'en' ? 'Our Blog' : 'مدونتنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {locale === 'en' 
              ? 'Insights, tips, and strategies to help you succeed in digital marketing'
              : 'رؤى ونصائح واستراتيجيات لمساعدتك على النجاح في التسويق الرقمي'
            }
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="glass-card rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all group cursor-pointer h-full flex flex-col">
                  {/* Post Image Placeholder */}
                  <div className="h-48 bg-gradient-neon relative overflow-hidden">
                    <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-all flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <div className="text-sm font-medium">{post.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* Post Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title[locale as 'en' | 'ar']}
                    </h3>

                    <p className="text-muted-foreground mb-4 flex-1">
                      {post.excerpt[locale as 'en' | 'ar']}
                    </p>

                    <div className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'By' : 'بواسطة'} {post.author}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
