const imoveis = require("../data/imoveis");

function normalizarTexto(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function transformarEmLista(valor) {
  if (!valor) {
    return [];
  }

  if (Array.isArray(valor)) {
    return valor.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(valor)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function textoCorresponde(candidato, valoresAceitos) {
  if (!valoresAceitos.length) {
    return true;
  }

  const candidatoNormalizado = normalizarTexto(candidato);
  return valoresAceitos.some(
    (valor) => normalizarTexto(valor) === candidatoNormalizado,
  );
}

function obterFiltros(consulta = {}) {
  return {
    finalidade: transformarEmLista(consulta.finalidade || consulta.purpose),
    categoria: transformarEmLista(consulta.categoria || consulta.category),
    cidade: transformarEmLista(consulta.cidade || consulta.city),
    bairro: transformarEmLista(consulta.bairro || consulta.neighborhood),
    quartos: transformarEmLista(consulta.quartos || consulta.bedrooms)
      .map(Number)
      .filter(Boolean),
    precoMinimo: Number(consulta.precoMin || consulta.minPrice || 0),
    precoMaximo: Number(
      consulta.precoMax || consulta.maxPrice || Number.MAX_SAFE_INTEGER,
    ),
    codigo: normalizarTexto(consulta.codigo || consulta.code || ""),
  };
}

function filtrarImoveis(consulta = {}) {
  const filtros = obterFiltros(consulta);

  const itens = imoveis.filter((imovel) => {
    if (!textoCorresponde(imovel.finalidade, filtros.finalidade)) {
      return false;
    }

    if (!textoCorresponde(imovel.categoria, filtros.categoria)) {
      return false;
    }

    if (!textoCorresponde(imovel.cidade, filtros.cidade)) {
      return false;
    }

    if (!textoCorresponde(imovel.bairro, filtros.bairro)) {
      return false;
    }

    if (filtros.quartos.length && !filtros.quartos.includes(imovel.quartos)) {
      return false;
    }

    if (
      imovel.preco < filtros.precoMinimo ||
      imovel.preco > filtros.precoMaximo
    ) {
      return false;
    }

    if (filtros.codigo && normalizarTexto(imovel.codigo) !== filtros.codigo) {
      return false;
    }

    return true;
  });

  return { itens, filtros };
}

function obterImovelPorCodigo(codigo) {
  const codigoNormalizado = normalizarTexto(codigo);
  return imoveis.find(
    (imovel) => normalizarTexto(imovel.codigo) === codigoNormalizado,
  );
}

function obterImovelPorId(id) {
  return imoveis.find((imovel) => imovel.id === Number(id));
}

function obterImoveisEmDestaque(limite = 3) {
  return imoveis.filter((imovel) => imovel.destaque).slice(0, limite);
}

function obterOpcoesCatalogo() {
  const valoresUnicos = (valores) =>
    [...new Set(valores)].sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }

      return String(a).localeCompare(String(b));
    });

  return {
    finalidades: valoresUnicos(imoveis.map((imovel) => imovel.finalidade)),
    categorias: valoresUnicos(imoveis.map((imovel) => imovel.categoria)),
    cidades: valoresUnicos(imoveis.map((imovel) => imovel.cidade)),
    bairros: valoresUnicos(imoveis.map((imovel) => imovel.bairro)),
    quartos: valoresUnicos(
      imoveis.map((imovel) => imovel.quartos).filter((quartos) => quartos > 0),
    ),
    precoMaximo: Math.max(...imoveis.map((imovel) => imovel.preco)),
  };
}

module.exports = {
  filtrarImoveis,
  obterFiltros,
  obterImovelPorCodigo,
  obterImovelPorId,
  obterImoveisEmDestaque,
  obterOpcoesCatalogo,
  imoveis,
};
