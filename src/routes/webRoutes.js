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
      imoveisDestaque: obterImoveisEmDestaque(6),
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
      cabecalho: "Imóveis para venda",
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
      cabecalho: "Imóveis para locação",
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
      cabecalho: "Catálogo completo",
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

router.get("/anunciar", (req, res) => {
  res.render(
    "pages/anunciar",
    montarDadosBase("Anunciar imovel", {
      pagina: "anunciar",
    }),
  );
});

module.exports = router;
