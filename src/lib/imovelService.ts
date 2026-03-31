import { imoveis } from "./imoveis";
import type {
  BuscaImoveis,
  ConsultaImoveis,
  FiltrosImoveis,
  Imovel,
  OpcoesCatalogo,
} from "./types";

function obterValorSimples(
  valor?: string | string[] | number,
): string | number | undefined {
  if (Array.isArray(valor)) {
    return valor[0];
  }

  return valor;
}

function normalizarTexto(valor: string | string[] | number = ""): string {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function transformarEmLista(valor?: string | string[]): string[] {
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

function textoCorresponde(candidato: string, valoresAceitos: string[]): boolean {
  if (!valoresAceitos.length) {
    return true;
  }

  const candidatoNormalizado = normalizarTexto(candidato);
  return valoresAceitos.some(
    (valor) => normalizarTexto(valor) === candidatoNormalizado,
  );
}

export function obterFiltros(consulta: ConsultaImoveis = {}): FiltrosImoveis {
  const precoMin = obterValorSimples(consulta.precoMin || consulta.minPrice);
  const precoMax = obterValorSimples(consulta.precoMax || consulta.maxPrice);
  const codigo = obterValorSimples(consulta.codigo || consulta.code);

  return {
    finalidade: transformarEmLista(consulta.finalidade || consulta.purpose),
    categoria: transformarEmLista(consulta.categoria || consulta.category),
    cidade: transformarEmLista(consulta.cidade || consulta.city),
    bairro: transformarEmLista(consulta.bairro || consulta.neighborhood),
    quartos: transformarEmLista(consulta.quartos || consulta.bedrooms)
      .map(Number)
      .filter(Boolean),
    precoMinimo: Number(precoMin || 0),
    precoMaximo: Number(precoMax || Number.MAX_SAFE_INTEGER),
    codigo: normalizarTexto(codigo || ""),
  };
}

export function filtrarImoveis(consulta: ConsultaImoveis = {}): BuscaImoveis {
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

export function obterImovelPorCodigo(codigo: string): Imovel | undefined {
  const codigoNormalizado = normalizarTexto(codigo);
  return imoveis.find(
    (imovel) => normalizarTexto(imovel.codigo) === codigoNormalizado,
  );
}

export function obterImovelPorId(id: string | number): Imovel | undefined {
  return imoveis.find((imovel) => imovel.id === Number(id));
}

export function obterImoveisEmDestaque(limite = 3): Imovel[] {
  return imoveis.filter((imovel) => imovel.destaque).slice(0, limite);
}

export function obterOpcoesCatalogo(): OpcoesCatalogo {
  const valoresUnicos = <T extends string | number>(valores: T[]): T[] =>
    [...new Set(valores)].sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }

      return String(a).localeCompare(String(b));
    });

  const contarValores = <T extends keyof Imovel>(
    chave: T,
    filtro: ((valor: Imovel[T]) => boolean) | null = null,
  ): Record<string, number> =>
    imoveis.reduce<Record<string, number>>((acumulado, imovel) => {
      const valor = imovel[chave];

      if (filtro && !filtro(valor)) {
        return acumulado;
      }

      const chaveTexto = String(valor);
      acumulado[chaveTexto] = (acumulado[chaveTexto] || 0) + 1;
      return acumulado;
    }, {});

  return {
    finalidades: valoresUnicos(imoveis.map((imovel) => imovel.finalidade)),
    categorias: valoresUnicos(imoveis.map((imovel) => imovel.categoria)),
    cidades: valoresUnicos(imoveis.map((imovel) => imovel.cidade)),
    bairros: valoresUnicos(imoveis.map((imovel) => imovel.bairro)),
    quartos: valoresUnicos(
      imoveis.map((imovel) => imovel.quartos).filter((quartos) => quartos > 0),
    ),
    contagens: {
      finalidades: contarValores("finalidade"),
      categorias: contarValores("categoria"),
      cidades: contarValores("cidade"),
      bairros: contarValores("bairro"),
      quartos: contarValores("quartos", (quartos) => quartos > 0),
    },
    precoMaximo: Math.max(...imoveis.map((imovel) => imovel.preco)),
  };
}
