import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <section className="hero-sub">
        <div className="container">
          <span className="badge">Página não encontrada</span>
          <h1>404</h1>
          <p>A página que você está procurando não existe ou foi movida.</p>
        </div>
      </section>
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <Link className="btn primary" href="/">Voltar para a home</Link>
        </div>
      </section>
    </>
  );
}
