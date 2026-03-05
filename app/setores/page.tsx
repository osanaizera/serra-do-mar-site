import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Setores | Serra do Mar Engenharia',
  description: 'Geotecnia e infraestrutura para setores onde a margem para erro no subsolo é zero.',
  openGraph: {
    title: 'Setores | Serra do Mar Engenharia',
    description: 'Expertise geotécnica aplicada aos setores mais exigentes.',
  },
};

const setores = [
  {
    number: '01',
    title: 'Loteamentos e Desenvolvimento Imobiliário',
    priority: 'priority-1',
    description: 'Estudos geotécnicos para viabilidade e aprovação de loteamentos, terraplanagem segura e drenagem projetada para escalar. O risco geotécnico mal gerenciado em loteamentos representa passivo jurídico e financeiro de longo prazo.',
    services: [
      'Investigação geotécnica completa (SPT, CPT, ensaios de laboratório)',
      'Análise de capacidade de carga e recalque diferencial',
      'Projeto de terraplanagem e movimentação de terra',
      'Sistema de drenagem pluvial e contenções',
      'Laudos para aprovação em órgãos municipais',
    ],
  },
  {
    number: '02',
    title: 'Concessionárias Rodoviárias',
    priority: 'priority-2',
    description: 'Investigação de subsolo para projetos de rodovias, variantes e duplicações. Análise de taludes, estabilidade de aterros e adequação geotécnica de traçados.',
    services: [
      'Estudos geotécnicos para traçados rodoviários',
      'Análise de estabilidade de taludes e encostas',
      'Dimensionamento de aterros e cortes',
      'Projeto de obras de contenção (muros, cortinas atirantadas)',
      'Monitoramento geotécnico durante execução',
    ],
  },
  {
    number: '03',
    title: 'Portos e Infraestrutura Portuária',
    priority: 'priority-3',
    description: 'Estudos de capacidade de carga, recalque diferencial e drenagem para pátios portuários, terminais e armazéns de grande porte.',
    services: [
      'Investigação de solos marinhos e saturados',
      'Análise de capacidade de carga para cargas pesadas',
      'Projeto de fundações profundas (estacas)',
      'Sistema de drenagem para áreas de grande tráfego',
      'Controle de recalque e monitoramento contínuo',
    ],
  },
  {
    number: '04',
    title: 'Atacarejo e Varejo de Grande Porte',
    priority: 'priority-4',
    description: 'Estudos de viabilidade geotécnica para novos empreendimentos comerciais em terrenos complexos. Fundações, drenagem e adequação de plataformas para galpões e lojas de grande escala.',
    services: [
      'Due diligence geotécnica de terrenos',
      'Projeto de fundações para cargas de prateleiras e mezaninos',
      'Terraplanagem para nivelamento de grandes áreas',
      'Sistema de drenagem superficial e subterrânea',
      'Análise de expansão do solo (argilas expansivas)',
    ],
  },
  {
    number: '05',
    title: 'Galpões Logísticos e Condomínios Industriais',
    priority: 'priority-5',
    description: 'Projetos de infraestrutura para condomínios logísticos e galpões industriais. Fundações dimensionadas para cargas de empilhadeiras, pisos industriais e tráfego intenso.',
    services: [
      'Estudo de capacidade de carga para pisos industriais',
      'Projeto de fundações para estruturas metálicas',
      'Terraplenagem para grandes áreas de movimentação',
      'Drenagem para pátios de manobra e estacionamento',
      'Análise de recalque para evitar trincas em pisos',
    ],
  },
  {
    number: '06',
    title: 'Mineração',
    priority: 'priority-6',
    description: 'Geotecnia para fundações industriais, barragens de rejeito, pátios de estocagem e expansão de plantas. Ambientes com exigência regulatória elevada e risco estrutural crítico.',
    services: [
      'Estudos de estabilidade para barragens de rejeito',
      'Investigação geotécnica para fundações de britadores',
      'Análise de risco geotécnico (NBR 13028)',
      'Monitoramento de instrumentação (piezômetros, inclinômetros)',
      'Pareceres técnicos para licenciamento ambiental',
    ],
  },
  {
    number: '07',
    title: 'Papel, Celulose e Agronegócio Industrial',
    priority: 'priority-7',
    description: 'Projetos de infraestrutura rural e industrial: estradas internas, drenagem de fazendas, fundações de silos e galpões, estudos hidrológicos para irrigação e controle de cheias.',
    services: [
      'Projeto de estradas rurais e vicinais',
      'Dimensionamento de fundações para silos verticais',
      'Estudos hidrológicos para bacias e irrigação',
      'Drenagem de áreas agrícolas e industriais',
      'Análise de capacidade de carga para galpões de armazenamento',
    ],
  },
];

export default function SetoresPage() {
  return (
    <>
      {/* ========== HERO SUB ========== */}
      <section className="hero-sub">
        <div className="hero-texture" style={{ backgroundImage: "url('/assets/texture-sondagem-profile.svg')" }} aria-hidden="true" />
        <div className="container">
          <span className="badge">Expertise Setorial</span>
          <h1>Onde nossa expertise é mais crítica</h1>
          <p>
            Atuamos em setores onde a margem para erro no subsolo é zero.
            Nossa especialidade é transformar complexidade geológica em decisão segura.
          </p>
        </div>
      </section>

      {/* ========== SETORES GRID ========== */}
      <section className="section">
        <div className="container">
          {setores.map((setor, index) => (
            <div key={setor.number}>
              <ScrollReveal>
                <div className={`sector-card ${setor.priority}`}>
                  <div className="sector-header">
                    <span className="sector-number">{setor.number}</span>
                    <h2>{setor.title}</h2>
                  </div>
                  <div className="sector-content">
                    <p className="sector-description">{setor.description}</p>
                    <div className="sector-services">
                      <h4>Serviços principais:</h4>
                      <ul>
                        {setor.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              {index < setores.length - 1 && <div className="spacer-md"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="section alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2>Seu setor exige base sólida?</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Nossa equipe técnica avalia o contexto do seu projeto e propõe
              o estudo geotécnico adequado.
            </p>
            <div className="spacer-sm"></div>
            <Link className="btn primary" href="/contato">Falar com a equipe técnica</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
