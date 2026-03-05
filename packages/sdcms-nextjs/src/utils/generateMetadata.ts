import type { DefaultMeta, PostMetadata } from "../types";

type OpenGraphType =
  | "article"
  | "website"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

type TwitterCardType = "summary" | "summary_large_image" | "app" | "player";

/**
 * Metadata shape compatible with Next.js App Router's Metadata type.
 * We intentionally don't import from "next" to avoid cross-package
 * type resolution issues when using file: dependencies.
 */
export interface SDCMSMetadataResult {
  title: string;
  description: string;
  keywords: string[];
  authors: Array<{ name: string }>;
  openGraph: {
    type: OpenGraphType;
    title: string;
    description: string;
    images: Array<{ url: string }>;
    publishedTime?: string;
    modifiedTime?: string;
  };
  twitter: {
    card: TwitterCardType;
    title: string;
    description: string;
    images: string[];
    site?: string;
  };
  other?: Record<string, string>;
}

/**
 * Generate Next.js Metadata object from SDCMS data
 * For use in Server Components with Next.js 13+ App Router
 *
 * The return type is structurally compatible with Next.js Metadata,
 * so you can return it directly from generateMetadata().
 *
 * @example
 * ```tsx
 * // app/blog/[slug]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const metadata = await getSDCMSMetadata();
 *   const post = metadata.posts.find(p => p.url.includes(params.slug));
 *
 *   return generateMetadataFromSDCMS(metadata.meta, post);
 * }
 * ```
 */
export function generateMetadataFromSDCMS(
  defaultMeta: DefaultMeta,
  post?: PostMetadata
): SDCMSMetadataResult {
  const title = post?.title || defaultMeta.title;
  const description = post?.description || defaultMeta.description;
  const image = post?.image || defaultMeta.ogImage;

  const openGraph = {
    type: (post?.ogType || defaultMeta.ogType) as OpenGraphType,
    title,
    description,
    images: image ? [{ url: image }] : [],
    ...(post?.publishedAt && {
      publishedTime: post.publishedAt,
    }),
    ...(post?.updatedAt && {
      modifiedTime: post.updatedAt,
    }),
  };

  const twitter = {
    card: (post?.twitterCard || defaultMeta.twitterCard) as TwitterCardType,
    title,
    description,
    images: image ? [image] : [],
    ...(defaultMeta.twitterSite && {
      site: defaultMeta.twitterSite,
    }),
  };

  return {
    title,
    description,
    keywords: defaultMeta.keywords,
    authors: post?.author ? [{ name: post.author }] : [{ name: defaultMeta.author }],
    openGraph,
    twitter,
    ...(post?.tags && {
      other: {
        tags: post.tags.join(", "),
      },
    }),
  };
}

/**
 * Generate sitemap entries for Next.js sitemap.xml
 *
 * @example
 * ```tsx
 * // app/sitemap.ts
 * export default async function sitemap() {
 *   const metadata = await getSDCMSMetadata();
 *   return generateSitemapFromSDCMS(metadata.sitemap.entries);
 * }
 * ```
 */
export function generateSitemapFromSDCMS(entries: Array<{
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}>) {
  return entries.map((entry) => ({
    url: entry.loc,
    lastModified: new Date(entry.lastmod),
    changeFrequency: entry.changefreq as
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never",
    priority: entry.priority,
  }));
}
