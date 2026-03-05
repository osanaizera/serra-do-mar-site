import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Serviços | Serra do Mar Engenharia',
  description: 'Serviços de geotecnia e infraestrutura para empresas em expansão: base, fundações, laudos e decisões seguras.',
  openGraph: {
    title: 'Serviços | Serra do Mar Engenharia',
    description: 'Geotecnia e infraestrutura para expansões seguras — do diagnóstico ao laudo executivo.',
  },
};

export default function ServicosPage() {
  return (
    <>
      {/* ========== HERO SUB ========== */}
      <section className="hero-sub">
        <div className="hero-texture" style={{ backgroundImage: "url('/assets/texture-sondagem-profile.svg')" }} aria-hidden="true" />
        <div className="container">
          <span className="badge">Base · Infraestrutura · Geotecnia</span>
          <h1>Rigor técnico onde a decisão importa.</h1>
          <p>
            Sua expansão não pode enfrentar surpresas no subsolo.
            Identificamos riscos, interpretamos dados e fornecemos
            parâmetros com responsabilidade técnica.
          </p>
        </div>
      </section>

      {/* ========== SERVICE GRID ========== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-intro">
              <h2>Portfólio técnico</h2>
              <p className="lead">
                Engenharia geotécnica e infraestrutura com foco
                na mitigação de riscos e fundamentação de decisões críticas.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid three">
              <div className="card">
                <h3>Investigação de base</h3>
                <p>
                  Caracterização geotécnica através de sondagens
                  SPT, CPT e análise estratigráfica para
                  fundamentar decisões.
                </p>
              </div>
              <div className="card">
                <h3>Projetos geotécnicos</h3>
                <p>
                  Dimensionamento de fundações, contenções e
                  análise de estabilidade com parâmetros
                  normatizados.
                </p>
              </div>
              <div className="card">
                <h3>Infraestrutura de expansão</h3>
                <p>
                  Terraplenagem, drenagem, pavimentação e redes
                  subterrâneas para loteamentos e plantas
                  industriais.
                </p>
              </div>
              <div className="card">
                <h3>Laudos executivos</h3>
                <p>
                  Documentação técnica com ART para licenciamentos
                  e decisões críticas. Linguagem acessível
                  para stakeholders.
                </p>
              </div>
              <div className="card">
                <h3>Consultoria estratégica</h3>
                <p>
                  Análise técnico-econômica de áreas para expansão
                  e due diligence para investidores.
                </p>
              </div>
              <div className="card">
                <h3>Monitoramento de risco</h3>
                <p>
                  Instrumentação geotécnica, análise de recalques
                  e controle de estabilidade em obras
                  críticas.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== METHODOLOGY ========== */}
      <section className="section alt">
        <div className="container">
          <div className="split">
            <ScrollReveal>
              <div>
                <h2>Método com critério técnico</h2>
                <p className="lead">
                  Metodologia que transforma dados do subsolo
                  em decisões estratégicas, acelerando aprovações
                  e minimizando imprevistos com responsabilidade.
                </p>

                <div className="spacer-sm"></div>

                <div className="timeline">
                  <div className="timeline-item">
                    <strong>Contexto da expansão</strong>
                    <p>
                      Compreensão dos parâmetros estratégicos,
                      marcos críticos e tolerâncias a risco
                      do empreendimento.
                    </p>
                  </div>
                  <div className="timeline-item">
                    <strong>Diagnóstico de base</strong>
                    <p>
                      Investigação com métodos normatizados
                      (NBR 6484, NBR 7250) para caracterização
                      completa do subsolo.
                    </p>
                  </div>
                  <div className="timeline-item">
                    <strong>Entrega executiva</strong>
                    <p>
                      Documentação com sumário executivo que
                      hierarquiza riscos, recomendações e
                      especificações para execução.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="cta-card">
                <h3>Sua expansão está sobre<br />terreno seguro?</h3>
                <p>
                  Antes de avançar com seu investimento,
                  obtenha um diagnóstico técnico que pode
                  evitar custos imprevistos.
                </p>
                <Link className="btn primary" href="/contato">Solicitar diagnóstico geotécnico</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
