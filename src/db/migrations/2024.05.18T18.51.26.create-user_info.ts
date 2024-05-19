import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(
    `CREATE TABLE users_info (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INTEGER CHECK(age > 0),
    );`
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE users_info`);
};