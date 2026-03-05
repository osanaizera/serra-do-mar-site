import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import LayerGraphic from '../components/LayerGraphic';

export const metadata: Metadata = {
  title: 'Sobre | Serra do Mar Engenharia',
  description: 'Conheça a Serra do Mar Engenharia, especialista em geotecnia e fundações para expansões seguras. Equipe liderada por Cássio Hister Bellan e Lucas França.',
  openGraph: {
    title: 'Sobre | Serra do Mar Engenharia',
    description: 'Conheça a Serra do Mar Engenharia — geotecnia e infraestrutura para expansões seguras.',
  },
};

export default function SobrePage() {
  return (
    <>
      {/* ========== HERO SUB ========== */}
      <section className="hero-sub">
        <div className="hero-texture" style={{ backgroundImage: "url('/assets/texture-strata-horizontal.svg')" }} aria-hidden="true" />
        <div className="container">
          <span className="badge">Sobre a empresa</span>
          <h1>A engenharia que sustenta decisões estratégicas.</h1>
          <p>
            Traduzimos complexidade geotécnica em diretrizes
            executivas com rigor, responsabilidade e critério técnico.
          </p>
        </div>
      </section>

      {/* ========== APPROACH ========== */}
      <section className="section">
        <div className="container">
          <div className="split">
            <ScrollReveal>
              <div>
                <h2>Critério técnico como método</h2>
                <p className="lead">
                  Nossa atuação conecta o rigor da engenharia geotécnica
                  com as necessidades estratégicas de quem não pode
                  comprometer segurança, prazos ou capital.
                </p>
                <p>
                  Grandes obras exigem mais do que execução — exigem
                  interpretação precisa do subsolo e das condições de risco.
                </p>
                <p>
                  Integramos investigação geotécnica rigorosa,
                  análise de risco quantificada e comunicação estruturada
                  para sustentar decisões com responsabilidade.
                </p>

                <div className="spacer-md"></div>

                <div className="highlight">
                  <div className="card">
                    <h3>Decisão sem ruído</h3>
                    <p>
                      Relatórios técnicos com hierarquia clara
                      de riscos e ações. Aprovações mais ágeis,
                      menos incerteza.
                    </p>
                  </div>
                  <div className="card">
                    <h3>Credibilidade visível</h3>
                    <p>
                      Comunicação técnica precisa e rigor metodológico
                      que transmitem confiança para stakeholders
                      críticos.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <LayerGraphic />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="section alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Equipe e governança técnica</h2>
              <p className="lead">
                Domínio técnico e gestão estratégica integrados
                para garantir responsabilidade em projetos de alta criticidade.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="team-grid">
              <div className="team-card">
                <div className="team-avatar blue">CB</div>
                <h4>Cássio Hister Bellan</h4>
                <span className="role">Diretor Técnico</span>
                <p>
                  Responsável pela direção técnica e análise
                  crítica de projetos geotécnicos.
                </p>
                <p>
                  Expertise em mecânica dos solos, estabilidade
                  de taludes e fundações especiais.
                </p>
              </div>
              <div className="team-card">
                <div className="team-avatar green">LF</div>
                <h4>Lucas França</h4>
                <span className="role">Comunicação &amp; Projetos</span>
                <p>
                  Coordena a interface técnica com decisores,
                  traduzindo dados geotécnicos em narrativas
                  executivas.
                </p>
                <p>
                  Lidera o relacionamento com stakeholders
                  estratégicos.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <div className="container">
          <h2>Conheça nosso critério<br />técnico na prática.</h2>
          <p>
            Projetos onde investigação criteriosa transformou
            incertezas em decisões fundamentadas.
          </p>
          <Link className="btn primary" href="/projetos">Ver projetos</Link>
        </div>
      </section>
    </>
  );
}
