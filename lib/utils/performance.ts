/**
 * Performance utilities for mobile optimization
 */

// Detect if device is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Detect if device is low-end
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for low memory
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  // Check for slow connection
  const connection = (navigator as any).connection;
  if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true;
  }
  
  // Check for low CPU cores
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) return true;
  
  return false;
};

// Get optimized animation config for device
export const getAnimationConfig = () => {
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();
  
  if (lowEnd) {
    return {
      duration: 0.2,
      ease: "linear",
      enableComplexAnimations: false,
      enableParallax: false,
      enableSpring: false,
      reduceMotion: true
    };
  }
  
  if (mobile) {
    return {
      duration: 0.3,
      ease: "easeOut",
      enableComplexAnimations: false,
      enableParallax: false,
      enableSpring: false,
      reduceMotion: false
    };
  }
  
  return {
    duration: 0.5,
    ease: "easeInOut",
    enableComplexAnimations: true,
    enableParallax: true,
    enableSpring: true,
    reduceMotion: false
  };
};

// Optimized framer-motion variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// Debounce function for scroll events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for frequent events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
