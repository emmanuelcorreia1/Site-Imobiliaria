import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import { empresa } from "../src/lib/empresa";

export default function ContatoPage() {
  return (
    <Layout title="Contato" page="contato" empresa={empresa}>
      <main className="internalPage">
        <PageHero
          eyebrow="Fale com a equipe"
          title="Contato"
          description="Use os canais abaixo para anunciar um imovel, agendar visita ou tirar duvidas sobre compra e locacao."
        />

        <section className="contentSection infoGrid">
          <article className="infoCard">
            <h2>Telefone</h2>
            <p>{empresa.telefone}</p>
          </article>
          <article className="infoCard">
            <h2>Email</h2>
            <p>{empresa.email}</p>
          </article>
          <article className="infoCard">
            <h2>Endereco</h2>
            <p>{empresa.endereco}</p>
          </article>
        </section>
      </main>
    </Layout>
  );
}
