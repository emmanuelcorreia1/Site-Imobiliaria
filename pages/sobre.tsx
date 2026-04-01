import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import { empresa } from "../src/lib/empresa";
import { imoveis } from "../src/lib/imoveis";

export default function SobrePage() {
  return (
    <Layout
      title="Sobre a Mondialle"
      page="sobre"
      empresa={empresa}
      stylesheets={["/assets/css/sobre.css"]}
    >
      <main className="paginaSobre">
        <section className="heroSobre">
          <div className="divHeroSobre">
            <p className="institucional">INSTITUCIONAL</p>
            <h1>
              Sobre a <br />
              <span className="mondialleSobre">MONDIALLE</span>
            </h1>
            <p className="textoIntro">Conectamos pessoas, patrimônios e oportunidades com segurança, 
              transparência e visão estratégica.</p>
          </div>
          <img src="/assets/images/Faixada_mondialle.png" alt="Foto da mondialle" />
          <div className="cirBlur3"></div>
        </section>

        <div className="divPrincipal">


          <section className="contentSection infoGrid">
            <article className="infoCard">
              <h2>Atendimento local</h2>
              <p>
                Atuacao focada em Uniao da Vitoria, Porto Uniao e regiao, com
                apoio para avaliacao, captacao e intermediacao.
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
        </div>
      </main>
    </Layout>
  );
}
