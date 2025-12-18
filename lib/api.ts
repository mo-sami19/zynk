// API configuration and utilities
// Comprehensive API integration for Zynk website

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Common Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Localized Content
export interface LocalizedContent {
  en: string;
  ar: string;
}

// Service Types
export interface Service {
  id: number;
  slug: string;
  title: LocalizedContent;
  description: LocalizedContent;
  short_description: LocalizedContent;
  icon: string;
  image: string | null;
  features: LocalizedContent[];
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// Project Types
export interface Project {
  id: number;
  slug: string;
  title: LocalizedContent;
  description: LocalizedContent;
  short_description: LocalizedContent;
  client_name: string;
  client_logo: string | null;
  thumbnail: string | null;
  images: string[];
  category: string;
  technologies: string[];
  url: string | null;
  is_featured: boolean;
  is_active: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

// Blog Post Types
export interface Post {
  id: number;
  slug: string;
  title: LocalizedContent;
  content: LocalizedContent;
  excerpt: LocalizedContent;
  thumbnail: string | null;
  category: string;
  tags: string[];
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
  is_published: boolean;
  published_at: string | null;
  reading_time: number;
  views_count: number;
  seo: {
    meta_title: LocalizedContent;
    meta_description: LocalizedContent;
    keywords: string[];
  } | null;
  created_at: string;
  updated_at: string;
}

// Team Member Types
export interface TeamMember {
  id: number;
  name: LocalizedContent;
  position: LocalizedContent;
  bio: LocalizedContent;
  image: string | null;
  email: string | null;
  phone: string | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  client_name: LocalizedContent;
  client_position: LocalizedContent;
  client_company: string;
  client_image: string | null;
  content: LocalizedContent;
  rating: number;
  is_featured: boolean;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// Pricing Types
export interface PricingPlan {
  id: number;
  name: LocalizedContent;
  description: LocalizedContent;
  price: number;
  currency: string;
  billing_period: 'monthly' | 'yearly' | 'one-time';
  features: LocalizedContent[];
  is_featured: boolean;
  is_active: boolean;
  order: number;
  cta_text: LocalizedContent;
  created_at: string;
  updated_at: string;
}

// Partner Types
export interface Partner {
  id: number;
  slug: string;
  name: string;
  logo: string;
  website: string | null;
  description: LocalizedContent | null;
  type: 'client' | 'partner' | 'sponsor';
  is_featured: boolean;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// Contact Types
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
}

// Settings Types
export interface Settings {
  [key: string]: string | number | boolean | object;
}

// SEO Types
export interface SeoData {
  meta_title: LocalizedContent;
  meta_description: LocalizedContent;
  keywords: string[];
  og_image: string | null;
  schema_markup: object | null;
}

// Chatbot Types
export interface ChatbotResponse {
  success: boolean;
  data: {
    session_id: string;
    message: string;
    suggested_actions?: string[];
    input_type: string;
    is_complete: boolean;
    lead_score: number;
    language: string;
  };
}

export interface ChatHistoryResponse {
  success: boolean;
  data: {
    session_id: string;
    chat_history: Array<{ role: 'user' | 'bot'; message: string; timestamp: string }>;
    lead_score: number;
    is_complete: boolean;
    lead_info: {
      name: string | null;
      email: string | null;
      phone: string | null;
      services: string[] | null;
    };
  };
}

export interface ChatbotRatingResponse {
  success: boolean;
  data: {
    session_id: string;
    chat_rating: {
      rating: number;
      feedback: string | null;
      rated_at: string;
    };
  };
}

// ============================================================================
// API HELPER FUNCTIONS
// ============================================================================

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log('🌐 Website API Request:');
  console.log('  API_BASE_URL:', API_BASE_URL);
  console.log('  Full URL:', url);
  console.log('  Endpoint:', endpoint);
  
  const defaultHeaders: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  console.log('  Response status:', response.status);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('  ❌ API Error:', error);
    throw new Error(error.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('  ✅ Response data:', data);
  
  return data;
}

// ============================================================================
// SERVICES API
// ============================================================================

export const servicesApi = {
  /** Get all active services */
  async getAll(): Promise<ApiResponse<Service[]>> {
    return fetchApi('/v1/services');
  },

  /** Get a single service by slug */
  async getBySlug(slug: string): Promise<ApiResponse<Service>> {
    return fetchApi(`/v1/services/${slug}`);
  },
};

// ============================================================================
// PROJECTS API
// ============================================================================

export const projectsApi = {
  /** Get all active projects */
  async getAll(params?: { 
    category?: string; 
    featured?: boolean;
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<Project>> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.featured) searchParams.set('featured', '1');
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.per_page) searchParams.set('per_page', params.per_page.toString());
    
    const query = searchParams.toString();
    return fetchApi(`/v1/projects${query ? `?${query}` : ''}`);
  },

