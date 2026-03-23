const express = require("express");
const router = express.Router();
const {
  filtrarImoveis,
  obterOpcoesCatalogo,
  obterImoveisEmDestaque,
  obterImovelPorCodigo,
  obterImovelPorId,
  imoveis,
} = require("../services/imovelService");

const empresa = {
  nome: "Mondialle Imobiliaria",
  telefone: "(42) 9982-8281",
  email: "mondialleimobiliaria@gmail.com",
  instagram: "https://www.instagram.com/mondialleimobiliaria/",
  facebook: "https://www.facebook.com/profile.php?id=61584971055990",
  endereco: "Rua Floriano Peixoto, 180 sala 151 - Centro, Uniao da Vitoria",
};

function montarDadosBase(titulo, extras = {}) {
  return {
    titulo,
    empresa,
    ...extras,
  };
}

router.get("/", (req, res) => {
  const busca = filtrarImoveis(req.query);
  const catalogo = obterOpcoesCatalogo();

  res.render(
    "pages/home",
    montarDadosBase("Mondialle Imobiliaria", {
      busca,
      catalogo,
      imoveisDestaque: obterImoveisEmDestaque(3),
      pagina: "home",
      consulta: req.query,
    }),
  );
});

router.get("/venda", (req, res) => {
  const consulta = { ...req.query, finalidade: "venda" };
  const busca = filtrarImoveis(consulta);

  res.render(
    "pages/listagem",
    montarDadosBase("Imoveis a Venda", {
      cabecalho: "Imoveis para venda",
      introducao:
        "Selecao de oportunidades para comprar com seguranca e apoio especializado.",
      busca,
      catalogo: obterOpcoesCatalogo(),
      pagina: "venda",
      consulta,
    }),
  );
});

router.get("/locacao", (req, res) => {
  const consulta = { ...req.query, finalidade: "locacao" };
  const busca = filtrarImoveis(consulta);

  res.render(
    "pages/listagem",
    montarDadosBase("Imoveis para Locacao", {
      cabecalho: "Imoveis para locacao",
      introducao: "Opcoes para morar ou operar seu negocio com mais praticidade.",
      busca,
      catalogo: obterOpcoesCatalogo(),
      pagina: "locacao",
      consulta,
    }),
  );
});

router.get("/imoveis", (req, res) => {
  const busca = filtrarImoveis(req.query);

  res.render(
    "pages/listagem",
    montarDadosBase("Catalogo de Imoveis", {
      cabecalho: "Catalogo completo",
      introducao:
        "Use os filtros para encontrar o imovel ideal para venda ou locacao.",
      busca,
      catalogo: obterOpcoesCatalogo(),
      pagina: "imoveis",
      consulta: req.query,
    }),
  );
});

router.get("/imoveis/:identificador", (req, res) => {
  const imovel =
    obterImovelPorCodigo(req.params.identificador) ||
    obterImovelPorId(req.params.identificador);

  if (!imovel) {
    return res.status(404).render(
      "pages/nao-encontrado",
      montarDadosBase("Imovel nao encontrado", {
        pagina: "nao-encontrado",
      }),
    );
  }

  return res.render(
    "pages/detalhe-imovel",
    montarDadosBase(`${imovel.titulo} | ${empresa.nome}`, {
      imovel,
      pagina: "imovel",
    }),
  );
});

router.get("/api/imoveis", (req, res) => {
  const busca = filtrarImoveis(req.query);

  res.json({
    total: busca.itens.length,
    filtros: busca.filtros,
    itens: busca.itens,
  });
});

router.get("/sobre", (req, res) => {
  res.render(
    "pages/sobre",
    montarDadosBase("Sobre a Mondialle", {
      totalImoveis: imoveis.length,
      pagina: "sobre",
    }),
  );
});

router.get("/contato", (req, res) => {
  res.render(
    "pages/contato",
    montarDadosBase("Contato", {
      pagina: "contato",
    }),
  );
});

module.exports = router;
