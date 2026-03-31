import type { GetServerSideProps } from "next";
import ListagemPage from "../../src/components/ListagemPage";
import type { ListagemPageProps } from "../../src/components/ListagemPage";
import { filtrarImoveis, obterOpcoesCatalogo } from "../../src/lib/imovelService";

export default function CatalogoPage(props: ListagemPageProps) {
  return <ListagemPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      busca: filtrarImoveis(query),
      catalogo: obterOpcoesCatalogo(),
      consulta: query,
      cabecalho: "Catalogo completo",
      pagina: "imoveis",
      acao: "/imoveis",
    },
  };
};