  /** Get a single project by slug */
  async getBySlug(slug: string): Promise<ApiResponse<Project>> {
    return fetchApi(`/v1/projects/${slug}`);
  },
};

// ============================================================================
// BLOG POSTS API
// ============================================================================

export const postsApi = {
  /** Get all published posts */
  async getAll(params?: {
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<Post>> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.per_page) searchParams.set('per_page', params.per_page.toString());
    
    const query = searchParams.toString();
    return fetchApi(`/v1/posts${query ? `?${query}` : ''}`);
  },

  /** Get a single post by slug */
  async getBySlug(slug: string): Promise<ApiResponse<Post>> {
    return fetchApi(`/v1/posts/${slug}`);
  },
};

// ============================================================================
// TEAM API
// ============================================================================

export const teamApi = {
  /** Get all active team members */
  async getAll(): Promise<ApiResponse<TeamMember[]>> {
    return fetchApi('/v1/team');
  },
};

// ============================================================================
// TESTIMONIALS API
// ============================================================================

export const testimonialsApi = {
  /** Get all active testimonials */
  async getAll(params?: { featured?: boolean }): Promise<ApiResponse<Testimonial[]>> {
    const searchParams = new URLSearchParams();
    if (params?.featured) searchParams.set('featured', '1');
    
    const query = searchParams.toString();
    return fetchApi(`/v1/testimonials${query ? `?${query}` : ''}`);
  },
};

// ============================================================================
// PRICING API
// ============================================================================

export const pricingApi = {
  /** Get all active pricing plans */
  async getAll(): Promise<ApiResponse<PricingPlan[]>> {
    return fetchApi('/v1/pricing');
  },
};

// ============================================================================
// PARTNERS API
// ============================================================================

export const partnersApi = {
  /** Get all active partners */
  async getAll(params?: { 
    type?: 'client' | 'partner' | 'sponsor';
    featured?: boolean;
  }): Promise<ApiResponse<Partner[]>> {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('type', params.type);
    if (params?.featured) searchParams.set('featured', '1');
    
    const query = searchParams.toString();
    return fetchApi(`/v1/partners${query ? `?${query}` : ''}`);
  },

  /** Get partner types */
  async getTypes(): Promise<ApiResponse<string[]>> {
    return fetchApi('/v1/partners/types');
  },

  /** Get a single partner by slug */
  async getBySlug(slug: string): Promise<ApiResponse<Partner>> {
    return fetchApi(`/v1/partners/${slug}`);
  },
};

// ============================================================================
// CONTACT API
// ============================================================================

export const contactApi = {
  /** Submit a contact form */
  async submit(data: ContactMessage): Promise<ApiResponse<{ id: number }>> {
    // Security: Validate input lengths to prevent spam/attacks
    const MAX_NAME_LENGTH = 100;
    const MAX_EMAIL_LENGTH = 255;
    const MAX_PHONE_LENGTH = 20;
    const MAX_SUBJECT_LENGTH = 200;
    const MAX_MESSAGE_LENGTH = 1000;
    
    if (data.name.length > MAX_NAME_LENGTH) {
      throw new Error(`Name too long. Maximum ${MAX_NAME_LENGTH} characters allowed.`);
    }
    if (data.email.length > MAX_EMAIL_LENGTH) {
      throw new Error(`Email too long. Maximum ${MAX_EMAIL_LENGTH} characters allowed.`);
    }
    if (data.phone && data.phone.length > MAX_PHONE_LENGTH) {
      throw new Error(`Phone too long. Maximum ${MAX_PHONE_LENGTH} characters allowed.`);
    }
    if (data.subject.length > MAX_SUBJECT_LENGTH) {
      throw new Error(`Subject too long. Maximum ${MAX_SUBJECT_LENGTH} characters allowed.`);
    }
    if (data.message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`);
    }
    
    return fetchApi('/v1/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================================================
// SETTINGS API
// ============================================================================

export const settingsApi = {
  /** Get all settings */
  async getAll(): Promise<ApiResponse<Settings>> {
    return fetchApi('/v1/settings');
  },

  /** Get settings by group */
  async getByGroup(group: string): Promise<ApiResponse<Settings>> {
    return fetchApi(`/v1/settings/${group}`);
  },
};

// ============================================================================
// SEO API
// ============================================================================

export const seoApi = {
  /** Get SEO data for a specific page */
  async get(type: string, slug: string): Promise<ApiResponse<SeoData>> {
    return fetchApi(`/v1/seo/${type}/${slug}`);
  },
};

// ============================================================================
// CHATBOT API
// ============================================================================

export const chatbotApi = {
  /** Start or continue a chat session with AI */
  async chat(params: {
    session_id?: string;
    message?: string;
    language?: 'en' | 'ar';
  }): Promise<ChatbotResponse> {
    // Security: Validate message length before sending to prevent spam/attacks
    const MAX_MESSAGE_LENGTH = 500;
    if (params.message && params.message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`);
    }
    
    return fetchApi('/v1/chatbot', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  /** Rate a finished chatbot session */
  async rate(params: {
    session_id: string;
    rating: 1 | 2 | 3 | 4 | 5;
    feedback?: string;
  }): Promise<ChatbotRatingResponse> {
    return fetchApi('/v1/chatbot/rate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  /** Get chat history for a session */
  async getHistory(sessionId: string): Promise<ChatHistoryResponse> {
    return fetchApi(`/v1/chatbot/history/${sessionId}`);
  },

  /** Get available services for chatbot */
  async getServices(): Promise<ApiResponse<Record<string, LocalizedContent>>> {
    return fetchApi('/v1/chatbot/services');
  },
};

// ============================================================================
// COMBINED API EXPORT
// ============================================================================

export const api = {
  services: servicesApi,
  projects: projectsApi,
  posts: postsApi,
  team: teamApi,
  testimonials: testimonialsApi,
  pricing: pricingApi,
  partners: partnersApi,
  contact: contactApi,
  settings: settingsApi,
  seo: seoApi,
  chatbot: chatbotApi,
};

export default api;

