import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Projetos | Serra do Mar Engenharia',
  description: 'Projetos de infraestrutura e geotecnia com foco na base para expansão segura. Condomínios logísticos, industriais, comerciais e residenciais.',
  openGraph: {
    title: 'Projetos | Serra do Mar Engenharia',
    description: 'Projetos de infraestrutura e geotecnia com foco na base para expansão segura.',
  },
};

const projects = [
  {
    image: '/assets/infra.jpg',
    alt: 'Infraestrutura para condomínio logístico',
    tag: 'Loteamentos',
    title: 'Infraestrutura para condomínio logístico',
    description: 'Investigação SPT/CPT e dimensionamento de fundações que reduziram 18% dos custos de execução.',
  },
  {
    image: '/assets/strata.jpg',
    alt: 'Estabilidade para expansão industrial',
    tag: 'Indústria',
    title: 'Estabilidade para expansão industrial',
    description: 'Análise de estabilidade de taludes e contenções em terreno com alta declividade.',
  },
  {
    image: '/assets/soil-photo-1.jpg',
    alt: 'Expansão comercial com base segura',
    tag: 'Atacadistas',
    title: 'Expansão comercial com base segura',
    description: 'Documentação geotécnica com ART que acelerou licenciamento e viabilizou fundações otimizadas.',
  },
  {
    image: '/assets/soil-photo-2.jpg',
    alt: 'Base para empreendimento residencial',
    tag: 'Condomínios',
    title: 'Base para empreendimento residencial',
    description: 'Avaliação completa com ensaios SPT e otimização de fundações profundas sem comprometer cronograma.',
  },
];

export default function ProjetosPage() {
  return (
    <>
      {/* ========== HERO SUB ========== */}
      <section className="hero-sub">
        <div className="hero-texture" style={{ backgroundImage: "url('/assets/texture-geological-grid.svg')" }} aria-hidden="true" />
        <div className="container">
          <span className="badge">Portfólio técnico</span>
          <h1>Cada projeto é uma decisão fundamentada no subsolo.</h1>
          <p>
            Expansões bem-sucedidas dependem de investigação
            geotécnica criteriosa — responsabilidade técnica
            que precede cada obra.
          </p>
        </div>
      </section>

      {/* ========== PROJECT GRID ========== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="grid two">
              {projects.map((project) => (
                <div key={project.title} className="project-card">
                  <div className="project-card-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.image} alt={project.alt} />
                  </div>
                  <div className="project-card-body">
                    <span className="tag">{project.tag}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== IMPACT STATS ========== */}
      <section className="section alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Impacto técnico mensurável</h2>
              <p className="lead">
                Dados que demonstram como critério técnico na investigação
                geotécnica impacta a segurança e a viabilidade de empreendimentos.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">87%</div>
                <div className="stat-label">Riscos críticos identificados em fase preliminar</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">18%</div>
                <div className="stat-label">Redução média em custos de execução</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">40%</div>
                <div className="stat-label">Menos tempo de análise e aprovação</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <div className="container">
          <h2>Seu próximo investimento<br />exige critério técnico?</h2>
          <p>
            A investigação geotécnica preliminar revela riscos
            e fundamenta decisões antes de comprometer capital.
          </p>
          <Link className="btn primary" href="/contato">Solicitar diagnóstico preliminar</Link>
        </div>
      </section>
    </>
  );
}
