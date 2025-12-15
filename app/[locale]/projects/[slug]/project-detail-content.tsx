"use client"

import { Button } from '@/components/ui/button';
import { useProjects } from '@/lib/hooks';
import { getLocalizedText } from '@/lib/utils/localized';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, BarChart3, Calendar, Eye, Lightbulb, Rocket, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useRef } from 'react';

export default function ProjectDetailContent({ slug }: { slug: string }) {
  const locale = useLocale();
  const { data: projects, loading } = useProjects();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const project = projects?.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full" ref={containerRef}>
      {/* Hero Section - Creative Diagonal Split */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background with Diagonal Split */}
        <div className="absolute inset-0">
          {/* Left Side - Dark */}
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark"
            style={{ 
              clipPath: "polygon(0 0, 60% 0, 50% 100%, 0 100%)",
              y 
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(242,255,88,0.1),transparent_50%)]" />
          </motion.div>
          
          {/* Right Side - Gradient */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-bl from-primary/20 via-dark-lighter to-dark"
            style={{ 
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, 60% 100%)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(242,255,88,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(242,255,88,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <div className="px-6 py-3 rounded-2xl bg-primary/10 border-2 border-primary/30 backdrop-blur-sm">
                  <span className="text-primary font-bold text-lg">{project.category}</span>
                </div>
                <div className="px-6 py-3 rounded-2xl glass-card border-2 border-primary/20 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{project.completed_at ? new Date(project.completed_at).getFullYear() : new Date(project.created_at).getFullYear()}</span>
                </div>
              </motion.div>

              {/* Title with Creative Typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 mb-4"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                    {locale === 'en' ? 'Featured Project' : 'مشروع مميز'}
                  </span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
                  <span className="block bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                    {getLocalizedText(project.title, locale)}
                  </span>
                </h1>
              </motion.div>

              {/* Client Info Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl glass-card border-2 border-primary/20 group hover:border-primary/50 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    {locale === 'en' ? 'Client' : 'العميل'}
                  </div>
                  <div className="text-2xl font-bold text-primary">{project.client_name}</div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                {getLocalizedText(project.description, locale)}
              </motion.p>
            </motion.div>

            {/* Right Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative"
            >
              <div className="relative aspect-square">
                {/* Main Circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-primary/20 border-dashed"
                />
                
                {/* Inner Circle */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border-2 border-primary/30"
                />

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-neon opacity-50 blur-3xl rounded-full"
                    />
                    <div className="relative bg-dark-lighter/80 backdrop-blur-xl rounded-3xl p-12 border-2 border-primary/30">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Rocket className="w-24 h-24 text-primary" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Icons */}
                {[Zap, Target, BarChart3, Eye].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-2xl glass-card border-2 border-primary/20 flex items-center justify-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: '-2rem',
                      marginLeft: '-2rem',
                    }}
                    animate={{
                      rotate: 360,
                      x: Math.cos((i * Math.PI) / 2) * 150,
                      y: Math.sin((i * Math.PI) / 2) * 150,
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      x: { duration: 15, repeat: Infinity, ease: "linear" },
                      y: { duration: 15, repeat: Infinity, ease: "linear" },
                    }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">
              {locale === 'en' ? 'Scroll to explore' : 'مرر للاستكشاف'}
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Showcase - Bento Grid Style */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-lighter">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,255,88,0.08),transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Title */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <Lightbulb className="w-6 h-6 text-primary" />
                <span className="text-primary font-bold uppercase tracking-wider">
                  {locale === 'en' ? 'The Vision' : 'الرؤية'}
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold">
                {locale === 'en' ? 'Project Highlights' : 'أبرز المشروع'}
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Large Feature Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-2 md:row-span-2 relative group"
              >
                <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden glass-card border-2 border-primary/20 group-hover:border-primary/40 transition-all">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark-lighter to-dark" />
                  
                  {/* Animated Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(242,255,88,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(242,255,88,0.05)_2px,transparent_2px)] bg-[size:40px_40px] opacity-50" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="mb-8"
                    >
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                        <Rocket className="w-16 h-16 text-primary" />
                      </div>
                    </motion.div>
                    <h3 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                      {project.client_name}
                    </h3>
                    <p className="text-2xl text-primary font-semibold">{project.category}</p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Small Cards */}
              {[
                { icon: Target, label: locale === 'en' ? 'Strategic' : 'استراتيجي', color: 'from-blue-500/20' },
                { icon: Zap, label: locale === 'en' ? 'Fast' : 'سريع', color: 'from-yellow-500/20' },
                { icon: Award, label: locale === 'en' ? 'Quality' : 'جودة', color: 'from-purple-500/20' },
                { icon: BarChart3, label: locale === 'en' ? 'Data-Driven' : 'مدفوع بالبيانات', color: 'from-green-500/20' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative h-full min-h-[180px] rounded-3xl overflow-hidden glass-card border-2 border-primary/20 group-hover:border-primary/40 transition-all p-8">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-50`} />
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center text-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center"
                      >
                        <item.icon className="w-8 h-8 text-primary" />
                      </motion.div>
                      <span className="text-lg font-bold">{item.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results & Impact - Creative Redesign */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark">
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(242, 255, 88, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(242, 255, 88, 0.1) 0%, transparent 50%)',
              backgroundSize: '100% 100%',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,255,88,0.05),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full blur-lg"
                  />
                  <div className="relative bg-dark rounded-full p-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">
                  {locale === 'en' ? 'Measurable Impact' : 'تأثير قابل للقياس'}
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                {locale === 'en' 
                  ? 'Real numbers, real growth, real success' 
                  : 'أرقام حقيقية، نمو حقيقي، نجاح حقيقي'}
              </motion.p>
            </div>

            {/* Results Grid - Creative Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Placeholder results - can be replaced with actual project metrics */}
              {[
                { number: '100', text: locale === 'en' ? 'Completion Rate' : 'معدل الإنجاز' },
                { number: '50', text: locale === 'en' ? 'Growth' : 'نمو' },
                { number: '24', text: locale === 'en' ? 'Support' : 'دعم' }
              ].map((result, index) => {
                const { number, text } = result;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group relative"
                  >
                    {/* Card */}
                    <div className="relative h-full">
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                      
                      {/* Main Card */}
                      <div className="relative bg-dark-lighter/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-500 h-full overflow-hidden">
                        {/* Animated Corner Accent */}
                        <motion.div
                          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />

                        {/* Number Display */}
                        <div className="relative mb-6">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.15 + 0.3,
                              type: "spring",
                              stiffness: 200
                            }}
                            className="text-7xl md:text-8xl font-black mb-2"
                          >
                            <span className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                              {number}
                              <span className="text-5xl">%</span>
                            </span>
                          </motion.div>
                          
                          {/* Animated Underline */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "60%" }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full"
                          />
                        </div>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.6 }}
                          className="text-lg font-semibold leading-relaxed text-white/90 relative z-10"
                        >
                          {text}
                        </motion.p>

                        {/* Floating Icon */}
                        <motion.div
                          className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        >
                          <TrendingUp className="w-24 h-24 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card border-2 border-primary/20">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">
                  {locale === 'en' ? 'Proven Track Record' : 'سجل حافل مثبت'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Creative Split Design */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-neon opacity-10 blur-3xl"
          />
          
          {/* Diagonal Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(242,255,88,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(242,255,88,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Visual */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative">
                  {/* Main Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="relative glass-card rounded-3xl p-12 border-2 border-primary/30 overflow-hidden group"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    <div className="relative z-10 space-y-8">
                      {/* Stats */}
                      {[
                        { value: '150+', label: locale === 'en' ? 'Projects' : 'مشاريع' },
                        { value: '98%', label: locale === 'en' ? 'Success Rate' : 'معدل النجاح' },
                        { value: '24/7', label: locale === 'en' ? 'Support' : 'دعم' },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                            <span className="text-3xl font-black text-primary">{stat.value}</span>
                          </div>
                          <div>
                            <div className="text-xl font-bold">{stat.label}</div>
                            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 px-6 py-3 rounded-2xl bg-primary/90 backdrop-blur-sm border-2 border-primary shadow-lg shadow-primary/50"
                  >
                    <span className="text-dark font-bold flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      {locale === 'en' ? 'Award Winning' : 'حائز على جوائز'}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - CTA Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border-2 border-primary/30"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                    {locale === 'en' ? "Let's Work Together" : 'لنعمل معاً'}
                  </span>
                </motion.div>

                {/* Heading */}
                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="block mb-2">
                    {locale === 'en' ? 'Ready to' : 'مستعد'}
                  </span>
                  <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    {locale === 'en' ? 'Transform Your Business?' : 'لتحويل عملك؟'}
                  </span>
                </h2>

                {/* Description */}
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {locale === 'en'
                    ? "Join hundreds of satisfied clients who've achieved remarkable results. Let's create something extraordinary together."
                    : 'انضم إلى مئات العملاء الراضين الذين حققوا نتائج مذهلة. دعنا ننشئ شيئاً استثنائياً معاً.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href={`/${locale}/contact`}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="neon" size="xl" className="group w-full sm:w-auto">
                        <span className="flex items-center gap-2">
                          {locale === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href={`/${locale}/services`}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="glass" size="xl" className="w-full sm:w-auto">
                        {locale === 'en' ? 'View Services' : 'عرض الخدمات'}
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
