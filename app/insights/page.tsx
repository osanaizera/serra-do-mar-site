import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';
import { formatDate } from '@/lib/formatters';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  seoImage: string;
  publishedAt: string;
  tags: string[];
  authorName: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { getPosts } = await import('@/lib/cms');
    const result = await getPosts(12, 'BLOG');
    return (result.data || []) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Insights | Serra do Mar Engenharia',
  description: 'Insights técnicos sobre base, fundações e segurança para projetos em expansão. Conteúdo para gestores, engenheiros e investidores.',
  openGraph: {
    title: 'Insights | Serra do Mar Engenharia',
    description: 'Insights técnicos sobre base, fundações e segurança para projetos em expansão.',
  },
};

// Static placeholder articles (shown when no CMS posts exist)
const staticArticles = [
  {
    title: 'Riscos geotécnicos em expansões industriais',
    description: 'Metodologia para avaliação de terrenos com parâmetros mensuráveis — NSPT, coesão, ângulo de atrito — que fundamentam decisões.',
  },
  {
    title: 'Infraestrutura para loteamentos',
    description: 'Casos práticos onde investigação preliminar identificou condições que modificaram o escopo antes da execução.',
  },
  {
    title: 'Geotecnia como investimento estratégico',
    description: 'Demonstração quantitativa do ROI da investigação completa do subsolo em projetos de grande porte.',
  },
  {
    title: 'Relatórios que aceleram aprovações',
    description: 'Framework de comunicação técnica que hierarquiza dados e apresenta soluções parametrizadas para diferentes níveis organizacionais.',
  },
];

export default async function InsightsPage() {
  const blogPosts = await getBlogPosts();
  const hasCMSPosts = blogPosts.length > 0;

  return (
    <>
      {/* ========== HERO SUB ========== */}
      <section className="hero-sub">
        <div className="hero-texture" style={{ backgroundImage: "url('/assets/texture-geological-grid.svg')" }} aria-hidden="true" />
        <div className="container">
          <span className="badge">Conteúdo técnico estratégico</span>
          <h1>Conhecimento técnico traduzido em decisão.</h1>
          <p>
            Análise criteriosa do subsolo traduzida em linguagem executiva
            para quem precisa compreender riscos e fundamentar
            estratégias de investimento.
          </p>
        </div>
      </section>

      {/* ========== PULL QUOTE ========== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="pull-quote">
              Cada 1% investido em investigação geotécnica preliminar
              pode evitar até 12% em custos imprevistos durante a execução.
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== ARTICLES GRID ========== */}
      <section className="section alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Publicações com critério técnico</h2>
              <p className="lead">
                Análises fundamentadas que auxiliam decisores
                em momentos críticos de avaliação e planejamento.
              </p>
            </div>
          </ScrollReveal>

          {hasCMSPosts ? (
            <ScrollReveal>
              <div className="grid two">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/insights/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="project-card" style={{ height: '100%' }}>
                      {post.seoImage && (
                        <div className="project-card-image">
                          <Image
                            src={post.seoImage}
                            alt={post.title}
                            width={800}
                            height={450}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div className="project-card-body">
                        {post.tags && post.tags.length > 0 && (
                          <span className="tag">{post.tags[0]}</span>
                        )}
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 0 }}>
                          {formatDate(post.publishedAt)}
                          {post.authorName && ` · ${post.authorName}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="grid two">
                {staticArticles.map((article) => (
                  <div key={article.title} className="card">
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <div className="container">
          <h2>Conhecimento técnico aplicado<br />ao seu projeto.</h2>
          <p>
            Converse com nossa equipe e descubra como critério
            técnico pode fundamentar sua próxima decisão.
          </p>
          <Link className="btn primary" href="/contato">Fale conosco</Link>
        </div>
      </section>
    </>
  );
}
