import type { OrganizationSchema, WebSiteSchema, PostMetadata } from "../types";

interface SDCMSJsonLdProps {
  /**
   * Organization schema from SDCMS
   */
  organization?: OrganizationSchema;

  /**
   * Website schema from SDCMS
   */
  website?: WebSiteSchema;

  /**
   * Post-specific schema (for blog posts)
   */
  post?: PostMetadata & {
    content?: string; // Article body text
  };
}

/**
 * Component to inject JSON-LD structured data from SDCMS
 * 
 * @example
 * ```tsx
 * <SDCMSJsonLd
 *   organization={metadata.schemas.organization}
 *   website={metadata.schemas.website}
 * />
 * ```
 */
export function SDCMSJsonLd({
  organization,
  website,
  post,
}: SDCMSJsonLdProps) {
  const schemas = [];

  if (organization) {
    schemas.push(organization);
  }

  if (website) {
    schemas.push(website);
  }

  if (post) {
    // Generate Article schema for blog posts
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": post.schemaType || "Article",
      headline: post.title,
      description: post.description,
      image: post.image,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      ...(post.url && { url: post.url }),
    };

    schemas.push(articleSchema);
  }

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
    </>
  );
}
