import type { GetServerSideProps } from "next";
import { filtrarImoveis } from "../src/lib/imovelRepository";

/** Páginas fixas do site que o Google deve conhecer. */
const PAGINAS = ["/", "/imoveis", "/venda", "/locacao", "/sobre", "/contato", "/anunciar"];

function escaparXml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// A resposta é montada em getServerSideProps; a página em si não renderiza nada.
export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = (process.env.SITE_URL || "https://mondialleimobiliaria.com.br").replace(
    /\/$/,
    "",
  );

  const enderecos = PAGINAS.map((pagina) => `${siteUrl}${pagina}`);

  try {
    const { itens } = await filtrarImoveis({});
    for (const imovel of itens) {
      enderecos.push(`${siteUrl}/imoveis/${encodeURIComponent(imovel.codigo)}`);
    }
  } catch {
    // Se o banco falhar, o mapa sai só com as páginas fixas em vez de dar erro.
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${enderecos.map((url) => `  <url><loc>${escaparXml(url)}</loc></url>`).join("\n")}
</urlset>
`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};
