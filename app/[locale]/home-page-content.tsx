"use client"

import { TestimonialsPartnersSection } from '@/components/testimonials-partners-section';
import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';
import { useProjects, useServices } from '@/lib/hooks';
import { getLocalizedArray, getLocalizedText } from '@/lib/utils/localized';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Code, FileText, Palette, Rocket, Search, Smartphone, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';

export default function HomePageContent() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { data: apiServices } = useServices();
  const { data: apiProjects } = useProjects();
  
  // Use API data if available, fallback to local JSON
  const services = apiServices && apiServices.length > 0 ? apiServices : servicesData;
  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : projectsData;
  const containerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Simple Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
          {/* Static Orbs - No Animation */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/50 rounded-full filter blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl" />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(242,255,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,255,88,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
        </div>

        {/* Removed Floating Particles and Geometric Shapes for Performance */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Simple Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8 border-2 border-primary/20"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold tracking-wide">{t('badge')}</span>
            </motion.div>

            {/* Simple Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight" style={{ lineHeight: locale === 'ar' ? '1.3' : undefined }}>
                {t('heroTitle')}
                <br />
                <span className="inline-block relative mt-4">
                  <span className="bg-gradient-to-r from-primary via-[#fefff0] to-primary bg-clip-text text-transparent">
                    {t('heroSubtitle')}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
              style={{ lineHeight: locale === 'ar' ? '2' : undefined }}
            >
              {t('heroDescription')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="neon" size="xl" className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    {t('getStarted')}
                    <motion.div
                      animate={{ x: locale === 'ar' ? [0, -5, 0] : [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="glass" size="xl" className="group relative">
                  <span className="flex items-center gap-2">
                    {t('viewWork')}
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,255,88,0.05),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Target className="w-6 h-6 text-primary" />
              <span className="text-primary font-bold uppercase tracking-wider">
                {locale === 'en' ? 'Our Work' : 'أعمالنا'}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {locale === 'en' ? 'Featured Projects' : 'مشاريع مميزة'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Explore our portfolio of successful digital marketing campaigns and projects'
                : 'استكشف محفظتنا من حملات ومشاريع التسويق الرقمي الناجحة'
              }
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={`/${locale}/projects/${project.slug}`}>
                  <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all h-full">
                    {/* Project Image Placeholder */}
                    <div className="h-64 bg-gradient-neon relative overflow-hidden">
                      <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-all flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <div className="text-sm font-medium mb-2">{project.category}</div>
                          <div className="text-2xl font-bold">{(project as any).client || getLocalizedText((project as any).title, locale)}</div>
                        </div>
                      </div>
                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">{(project as any).year || ''}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {getLocalizedText(project.title, locale)}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {getLocalizedText(project.description, locale)}
                      </p>
                      
                      {/* Results Preview */}
                      <div className="space-y-1">
                        {((project as any).results ? (typeof (project as any).results === 'object' ? ((project as any).results[locale as 'en' | 'ar'] || []) : []) : []).slice(0, 2).map((result: string, idx: number) => (
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
          </div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Link href={`/${locale}/projects`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="glass" size="lg" className="group">
                  <span className="flex items-center">
                    {locale === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter via-dark to-dark-lighter">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(242,255,88,0.08),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-primary font-bold uppercase tracking-wider">
                {locale === 'en' ? 'What We Do' : 'ما نقدمه'}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {locale === 'en' ? 'Our Services' : 'خدماتنا'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Comprehensive digital solutions tailored to your business needs'
                : 'حلول رقمية شاملة مصممة خصيصاً لاحتياجات عملك'
              }
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const iconMap: Record<string, any> = {
                Code,
                Search,
                FileText,
                TrendingUp,
                Smartphone,
                Palette,
              };
              const Icon = iconMap[service.icon];

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/${locale}/services/${service.slug}`}>
                    <div className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all h-full relative overflow-hidden">
                      {/* Hover Background Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />

                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 rounded-xl bg-gradient-neon flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                        >
                          {Icon && <Icon className="w-8 h-8 text-white" />}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {getLocalizedText(service.title, locale)}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground mb-6">
                          {getLocalizedText(service.description, locale)}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2">
                          {getLocalizedArray(service.features, locale).slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Learn More Link */}
                        <div className="mt-6 flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          <span>{locale === 'en' ? 'Learn More' : 'اعرف المزيد'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Link href={`/${locale}/services`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="neon" size="lg" className="group">
                  <span className="flex items-center">
                    {locale === 'en' ? 'View All Services' : 'عرض جميع الخدمات'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(242,255,88,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Static Icon */}
            <div className="inline-block mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center bg-dark/80">
                <Rocket className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t('ctaTitle')}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              {t('ctaDescription')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href={`/${locale}/contact`}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="neon" size="xl" className="group">
                    <span className="flex items-center">
                      {t('startProject')}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>

              <Link href={`/${locale}/services`}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="glass" size="xl">
                    {t('exploreServices')}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>{t('awardWinning')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>{t('trustedByHundreds')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>{t('fastDelivery')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary/20 rounded-lg rotate-45" />
      </section>

      {/* Testimonials & Partners Section */}
      <TestimonialsPartnersSection />
    </div>
  );
}
