"use client"

import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function ProjectsPage() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Social Media', 'Branding', 'Content Marketing', 'PPC Advertising', 'Email Marketing'];

  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);

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
            {locale === 'en' ? 'Our Projects' : 'مشاريعنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {locale === 'en' 
              ? 'Explore our portfolio of successful digital marketing campaigns and projects'
              : 'استكشف محفظتنا من حملات ومشاريع التسويق الرقمي الناجحة'
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'neon' : 'glass'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/${locale}/projects/${project.slug}`}>
                <div className="glass-card rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all group cursor-pointer h-full">
                  {/* Project Image Placeholder */}
                  <div className="h-64 bg-gradient-neon relative overflow-hidden">
                    <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-all flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <div className="text-sm font-medium mb-2">{project.category}</div>
                        <div className="text-2xl font-bold">{project.client}</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{project.year}</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title[locale as 'en' | 'ar']}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description[locale as 'en' | 'ar']}
                    </p>
                    
                    {/* Results Preview */}
                    <div className="space-y-1">
                      {project.results[locale as 'en' | 'ar'].slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground">
                {locale === 'en' ? 'No projects found in this category' : 'لم يتم العثور على مشاريع في هذه الفئة'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
