import {
  ProductSchema,
  TABLE_NAME as ProductTable,
} from "@db-models/product.model";
import { UserSchema, TABLE_NAME as UserTable } from "@db-models/user.model";
import type { Migration } from "../../libs/umzug/umzug"

export const up: Migration = async ({
  context: sequelize,
}) => {
  await sequelize.getQueryInterface().createTable(UserTable, UserSchema)
  await sequelize.getQueryInterface().createTable(ProductTable, ProductSchema)
};

export const down: Migration = async ({
  context: sequelize,
}) => {
  await Promise.all([
    sequelize.getQueryInterface().dropTable(UserTable),
    sequelize.getQueryInterface().dropTable(ProductTable)
  ])
};
