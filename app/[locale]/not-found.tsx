"use client"

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const locale = useLocale();
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-neon">404</div>
              <h1 className="text-4xl font-bold mt-4">
                {locale === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
              </h1>
              <p className="text-xl text-muted-foreground mt-4">
                {locale === 'en' 
                  ? "The page you are looking for doesn't exist or has been moved."
                  : "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
                }
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/`}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {locale === 'en' ? 'Go Back' : 'العودة'}
                </Button>
              </Link>
              
              <Link href={`/${locale}`}>
                <Button variant="neon" size="lg" className="gap-2">
                  <Home className="w-5 h-5" />
                  {locale === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}