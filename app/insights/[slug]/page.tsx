import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ScrollReveal from '../../components/ScrollReveal';
import { formatDate } from '@/lib/formatters';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  jsonLd: Record<string, unknown>;
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
  publishedAt: string;
  authorName: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { getPost } = await import('@/lib/cms');
    const post = await getPost(slug);
    return post as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: 'Artigo não encontrado | Serra do Mar Engenharia' };
  }

  return {
    title: `${post.seoTitle || post.title} | Serra do Mar Engenharia`,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription,
      images: post.seoImage ? [post.seoImage] : undefined,
      type: 'article',
    },
  };
}

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <>
        <section className="hero-sub">
          <div className="container">
            <h1>Artigo não encontrado</h1>
            <p>O artigo que você está procurando pode ter sido removido ou está temporariamente indisponível.</p>
          </div>
        </section>
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <Link href="/insights" className="btn primary">Voltar para Insights</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* SEO: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.jsonLd || {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.seoImage,
            "datePublished": post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.authorName || "Serra do Mar Engenharia"
            }
          })
        }}
      />

      {/* Hero */}
      <section className="hero-sub" style={{ position: 'relative' }}>
        {post.seoImage && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src={post.seoImage}
              alt={post.title}
              fill
              style={{ objectFit: 'cover', opacity: 0.15 }}
              priority
            />
          </div>
        )}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/insights"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            ← Voltar para Insights
          </Link>
          <h1>{post.title}</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '1rem' }}>
            {formatDate(post.publishedAt)}
            {post.authorName && ` · ${post.authorName}`}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="blog-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>

              <div className="cta-card" style={{ marginTop: '4rem' }}>
                <h3>Precisa de orientação técnica?</h3>
                <p>
                  Solicite um diagnóstico geotécnico com a equipe da Serra do Mar Engenharia.
                </p>
                <Link href="/contato" className="btn primary">
                  Solicitar diagnóstico
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
