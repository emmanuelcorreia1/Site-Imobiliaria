import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import { empresa } from "../src/lib/empresa";
import { imoveis } from "../src/lib/imoveis";

export default function SobrePage() {
  return (
    <Layout title="Sobre a Mondialle" page="sobre" empresa={empresa}>
      <main className="internalPage">
        <PageHero
          eyebrow="Institucional"
          title="Sobre a Mondialle"
          description="Estruturamos a plataforma para que clientes encontrem opcoes de venda e locacao com filtros claros, codigos de imovel e contato direto com a equipe."
        />

        <section className="contentSection infoGrid">
          <article className="infoCard">
            <h2>Atendimento local</h2>
            <p>
              Atuacao focada em Uniao da Vitoria, Porto Uniao e regiao, com apoio
              para avaliacao, captacao e intermediacao.
            </p>
          </article>

          <article className="infoCard">
            <h2>Catalogo organizado</h2>
            <p>
              Hoje a plataforma ja conta com <strong>{imoveis.length}</strong>{" "}
              imoveis de exemplo estruturados para busca por finalidade,
              localizacao e preco.
            </p>
          </article>

          <article className="infoCard">
            <h2>Base para crescer</h2>
            <p>
              O site agora roda em Next.js e pode evoluir para cadastro
              administrativo, banco de dados e integracoes.
            </p>
          </article>
        </section>
      </main>
    </Layout>
  );
}
