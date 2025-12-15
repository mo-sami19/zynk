"use client"

import { Button } from '@/components/ui/button';
import blogData from '@/data/blog.json';
import { usePosts } from '@/lib/hooks';
import { getLocalizedText } from '@/lib/utils/localized';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, Filter, Loader2, Search, Tag } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function BlogPageContent() {
  const locale = useLocale();
  const { data: apiPosts, loading, error } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use API data if available, fallback to local JSON
  const posts = apiPosts && apiPosts.length > 0 ? apiPosts : blogData;
  
  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    posts.forEach((post: any) => {
      if (post.category) {
        uniqueCategories.add(post.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [posts]);
  
  // Filter posts by category and search term
  const filteredPosts = useMemo(() => {
    return posts.filter((post: any) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const title = getLocalizedText(post.title, locale).toLowerCase();
      const excerpt = getLocalizedText(post.excerpt, locale).toLowerCase();
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm.toLowerCase()) || 
        excerpt.includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm, locale]);
  
  // Get featured post (most viewed or first post)
  const featuredPost = useMemo(() => {
    if (posts.length === 0) return null;
    // Find post with most views or first post
    return posts.reduce((featured: any, post: any) => {
      if (!featured || (post.views && post.views > (featured.views || 0))) {
        return post;
      }
      return featured;
    }, null) || posts[0];
  }, [posts]);

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
        
        {/* Featured Post */}
        {!loading && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Featured Image */}
                <div className="h-80 lg:h-auto bg-gradient-neon relative overflow-hidden">
                  {featuredPost.thumbnail ? (
                    <Image 
                      src={typeof featuredPost.thumbnail === 'object' && featuredPost.thumbnail ? (featuredPost.thumbnail.default || featuredPost.thumbnail.webp) : (featuredPost.thumbnail || '')}
                      alt={getLocalizedText(featuredPost.title, locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
                      <div className="text-9xl font-bold text-white/20">
                        {featuredPost.category?.charAt(0).toUpperCase() || 'F'}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-dark/40 flex items-center justify-center">
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 rounded-full bg-primary/80 text-white text-sm font-medium">
                        {locale === 'en' ? 'Featured' : 'مميز'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Featured Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full glass-card text-sm font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {getLocalizedText(featuredPost.title, locale)}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {getLocalizedText(featuredPost.excerpt, locale)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.published_at || featuredPost.date).toLocaleDateString(locale)}</span>
                      </div>
                      {(featuredPost.reading_time || featuredPost.readTime) && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.reading_time ? `${featuredPost.reading_time} min` : featuredPost.readTime}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                      <Button variant="neon" size="sm">
                        {locale === 'en' ? 'Read Article' : 'اقرأ المقال'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={locale === 'en' ? 'Search articles...' : 'ابحث عن مقالات...'}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <Button
                variant={selectedCategory === null ? 'neon' : 'glass'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {locale === 'en' ? 'All' : 'الكل'}
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'neon' : 'glass'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Blog Grid */}
        {!loading && (
          <>
            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-16"
                >
                  <p className="text-xl text-muted-foreground">
                    {locale === 'en' ? 'No articles found' : 'لم يتم العثور على مقالات'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPosts.map((post: any, index: number) => {
                  // Don't skip featured post - show all posts
                  // if (featuredPost && post.id === featuredPost.id) return null;
                  const title = getLocalizedText(post.title, locale);
                  const excerpt = getLocalizedText(post.excerpt, locale);
                  const date = post.published_at || post.date;
                  const readTime = post.reading_time ? `${post.reading_time} min` : post.readTime;
                  const authorName = post.author?.name || post.author;
                  const thumbnailUrl = post.thumbnail && typeof post.thumbnail === 'object' ? (post.thumbnail.default || post.thumbnail.webp) : post.thumbnail;
                  
                  return (
                <motion.div
                  key={post.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <div className="glass-card rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all group cursor-pointer h-full flex flex-col">
                      {/* Post Image */}
                      <div className="h-48 bg-gradient-neon relative overflow-hidden">
                        {thumbnailUrl ? (
                          <Image 
                            src={thumbnailUrl} 
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                            <div className="text-6xl font-bold text-white/30">
                              {post.category?.charAt(0).toUpperCase() || 'B'}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-all flex items-center justify-center">
                          <div className="text-center text-white p-4">
                            <div className="text-sm font-medium">{post.category}</div>
                          </div>
                        </div>
                      </div>

                      {/* Post Info */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          {date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(date).toLocaleDateString(locale)}</span>
                            </div>
                          )}
                          {readTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{readTime}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {title}
                        </h3>

                        <p className="text-muted-foreground mb-4 flex-1">
                          {excerpt}
                        </p>

                        {authorName && (
                          <div className="text-sm text-muted-foreground">
                            {locale === 'en' ? 'By' : 'بواسطة'} {authorName}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
