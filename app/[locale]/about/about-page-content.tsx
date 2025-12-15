"use client"

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Target, Zap } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutPageContent() {
  const locale = useLocale();

  const values = [
    {
      icon: Zap,
      title: locale === 'en' ? 'Innovation' : 'الابتكار',
      description: locale === 'en' 
        ? 'We stay ahead of digital trends to deliver cutting-edge solutions'
        : 'نبقى في طليعة الاتجاهات الرقمية لتقديم حلول متطورة'
    },
    {
      icon: Heart,
      title: locale === 'en' ? 'Passion' : 'الشغف',
      description: locale === 'en'
        ? 'We love what we do and it shows in every project we deliver'
        : 'نحب ما نقوم به ويظهر ذلك في كل مشروع نقدمه'
    },
    {
      icon: Target,
      title: locale === 'en' ? 'Results-Driven' : 'موجه نحو النتائج',
      description: locale === 'en'
        ? 'We focus on delivering measurable results that matter to your business'
        : 'نركز على تقديم نتائج قابلة للقياس تهم عملك'
    },
  ];

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
            {locale === 'en' ? 'About ZYNK' : 'عن ZYNK'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {locale === 'en' 
              ? 'We are a digital marketing agency passionate about helping businesses grow through innovative strategies and creative solutions.'
              : 'نحن وكالة تسويق رقمي شغوفة بمساعدة الشركات على النمو من خلال استراتيجيات مبتكرة وحلول إبداعية.'
            }
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'en' ? 'Our Mission' : 'مهمتنا'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {locale === 'en'
                ? 'To empower businesses with innovative digital marketing strategies that drive growth, engagement, and measurable results. We believe in creating meaningful connections between brands and their audiences.'
                : 'تمكين الشركات باستراتيجيات تسويق رقمي مبتكرة تدفع النمو والمشاركة والنتائج القابلة للقياس. نؤمن بإنشاء روابط ذات مغزى بين العلامات التجارية وجماهيرها.'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'en' ? 'Our Vision' : 'رؤيتنا'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {locale === 'en'
                ? 'To be the leading digital marketing agency recognized for delivering exceptional results and building lasting partnerships with our clients. We strive to set new standards in the industry.'
                : 'أن نكون وكالة التسويق الرقمي الرائدة المعترف بها لتقديم نتائج استثنائية وبناء شراكات دائمة مع عملائنا. نسعى لوضع معايير جديدة في الصناعة.'
              }
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'en' ? 'Our Values' : 'قيمنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl text-center">
                <value.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en' ? 'Why Choose ZYNK?' : 'لماذا تختار ZYNK؟'}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {locale === 'en'
              ? 'We combine creativity with data-driven insights to deliver marketing solutions that actually work. Our team of experts is dedicated to your success.'
              : 'نجمع بين الإبداع والرؤى المستندة إلى البيانات لتقديم حلول تسويقية تعمل بالفعل. فريقنا من الخبراء مكرس لنجاحك.'
            }
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,255,88,0.15),transparent_60%)]" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {/* Icon */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-10 h-10 text-primary" />
                </div>
              </motion.div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {locale === 'en' 
                  ? "Ready to Transform Your Brand?" 
                  : "هل أنت مستعد لتحويل علامتك التجارية؟"
                }
              </h2>

              {/* Description */}
              <p className="text-xl text-muted-foreground mb-10">
                {locale === 'en'
                  ? "Let's work together to create something amazing. Our team is ready to bring your vision to life."
                  : "دعنا نعمل معًا لإنشاء شيء مذهل. فريقنا جاهز لتحقيق رؤيتك."
                }
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={`/${locale}/contact`}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="neon" size="xl" className="group">
                      <span className="flex items-center gap-2">
                        {locale === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
                        <ArrowRight className={`w-5 h-5 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                      </span>
                    </Button>
                  </motion.div>
                </Link>

                <Link href={`/${locale}/projects`}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="glass" size="xl" className="gap-2">
                      {locale === 'en' ? 'View Our Work' : 'شاهد أعمالنا'}
                      <ArrowRight className={locale === 'ar' ? 'rotate-180' : ''} />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-5 right-5 w-24 h-24 border border-primary/20 rounded-full" />
            <div className="absolute bottom-5 left-5 w-16 h-16 border border-primary/20 rounded-lg rotate-45" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
