// @sdcms/nextjs - Server-safe exports

// src/client.ts
var SDCMSClient = class {
  constructor(config) {
    this.cache = { promise: null, expiresAt: 0 };
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
      apiUrl: config.apiUrl.replace(/\/+$/, "")
    };
  }
  log(...args) {
    if (this.config.debug) {
      console.log("[SDCMS]", ...args);
    }
  }
  async fetchAPI(endpoint, options = {}) {
    const url = `${this.config.apiUrl}${endpoint}`;
    this.log("Fetching:", url);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        },
        // Next.js extends RequestInit with `next` options for ISR/caching
        next: {
          revalidate: this.config.revalidate
        }
      });
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
  async getSEOMetadata() {
    if (this.cache.promise && Date.now() < this.cache.expiresAt) {
      this.log("Returning cached metadata");
      return this.cache.promise;
    }
    const promise = this.fetchAPI(
      `/api/public/seo-metadata?slug=${this.config.clientSlug}`
    );
    this.cache = {
      promise,
      expiresAt: Date.now() + this.config.revalidate * 1e3
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
  async getSitemapXML() {
    const metadata = await this.getSEOMetadata();
    return metadata.sitemap.xml;
  }
  /**
   * Get robots.txt content
   */
  async getRobotsTxt() {
    const metadata = await this.getSEOMetadata();
    return metadata.robots.txt;
  }
  /**
   * Get organization JSON-LD schema
   */
  async getOrganizationSchema() {
    const metadata = await this.getSEOMetadata();
    return metadata.schemas.organization;
  }
  /**
   * Get website JSON-LD schema
   */
  async getWebSiteSchema() {
    const metadata = await this.getSEOMetadata();
    return metadata.schemas.website;
  }
  /**
   * Get blog posts metadata
   */
  async getBlogPosts(options) {
    const metadata = await this.getSEOMetadata();
    let posts = metadata.posts;
    if (options?.tags && options.tags.length > 0) {
      posts = posts.filter(
        (post) => options.tags.some((tag) => post.tags.includes(tag))
      );
    }
    if (options?.type) {
      posts = posts.filter((post) => post.type === options.type);
    }
    if (options?.lang) {
      posts = posts.filter((post) => post.lang === options.lang);
    }
    const offset = options?.offset || 0;
    const limit = options?.limit || 10;
    posts = posts.slice(offset, offset + limit);
    return posts;
  }
  /**
   * Get single blog post by ID
   */
  async getBlogPost(id) {
    const metadata = await this.getSEOMetadata();
    return metadata.posts.find((post) => post.id === id);
  }
};
function createSDCMSClient(config) {
  return new SDCMSClient(config);
}

// src/components/SDCMSJsonLd.tsx
import { Fragment, jsx } from "react/jsx-runtime";
function SDCMSJsonLd({
  organization,
  website,
  post
}) {
  const schemas = [];
  if (organization) {
    schemas.push(organization);
  }
  if (website) {
    schemas.push(website);
  }
  if (post) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": post.schemaType || "Article",
      headline: post.title,
      description: post.description,
      image: post.image,
      author: {
        "@type": "Person",
        name: post.author
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      ...post.url && { url: post.url }
    };
    schemas.push(articleSchema);
  }
  if (schemas.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: schemas.map((schema, index) => /* @__PURE__ */ jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify(schema, null, 2)
      }
    },
    index
  )) });
}

// src/utils/generateMetadata.ts
function generateMetadataFromSDCMS(defaultMeta, post) {
  const title = post?.title || defaultMeta.title;
  const description = post?.description || defaultMeta.description;
  const image = post?.image || defaultMeta.ogImage;
  const openGraph = {
    type: post?.ogType || defaultMeta.ogType,
    title,
    description,
    images: image ? [{ url: image }] : [],
    ...post?.publishedAt && {
      publishedTime: post.publishedAt
    },
    ...post?.updatedAt && {
      modifiedTime: post.updatedAt
    }
  };
  const twitter = {
    card: post?.twitterCard || defaultMeta.twitterCard,
    title,
    description,
    images: image ? [image] : [],
    ...defaultMeta.twitterSite && {
      site: defaultMeta.twitterSite
    }
  };
  return {
    title,
    description,
    keywords: defaultMeta.keywords,
    authors: post?.author ? [{ name: post.author }] : [{ name: defaultMeta.author }],
    openGraph,
    twitter,
    ...post?.tags && {
      other: {
        tags: post.tags.join(", ")
      }
    }
  };
}
function generateSitemapFromSDCMS(entries) {
  return entries.map((entry) => ({
    url: entry.loc,
    lastModified: new Date(entry.lastmod),
    changeFrequency: entry.changefreq,
    priority: entry.priority
  }));
}
export {
  SDCMSClient,
  SDCMSJsonLd,
  createSDCMSClient,
  generateMetadataFromSDCMS,
  generateSitemapFromSDCMS
};
//# sourceMappingURL=index.mjs.map