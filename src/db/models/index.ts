import { Sequelize } from "sequelize";
import { Product, ProductSchema } from "./product.model";
import { User, UserSchema } from "./user.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Category, CategorySchema } from "./category.model";
import { Order, OrderSchema } from "./order.model";
import { OrderProduct, orderProductSchema } from "./order-product.model";

export function setupModels(sequelize: Sequelize) {
  Product.init(ProductSchema, Product.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize))

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}
