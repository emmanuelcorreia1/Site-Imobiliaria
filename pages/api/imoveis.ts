import type { NextApiRequest, NextApiResponse } from "next";
import { filtrarImoveis } from "../../src/lib/imovelService";
import type { BuscaImoveis } from "../../src/lib/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BuscaImoveis & { total: number }>,
) {
  const busca = filtrarImoveis(req.query);

  res.status(200).json({
    total: busca.itens.length,
    filtros: busca.filtros,
    itens: busca.itens,
  });
}
