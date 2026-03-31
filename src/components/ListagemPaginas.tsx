import Layout from "./Layout";
import SearchForm from "./SearchForm";
import ImovelCard from "./ImovelCard2";
import { empresa } from "../lib/empresa";
import type { BuscaImoveis, ConsultaImoveis, OpcoesCatalogo } from "../lib/types";

export interface ListagemPageProps {
  busca: BuscaImoveis;
  catalogo: OpcoesCatalogo;
  consulta: ConsultaImoveis;
  cabecalho: string;
  pagina: string;
  acao: string;
}

export default function ListagemPage({
  busca,
  catalogo,
  consulta,
  cabecalho,
  pagina,
  acao,
}: ListagemPageProps) {
  return (
    <Layout
      title={cabecalho}
      page={pagina}
      empresa={empresa}
    >
      <main className="vendaLocacao">
        <section className="tituloPagina">
          <h1>{cabecalho}</h1>
          <div className="cirBlur2" />
        </section>

        <SearchForm
          action={acao}
          busca={busca}
          catalogo={catalogo}
          consulta={consulta}
          textoBotao="Atualizar busca"
        />

        <div className="divPrincipal2">
          <section className="resultadoQuant">
            <div className="result">
              <div className="resultadoTitulo">
                <h2>{busca.itens.length} imoveis encontrados</h2>
              </div>
            </div>

            {busca.itens.length ? (
              <div className="destaque2">
                <div className="gridImoveis2">
                  {busca.itens.map((imovel) => (
                    <ImovelCard key={imovel.id} imovel={imovel} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="naoEncontrado">
                <h3>Nenhum resultado encontrado.</h3>
                <p>
                  Altere filtros, cidade ou faixa de preco para ver outras
                  oportunidades.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
