/**
 * @sdcms/nextjs - Next.js SDK for SDCMS Headless CMS
 * 
 * Server-safe exports. This entry point does NOT include SWR or
 * any client-only React hooks, so it can be safely imported in
 * Server Components, generateMetadata, sitemap.ts, etc.
 * 
 * For client-side hooks (useSDCMSMetadata, useBlogPosts),
 * import from "@sdcms/nextjs/client".
 */

// Client (API client — server-safe, no React dependency)
export { SDCMSClient, createSDCMSClient } from "./client";

// Components (server-safe — no "use client" needed for script tags)
export { SDCMSJsonLd } from "./components";

// Utils
export { generateMetadataFromSDCMS, generateSitemapFromSDCMS } from "./utils";

// Types
export type {
  SDCMSConfig,
  SEOMetadataResponse,
  OrganizationSchema,
  WebSiteSchema,
  SitemapEntry,
  DefaultMeta,
  PostMetadata,
  BlogPostListOptions,
  UseSDCMSMetadataOptions,
} from "./types";
