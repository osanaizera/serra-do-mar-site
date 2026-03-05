"use client";
// @sdcms/nextjs/client - Client hooks (SWR)

// src/hooks/useSDCMSMetadata.ts
import { default as useSWR } from "swr";
function useSDCMSMetadata(apiUrl, clientSlug, options) {
  const {
    autoRefetch = true,
    refetchInterval = 36e5
    // 1 hour
  } = options || {};
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    return response.json();
  };
  const { data, error, isLoading, mutate } = useSWR(
    `${apiUrl}/api/public/seo-metadata?slug=${clientSlug}`,
    fetcher,
    {
      refreshInterval: autoRefetch ? refetchInterval : 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 1e4
    }
  );
  return {
    metadata: data,
    error,
    isLoading,
    refetch: mutate
  };
}

// src/hooks/useBlogPosts.ts
import { useMemo } from "react";
function useBlogPosts(apiUrl, clientSlug, options) {
  const { metadata, error, isLoading } = useSDCMSMetadata(apiUrl, clientSlug);
  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;
  const type = options?.type;
  const lang = options?.lang;
  const tagsKey = options?.tags?.join(",") ?? "";
  const posts = useMemo(() => {
    if (!metadata?.posts) return [];
    let filtered = [...metadata.posts];
    if (tagsKey) {
      const tags = tagsKey.split(",");
      filtered = filtered.filter(
        (post) => tags.some((tag) => post.tags.includes(tag))
      );
    }
    if (type) {
      filtered = filtered.filter((post) => post.type === type);
    }
    if (lang) {
      filtered = filtered.filter((post) => post.lang === lang);
    }
    filtered = filtered.slice(offset, offset + limit);
    return filtered;
  }, [metadata, limit, offset, type, lang, tagsKey]);
  return {
    posts,
    total: metadata?.posts.length || 0,
    error,
    isLoading
  };
}
export {
  useBlogPosts,
  useSDCMSMetadata
};
//# sourceMappingURL=client.mjs.map