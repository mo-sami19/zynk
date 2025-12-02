"use client"

import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const service = servicesData.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {service.title[locale as 'en' | 'ar']}
          </h1>
          <p className="text-xl text-muted-foreground">
            {service.description[locale as 'en' | 'ar']}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {service.features.map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature[locale as 'en' | 'ar']}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Our Process' : 'عمليتنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: locale === 'en' ? 'Discovery' : 'الاكتشاف' },
              { step: '02', title: locale === 'en' ? 'Strategy' : 'الاستراتيجية' },
              { step: '03', title: locale === 'en' ? 'Execution' : 'التنفيذ' },
              { step: '04', title: locale === 'en' ? 'Optimization' : 'التحسين' },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center">
                <div className="text-4xl font-bold gradient-text mb-3">{item.step}</div>
                <div className="text-lg font-semibold">{item.title}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="glass-card p-12 rounded-3xl max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'en' ? 'Ready to Get Started?' : 'هل أنت مستعد للبدء؟'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {locale === 'en'
                ? "Let's discuss how we can help with " + service.title.en
                : 'دعنا نناقش كيف يمكننا المساعدة في ' + service.title.ar
              }
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="neon" size="xl" className="group">
                {locale === 'en' ? 'Contact Us' : 'اتصل بنا'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
