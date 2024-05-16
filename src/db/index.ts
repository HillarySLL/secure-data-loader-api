import "dotenv/config";
import { Client, Pool } from "pg";

// Todas las consultas
export const pool = new Pool({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGDATABASE"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});

export const query = (text: string, params?: (string | number | boolean)[]) => {
  console.log({ text, params });
  return pool.query(text, params);
};

// Crear la base de datos y borrar la base de datos
export const adminClient = new Client({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGUSER"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});