import type { Imovel } from "./types";

/**
 * Escolhe os imóveis mais parecidos com o que o visitante está vendo.
 *
 * Pontos: mesma categoria (+4), mesma cidade (+2), mesmo bairro (+1) e preço até 40% acima ou abaixo (+3).
 * Imóveis com a mesma finalidade (venda ou locação) vêm primeiro; só entram os de outra finalidade se faltar.
 * Em empate, ganha o preço mais próximo.
 */
export function escolherSimilares(
  atual: Imovel,
  todos: Imovel[],
  limite = 3,
): Imovel[] {
  const normalizar = (texto: string) => texto.trim().toLowerCase();

  const pontuados = todos
    .filter((outro) => outro.id !== atual.id)
    .map((outro) => {
      let pontos = 0;
      if (normalizar(outro.categoria) === normalizar(atual.categoria)) pontos += 4;
      if (normalizar(outro.cidade) === normalizar(atual.cidade)) pontos += 2;
      if (normalizar(outro.bairro) === normalizar(atual.bairro)) pontos += 1;

      const diferenca =
        atual.preco > 0 ? Math.abs(outro.preco - atual.preco) / atual.preco : 1;
      if (diferenca <= 0.4) pontos += 3;

      return {
        outro,
        pontos,
        mesmaFinalidade: outro.finalidade === atual.finalidade,
        diferenca,
      };
    });

  pontuados.sort((a, b) => {
    if (a.mesmaFinalidade !== b.mesmaFinalidade) return a.mesmaFinalidade ? -1 : 1;
    if (a.pontos !== b.pontos) return b.pontos - a.pontos;
    return a.diferenca - b.diferenca;
  });

  return pontuados.slice(0, limite).map((item) => ({
    ...item.outro,
    // Nos cards só a foto principal é usada; tirar o resto deixa a página mais leve.
    imagens: undefined,
    comodidades: undefined,
  }));
}
