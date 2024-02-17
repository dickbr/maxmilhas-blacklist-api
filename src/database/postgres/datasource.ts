import { DataSource } from "typeorm";
import { resolve } from "path";
import "dotenv/config";
import { Client } from "./entities/client.entity";
import { Blacklist } from "./entities/blacklist.entity";

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE ,
  schema: process.env.DB_SCHEMA,
  entities: [Client, Blacklist],
  synchronize: false,
  migrations: [resolve(__dirname, "migrations", "*{.ts,.js}")],
  uuidExtension: "uuid-ossp"
})