import { UserSchema, TABLE_NAME as UserTable } from "@db-models/user.model";
import type { Migration } from "@libs/umzug/umzug";

export const up: Migration = async ({
  context: sequelize
}) => {
  await sequelize.getQueryInterface().addColumn(UserTable, "role", UserSchema.role)
};


export const down: Migration = async ({
  context: sequelize
}) => {
  await sequelize.getQueryInterface().removeColumn(UserTable, "role")
};
