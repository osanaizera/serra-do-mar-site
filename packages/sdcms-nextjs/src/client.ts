import type { SDCMSConfig, SEOMetadataResponse } from "./types";

/**
 * SDCMS API Client
 * Handles all HTTP requests to the SDCMS API
 */
export class SDCMSClient {
  private config: Required<SDCMSConfig>;
  private cache: {
    promise: Promise<SEOMetadataResponse> | null;
    expiresAt: number;
  } = { promise: null, expiresAt: 0 };

  constructor(config: SDCMSConfig) {
    if (!config.apiUrl) {
      throw new Error("[SDCMS] apiUrl is required");
    }
    if (!config.clientSlug) {
      throw new Error("[SDCMS] clientSlug is required");
    }

    this.config = {
      debug: false,
      revalidate: 3600,
      ...config,
      apiUrl: config.apiUrl.replace(/\/+$/, ""),
    };
  }

  private log(...args: unknown[]) {
    if (this.config.debug) {
      console.log("[SDCMS]", ...args);
    }
  }

  private async fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.apiUrl}${endpoint}`;
    this.log("Fetching:", url);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        // Next.js extends RequestInit with `next` options for ISR/caching
        next: {
          revalidate: this.config.revalidate,
        },
      } as RequestInit);

      if (!response.ok) {
        throw new Error(
          `SDCMS API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      this.log("Response:", data);

      return data;
    } catch (error) {
      console.error("[SDCMS] Error fetching from API:", error);
      throw error;
    }
  }

  /**
   * Fetch all SEO metadata for the configured client.
   * Results are cached in-memory for `revalidate` seconds.
   */
  async getSEOMetadata(): Promise<SEOMetadataResponse> {
    if (this.cache.promise && Date.now() < this.cache.expiresAt) {
      this.log("Returning cached metadata");
      return this.cache.promise;
    }

    const promise = this.fetchAPI<SEOMetadataResponse>(
      `/api/public/seo-metadata?slug=${this.config.clientSlug}`
    );

    this.cache = {
      promise,
      expiresAt: Date.now() + this.config.revalidate * 1000,
    };

    promise.catch(() => {
      this.cache = { promise: null, expiresAt: 0 };
    });

    return promise;
  }

  /**
   * Invalidate the in-memory cache, forcing the next call to refetch.
   */
  invalidateCache() {
    this.cache = { promise: null, expiresAt: 0 };
  }

  /**
   * Get sitemap XML content
   */
  async getSitemapXML(): Promise<string> {
    const metadata = await this.getSEOMetadata();
    return metadata.sitemap.xml;
  }

  /**
   * Get robots.txt content
   */
  async getRobotsTxt(): Promise<string> {
    const metadata = await this.getSEOMetadata();
    return metadata.robots.txt;
  }

  /**
   * Get organization JSON-LD schema
   */
  async getOrganizationSchema(): Promise<object> {
    const metadata = await this.getSEOMetadata();
    return metadata.schemas.organization;
  }

  /**
   * Get website JSON-LD schema
   */
  async getWebSiteSchema(): Promise<object> {
    const metadata = await this.getSEOMetadata();
    return metadata.schemas.website;
  }

  /**
   * Get blog posts metadata
   */
  async getBlogPosts(options?: {
    limit?: number;
    offset?: number;
    tags?: string[];
    type?: string;
    lang?: string;
  }) {
    const metadata = await this.getSEOMetadata();
    let posts = metadata.posts;

    // Apply filters
    if (options?.tags && options.tags.length > 0) {
      posts = posts.filter((post) =>
        options.tags!.some((tag) => post.tags.includes(tag))
      );
    }

    if (options?.type) {
      posts = posts.filter((post) => post.type === options.type);
    }

    if (options?.lang) {
      posts = posts.filter((post) => post.lang === options.lang);
    }

    // Apply pagination
    const offset = options?.offset || 0;
    const limit = options?.limit || 10;
    posts = posts.slice(offset, offset + limit);

    return posts;
  }

  /**
   * Get single blog post by ID
   */
  async getBlogPost(id: string) {
    const metadata = await this.getSEOMetadata();
    return metadata.posts.find((post) => post.id === id);
  }
}

/**
 * Create a new SDCMS client instance
 */
export function createSDCMSClient(config: SDCMSConfig): SDCMSClient {
  return new SDCMSClient(config);
}
