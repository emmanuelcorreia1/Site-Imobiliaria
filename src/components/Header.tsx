import Link from "next/link";

const links = [
  { href: "/", label: "Inicio", page: "home" },
  { href: "/venda", label: "Venda", page: "venda" },
  { href: "/locacao", label: "Locacao", page: "locacao" },
  { href: "/sobre", label: "Sobre a Mondialle", page: "sobre" },
  { href: "/contato", label: "Contato", page: "contato" },
] as const;

interface HeaderProps {
  pagina: string;
}

export default function Header({ pagina }: HeaderProps) {
  return (
    <header>
      <div className="divHeader">
        <div className="logoHeader">
          <Link href="/">
            <img
              src="/assets/images/Logo branca sem fundo.png"
              alt="Logo Mondialle Imobiliaria"
              id="logoHeader"
            />
          </Link>
        </div>

        <div className="menuHeader">
          <nav>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pagina === link.page ? "is-active" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="anuncieHeader">
          <Link href="/anunciar">Anuncie seu imovel</Link>
        </div>
      </div>
    </header>
  );
}
