"use client";

import { cn } from '@/lib/utils';
import { Rocket, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
  buttonClassName?: string;
  maxLength?: number; // Maximum character limit (default: 500)
  showCounter?: boolean; // Show character counter (default: true)
}

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Type your message...',
  disabled = false,
  isRTL = false,
  className,
  buttonClassName,
  maxLength = 500, // Default max 500 characters - prevents spam/attacks
  showCounter = true,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // Detect if device is mobile (touch-enabled)
  useEffect(() => {
    const checkMobile = () => {
      // Check for touch support and screen size
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set height based on scrollHeight, with min and max constraints
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 120);
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  // Handle input change with character limit validation
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    // Enforce character limit - prevents database spam attacks
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Mobile behavior: Enter always inserts new line
    if (isMobile) {
      // Let Enter key insert new line naturally
      return;
    }

    // Desktop behavior: Enter sends, Shift+Enter inserts new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default new line insertion
      if (value.trim() && !disabled) {
        onSend();
      }
    }
    // Shift+Enter will insert new line naturally (default behavior)
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      // Trigger rocket launch animation
      setIsLaunching(true);
      
      // Send message after animation starts
      setTimeout(() => {
        onSend();
      }, 300);
      
      // Reset animation after completion
      setTimeout(() => {
        setIsLaunching(false);
      }, 800);
    }
  };

  // Calculate character count and remaining
  const charCount = value.length;
  const remaining = maxLength - charCount;
  const isNearLimit = remaining <= 50;
  const isAtLimit = remaining === 0;

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          maxLength={maxLength}
          // Mobile keyboard hint: shows "enter" key instead of "go" or "search"
          enterKeyHint="enter"
          className={cn(
            "w-full text-white placeholder-white/40 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3",
            "text-base focus:outline-none transition-all resize-none overflow-y-auto",
            "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
            className
          )}
          style={{
            fontSize: '16px', // Prevents zoom on iOS
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(242, 255, 88, 0.3)',
            boxShadow: '0 0 0 0 rgba(242, 255, 88, 0)',
            minHeight: '44px', // Minimum touch target size
            maxHeight: '120px', // Max 4-5 lines
          }}
          onFocus={(e) => {
            e.target.style.border = '1px solid rgba(242, 255, 88, 0.4)';
            e.target.style.boxShadow = '0 0 20px rgba(242, 255, 88, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid rgba(242, 255, 88, 0.3)';
            e.target.style.boxShadow = '0 0 0 0 rgba(242, 255, 88, 0)';
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        {/* Character Counter - Security feature to prevent spam */}
        {showCounter && (
          <div 
            className={cn(
              "absolute bottom-1 text-[10px] font-medium transition-colors",
              isRTL ? "left-2" : "right-2",
              isAtLimit ? "text-red-400" : isNearLimit ? "text-yellow-400" : "text-white/40"
            )}
          >
            {charCount}/{maxLength}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={cn(
          "relative w-12 h-12 sm:w-14 sm:h-14 text-dark rounded-full flex items-center justify-center",
          "transition-all duration-300 disabled:cursor-not-allowed shrink-0 overflow-hidden",
          "group shadow-2xl",
          "before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent",
          disabled || !value.trim() 
            ? "opacity-40 scale-90 blur-[0.5px]" 
            : "hover:scale-110 hover:rotate-12 active:scale-95 active:rotate-0 hover:shadow-[0_0_30px_rgba(242,255,88,0.6)]",
          buttonClassName
        )}
        style={{
          background: disabled || !value.trim()
            ? 'linear-gradient(135deg, #4a4a4a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f2ff58 0%, #ffd700 50%, #e8f542 100%)',
          boxShadow: disabled || !value.trim()
            ? '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
            : '0 8px 25px rgba(242, 255, 88, 0.6), 0 0 50px rgba(242, 255, 88, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.5)',
          border: disabled || !value.trim() 
            ? '2px solid rgba(255, 255, 255, 0.1)'
            : '2px solid rgba(255, 255, 255, 0.3)',
        }}
        aria-label="Send message"
      >
        {/* Animated background glow */}
        {!disabled && value.trim() && (
          <>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                animation: 'shimmer 2s infinite',
                transform: 'translateX(-100%)',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                animation: 'pulse-glow 2s ease-in-out infinite',
                background: 'radial-gradient(circle, rgba(242, 255, 88, 0.5) 0%, rgba(255, 215, 0, 0.3) 40%, transparent 70%)',
              }}
            />
          </>
        )}
        
        {/* Icon with animation */}
        <div className="relative z-10 flex items-center justify-center">
          {disabled ? (
            <div className="relative">
              {/* Rocket launching animation during loading */}
              <Rocket 
                className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 text-yellow-400",
                  isRTL ? "rotate-[315deg]" : "rotate-45"
                )}
                style={{
                  strokeWidth: 2.5,
                  animation: 'rocket-loading 1.5s ease-in-out infinite',
                }}
              />
              {/* Glow effect during loading */}
              <div className="absolute inset-0 blur-sm">
                <Rocket 
                  className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 opacity-60",
                    isRTL ? "rotate-[315deg]" : "rotate-45"
                  )}
                  style={{
                    strokeWidth: 3,
                    animation: 'rocket-loading 1.5s ease-in-out infinite',
                  }}
                />
              </div>
              {/* Continuous smoke trail during loading */}
              <div 
                className="absolute inset-0 w-6 h-6 rounded-full bg-yellow-400/30 blur-lg"
                style={{
                  animation: 'smoke-continuous 1s ease-out infinite',
                }}
              />
            </div>
          ) : (
            <>
              {/* Main Send Icon with enhanced styling */}
              <div className="relative">
                {/* Glow layer behind icon */}
                {value.trim() && (
                  <div 
                    className="absolute inset-0 blur-md opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, transparent 70%)',
                    }}
                  />
                )}
                
                {/* Icon with gradient effect */}
                <Rocket 
                  className={cn(
                    "relative w-5 h-5 sm:w-6 sm:h-6 transition-all",
                    "filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
                    isRTL ? "rotate-[315deg]" : "rotate-45",
                    isLaunching 
                      ? "" 
                      : value.trim() 
                        ? "duration-300 group-hover:-translate-y-2 group-hover:scale-125 group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" 
                        : "duration-300 opacity-60"
                  )}
                  style={{
                    strokeWidth: 2.5,
                    animation: isLaunching ? 'rocket-launch 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
                  }}
                />
                
                {/* Duplicate icon for glow effect */}
                {value.trim() && (
                  <Rocket 
                    className={cn(
                      "absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 blur-[2px] opacity-40 transition-all duration-300",
                      "group-hover:blur-[4px] group-hover:opacity-60",
                      isRTL ? "rotate-[315deg]" : "rotate-45"
                    )}
                    style={{
                      strokeWidth: 3,
                      animation: isLaunching ? 'rocket-launch 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
                    }}
                  />
                )}
                
                {/* Rocket smoke trail during launch */}
                {isLaunching && (
                  <>
                    <div 
                      className="absolute inset-0 w-8 h-8 rounded-full bg-white/30 blur-xl"
                      style={{
                        animation: 'smoke-trail 0.8s ease-out forwards',
                      }}
                    />
                    <div 
                      className="absolute inset-0 w-6 h-6 rounded-full bg-yellow-400/40 blur-lg"
                      style={{
                        animation: 'smoke-trail 0.8s ease-out 0.1s forwards',
                      }}
                    />
                  </>
                )}
              </div>
              
              {/* Sparkles and effects */}
              {value.trim() && (
                <>
                  {/* Top-right sparkle */}
                  <Sparkles 
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                    style={{ animation: 'sparkle 1.5s ease-in-out infinite' }}
                  />
                  
                  {/* Bottom-left sparkle */}
                  <Sparkles 
                    className="absolute w-2 h-2 sm:w-3 sm:h-3 -bottom-0.5 -left-0.5 opacity-0 group-hover:opacity-80 transition-all duration-300 text-white/80 drop-shadow-[0_0_3px_rgba(255,255,255,0.6)]"
                    style={{ animation: 'sparkle 1.8s ease-in-out infinite 0.3s' }}
                  />
                  
                  {/* Expanding ring effect */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-white/30 scale-100 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-500"
                  />
                  
                  {/* Pulsing ring */}
                  <div 
                    className="absolute inset-0 rounded-full border border-white/20"
                    style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                  />
                </>
              )}
            </>
          )}
        </div>
      </button>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes rocket-launch {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateY(-5px) scale(1.1);
            opacity: 1;
          }
          60% {
            transform: translateY(-40px) scale(1.3);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes smoke-trail {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0.6;
          }
          50% {
            transform: translateY(20px) scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: translateY(50px) scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes rocket-loading {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          25% {
            transform: translateY(-8px) scale(1.1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-15px) scale(1.15);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-8px) scale(1.1);
            opacity: 0.9;
          }
        }
        
        @keyframes smoke-continuous {
          0% {
            transform: translateY(0) scale(0.3);
            opacity: 0.5;
          }
          50% {
            transform: translateY(15px) scale(1);
            opacity: 0.2;
          }
          100% {
            transform: translateY(30px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
