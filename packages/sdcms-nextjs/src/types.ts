/**
 * SDCMS Next.js SDK Types
 * Types for headless CMS integration
 */

export interface SDCMSConfig {
  /**
   * SDCMS API base URL
   * @example "https://cms.salesdrive.com.br"
   */
  apiUrl: string;

  /**
   * Client slug in SDCMS
   * @example "sales-drive"
   */
  clientSlug: string;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;

  /**
   * Cache revalidation interval in seconds
   * @default 3600 (1 hour)
   */
  revalidate?: number;
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType?: string;
    email?: string;
    areaServed?: string | string[];
    availableLanguage?: string | string[];
  };
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string | { "@type": "EntryPoint"; urlTemplate: string };
    "query-input"?: string;
  };
}

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export interface DefaultMeta {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  ogType: string;
  ogImage: string;
  twitterCard: string;
  twitterSite: string;
}

export interface PostMetadata {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  lang: string;
  type: string;
  ogType: string;
  twitterCard: string;
  schemaType: string;
}

export interface SEOMetadataResponse {
  client: {
    slug: string;
    name: string;
    domain: string | null;
    pathPattern: string | null;
    defaultLanguage: string | null;
  };
  schemas: {
    organization: OrganizationSchema;
    website: WebSiteSchema;
  };
  sitemap: {
    xml: string;
    entries: SitemapEntry[];
  };
  robots: {
    txt: string;
  };
  meta: DefaultMeta;
  posts: PostMetadata[];
  analytics: {
    ga4PropertyId: string | null;
  };
}

export interface BlogPostListOptions {
  /**
   * Number of posts to return
   * @default 10
   */
  limit?: number;

  /**
   * Offset for pagination
   * @default 0
   */
  offset?: number;

  /**
   * Filter by tags
   */
  tags?: string[];

  /**
   * Filter by post type
   */
  type?: string;

  /**
   * Filter by language
   */
  lang?: string;
}

export interface UseSDCMSMetadataOptions {
  /**
   * Enable automatic refetching
   * @default true
   */
  autoRefetch?: boolean;

  /**
   * Refetch interval in milliseconds
   * @default 3600000 (1 hour)
   */
  refetchInterval?: number;
}
