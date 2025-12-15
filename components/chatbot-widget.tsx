"use client"

import { chatbotApi, ChatbotResponse } from '@/lib/api';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Loader2, MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatState {
  sessionId: string | null;
  suggestedActions: string[];
  isComplete: boolean;
  language: string;
}

export function ChatbotWidget() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [ratingHoverValue, setRatingHoverValue] = useState<number | null>(null);
  const [ratingFeedback, setRatingFeedback] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    sessionId: null,
    suggestedActions: [],
    isComplete: false,
    language: locale,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);


  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);


  const addBotMessage = useCallback((content: string) => {
    setMessages(prev => [...prev, { role: 'bot', content, timestamp: new Date() }]);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setMessages(prev => [...prev, { role: 'user', content, timestamp: new Date() }]);
  }, []);

  const handleBotResponse = useCallback((response: ChatbotResponse) => {
    if (response.success && response.data) {
      const { session_id, message, suggested_actions, is_complete, language } = response.data;
      setChatState(prev => ({
        ...prev,
        sessionId: session_id,
        suggestedActions: suggested_actions || [],
        isComplete: is_complete,
        language: language || locale,
      }));
      if (message) addBotMessage(message);
    }
  }, [addBotMessage, locale]);

  const startChat = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await chatbotApi.chat({ language: locale as 'en' | 'ar' });
      handleBotResponse(response);
    } catch (error) {
      console.error('Failed to start chat:', error);
      addBotMessage(locale === 'ar' 
        ? '👋 أهلاً! أنا مساعد زينك الذكي. كيف يمكنني مساعدتك؟' 
        : '👋 Hello! I\'m Zynk AI Assistant. How can I help you today?');
      setChatState(prev => ({
        ...prev,
        suggestedActions: locale === 'ar' 
          ? ['ما هي خدماتكم؟', 'أريد تطوير موقع', 'أحتاج تسويق رقمي']
          : ['What services do you offer?', 'I need a website', 'Tell me about SEO'],
      }));
    } finally {
      setIsLoading(false);
    }
  }, [addBotMessage, handleBotResponse, locale]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoading && !hasInitialized.current) {
      hasInitialized.current = true;
      startChat();
    }
  }, [isOpen, messages.length, isLoading, startChat]);

  useEffect(() => {
    if (isOpen && !isLoading) inputRef.current?.focus();
  }, [isOpen, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 20000);
    
    if (isOpen) {
      setShowTooltip(false);
    }
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Prevent body scroll when chat is open (mobile fix)
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    addUserMessage(message);
    setInputValue('');
    setChatState(prev => ({ ...prev, suggestedActions: [] }));
    setIsLoading(true);
    try {
      const response = await chatbotApi.chat({
        session_id: chatState.sessionId || undefined,
        message,
        language: chatState.language as 'en' | 'ar',
      });
      handleBotResponse(response);
    } catch (error) {
      console.error('Failed to send message:', error);
      addBotMessage(locale === 'ar' ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.' : 'Sorry, an error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const resetChat = () => {
    setMessages([]);
    setInputValue('');
    setRatingValue(null);
    setRatingHoverValue(null);
    setRatingFeedback('');
    setRatingSubmitted(false);
    setIsSubmittingRating(false);
    hasInitialized.current = false;
    setChatState({ sessionId: null, suggestedActions: [], isComplete: false, language: locale });
  };

  const isRTL = chatState.language === 'ar';

  const handleSubmitRating = async () => {
    if (!chatState.sessionId || !ratingValue || isSubmittingRating) return;
    setIsSubmittingRating(true);
    try {
      await chatbotApi.rate({
        session_id: chatState.sessionId,
        rating: ratingValue,
        feedback: ratingFeedback.trim() ? ratingFeedback.trim() : undefined,
      });
      setRatingSubmitted(true);
    } catch (error) {
      console.error('Failed to submit rating:', error);
      addBotMessage(chatState.language === 'ar' ? 'عذراً، لم نستطع إرسال التقييم الآن. حاول مرة أخرى.' : 'Sorry, we could not submit the rating right now. Please try again.');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <>
      {/* Chatbot Button with Tooltip - Opposite Side */}
      <div 
        className={cn(
          "fixed bottom-8 z-[9999] pointer-events-none",
          isRTL ? "right-8" : "left-8"
        )}
      >
        {/* Creative Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: 1 }}
              className={cn(
                "absolute bottom-20 whitespace-nowrap pointer-events-none",
                isRTL ? "right-0" : "left-0"
              )}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 text-dark px-4 py-3 rounded-2xl shadow-2xl border-2 border-primary/50">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    <span className="font-bold text-sm">
                      {isRTL ? '👋 مرحباً! كيف يمكنني مساعدتك؟' : '👋 Hi! How can I help you?'}
                    </span>
                  </div>
                </div>
                {/* Arrow */}
                <div className={cn(
                  "absolute -bottom-2 w-4 h-4 bg-primary rotate-45",
                  isRTL ? "left-6" : "right-6"
                )} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            console.log('Chat button clicked!', { isOpen, willBe: !isOpen });
            setIsOpen(prev => !prev);
          }}
          onTouchStart={() => {
            console.log('Touch started on chat button');
          }}
          className={cn(
            "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-200 touch-manipulation cursor-pointer pointer-events-auto",
            isOpen ? "bg-gradient-to-br from-red-500 to-red-600" : "bg-gradient-to-br from-dark via-dark/95 to-dark/90 border-2 border-primary/30"
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          type="button"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div 
                key="close" 
                initial={{ rotate: -180, scale: 0 }} 
                animate={{ rotate: 0, scale: 1 }} 
                exit={{ rotate: 180, scale: 0 }} 
                transition={{ duration: 0.3, type: "spring" }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div 
                key="bot" 
                initial={{ rotate: 180, scale: 0 }} 
                animate={{ rotate: 0, scale: 1 }} 
                exit={{ rotate: -180, scale: 0 }} 
                transition={{ duration: 0.3, type: "spring" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" style={{ animationDuration: '2s' }} />
          )}
        </button>
      </div>

      {/* Contact Buttons - Collapsible */}
      {!isOpen && (
        <div className={cn(
          "fixed bottom-8 z-50 flex flex-col gap-3",
          isRTL ? "left-8" : "right-8"
        )}>
          <AnimatePresence>
            {showContactButtons && (
              <>
                {/* Call Button */}
                <motion.a
                  href="tel:+1234567890"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-blue-500 hover:bg-blue-400 transition-colors"
                >
                  <Phone className="w-6 h-6 text-white" />
                </motion.a>

                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-green-500 hover:bg-green-400 transition-colors"
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </motion.a>
              </>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <button
            onClick={() => setShowContactButtons(!showContactButtons)}
            className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-primary hover:bg-primary/90 transition-colors"
          >
            <Phone className={cn("w-6 h-6 text-dark transition-transform", showContactButtons && "rotate-45")} />
          </button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 20
            }}
            animate={{ 
              opacity: 1, 
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              y: 20
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
            className={cn(
              "fixed z-[9999] isolate",
              "w-full sm:w-[420px] md:w-[440px]",
              "h-full sm:h-[600px] md:h-[620px]",
              "bg-[#0a0a0a]",
              "shadow-2xl overflow-hidden flex flex-col",
              "inset-0 sm:inset-auto",
              "sm:bottom-24 md:bottom-28",
              "sm:rounded-2xl md:rounded-3xl",
              isRTL ? "sm:right-4 md:right-8" : "sm:left-4 md:left-8"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              WebkitOverflowScrolling: "touch",
              border: '1px solid rgba(242, 255, 88, 0.4)',
              boxShadow: '0 0 40px rgba(242, 255, 88, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Header with AI Badge */}
            <div 
              className="px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(242, 255, 88, 0.15) 0%, rgba(242, 255, 88, 0.05) 100%)',
                borderBottom: '1px solid rgba(242, 255, 88, 0.4)'
              }}
            >
              <div className="relative">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(242, 255, 88, 0.3) 0%, rgba(10, 10, 10, 0.9) 100%)',
                    boxShadow: '0 0 20px rgba(242, 255, 88, 0.5), inset 0 0 20px rgba(242, 255, 88, 0.2)'
                  }}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 z-10">
                    <Image
                      src="/images/assets/snap.png"
                      alt="Zynk AI"
                      fill
                      className="object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
                    />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-dark shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
                  {isRTL ? 'مساعد زينك الذكي' : 'Zynk AI Assistant'}
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </h3>
                <p className="text-[10px] sm:text-xs text-primary/90 font-medium flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  {isRTL ? 'متصل الآن' : 'Online Now'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChat} className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-all px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-primary/10 font-medium shrink-0">
                  {isRTL ? '🔄 جديد' : '🔄 Reset'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors group shrink-0"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn("flex", msg.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start'))}
                >
                  <div 
                    className={cn(
                      "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm whitespace-pre-wrap",
                      msg.role === 'user' 
                        ? "text-dark rounded-br-sm font-medium" 
                        : "text-white rounded-bl-sm"
                    )}
                    style={msg.role === 'user' ? {
                      background: 'linear-gradient(135deg, #f2ff58 0%, #e8f542 100%)',
                      boxShadow: '0 4px 15px rgba(242, 255, 88, 0.3)'
                    } : {
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(242, 255, 88, 0.3)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("flex", isRTL ? 'justify-end' : 'justify-start')}>
                  <div className="bg-white/10 rounded-2xl px-4 py-3 rounded-bl-sm flex gap-1">
                    <motion.div className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
                    <motion.div className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {chatState.suggestedActions.length > 0 && !isLoading && (
              <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-1.5 sm:gap-2">
                {chatState.suggestedActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage(action)}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs bg-gradient-to-r from-white/15 to-white/10 text-white hover:from-primary/30 hover:to-primary/20 transition-all border border-white/10 hover:border-primary/30 font-medium shadow-sm"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            )}

            {chatState.isComplete ? (
              <div className="p-3 sm:p-4 border-t border-white/10">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-primary/25 to-primary/15 border border-primary/40 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-lg"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-primary text-3xl sm:text-4xl mb-2 sm:mb-3"
                  >
                    ✅
                  </motion.div>
                  <p className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">
                    {isRTL ? 'شكراً لك!' : 'Thank you!'}
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                    {isRTL 
                      ? 'سيتواصل معك فريقنا قريباً 📱' 
                      : 'Our team will contact you soon 📱'}
                  </p>

                  {!ratingSubmitted ? (
                    <div className="mb-3 sm:mb-4">
                      <p className="text-white font-semibold text-xs sm:text-sm mb-2">
                        {isRTL ? 'قيّم الشات' : 'Rate this chat'}
                      </p>
                      <div className="flex items-center justify-center gap-1 mb-2" dir="ltr">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isActive = (ratingHoverValue ?? ratingValue ?? 0) >= star;
                          return (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setRatingHoverValue(star)}
                              onMouseLeave={() => setRatingHoverValue(null)}
                              onClick={() => setRatingValue(star as 1 | 2 | 3 | 4 | 5)}
                              className={cn(
                                'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors',
                                isActive ? 'bg-primary/25' : 'bg-white/5 hover:bg-white/10'
                              )}
                              aria-label={`Rate ${star} stars`}
                            >
                              <span className={cn('text-xl sm:text-2xl', isActive ? 'text-primary' : 'text-white/40')}>★</span>
                            </button>
                          );
                        })}
                      </div>
                      <textarea
                        value={ratingFeedback}
                        onChange={(e) => setRatingFeedback(e.target.value)}
                        placeholder={isRTL ? 'اكتب ملاحظاتك (اختياري)' : 'Write your feedback (optional)'}
                        className="w-full text-white placeholder-white/40 rounded-xl px-3 py-2 text-sm focus:outline-none transition-all"
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(242, 255, 88, 0.2)'
                        }}
                        rows={3}
                        disabled={isSubmittingRating}
                      />
                      <div className="mt-2">
                        <motion.button
                          type="button"
                          onClick={handleSubmitRating}
                          disabled={!ratingValue || isSubmittingRating}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2.5 rounded-xl font-bold text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: 'linear-gradient(135deg, #f2ff58 0%, #e8f542 100%)',
                            boxShadow: '0 4px 20px rgba(242, 255, 88, 0.25)'
                          }}
                        >
                          {isSubmittingRating
                            ? (isRTL ? 'جاري الإرسال...' : 'Submitting...')
                            : (isRTL ? 'إرسال التقييم' : 'Submit rating')}
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 sm:mb-4">
                      <p className="text-white/80 text-xs sm:text-sm">
                        {isRTL ? 'شكراً لتقييمك!' : 'Thanks for your rating!'}
                      </p>
                    </div>
                  )}
                  <div className="pt-3 sm:pt-4 border-t border-white/10">
                    <p className="text-white/50 text-[10px] sm:text-xs font-medium">
                      {isRTL ? 'مدعوم بواسطة' : 'Powered by'}
                    </p>
                    <p className="text-primary font-bold text-sm sm:text-base mt-0.5">
                      Zynk ⚡
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div 
                style={{
                  borderTop: '1px solid rgba(242, 255, 88, 0.4)',
                  background: 'linear-gradient(180deg, rgba(242, 255, 88, 0.05) 0%, rgba(10, 10, 10, 1) 100%)'
                }}
              >
                <form onSubmit={handleSubmit} className="p-3 sm:p-4 flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isRTL ? 'اكتب رسالتك...' : 'Type your message...'}
                    className="flex-1 text-white placeholder-white/40 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base focus:outline-none transition-all"
                    style={{ 
                      fontSize: '16px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(242, 255, 88, 0.3)',
                      boxShadow: '0 0 0 0 rgba(242, 255, 88, 0)'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(242, 255, 88, 0.4)';
                      e.target.style.boxShadow = '0 0 20px rgba(242, 255, 88, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(242, 255, 88, 0.15)';
                      e.target.style.boxShadow = '0 0 0 0 rgba(242, 255, 88, 0)';
                    }}
                    disabled={isLoading}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 sm:w-11 sm:h-11 text-dark rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #f2ff58 0%, #e8f542 100%)',
                      boxShadow: '0 4px 20px rgba(242, 255, 88, 0.4), 0 0 40px rgba(242, 255, 88, 0.2)'
                    }}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Send className={cn("w-4 h-4 sm:w-5 sm:h-5", isRTL && "rotate-180")} />}
                  </motion.button>
                </form>
                <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-center">
                  <p className="text-white/30 text-[9px] sm:text-[10px] font-medium">
                    {isRTL ? 'مدعوم بواسطة' : 'Powered by'} <span className="text-primary font-bold">Zynk ⚡</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}