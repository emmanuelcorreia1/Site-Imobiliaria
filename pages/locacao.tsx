import type { GetServerSideProps } from "next";
import ListagemPage from "../src/components/ListagemPaginas";
import type { ListagemPageProps } from "../src/components/ListagemPaginas";
import { filtrarImoveis, obterOpcoesCatalogo } from "../src/lib/imovelService";

export default function LocacaoPage(props: ListagemPageProps) {
  return <ListagemPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const consulta = { ...query, finalidade: "locacao" };

  return {
    props: {
      busca: filtrarImoveis(consulta),
      catalogo: obterOpcoesCatalogo(),
      consulta,
      cabecalho: "Imoveis para locacao",
      pagina: "locacao",
      acao: "/locacao",
    },
  };
};
