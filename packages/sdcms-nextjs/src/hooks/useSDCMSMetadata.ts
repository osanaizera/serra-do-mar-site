"use client";

import { default as useSWR } from "swr";
import type { SEOMetadataResponse, UseSDCMSMetadataOptions } from "../types";

/**
 * React hook to fetch SDCMS SEO metadata with SWR caching
 * 
 * @example
 * ```tsx
 * const { data, error, isLoading } = useSDCMSMetadata({
 *   apiUrl: "https://cms.salesdrive.com.br",
 *   clientSlug: "sales-drive"
 * });
 * ```
 */
export function useSDCMSMetadata(
  apiUrl: string,
  clientSlug: string,
  options?: UseSDCMSMetadataOptions
) {
  const {
    autoRefetch = true,
    refetchInterval = 3600000, // 1 hour
  } = options || {};

  const fetcher = async (url: string): Promise<SEOMetadataResponse> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    return response.json();
  };

  const { data, error, isLoading, mutate } = useSWR<SEOMetadataResponse>(
    `${apiUrl}/api/public/seo-metadata?slug=${clientSlug}`,
    fetcher,
    {
      refreshInterval: autoRefetch ? refetchInterval : 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
    }
  );

  return {
    metadata: data,
    error,
    isLoading,
    refetch: mutate,
  };
}
