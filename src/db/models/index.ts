import { Sequelize } from "sequelize";
import { Product, ProductSchema } from "./product.model";
import { User, UserSchema } from "./user.model";

export function setupModels(sequelize: Sequelize) {
  Product.init(ProductSchema, Product.config(sequelize)),
    User.init(UserSchema, User.config(sequelize));
}
