import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(
    `CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      age INTEGER CHECK(age > 0),
      role VARCHAR(255) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
    );`
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE users;`);
};