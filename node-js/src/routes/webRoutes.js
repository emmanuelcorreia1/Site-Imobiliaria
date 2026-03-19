const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/home", {
    titulo: "Mondialle Imobiliária",
    subtitulo: "Encontre seu imóvel ideal"
  });
});

router.get("/venda", (req, res) => {
  res.render("pages/venda", {
    titulo: "Imóveis à Venda"
  });
});

router.get("/locacao", (req, res) => {
  res.render("pages/locacao", {
    titulo: "Imóveis para Locação"
  });
});

router.get("/sobre", (req, res) => {
  res.render("pages/sobre", {
    titulo: "Sobre a Mondialle"
  });
});

router.get("/contato", (req, res) => {
  res.render("pages/contato", {
    titulo: "Contato"
  });
});

module.exports = router;