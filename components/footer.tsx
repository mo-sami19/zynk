"use client"

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  const services = [
    { href: `/${locale}/services/social-media`, label: t('socialMedia') },
    { href: `/${locale}/services/content-marketing`, label: t('contentMarketing') },
    { href: `/${locale}/services/ppc`, label: t('ppc') },
    { href: `/${locale}/services/branding`, label: t('branding') },
  ];

  return (
    <footer className="relative bg-dark border-t border-primary/20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Image 
              src="/images/logo/zynk-logo.png" 
              alt="ZYNK Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg glass-card hover:border-primary/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Mail size={18} className="mt-0.5 text-primary" />
                <span>info@zynk.agency</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Phone size={18} className="mt-0.5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin size={18} className="mt-0.5 text-primary" />
                <span>123 Digital Street, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ZYNK. {t('rights')}
            </p>
            <div className="flex space-x-6">
              <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('privacy')}
              </Link>
              <Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
