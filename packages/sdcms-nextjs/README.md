# @sdcms/nextjs

Next.js SDK for SDCMS headless CMS integration with automatic SEO metadata, JSON-LD schemas, and sitemap generation.

## Installation

```bash
npm install @sdcms/nextjs
# or
pnpm add @sdcms/nextjs
# or
yarn add @sdcms/nextjs
```

## Features

- Automatic SEO metadata from SDCMS
- JSON-LD structured data (Organization, Website, Article schemas)
- Sitemap generation from published posts
- robots.txt generation
- React hooks for client-side data fetching
- In-memory caching with configurable TTL
- TypeScript support out of the box
- SWR caching for optimal performance

## Quick Start

### 1. Create the client

```tsx
// lib/sdcms.ts
import { createSDCMSClient } from "@sdcms/nextjs";

export const sdcms = createSDCMSClient({
  apiUrl: "https://your-sdcms-instance.com",
  clientSlug: "your-client-slug",
  // debug: true,       // Enable console logs
  // revalidate: 3600,  // Cache TTL in seconds (default: 1h)
});
```

### 2. Generate metadata (App Router)

```tsx
// app/blog/[slug]/page.tsx
import { generateMetadataFromSDCMS } from "@sdcms/nextjs";
import { sdcms } from "@/lib/sdcms";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const metadata = await sdcms.getSEOMetadata();
  const post = metadata.posts.find((p) => p.url.includes(params.slug));

  return generateMetadataFromSDCMS(metadata.meta, post);
}
```

### 3. JSON-LD schemas in layout

```tsx
// app/layout.tsx
import { SDCMSJsonLd } from "@sdcms/nextjs";
import { sdcms } from "@/lib/sdcms";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const metadata = await sdcms.getSEOMetadata();

  return (
    <html>
      <head>
        <SDCMSJsonLd
          organization={metadata.schemas.organization}
          website={metadata.schemas.website}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 4. Blog list (Server Component)

```tsx
// app/blog/page.tsx
import { sdcms } from "@/lib/sdcms";

export default async function BlogPage() {
  const posts = await sdcms.getBlogPosts({ limit: 10 });

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <a href={post.url}>Read more</a>
        </article>
      ))}
    </div>
  );
}
```

### 5. Blog list (Client Component with hook)

```tsx
"use client";

import { useBlogPosts } from "@sdcms/nextjs";

export function BlogList() {
  const { posts, isLoading, error } = useBlogPosts(
    "https://your-sdcms-instance.com",
    "your-client-slug",
    { limit: 6, tags: ["news"] }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </article>
      ))}
    </div>
  );
}
```

### 6. Sitemap

```tsx
// app/sitemap.ts
import { generateSitemapFromSDCMS } from "@sdcms/nextjs";
import { sdcms } from "@/lib/sdcms";

export default async function sitemap() {
  const metadata = await sdcms.getSEOMetadata();
  return generateSitemapFromSDCMS(metadata.sitemap.entries);
}
```

### 7. Robots.txt

```tsx
// app/robots.ts
import { sdcms } from "@/lib/sdcms";

export default async function robots() {
  const metadata = await sdcms.getSEOMetadata();
  const domain = metadata.client.domain;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
```

## API Reference

### Client

#### `createSDCMSClient(config)`

Creates a new SDCMS client instance.

**Parameters:**
- `config.apiUrl` (string, required): SDCMS API base URL
- `config.clientSlug` (string, required): Client slug in SDCMS
- `config.debug` (boolean, optional): Enable debug logging (default: `false`)
- `config.revalidate` (number, optional): Cache TTL in seconds (default: `3600`)

**Returns:** `SDCMSClient`

#### Client Methods

- `getSEOMetadata()`: Fetch all SEO metadata (cached)
- `invalidateCache()`: Clear the in-memory cache
- `getSitemapXML()`: Get sitemap XML content
- `getRobotsTxt()`: Get robots.txt content
- `getOrganizationSchema()`: Get organization JSON-LD schema
- `getWebSiteSchema()`: Get website JSON-LD schema
- `getBlogPosts(options)`: Get blog posts with filtering/pagination
- `getBlogPost(id)`: Get single blog post by ID

### Hooks

#### `useSDCMSMetadata(apiUrl, clientSlug, options?)`

React hook to fetch SDCMS SEO metadata with SWR caching.

**Returns:**
```tsx
{
  metadata: SEOMetadataResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  refetch: () => void;
}
```

#### `useBlogPosts(apiUrl, clientSlug, options?)`

React hook to fetch and filter blog posts.

**Options:**
- `limit` (number): Number of posts to return (default: 10)
- `offset` (number): Offset for pagination (default: 0)
- `tags` (string[]): Filter by tags
- `type` (string): Filter by post type
- `lang` (string): Filter by language

**Returns:**
```tsx
{
  posts: PostMetadata[];
  total: number;
  error: Error | undefined;
  isLoading: boolean;
}
```

### Components

#### `<SDCMSJsonLd />`

Inject JSON-LD structured data.

**Props:**
- `organization` (OrganizationSchema, optional): Organization schema
- `website` (WebSiteSchema, optional): Website schema
- `post` (PostMetadata, optional): Post-specific Article schema

### Utilities

#### `generateMetadataFromSDCMS(defaultMeta, post?)`

Generate Next.js `Metadata` object from SDCMS data. Use in `generateMetadata()` for App Router pages.

#### `generateSitemapFromSDCMS(entries)`

Generate Next.js sitemap entries from SDCMS sitemap data.

## Migration from v0.1

### Breaking changes

- **`SDCMSHead` removed**: This component used `next/head` which is incompatible with the App Router (Next.js 13+). Use `generateMetadataFromSDCMS()` instead:

  ```tsx
  // Before (v0.1)
  <SDCMSHead defaultMeta={metadata.meta} post={currentPost} />

  // After (v0.2)
  export async function generateMetadata() {
    const metadata = await sdcms.getSEOMetadata();
    return generateMetadataFromSDCMS(metadata.meta, currentPost);
  }
  ```

- **`baseUrl` prop removed from `SDCMSJsonLd`**: The API now returns full URLs in `post.url`, so `baseUrl` is no longer needed. Simply remove the prop.

### New features

- `invalidateCache()` method on the client
- In-memory promise caching with configurable TTL (avoids duplicate requests)
- Constructor validates that `apiUrl` and `clientSlug` are non-empty
- SWR deduping interval (10s) for the `useSDCMSMetadata` hook

## TypeScript

All types are exported from the main package:

```tsx
import type {
  SDCMSConfig,
  SEOMetadataResponse,
  PostMetadata,
  DefaultMeta,
  OrganizationSchema,
  WebSiteSchema,
  SitemapEntry,
  BlogPostListOptions,
} from "@sdcms/nextjs";
```

## License

MIT
