import type { GetServerSideProps } from "next";
import Layout from "../src/components/Layout";
import SearchForm from "../src/components/SearchForm";
import PropertyCard from "../src/components/PropertyCard";
import { empresa } from "../src/lib/empresa";
import {
  filtrarImoveis,
  obterImoveisEmDestaque,
  obterOpcoesCatalogo,
} from "../src/lib/imovelService";
import type { BuscaImoveis, ConsultaImoveis, Imovel, OpcoesCatalogo } from "../src/lib/types";

export default function Home({
  busca,
  catalogo,
  imoveisDestaque,
  consulta,
}: {
  busca: BuscaImoveis;
  catalogo: OpcoesCatalogo;
  imoveisDestaque: Imovel[];
  consulta: ConsultaImoveis;
}) {
  return (
    <Layout title="Mondialle Imobiliaria" page="home" empresa={empresa}>
      <section className="hero">
        <div className="textoPrincipal">
          <h1>
            Encontre o imovel ideal <br />
            com a <span className="mondialle">MONDIALLE</span>
          </h1>
        </div>

        <div className="imagesSection">
          <img
            src="/assets/images/Casas_2d.png"
            alt="Ilustracao da cidade"
            className="cidadeLinha"
          />
          <img
            src="/assets/images/Terra.png"
            alt="Planeta Terra"
            className="terra"
          />
          <div className="cirBlur" />
        </div>
      </section>

      <SearchForm
        action="/imoveis"
        busca={busca}
        catalogo={catalogo}
        consulta={consulta}
        textoBotao="Buscar imoveis"
      />

      <main className="principal">
        <section className="sectionPrincipal">
          <div className="divPrincipal">
            <div className="destaque">
              <h2 className="tituloDestaques">Imoveis em destaque</h2>
              <div className="gridImoveis">
                {imoveisDestaque.map((imovel) => (
                  <PropertyCard key={imovel.id} imovel={imovel} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      busca: filtrarImoveis(query),
      catalogo: obterOpcoesCatalogo(),
      imoveisDestaque: obterImoveisEmDestaque(6),
      consulta: query,
    },
  };
};
