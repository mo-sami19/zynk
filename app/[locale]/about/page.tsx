"use client"

import { motion } from 'framer-motion';
import { Award, Heart, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function AboutPage() {
  const locale = useLocale();

  const stats = [
    { icon: Users, value: '500+', label: locale === 'en' ? 'Happy Clients' : 'عميل سعيد' },
    { icon: Award, value: '50+', label: locale === 'en' ? 'Awards Won' : 'جائزة' },
    { icon: Target, value: '1000+', label: locale === 'en' ? 'Projects Completed' : 'مشروع مكتمل' },
    { icon: TrendingUp, value: '98%', label: locale === 'en' ? 'Satisfaction Rate' : 'معدل الرضا' },
  ];

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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-8 rounded-xl text-center">
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
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
      </div>
    </div>
  );
}
