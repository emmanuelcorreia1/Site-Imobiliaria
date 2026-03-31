import Link from "next/link";
import type { Empresa } from "../lib/types";

interface FooterProps {
  empresa: Empresa;
}

export default function Footer({ empresa }: FooterProps) {
  return (
    <footer className="footer">
      <div className="divFooter">
        <div className="footerMarca">
          <img
            src="/assets/images/Logo branca sem fundo.png"
            alt="Logo Mondialle no rodape"
            className="footerLogo"
          />

          <p>
            {empresa.nome} conecta pessoas as melhores oportunidades do mercado
            imobiliario, com transparencia, seguranca e atendimento
            personalizado em cada negociacao.
          </p>

          <div className="redeSocial">
            <a
              href={empresa.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram" />
            </a>
            <a
              href={empresa.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook" />
            </a>
          </div>

          <span className="footerTexto">
            © 2026 {empresa.nome}. Todos os direitos reservados.
          </span>
        </div>

        <div className="footerIndices">
          <h3>Navegacao</h3>
          <ul>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/venda">Venda</Link>
            </li>
            <li>
              <Link href="/locacao">Locacao</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre a Mondialle</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </div>

        <div className="footerIndices">
          <h3>Contato</h3>
          <ul className="footerContato">
            <li>Email - {empresa.email}</li>
            <li>Telefone - {empresa.telefone}</li>
            <li>Localizacao - {empresa.endereco}</li>
          </ul>
        </div>
      </div>

      <div className="creditosFooter">
        Design e Desenvolvimento do site por{" "}
        <span>Emmanuel Scharnoski Correia</span>
      </div>

      <div className="mondialleGrandeFooter">MONDIALLE</div>
    </footer>
  );
}
