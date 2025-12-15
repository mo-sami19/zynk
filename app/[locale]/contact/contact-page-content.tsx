"use client"

import { Button } from '@/components/ui/button';
import { useContact } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function ContactPageContent() {
  const locale = useLocale();
  const { submit, loading, error, success, reset } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject || (locale === 'en' ? 'Contact Form Submission' : 'رسالة من نموذج التواصل'),
      message: formData.message,
    });
    
    if (result) {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

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
            {locale === 'en' ? 'Get In Touch' : 'تواصل معنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {locale === 'en' 
              ? "Have a project in mind? Let's discuss how we can help your business grow."
              : 'لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكننا مساعدة عملك على النمو.'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'en' ? 'Send us a message' : 'أرسل لنا رسالة'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'en' ? 'Name' : 'الاسم'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={locale === 'en' ? 'Your name' : 'اسمك'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'en' ? 'Email (Optional)' : 'البريد الإلكتروني (اختياري)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={locale === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.com'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'en' ? 'Phone' : 'الهاتف'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={locale === 'en' ? '+1 (555) 000-0000' : '+966 50 000 0000'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'en' ? 'Message' : 'الرسالة'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder={locale === 'en' ? 'Tell us about your project...' : 'أخبرنا عن مشروعك...'}
                  />
                </div>

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-green-500/20 text-green-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      {locale === 'en' 
                        ? 'Thank you! Your message has been sent successfully.' 
                        : 'شكراً لك! تم إرسال رسالتك بنجاح.'}
                    </span>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-red-500/20 text-red-400"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>
                      {locale === 'en' 
                        ? 'Failed to send message. Please try again.' 
                        : 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'}
                    </span>
                  </motion.div>
                )}

                <Button 
                  type="submit" 
                  variant="neon" 
                  size="lg" 
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      {locale === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                    </>
                  ) : (
                    <>
                      {locale === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </h3>
                  <p className="text-muted-foreground">info@zynk.agency</p>
                  <p className="text-muted-foreground">support@zynk.agency</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'en' ? 'Phone' : 'الهاتف'}
                  </h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'en' ? 'Office' : 'المكتب'}
                  </h3>
                  <p className="text-muted-foreground">
                    {locale === 'en' 
                      ? '123 Digital Street, Tech City, TC 12345'
                      : '١٢٣ شارع الرقمي، مدينة التقنية، ١٢٣٤٥'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card p-4 rounded-xl h-64 flex items-center justify-center bg-gradient-neon/10">
              <p className="text-muted-foreground">
                {locale === 'en' ? 'Map Location' : 'موقع الخريطة'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
