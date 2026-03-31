import type { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../../src/components/Layout";
import { empresa } from "../../src/lib/empresa";
import {
  obterImovelPorCodigo,
  obterImovelPorId,
} from "../../src/lib/imovelService";
import { formatarPreco } from "../../src/lib/formatar";
import type { Imovel } from "../../src/lib/types";

interface DetalheImovelPageProps {
  imovel: Imovel;
}

export default function DetalheImovelPage({
  imovel,
}: DetalheImovelPageProps) {
  return (
    <Layout
      title={`${imovel.titulo} | ${empresa.nome}`}
      page="imovel"
      empresa={empresa}
    >
      <main className="internalPage">
        <section className="detailHero">
          <div className="detailImageWrap">
            <img
              src={imovel.imagem}
              alt={imovel.titulo}
              className="detailImage"
            />
          </div>

          <div className="detailContent">
            <span className="sectionEyebrow">Codigo {imovel.codigo}</span>
            <h1>{imovel.titulo}</h1>
            <p className="detailLocation">
              {imovel.cidade} - {imovel.bairro}
            </p>
            <p className="detailDescription">{imovel.descricao}</p>

            <div className="detailSpecs">
              <span>
                <strong>{imovel.categoria}</strong>
              </span>
              <span>
                <strong>{imovel.quartos}</strong> quartos
              </span>
              <span>
                <strong>{imovel.banheiros}</strong> banheiros
              </span>
              <span>
                <strong>{imovel.vagas}</strong> vagas
              </span>
              <span>
                <strong>{imovel.area}</strong> m2
              </span>
            </div>

            <div className="detailActions">
              <strong className="detailPrice">
                R$ {formatarPreco(imovel.preco)}
                {imovel.finalidade === "locacao" ? "/mes" : ""}
              </strong>
              <Link className="btnBuscar detailButton" href="/contato">
                Solicitar atendimento
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const identificador = params?.identificador;
  const valor =
    typeof identificador === "string" ? identificador : String(identificador);
  const imovel =
    obterImovelPorCodigo(valor) || obterImovelPorId(valor);

  if (!imovel) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      imovel,
    },
  };
};
