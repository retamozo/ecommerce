import sequelize from "@libs/sequelize";
import path from "path";
import { SequelizeStorage, Umzug } from "umzug";

export const umzug = new Umzug({
  logger: console,
  create: {
    folder: path.resolve("src", "db", "migrations"),
  },
  migrations: {
    glob: ["db/migrations/*.ts", { cwd: "src" }]
  },
  context: sequelize,
  storage: new SequelizeStorage({ modelName: "migrations", sequelize }),
});

export type Migration = typeof umzug._types.migration;
