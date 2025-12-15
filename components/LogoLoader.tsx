"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface LogoLoaderProps {
  onComplete?: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const containerControls = useAnimationControls();

  const letters = [
    { src: "/images/assets/z.png", alt: "Z", delay: 0 },
    { src: "/images/assets/y.png", alt: "Y", delay: 0.1 },
    { src: "/images/assets/n.png", alt: "N", delay: 0.2 },
    { src: "/images/assets/k.png", alt: "K", delay: 0.3 },
  ];

  useEffect(() => {
    const sequence = async () => {
      await containerControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3, delay: 0.5 }
      });
    };
    sequence();
  }, [containerControls]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const sloganVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.4,
      },
    },
  };

  const snapVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F] z-50 overflow-hidden">

      <motion.div 
        className="flex flex-col items-center justify-center px-4 relative z-10"
        animate={containerControls}
      >
        {/* ZYNK Letters + Snap */}
        <div className="flex flex-col items-center gap-2" dir="ltr">
          <motion.div 
            className="flex items-center justify-center gap-2 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Snap - على يسار حرف Z */}
            <motion.div
              variants={snapVariants}
              initial="hidden"
              animate="visible"
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mr-2 md:mr-3"
            >
              <Image
                src="/images/assets/snap.png"
                alt="Snap"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {letters.map((letter, index) => (
              <motion.div
                key={letter.alt}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: letter.delay }}
                className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                onAnimationComplete={() => {
                  if (index === letters.length - 1 && onComplete) {
                    setTimeout(onComplete, 100);
                  }
                }}
              >
                <Image
                  src={letter.src}
                  alt={letter.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slogan - تحت الحروف والسناب */}
        <motion.div
          variants={sloganVariants}
          initial="hidden"
          animate="visible"
          className="relative"
          dir="ltr"
        >
          <Image
            src="/images/assets/tagline.png"
            alt="Think Big, Zynk Bigger"
            width={320}
            height={48}
            className="object-contain w-48 h-8 sm:w-64 sm:h-10 md:w-80 md:h-12"
            priority
          />
          {/* علامة ™ */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                delay: 0.9,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }
            }}
            className="absolute -top-1 -right-4 sm:-right-6 text-[#ECFF00] text-xs sm:text-sm font-bold"
          >
            ™
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}
