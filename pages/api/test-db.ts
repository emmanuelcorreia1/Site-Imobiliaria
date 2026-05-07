import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../src/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await pool.query("SELECT 1 AS ok");
    res.status(200).json({ conectado: true, resultado: result.rows });
  } catch (error) {
    res.status(500).json({ conectado: false, erro: String(error) });
  }
}
