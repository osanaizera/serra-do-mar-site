"use client";

import { useMemo } from "react";
import { useSDCMSMetadata } from "./useSDCMSMetadata";
import type { BlogPostListOptions, PostMetadata } from "../types";

/**
 * React hook to fetch and filter blog posts from SDCMS
 * 
 * @example
 * ```tsx
 * const { posts, isLoading, error } = useBlogPosts({
 *   apiUrl: "https://cms.salesdrive.com.br",
 *   clientSlug: "sales-drive",
 *   limit: 6,
 *   tags: ["energia", "solar"]
 * });
 * ```
 */
export function useBlogPosts(
  apiUrl: string,
  clientSlug: string,
  options?: BlogPostListOptions
) {
  const { metadata, error, isLoading } = useSDCMSMetadata(apiUrl, clientSlug);

  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;
  const type = options?.type;
  const lang = options?.lang;
  const tagsKey = options?.tags?.join(",") ?? "";

  const posts = useMemo(() => {
    if (!metadata?.posts) return [];

    let filtered = [...metadata.posts];

    // Apply filters
    if (tagsKey) {
      const tags = tagsKey.split(",");
      filtered = filtered.filter((post) =>
        tags.some((tag) => post.tags.includes(tag))
      );
    }

    if (type) {
      filtered = filtered.filter((post) => post.type === type);
    }

    if (lang) {
      filtered = filtered.filter((post) => post.lang === lang);
    }

    // Apply pagination
    filtered = filtered.slice(offset, offset + limit);

    return filtered;
  }, [metadata, limit, offset, type, lang, tagsKey]);

  return {
    posts,
    total: metadata?.posts.length || 0,
    error,
    isLoading,
  };
}
