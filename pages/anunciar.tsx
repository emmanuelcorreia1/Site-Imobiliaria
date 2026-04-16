import Link from "next/link";
import Layout from "../src/components/Layout";
import { empresa } from "../src/lib/empresa";

export default function AnunciarPage() {
  return (
    <Layout title="Anunciar imovel" page="anunciar" empresa={empresa} stylesheets={["/assets/css/anunciar.css"]}>
      <main className="paginaAnunciar">
        <section className="hero">
          <h3>ANUNCIE COM A MONDIALLE</h3>
          <h1 className="tituloHero">
            Seu imóvel merece <br />
            <span>visibilidade</span>
          </h1>
          <div className="retangulo"></div>
          <p className="textoHero">
            <span>Conectamos o seu imóvel às melhores oportunidades do mercado.</span> <br />
            Na Mondialle Imobiliária, oferecemos um serviço personalizado para proprietários 
            que desejam anunciar com mais segurança e transparência
          </p>
        </section>

        <div className="formAnuncio">
          <h2></h2>
        </div>
      </main>
    </Layout>
  );
}
