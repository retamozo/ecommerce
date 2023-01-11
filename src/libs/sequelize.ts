import { setupModels } from "../db/models";
import { Sequelize as SequelizeClient } from "sequelize";
import config from "@config";

const sequelize = new SequelizeClient(config.connectionURIString, {
  dialect: "postgres",
});

setupModels(sequelize);

const sync = async () => {
  await sequelize.sync();
};

sync();

export default sequelize;
