import Layout from "../src/components/Layout";
import { empresa } from "../src/lib/empresa";

export default function PaginaConstrucao() {
  return (
    <Layout
      title="Em Construcao"
      page="construcao"
      empresa={empresa}
      stylesheets={["/assets/css/construcao.css"]}
      showHeader={false}
      showFooter={false}
    >
      <main className="pageConstrucao">
        <h1>Em Breve</h1>
      </main>
    </Layout>
  );
}
