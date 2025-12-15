"use client"

import partnersData from '@/data/partners.json';
import testimonialsData from '@/data/testimonials.json';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Sparkles, Star, TrendingUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function TestimonialsPartnersSection() {
  const locale = useLocale();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const isRTL = locale === 'ar';
  const [[page, direction], setPage] = useState([0, 0]);
  
  const paginate = (newDirection: number) => {
    const newIndex = (activeTestimonial + newDirection + testimonialsData.length) % testimonialsData.length;
    setActiveTestimonial(newIndex);
    setPage([newIndex, newDirection]);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveTestimonial((prev) => {
          const newIndex = (prev + (isRTL ? 1 : -1) + testimonialsData.length) % testimonialsData.length;
          return newIndex;
        });
      } else if (e.key === 'ArrowRight') {
        setActiveTestimonial((prev) => {
          const newIndex = (prev + (isRTL ? -1 : 1) + testimonialsData.length) % testimonialsData.length;
          return newIndex;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRTL]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-dark">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(242,255,88,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(242,255,88,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {locale === 'en' ? 'Trusted by Leaders' : 'موثوق من القادة'}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {locale === 'en' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === 'en' 
              ? 'Real stories from real businesses that achieved extraordinary results'
              : 'قصص حقيقية من شركات حقيقية حققت نتائج استثنائية'
            }
          </p>
        </motion.div>

        {/* Testimonials Carousel - 3D Card Stack */}
        <div className="relative max-w-6xl mx-auto mb-32">
          {/* Swipe Hint */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center mb-4 text-sm text-muted-foreground"
          >
            {locale === 'en' ? '← Swipe or use arrow keys →' : '→ اسحب أو استخدم الأسهم ←'}
          </motion.div>
          <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
            {testimonialsData.map((testimonial, index) => {
              const offset = index - activeTestimonial;
              const isActive = index === activeTestimonial;
              
              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute w-full max-w-3xl cursor-grab active:cursor-grabbing"
                  initial={false}
                  animate={{
                    x: `${offset * 100}%`,
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.5,
                    rotateY: offset * 15,
                    z: isActive ? 0 : -100 * Math.abs(offset),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    
                    if (swipe < -10000) {
                      paginate(1);
                    } else if (swipe > 10000) {
                      paginate(-1);
                    }
                  }}
                >
                  <div className={`glass-card p-8 md:p-12 rounded-3xl border-2 transition-all duration-300 ${
                    isActive ? 'border-primary/50 shadow-2xl shadow-primary/20' : 'border-white/10'
                  }`}>
                    {/* Quote Icon */}
                    <motion.div
                      animate={{
                        rotate: isActive ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                      }}
                      className="mb-6"
                    >
                      <Quote className="w-12 h-12 text-primary" />
                    </motion.div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                      "{testimonial[locale === 'en' ? 'text' : 'textAr']}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-2xl font-bold text-dark">
                          {testimonial.name.charAt(0)}
                        </div>
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 rounded-full border-2 border-primary"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {testimonial[locale === 'en' ? 'name' : 'nameAr']}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial[locale === 'en' ? 'position' : 'positionAr']}
                        </p>
                        <p className="text-xs text-primary font-medium mt-1">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonialsData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`relative h-2 rounded-full transition-all ${
                  index === activeTestimonial ? 'w-12 bg-primary' : 'w-2 bg-white/20'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === activeTestimonial && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
              className="w-12 h-12 rounded-full bg-primary/30 border border-primary/30 flex items-center justify-center text-dark hover:bg-primary/50 transition-colors pointer-events-auto text-xl font-bold"
              aria-label={isRTL ? 'التالي' : 'Previous'}
            >
              {isRTL ? '→' : '←'}
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length)}
              className="w-12 h-12 rounded-full bg-primary/30 border border-primary/30 flex items-center justify-center text-dark hover:bg-primary/50 transition-colors pointer-events-auto text-xl font-bold"
              aria-label={isRTL ? 'السابق' : 'Next'}
            >
              →
            </button>
          </div>
        </div>

        {/* Partners Section - Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {locale === 'en' ? 'Our Partners' : 'شركاؤنا'}
              </span>
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {locale === 'en' ? 'Trusted Technology Partners' : 'شركاء تقنيون موثوقون'}
            </h3>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden py-8">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
            
            {/* Scrolling Track */}
            <motion.div
              className="flex gap-12"
              animate={{
                x: isRTL ? [0, 1920] : [0, -1920],
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate partners for seamless loop */}
              {[...partnersData, ...partnersData, ...partnersData].map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-48 h-24 glass-card rounded-2xl flex items-center justify-center p-4 border border-white/10 hover:border-primary/50 transition-all group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
