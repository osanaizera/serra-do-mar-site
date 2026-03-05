import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-texture" aria-hidden="true"></div>
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-brand">Serra do Mar Engenharia</span>
            <p className="footer-desc">
              Engenharia geotécnica e infraestrutura para projetos de alta criticidade.
            </p>
          </div>
          <div className="footer-col">
            <h5>Serviços</h5>
            <Link href="/servicos">Estudos de base</Link>
            <Link href="/servicos">Projetos geotécnicos</Link>
            <Link href="/servicos">Laudos e pareceres</Link>
            <Link href="/servicos">Consultoria</Link>
          </div>
          <div className="footer-col">
            <h5>Empresa</h5>
            <Link href="/sobre">Sobre nós</Link>
            <Link href="/projetos">Projetos</Link>
            <Link href="/insights">Insights</Link>
          </div>
          <div className="footer-col">
            <h5>Contato</h5>
            <Link href="/contato">Fale conosco</Link>
            <a href="mailto:contato@serradomar.com.br">contato@serradomar.com.br</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Serra do Mar Engenharia. Todos os direitos reservados.</span>
          <span>Conhecemos o chão que você constrói.</span>
        </div>
      </div>
    </footer>
  );
}
