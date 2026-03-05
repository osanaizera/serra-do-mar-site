import Link from 'next/link';
import ScrollReveal from './components/ScrollReveal';

export default function HomePage() {
  return (
    <>
      {/* ========== 1. HERO ========== */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/hero.jpg" alt="Obra de infraestrutura geotécnica" />
        </div>
        <div
          className="hero-texture"
          style={{ backgroundImage: "url('/assets/texture-topographic-contour.svg')" }}
          aria-hidden="true"
        />

        <div className="container">
          <div className="hero-content">
            <h1>Conhecemos o chão<br />que você constrói.</h1>
            <p className="hero-tagline">
              Grandes obras exigem mais do que execução: exigem conhecimento profundo da base que sustenta cada decisão.
            </p>
            <div className="hero-actions">
              <Link className="btn primary" href="/projetos">Ver nossos projetos</Link>
              <Link className="btn ghost" href="/contato">Fale conosco</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. INTRO STATEMENT ========== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Responsabilidade técnica<br />em cada decisão</h2>
              <p className="lead">
                A Serra do Mar atua como parceiro técnico estratégico,
                investigando o solo, interpretando riscos e conduzindo
                soluções com rigor e responsabilidade.
              </p>
              <p className="lead">
                Para quem deseja expandir com segurança, é fundamental
                contar com profissionais que conhecem os desafios
                estruturais e assumem a responsabilidade técnica de cada escolha.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 3. FEATURED PROJECTS ========== */}
      <section className="section alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Projetos em destaque</h2>
              <p className="lead">
                Casos onde investigação geotécnica criteriosa
                reduziu riscos e viabilizou expansões com segurança técnica comprovada.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid two">
              <div className="project-card">
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/infra.jpg" alt="Infraestrutura para condomínio logístico" />
                </div>
                <div className="project-card-body">
                  <span className="tag">Loteamentos</span>
                  <h3>Infraestrutura para condomínio logístico</h3>
                  <p>Investigação SPT/CPT e dimensionamento que reduziram 18% dos custos de execução.</p>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/strata.jpg" alt="Estabilidade para expansão industrial" />
                </div>
                <div className="project-card-body">
                  <span className="tag">Indústria</span>
                  <h3>Estabilidade para expansão industrial</h3>
                  <p>Análise de taludes e contenções em terreno com alta declividade.</p>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/soil-photo-1.jpg" alt="Expansão comercial com base segura" />
                </div>
                <div className="project-card-body">
                  <span className="tag">Atacadistas</span>
                  <h3>Expansão comercial com base segura</h3>
                  <p>Documentação geotécnica que acelerou licenciamento e viabilizou fundações otimizadas.</p>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/soil-photo-2.jpg" alt="Base para empreendimento residencial" />
                </div>
                <div className="project-card-body">
                  <span className="tag">Condomínios</span>
                  <h3>Base para empreendimento residencial</h3>
                  <p>Avaliação completa com ensaios SPT e otimização de fundações profundas.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 4. SERVICES ========== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Domínio técnico a serviço<br />da sua expansão</h2>
              <p className="lead">
                Engenharia de base para decisores que exigem previsibilidade
                e responsabilidade em investimentos de alta criticidade.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid three">
              <div className="card">
                <h3>Estudos de base</h3>
                <p>
                  Investigação geotécnica com sondagens SPT,
                  ensaios de campo e laboratoriais que
                  reduzem imprevistos na execução.
                </p>
              </div>
              <div className="card">
                <h3>Projetos para expansão</h3>
                <p>
                  Dimensionamento geotécnico e infraestrutura
                  com especificações técnicas para loteamentos
                  e plantas industriais.
                </p>
              </div>
              <div className="card">
                <h3>Laudos e pareceres</h3>
                <p>
                  Documentação técnica e ART para aprovação,
                  licenciamento ambiental e conformidade
                  normativa.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 5. STATS ========== */}
      <section className="section alt">
        <div className="container">
          <ScrollReveal>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Anos de projetos geotécnicos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">87%</div>
                <div className="stat-label">Riscos identificados em fase preliminar</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">40%</div>
                <div className="stat-label">Redução no tempo de aprovação</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 6. CTA FINAL ========== */}
      <section className="cta-section">
        <div className="container">
          <h2>Cada projeto começa<br />pelo que está abaixo.</h2>
          <p>
            Decisões técnicas responsáveis exigem conhecimento
            profundo do subsolo. Solicite um diagnóstico com critério.
          </p>
          <Link className="btn primary" href="/contato">Solicitar diagnóstico técnico</Link>
        </div>
      </section>
    </>
  );
}
