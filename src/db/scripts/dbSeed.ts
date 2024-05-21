import { query, pool } from "..";

query(
  `INSERT INTO users (name, email, password, age, role) 
    VALUES (
      'admin',
      'admin@example.com',
      '$2a$10$ukDSRsiEN7BNcTZRknhcMOvblgmWW2mQ/dQ/GQHzwcxfqryvbdskK',
      30,
      'admin'
    );
  `).then(() => {
  console.log("User inserted");
  pool.end();
});
