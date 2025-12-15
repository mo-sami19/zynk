"use client"

import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';
import { useServices } from '@/lib/hooks';
import { getLocalizedArray, getLocalizedText } from '@/lib/utils/localized';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Code, FileText, Loader2, Mail, Palette, Search, Share2, Smartphone, TrendingUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  Share2,
  FileText,
  TrendingUp,
  Mail,
  Award,
  Code,
  Search,
  Smartphone,
  Palette,
};

export default function ServicesPageContent() {
  const locale = useLocale();
  const { data: apiServices, loading, error } = useServices();
  
  // Use API data if available, fallback to local JSON
  const services = apiServices && apiServices.length > 0 ? apiServices : servicesData;

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
            {locale === 'en' ? 'Our Services' : 'خدماتنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {locale === 'en' 
              ? 'Comprehensive digital marketing solutions tailored to your business needs'
              : 'حلول تسويق رقمي شاملة مصممة خصيصاً لاحتياجات عملك'
            }
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10 text-muted-foreground">
            {locale === 'en' ? 'Failed to load services. Showing cached data.' : 'فشل تحميل الخدمات. عرض البيانات المخزنة.'}
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => {
              const Icon = iconMap[service.icon] || Code;
              const title = getLocalizedText(service.title, locale);
              const description = getLocalizedText(service.description, locale);
              const features = getLocalizedArray(service.features, locale);
              
              return (
                <motion.div
                  key={service.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/services/${service.slug}`}>
                    <div className="glass-card p-8 rounded-2xl hover:border-neon-purple/50 transition-all group cursor-pointer h-full">
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-neon flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">
                          {title}
                        </h3>
                        <p className="text-muted-foreground">
                          {description}
                        </p>
                      </div>

                      {features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {features.slice(0, 4).map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button variant="link" className="p-0 text-primary group-hover:gap-2 transition-all">
                        {locale === 'en' ? 'Learn More' : 'اعرف المزيد'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="glass-card p-12 rounded-3xl max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'en' ? 'Ready to Get Started?' : 'هل أنت مستعد للبدء؟'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {locale === 'en'
                ? "Let's discuss how we can help grow your business"
                : 'دعنا نناقش كيف يمكننا مساعدتك في تنمية عملك'
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
