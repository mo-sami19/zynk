import { postsApi, projectsApi, servicesApi } from '@/lib/api'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/digital-marketing-egypt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ar/digital-marketing-egypt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/en/social-media-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/social-media-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/performance-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/performance-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/branding-agency-egypt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/branding-agency-egypt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic content arrays
  let blogPages: MetadataRoute.Sitemap = []
  let servicePages: MetadataRoute.Sitemap = []
  let projectPages: MetadataRoute.Sitemap = []

  // Fetch dynamic blog posts
  try {
    const response = await postsApi.getAll()
    const posts = (response as any).data || response
    blogPages = posts.flatMap((post: any) => [
      {
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/ar/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ])
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Fetch dynamic services
  try {
    const response = await servicesApi.getAll()
    const services = (response as any).data || response
    servicePages = services.flatMap((service: any) => [
      {
        url: `${baseUrl}/en/services/${service.slug}`,
        lastModified: new Date(service.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      },
      {
        url: `${baseUrl}/ar/services/${service.slug}`,
        lastModified: new Date(service.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      },
    ])
  } catch (error) {
    console.error('Error fetching services for sitemap:', error)
  }

  // Fetch dynamic projects
  try {
    const response = await projectsApi.getAll()
    const projects = (response as any).data || response
    projectPages = projects.flatMap((project: any) => [
      {
        url: `${baseUrl}/en/projects/${project.slug}`,
        lastModified: new Date(project.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      },
      {
        url: `${baseUrl}/ar/projects/${project.slug}`,
        lastModified: new Date(project.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      },
    ])
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  return [...staticPages, ...blogPages, ...servicePages, ...projectPages]
}
