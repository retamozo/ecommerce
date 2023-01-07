import { Sequelize } from "sequelize";
import config from "../config"

const sequalize = new Sequelize({
  dialect: "postgres",
  database: config.connectionURIString,
  username: config.dbUser,
  password: config.dbPassword
})

export default sequalize
