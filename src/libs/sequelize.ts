import config from "@config";
import { setupModels } from "../db/models";
import { Sequelize as SequelizeClient } from "sequelize";

const sequelize = new SequelizeClient(config.connectionURIString, {
  dialect: "postgres",
});

setupModels(sequelize);

export default sequelize;
