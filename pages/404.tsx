import Link from "next/link";
import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import { empresa } from "../src/lib/empresa";

export default function Custom404() {
  return (
    <Layout title="Imovel nao encontrado" page="nao-encontrado" empresa={empresa}>
      <main className="internalPage">
        <PageHero
          eyebrow="404"
          title="Imovel nao encontrado"
          description="O codigo informado nao existe mais ou ainda nao foi cadastrado."
        >
          <Link href="/imoveis" className="btnBuscar detailButton">
            Voltar ao catalogo
          </Link>
        </PageHero>
      </main>
    </Layout>
  );
}
