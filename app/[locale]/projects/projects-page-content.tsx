"use client"

import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';
import { useProjects } from '@/lib/hooks';
import { getLocalizedText } from '@/lib/utils/localized';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function ProjectsPageContent() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: apiProjects, loading, error } = useProjects();

  // Use API data if available, fallback to local JSON
  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : projectsData;

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    projects.forEach((p: any) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter((p: any) => p.category === selectedCategory);

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: any, index: number) => {
                const title = getLocalizedText(project.title, locale);
                const description = getLocalizedText(project.description, locale);
                const results = project.results?.[locale as 'en' | 'ar'] || project.results?.en || project.results || [];
                const clientName = project.client_name || project.client || '';
                const year = project.completed_at ? new Date(project.completed_at).getFullYear() : project.year;
                
                return (
                  <motion.div
                    layout
                    key={project.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -10 }}
                  >
                    <Link href={`/${locale}/projects/${project.slug}`}>
                      <div className="glass-card rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all group cursor-pointer h-full">
                        {/* Project Image */}
                        <div className="h-64 bg-gradient-neon relative overflow-hidden">
                          {project.thumbnail ? (
                            <Image 
                              src={project.thumbnail} 
                              alt={title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : null}
                          <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-all flex items-center justify-center">
                            <div className="text-center text-white p-6">
                              <div className="text-sm font-medium mb-2">{project.category}</div>
                              <div className="text-2xl font-bold">{clientName}</div>
                            </div>
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          {year && <div className="text-sm text-muted-foreground mb-2">{year}</div>}
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {description}
                          </p>
                          
                          {/* Results Preview */}
                          {results.length > 0 && (
                            <div className="space-y-1">
                              {results.slice(0, 2).map((result: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                  <span className="text-muted-foreground">{result}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

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
