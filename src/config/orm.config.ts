import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Category } from "./../categories/category.entity";
import { Drink } from "./../drinks/drink.entity";

export default registerAs(
  "orm.config",
  (): TypeOrmModuleOptions => ({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Category, Drink],
    synchronize: true,
  })
);
