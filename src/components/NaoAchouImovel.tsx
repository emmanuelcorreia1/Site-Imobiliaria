import Head from "next/head";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const TIPOS = ["Casa", "Apartamento", "Chácara", "Terreno", "Sala comercial", "Outro"];
const FINALIDADES = ["Comprar", "Alugar"];

const FORM_INICIAL = {
  finalidade: "Comprar",
  tipo: "Casa",
  regiao: "",
  valor: "",
  detalhes: "",
  nome: "",
  telefone: "",
  email: "",
};

/**
 * "Não achou o imóvel?": o visitante conta o que procura e a mensagem chega no e-mail da imobiliária
 * pelo mesmo envio dos outros formulários (/api/enviarEmail).
 */
export default function NaoAchouImovel() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  function alterar(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setErro("");

    const mensagem = [
      `Procura: ${form.tipo} para ${form.finalidade.toLowerCase()}`,
      form.regiao && `Região ou cidade: ${form.regiao}`,
      form.valor && `Valor: ${form.valor}`,
      form.detalhes && `Detalhes: ${form.detalhes}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/enviarEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          assunto: `Procura de imóvel: ${form.tipo} para ${form.finalidade.toLowerCase()}`,
          mensagem,
        }),
      });
      if (res.ok) {
        setEnviado(true);
        setForm(FORM_INICIAL);
      } else {
        setErro("Não foi possível enviar. Tente novamente.");
      }
    } catch {
      setErro("Erro ao enviar. Verifique sua conexão.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="naoAchou" id="nao-achou-o-imovel">
      <Head>
        <link rel="stylesheet" href="/assets/css/naoAchou.css" />
      </Head>

      <div className="naoAchouCaixa">
        <h2>Não achou o imóvel que procura?</h2>
        <p className="naoAchouSub">
          Conte o que você procura e nossa equipe entra em contato.
        </p>

        {enviado ? (
          <p className="naoAchouSucesso">
            Recebemos seu pedido! Entraremos em contato em breve.
          </p>
        ) : (
          <form onSubmit={enviar} className="naoAchouForm">
            <label>
              Quero
              <select name="finalidade" value={form.finalidade} onChange={alterar}>
                {FINALIDADES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tipo de imóvel
              <select name="tipo" value={form.tipo} onChange={alterar}>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Região ou cidade
              <input
                type="text"
                name="regiao"
                value={form.regiao}
                onChange={alterar}
                placeholder="Ex.: Centro de Porto União"
                maxLength={100}
              />
            </label>
            <label>
              Valor que pretende pagar
              <input
                type="text"
                name="valor"
                value={form.valor}
                onChange={alterar}
                placeholder="Ex.: até R$ 400 mil"
                maxLength={60}
              />
            </label>
            <label className="naoAchouLinhaInteira">
              Mais detalhes (opcional)
              <textarea
                name="detalhes"
                value={form.detalhes}
                onChange={alterar}
                rows={3}
                placeholder="Quartos, área, perto do rio, aceita financiamento..."
                maxLength={800}
              />
            </label>
            <label>
              Seu nome
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={alterar}
                required
                maxLength={100}
              />
            </label>
            <label>
              Telefone (WhatsApp)
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={alterar}
                required
                maxLength={30}
              />
            </label>
            <label className="naoAchouLinhaInteira">
              E-mail
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={alterar}
                required
                maxLength={200}
              />
            </label>
            {erro && <p className="naoAchouErro naoAchouLinhaInteira">{erro}</p>}
            <button
              type="submit"
              className="naoAchouBotao naoAchouLinhaInteira"
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Enviar pedido"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
