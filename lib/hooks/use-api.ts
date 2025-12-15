'use client';

import {
    api,
    ContactMessage,
    Partner,
    Post,
    PricingPlan,
    Project,
    SeoData,
    Service,
    Settings,
    TeamMember,
    Testimonial,
} from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

// ============================================================================
// GENERIC FETCH HOOK
// ============================================================================

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

function useFetch<T>(
  fetchFn: () => Promise<{ data: T }>,
  dependencies: unknown[] = []
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetchFn();
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

// ============================================================================
// SERVICES HOOKS
// ============================================================================

export function useServices() {
  return useFetch<Service[]>(() => api.services.getAll());
}

export function useService(slug: string) {
  return useFetch<Service>(() => api.services.getBySlug(slug), [slug]);
}

// ============================================================================
// PROJECTS HOOKS
// ============================================================================

export function useProjects(params?: {
  category?: string;
  featured?: boolean;
  page?: number;
  per_page?: number;
}) {
  const [state, setState] = useState<{
    data: Project[];
    meta: { current_page: number; last_page: number; per_page: number; total: number } | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: [],
    meta: null,
    loading: true,
    error: null,
  });

  const category = params?.category;
  const featured = params?.featured;
  const page = params?.page;
  const perPage = params?.per_page;

  const fetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.projects.getAll({ category, featured, page, per_page: perPage });
      setState({ data: response.data, meta: response.meta, loading: false, error: null });
    } catch (error) {
      setState({ data: [], meta: null, loading: false, error: error as Error });
    }
  }, [category, featured, page, perPage]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useProject(slug: string) {
  return useFetch<Project>(() => api.projects.getBySlug(slug), [slug]);
}

// ============================================================================
// BLOG POSTS HOOKS
// ============================================================================

export function usePosts(params?: {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  per_page?: number;
}) {
  const [state, setState] = useState<{
    data: Post[];
    meta: { current_page: number; last_page: number; per_page: number; total: number } | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: [],
    meta: null,
    loading: true,
    error: null,
  });

  const category = params?.category;
  const tag = params?.tag;
  const search = params?.search;
  const page = params?.page;
  const perPage = params?.per_page;

  const fetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.posts.getAll({ category, tag, search, page, per_page: perPage });
      setState({ data: response.data, meta: response.meta, loading: false, error: null });
    } catch (error) {
      setState({ data: [], meta: null, loading: false, error: error as Error });
    }
  }, [category, tag, search, page, perPage]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function usePost(slug: string) {
  return useFetch<Post>(() => api.posts.getBySlug(slug), [slug]);
}

// ============================================================================
// TEAM HOOKS
// ============================================================================

export function useTeam() {
  return useFetch<TeamMember[]>(() => api.team.getAll());
}

// ============================================================================
// TESTIMONIALS HOOKS
// ============================================================================

export function useTestimonials(params?: { featured?: boolean }) {
  return useFetch<Testimonial[]>(
    () => api.testimonials.getAll(params),
    [params?.featured]
  );
}

// ============================================================================
// PRICING HOOKS
// ============================================================================

export function usePricing() {
  return useFetch<PricingPlan[]>(() => api.pricing.getAll());
}

// ============================================================================
// PARTNERS HOOKS
// ============================================================================

export function usePartners(params?: {
  type?: 'client' | 'partner' | 'sponsor';
  featured?: boolean;
}) {
  return useFetch<Partner[]>(
    () => api.partners.getAll(params),
    [params?.type, params?.featured]
  );
}

export function usePartner(slug: string) {
  return useFetch<Partner>(() => api.partners.getBySlug(slug), [slug]);
}

// ============================================================================
// SETTINGS HOOKS
// ============================================================================

export function useSettings() {
  return useFetch<Settings>(() => api.settings.getAll());
}

export function useSettingsGroup(group: string) {
  return useFetch<Settings>(() => api.settings.getByGroup(group), [group]);
}

// ============================================================================
// SEO HOOKS
// ============================================================================

export function useSeo(type: string, slug: string) {
  return useFetch<SeoData>(() => api.seo.get(type, slug), [type, slug]);
}

// ============================================================================
// CONTACT HOOK
// ============================================================================

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (data: ContactMessage) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await api.contact.submit(data);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { submit, loading, error, success, reset };
}
