import * as swr from 'swr';

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

declare function useSDCMSMetadata(apiUrl: string, clientSlug: string, options?: UseSDCMSMetadataOptions): {
    metadata: SEOMetadataResponse | undefined;
    error: any;
    isLoading: boolean;
    refetch: swr.KeyedMutator<SEOMetadataResponse>;
};

declare function useBlogPosts(apiUrl: string, clientSlug: string, options?: BlogPostListOptions): {
    posts: PostMetadata[];
    total: number;
    error: any;
    isLoading: boolean;
};

export { type BlogPostListOptions, type PostMetadata, type SEOMetadataResponse, type UseSDCMSMetadataOptions, useBlogPosts, useSDCMSMetadata };
