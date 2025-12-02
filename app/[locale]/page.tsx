"use client"

import { TestimonialsPartnersSection } from '@/components/testimonials-partners-section';
import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, BarChart3, Lightbulb, Rocket, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
        type: "spring",
        stiffness: 100,
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
          {/* Floating Orbs */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ y }}
          >
            <motion.div 
              animate={{ 
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl"
            />
            <motion.div 
              animate={{ 
                x: [0, -100, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/50 rounded-full filter blur-3xl"
            />
            <motion.div 
              animate={{ 
                x: [0, 50, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl"
            />
          </motion.div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(242,255,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,255,88,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-32 h-32 border-2 border-primary rounded-lg"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 left-20 w-24 h-24 border-2 border-primary rounded-full"
          />
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-primary"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(242, 255, 88, 0.3)",
                    "0 0 40px rgba(242, 255, 88, 0.5)",
                    "0 0 20px rgba(242, 255, 88, 0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8 border-2 border-primary/20 relative overflow-hidden group"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="text-sm font-semibold tracking-wide">{t('badge')}</span>
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.div>
            </motion.div>

            {/* Animated Title with Letter Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {t('heroTitle')}
                </motion.span>
                <br />
                <motion.span
                  className="inline-block relative mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="relative">
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                      {t('heroSubtitle')}
                    </span>
                    {/* Underline Animation */}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </span>
                </motion.span>
              </h1>
            </motion.div>

            {/* Description with Typewriter Effect */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              {t('heroDescription')}
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="neon" size="xl" className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    {t('getStarted')}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.div>
                  </span>
                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0.5 }}
                    whileHover={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="glass" size="xl" className="group relative">
                  <span className="flex items-center">
                    {t('viewWork')}
                    <motion.div
                      className="ml-2 w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-16"
            >
              {[
                { icon: '⚡', text: 'Fast Delivery' },
                { icon: '🎯', text: 'Result Driven' },
                { icon: '🔒', text: 'Secure & Reliable' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/10"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(242, 255, 88, 0.3)' }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            >
              {[
                { icon: Users, value: '500+', label: t('clients'), color: 'from-primary/20 to-primary/5' },
                { icon: Award, value: '50+', label: t('awards'), color: 'from-primary/20 to-primary/5' },
                { icon: Target, value: '1000+', label: t('projects'), color: 'from-primary/20 to-primary/5' },
                { icon: TrendingUp, value: '98%', label: t('satisfaction'), color: 'from-primary/20 to-primary/5' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="relative group"
                >
                  <div className={`glass-card p-6 rounded-2xl relative overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all`}>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <motion.div
                        animate={floatingAnimation}
                        className="inline-block"
                      >
                        <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                      </motion.div>
                      <motion.div 
                        className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
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

      {/* Services Preview Section */}
      <section className="py-32 bg-dark-lighter relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <div className="px-6 py-2 rounded-full glass-card border border-primary/20">
                <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Services</span>
              </div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-white to-primary/70 bg-clip-text text-transparent">
                {t('servicesTitle')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('servicesDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: t('service1Title'),
                description: t('service1Desc'),
                gradient: 'from-primary/20 via-primary/10 to-transparent',
              },
              {
                icon: BarChart3,
                title: t('service2Title'),
                description: t('service2Desc'),
                gradient: 'from-primary/20 via-primary/10 to-transparent',
              },
              {
                icon: Lightbulb,
                title: t('service3Title'),
                description: t('service3Desc'),
                gradient: 'from-primary/20 via-primary/10 to-transparent',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="relative group cursor-pointer"
              >
                {/* Card Background with Gradient */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 h-full">
                  {/* Animated Gradient Background */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon with Glow */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow duration-300"
                    >
                      <service.icon className="w-8 h-8 text-primary" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    {/* Animated Arrow */}
                    <motion.div
                      className="flex items-center gap-2 text-primary font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">{t('learnMore')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="py-32 relative overflow-hidden bg-dark">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(242,255,88,0.05),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border border-primary/20 mb-6"
            >
              <Award className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">
                {locale === 'en' ? 'Our Work' : 'أعمالنا'}
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                {locale === 'en' ? 'Featured Projects' : 'مشاريع مميزة'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {locale === 'en' 
                ? 'Explore our portfolio of successful digital experiences'
                : 'استكشف معرض أعمالنا من التجارب الرقمية الناجحة'
              }
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {projectsData.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={`/${locale}/projects/${project.slug}`}>
                  <div className="glass-card rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 group cursor-pointer h-full relative">
                    {/* Project Image Placeholder with Gradient */}
                    <div className="h-64 bg-gradient-neon relative overflow-hidden">
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                        <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                          <Button variant="neon" size="sm" className="rounded-full">
                            {locale === 'en' ? 'View Case Study' : 'عرض دراسة الحالة'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-4 py-1.5 rounded-full bg-dark/50 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-sm text-primary font-semibold mb-2 tracking-wide uppercase">
                        {project.client}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {project.title[locale as 'en' | 'ar']}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {project.description[locale as 'en' | 'ar']}
                      </p>
                      
                      {/* Results Preview */}
                      <div className="pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-white/80">{project.results[locale as 'en' | 'ar'][0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-3xl transition-all duration-500 pointer-events-none" />
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
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Link href={`/${locale}/projects`}>
              <Button variant="glass" size="xl" className="group min-w-[200px]">
                <span className="flex items-center gap-2">
                  {locale === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-neon opacity-20 blur-3xl rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main CTA Card */}
            <div className="glass-card p-12 md:p-16 rounded-3xl border-2 border-primary/20 hover:border-primary/40 relative overflow-hidden group transition-all duration-500">
              <div className="relative z-10 text-center">
                {/* Floating Icons */}
                <div className="flex justify-center gap-4 mb-8">
                  {[Rocket, Zap, Target].map((Icon, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                  ))}
                </div>

                <motion.h2 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                    {t('ctaTitle')}
                  </span>
                </motion.h2>

                <motion.p 
                  className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('ctaDescription')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    variant="neon" 
                    size="xl" 
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {t('ctaButton')}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </span>
                    {/* Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex justify-center text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>Free Consultation</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials & Partners Section */}
      <TestimonialsPartnersSection />
    </div>
  );
}
