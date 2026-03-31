import Link from "next/link";
import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import { empresa } from "../src/lib/empresa";

export default function AnunciarPage() {
  return (
    <Layout title="Anunciar imovel" page="anunciar" empresa={empresa}>
      <main className="internalPage">
        <PageHero
          eyebrow="Captacao Mondialle"
          title="Anuncie seu imovel"
          description="Quer vender ou alugar com apoio profissional? Envie as informacoes do seu imovel para a equipe Mondialle e retornaremos para orientar avaliacao, fotos, documentacao e estrategia de divulgacao."
        />

        <section className="contentSection infoGrid">
          <article className="infoCard">
            <h2>1. Envie os dados basicos</h2>
            <p>
              Informe tipo do imovel, cidade, bairro, metragem, quantidade de
              quartos, vagas e a finalidade desejada: venda ou locacao.
            </p>
          </article>

          <article className="infoCard">
            <h2>2. Compartilhe fotos e detalhes</h2>
            <p>
              Fotos, valor pretendido, pontos fortes e situacao da documentacao
              ajudam a equipe a montar uma apresentacao mais completa.
            </p>
          </article>

          <article className="infoCard">
            <h2>3. Receba o retorno da imobiliaria</h2>
            <p>
              Depois do contato inicial, a Mondialle pode alinhar visita, analise
              comercial e proximos passos para publicar o anuncio.
            </p>
          </article>
        </section>

        <section className="contentSection">
          <div className="sectionHeading">
            <div>
              <span className="sectionEyebrow">Canais de envio</span>
              <h2>Fale com a equipe para anunciar</h2>
            </div>
          </div>

          <div className="infoGrid">
            <article className="infoCard">
              <h2>Telefone</h2>
              <p>{empresa.telefone}</p>
            </article>

            <article className="infoCard">
              <h2>Email</h2>
              <p>{empresa.email}</p>
            </article>

            <article className="infoCard">
              <h2>Atendimento presencial</h2>
              <p>{empresa.endereco}</p>
            </article>
          </div>

          <div className="quickActions announceActions">
            <Link className="btnBuscar" href="/contato">
              Ir para contato
            </Link>
            <Link className="btnSecondary" href="/imoveis">
              Ver catalogo atual
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
