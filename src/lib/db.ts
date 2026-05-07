import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const usaBancoLocal =
  connectionString?.includes("localhost") ||
  connectionString?.includes("127.0.0.1");

const pool = new Pool({
  connectionString,
  ssl: usaBancoLocal ? false : { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 10000,
});

export default pool;
