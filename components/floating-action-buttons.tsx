"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Plus, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export function FloatingActionButtons() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    {
      icon: Phone,
      label: locale === 'en' ? 'Call Us' : 'اتصل بنا',
      href: 'tel:+201234567890',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      shadowColor: 'shadow-blue-500/50',
    },
    {
      icon: MessageCircle,
      label: locale === 'en' ? 'WhatsApp' : 'واتساب',
      href: 'https://wa.me/201234567890',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      shadowColor: 'shadow-green-500/50',
    },
    {
      icon: Mail,
      label: locale === 'en' ? 'Contact Form' : 'نموذج التواصل',
      href: `/${locale}/contact`,
      bgColor: 'bg-primary',
      hoverColor: 'hover:bg-primary/90',
      shadowColor: 'shadow-primary/50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mainButtonVariants = {
    idle: { 
      scale: 1,
      rotate: 0,
    },
    hover: { 
      scale: 1.1,
      rotate: 90,
      transition: {
        duration: 0.3,
      },
    },
    tap: { 
      scale: 0.95,
    },
  };

  return (
    <div className={`fixed bottom-8 z-50 flex flex-col-reverse items-end gap-4 ${locale === 'ar' ? 'left-8' : 'right-8'}`}>
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="action-buttons"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col-reverse items-end gap-3"
          >
            {buttons.map((button, index) => {
              const Icon = button.icon;
              const isExternal = button.href.startsWith('http') || button.href.startsWith('tel');
              
              return (
                <motion.div
                  key={button.label}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Label Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                    className={`absolute ${locale === 'ar' ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 
                      bg-gradient-to-br from-dark/95 to-dark/90 backdrop-blur-md text-white px-5 py-2.5 rounded-xl 
                      whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300
                      border border-primary/30 shadow-2xl font-medium`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl" />
                    <span className="relative z-10">{button.label}</span>
                  </motion.div>

                  {/* Button */}
                  {isExternal ? (
                    <motion.a
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-14 h-14 rounded-full 
                        ${button.bgColor} ${button.hoverColor} ${button.bgColor === 'bg-primary' ? 'text-dark' : 'text-white'} shadow-lg ${button.shadowColor}
                        hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </motion.a>
                  ) : (
                    <Link href={button.href}>
                      <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center w-14 h-14 rounded-full 
                          ${button.bgColor} ${button.hoverColor} ${button.bgColor === 'bg-primary' ? 'text-dark' : 'text-white'} shadow-lg ${button.shadowColor}
                          hover:shadow-xl transition-all duration-300 cursor-pointer`}
                      >
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        variants={mainButtonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-full transition-all duration-300 overflow-hidden shadow-xl
          ${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}
      >
        {/* Icon */}
        <motion.div
          className={`relative z-10 flex items-center justify-center w-full h-full ${isOpen ? 'text-white' : 'text-dark'}`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-7 h-7" strokeWidth={2.5} />
          ) : (
            <Plus className="w-7 h-7" strokeWidth={2.5} />
          )}
        </motion.div>

        {/* Pulse Ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
