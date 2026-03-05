import * as react_jsx_runtime from 'react/jsx-runtime';

interface SDCMSConfig {
    apiUrl: string;
    clientSlug: string;
    debug?: boolean;
    revalidate?: number;
}
interface OrganizationSchema {
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
interface WebSiteSchema {
    "@context": string;
    "@type": string;
    name: string;
    url: string;
    potentialAction?: {
        "@type": "SearchAction";
        target: string | {
            "@type": "EntryPoint";
            urlTemplate: string;
        };
        "query-input"?: string;
    };
}
interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
}
interface DefaultMeta {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogType: string;
    ogImage: string;
    twitterCard: string;
    twitterSite: string;
}
interface PostMetadata {
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
interface SEOMetadataResponse {
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
interface BlogPostListOptions {
    limit?: number;
    offset?: number;
    tags?: string[];
    type?: string;
    lang?: string;
}
interface UseSDCMSMetadataOptions {
    autoRefetch?: boolean;
    refetchInterval?: number;
}

declare class SDCMSClient {
    private config;
    private cache;
    constructor(config: SDCMSConfig);
    private log;
    private fetchAPI;
    getSEOMetadata(): Promise<SEOMetadataResponse>;
    invalidateCache(): void;
    getSitemapXML(): Promise<string>;
    getRobotsTxt(): Promise<string>;
    getOrganizationSchema(): Promise<object>;
    getWebSiteSchema(): Promise<object>;
    getBlogPosts(options?: {
        limit?: number;
        offset?: number;
        tags?: string[];
        type?: string;
        lang?: string;
    }): Promise<PostMetadata[]>;
    getBlogPost(id: string): Promise<PostMetadata | undefined>;
}
declare function createSDCMSClient(config: SDCMSConfig): SDCMSClient;

interface SDCMSJsonLdProps {
    organization?: OrganizationSchema;
    website?: WebSiteSchema;
    post?: PostMetadata & {
        content?: string;
    };
}
declare function SDCMSJsonLd({ organization, website, post, }: SDCMSJsonLdProps): react_jsx_runtime.JSX.Element | null;

type OpenGraphType = "article" | "website" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
type TwitterCardType = "summary" | "summary_large_image" | "app" | "player";
interface SDCMSMetadataResult {
    title: string;
    description: string;
    keywords: string[];
    authors: Array<{
        name: string;
    }>;
    openGraph: {
        type: OpenGraphType;
        title: string;
        description: string;
        images: Array<{
            url: string;
        }>;
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
declare function generateMetadataFromSDCMS(defaultMeta: DefaultMeta, post?: PostMetadata): SDCMSMetadataResult;
declare function generateSitemapFromSDCMS(entries: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
}>): {
    url: string;
    lastModified: Date;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
}[];

export { type BlogPostListOptions, type DefaultMeta, type OrganizationSchema, type PostMetadata, SDCMSClient, type SDCMSConfig, SDCMSJsonLd, type SEOMetadataResponse, type SitemapEntry, type UseSDCMSMetadataOptions, type WebSiteSchema, createSDCMSClient, generateMetadataFromSDCMS, generateSitemapFromSDCMS };
