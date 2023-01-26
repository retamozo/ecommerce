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

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up();
})();

export type Migration = typeof umzug._types.migration;
