import Layout from "../src/components/Layout";
import { empresa } from "../src/lib/empresa";
import { useEffect, useRef, useState } from "react";

const finalidades = [
  { value: "venda", label: "Venda" },
  { value: "locacao", label: "Locação" },
];

function DropdownFinalidade() {
  const [aberto, setAberto] = useState(false);
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function fecharAoClicarFora(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setAberto(false);
      }
    }

    document.addEventListener("click", fecharAoClicarFora);
    return () => document.removeEventListener("click", fecharAoClicarFora);
  }, []);

  const textoBotao =
    selecionadas.length === 0
      ? ""
      : finalidades
        .filter((finalidade) => selecionadas.includes(finalidade.value))
        .map((finalidade) => finalidade.label)
        .join(", ");

  function alternarFinalidade(value: string) {
    setSelecionadas((valoresAtuais) => {
      if (valoresAtuais.includes(value)) {
        return valoresAtuais.filter((item) => item !== value);
      }

      return [...valoresAtuais, value];
    });
  }

  return (
    <div
      className={`dropdownFinalidade ${aberto ? "ativo" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="dropdownFinalidadeBotao"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-haspopup="listbox"
      >
        <span>{textoBotao}</span>
        <span className="setaFinalidade" aria-hidden="true" />
      </button>

      <div className="dropdownFinalidadeLista">
        {finalidades.map((finalidade) => (
          <label className="opcaoFinalidade" key={finalidade.value}>
            <input
              type="checkbox"
              name="finalidade"
              value={finalidade.value}
              checked={selecionadas.includes(finalidade.value)}
              onChange={() => alternarFinalidade(finalidade.value)}
              required
            />
            <span className="checkboxFinalidade" />
            <span>{finalidade.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function AnunciarPage() {
  return (
    <Layout
      title="Anunciar imovel"
      page="anunciar"
      empresa={empresa}
      stylesheets={["/assets/css/anunciar.css"]}
    >
      <main className="paginaAnunciar">
        <section className="hero">
          <h3>ANUNCIE COM A MONDIALLE</h3>
          <h1 className="tituloHero">
            Seu imóvel merece <br />
            <span>visibilidade</span>
          </h1>
          <div className="retangulo"></div>
          <p className="textoHero">
            <span>
              Conectamos o seu imóvel às melhores oportunidades do mercado.
            </span>{" "}
            <br />
            Na Mondialle Imobiliária, oferecemos um serviço personalizado para
            proprietários que desejam anunciar com mais segurança e
            transparência
          </p>
          <div className="heroImages">
            <img src="/assets/images/Terra.png" alt="Planeta Terra" className="terra" />
            <div className="cirBlur" />
            <div className="cirBlur2" />
          </div>
        </section>

        <div className="formAnuncio">
          <h2>
            Preencha seus dados e as informações do imóvel. Em breve, entraremos
            em contato para dar continuidade ao atendimento.
          </h2>
          <form action="">
            <label htmlFor="campoNome">Nome completo*</label> <br />
            <input type="text" id="campoNome" name="nome" required />{" "}
            <br />
            <label htmlFor="campoTelefone">Telefone*</label> <br />
            <input type="tel" name="telefone" id="campoTelefone" placeholder="(00) 0000-0000" required />{" "}
            <br />
            <label htmlFor="campoEmail">Email*</label> <br />
            <input type="email" name="email" id="campoEmail" placeholder="seuemail@gmail.com" required />{" "}
            <br />
            <label htmlFor="campoTipo">Tipo do imóvel*</label> <br />
            <input type="text" name="tipoImovel" id="campoTipo" placeholder="Apartamento" required />
            <br />
            <label>Finalidade de Imóvel*</label> <br />
            <DropdownFinalidade />
            <br />
            <label htmlFor="campoCidade">Cidade*</label> <br />
            <input type="text" name="cidade" id="campoCidade" required />
            <br />
            <label htmlFor="campoBairro">Bairro*</label> <br />
            <input type="text" name="bairro" id="campoBairro" required />
            <br />
            <label htmlFor="campoMensagem">Mensagem</label> <br />
            <textarea name="mensagem" id="campoMensagem" />
            <br />
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </main>
    </Layout>
  );
}
