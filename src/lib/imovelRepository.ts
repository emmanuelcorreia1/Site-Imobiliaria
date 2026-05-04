import pool from "./db";
import { obterFiltros } from "./imovelService";
import type {
  BuscaImoveis,
  ConsultaImoveis,
  Imovel,
  OpcoesCatalogo,
} from "./types";

const BASE_QUERY = `
  SELECT
    i.id::int AS id,
    i.codigo,
    i.titulo,
    i.finalidade,
    i.categoria,
    i.cidade,
    i.bairro,
    i.endereco,
    i.quartos,
    i.banheiros,
    i.vagas,
    i.area::float AS area,
    i.preco::float AS preco,
    i.imagem,
    i.descricao,
    i.destaque,
    imagens.imagens,
    comodidades.comodidades
  FROM public.imoveis i
  LEFT JOIN LATERAL (
    SELECT COALESCE(array_agg(url ORDER BY ordem), ARRAY[]::text[]) AS imagens
    FROM public.imagens
    WHERE imovel_id = i.id
  ) imagens ON true
  LEFT JOIN LATERAL (
    SELECT COALESCE(array_agg(nome ORDER BY nome), ARRAY[]::text[]) AS comodidades
    FROM public.comodidades
    WHERE imovel_id = i.id
  ) comodidades ON true
`;

function normalizarListaTexto(valores: string[]): string[] {
  return valores.map((valor) => valor.toLowerCase());
}

function mapRow(row: Record<string, unknown>): Imovel {
  const imagens = row.imagens as string[];
  const comodidades = row.comodidades as string[];
  return {
    id: row.id as number,
    codigo: row.codigo as string,
    titulo: row.titulo as string,
    finalidade: row.finalidade as "venda" | "locacao",
    categoria: row.categoria as string,
    cidade: row.cidade as string,
    bairro: row.bairro as string,
    endereco: row.endereco as string,
    quartos: row.quartos as number,
    banheiros: row.banheiros as number,
    vagas: row.vagas as number,
    area: row.area as number,
    preco: row.preco as number,
    imagem: row.imagem as string,
    imagens: imagens.length ? imagens : undefined,
    descricao: row.descricao as string,
    destaque: row.destaque as boolean,
    comodidades: comodidades.length ? comodidades : undefined,
  };
}

export async function filtrarImoveis(
  consulta: ConsultaImoveis = {},
): Promise<BuscaImoveis> {
  const filtros = obterFiltros(consulta);

  const params: unknown[] = [];
  const where: string[] = ["i.ativo = true"];

  function addParam(value: unknown): string {
    params.push(value);
    return `$${params.length}`;
  }

  if (filtros.finalidade.length) {
    where.push(`i.finalidade = ANY(${addParam(filtros.finalidade)}::text[])`);
  }
  if (filtros.categoria.length) {
    where.push(
      `lower(i.categoria) = ANY(${addParam(normalizarListaTexto(filtros.categoria))}::text[])`,
    );
  }
  if (filtros.cidade.length) {
    where.push(
      `lower(i.cidade) = ANY(${addParam(normalizarListaTexto(filtros.cidade))}::text[])`,
    );
  }
  if (filtros.bairro.length) {
    where.push(
      `lower(i.bairro) = ANY(${addParam(normalizarListaTexto(filtros.bairro))}::text[])`,
    );
  }
  if (filtros.quartos.length) {
    where.push(`i.quartos = ANY(${addParam(filtros.quartos)}::int[])`);
  }
  if (filtros.precoMinimo > 0) {
    where.push(`i.preco >= ${addParam(filtros.precoMinimo)}`);
  }
  if (filtros.precoMaximo < Number.MAX_SAFE_INTEGER) {
    where.push(`i.preco <= ${addParam(filtros.precoMaximo)}`);
  }
  if (filtros.codigo) {
    where.push(`lower(i.codigo) = ${addParam(filtros.codigo)}`);
  }

  const { rows } = await pool.query(
    `${BASE_QUERY} WHERE ${where.join(" AND ")} ORDER BY i.id`,
    params,
  );

  return { itens: rows.map(mapRow), filtros };
}

export async function obterOpcoesCatalogo(): Promise<OpcoesCatalogo> {
  const [finalidadesRes, categoriasRes, cidadesRes, bairrosRes, quartosRes, precoRes] =
    await Promise.all([
      pool.query<{ finalidade: string; count: number }>(
        `SELECT finalidade, COUNT(*)::int AS count FROM public.imoveis WHERE ativo = true GROUP BY finalidade ORDER BY finalidade`,
      ),
      pool.query<{ categoria: string; count: number }>(
        `SELECT categoria, COUNT(*)::int AS count FROM public.imoveis WHERE ativo = true GROUP BY categoria ORDER BY categoria`,
      ),
      pool.query<{ cidade: string; count: number }>(
        `SELECT cidade, COUNT(*)::int AS count FROM public.imoveis WHERE ativo = true GROUP BY cidade ORDER BY cidade`,
      ),
      pool.query<{ bairro: string; count: number }>(
        `SELECT bairro, COUNT(*)::int AS count FROM public.imoveis WHERE ativo = true GROUP BY bairro ORDER BY bairro`,
      ),
      pool.query<{ quartos: number; count: number }>(
        `SELECT quartos, COUNT(*)::int AS count FROM public.imoveis WHERE ativo = true AND quartos > 0 GROUP BY quartos ORDER BY quartos`,
      ),
      pool.query<{ max_preco: number }>(
        `SELECT MAX(preco)::float AS max_preco FROM public.imoveis WHERE ativo = true`,
      ),
    ]);

  return {
    finalidades: finalidadesRes.rows.map((r) => r.finalidade),
    categorias: categoriasRes.rows.map((r) => r.categoria),
    cidades: cidadesRes.rows.map((r) => r.cidade),
    bairros: bairrosRes.rows.map((r) => r.bairro),
    quartos: quartosRes.rows.map((r) => r.quartos),
    contagens: {
      finalidades: Object.fromEntries(
        finalidadesRes.rows.map((r) => [r.finalidade, r.count]),
      ),
      categorias: Object.fromEntries(
        categoriasRes.rows.map((r) => [r.categoria, r.count]),
      ),
      cidades: Object.fromEntries(
        cidadesRes.rows.map((r) => [r.cidade, r.count]),
      ),
      bairros: Object.fromEntries(
        bairrosRes.rows.map((r) => [r.bairro, r.count]),
      ),
      quartos: Object.fromEntries(
        quartosRes.rows.map((r) => [r.quartos, r.count]),
      ),
    },
    precoMaximo: Number(precoRes.rows[0]?.max_preco ?? 0),
  };
}

export async function obterImoveisEmDestaque(limite = 3): Promise<Imovel[]> {
  const { rows } = await pool.query(
    `${BASE_QUERY} WHERE i.destaque = true AND i.ativo = true ORDER BY i.id LIMIT $1`,
    [limite],
  );
  return rows.map(mapRow);
}

export async function obterImovelPorCodigo(
  codigo: string,
): Promise<Imovel | undefined> {
  const { rows } = await pool.query(
    `${BASE_QUERY} WHERE lower(i.codigo) = lower($1) AND i.ativo = true`,
    [codigo],
  );
  return rows[0] ? mapRow(rows[0]) : undefined;
}

export async function obterImovelPorId(
  id: string | number,
): Promise<Imovel | undefined> {
  const { rows } = await pool.query(
    `${BASE_QUERY} WHERE i.id = $1 AND i.ativo = true`,
    [Number(id)],
  );
  return rows[0] ? mapRow(rows[0]) : undefined;
}
