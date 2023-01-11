import { Sequelize } from "sequelize";
import { Product, ProductSchema } from "./product.model";
import { User, UserSchema } from "./user.model";

export function setupModels(s: Sequelize) {
  Product.init(ProductSchema, Product.config(s)),
    User.init(UserSchema, User.config(s));
}
