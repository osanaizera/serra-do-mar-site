/**
 * @sdcms/nextjs/client - Client-side hooks for SDCMS
 * 
 * This entry point includes React hooks that depend on SWR.
 * Only import this in Client Components ("use client").
 * 
 * @example
 * ```tsx
 * "use client";
 * import { useSDCMSMetadata, useBlogPosts } from "@sdcms/nextjs/client";
 * ```
 */

export { useSDCMSMetadata } from "./hooks/useSDCMSMetadata";
export { useBlogPosts } from "./hooks/useBlogPosts";

// Re-export types used by hooks
export type {
  SEOMetadataResponse,
  UseSDCMSMetadataOptions,
  BlogPostListOptions,
  PostMetadata,
} from "./types";
