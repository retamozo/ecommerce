import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { PRODUCTS_TABLE } from "./product.model";
import { USER_TABLE } from "./user.model";
import { TOrderProductSchema } from "@custom-types/models/order-product"

export const ORDERS_PRODUCTS_TABLE = "orders_products";

export const ORDERS_PRODUCTS_MODEL = "OrderProduct"

export const OrderProductSchema: TOrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: "order_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTS_TABLE,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

export class OrderProduct extends Model<
  InferAttributes<OrderProduct>,
  InferCreationAttributes<OrderProduct>
> {
  declare id: number;
  declare orderId: number;
  declare productId: number;
  declare amount: number;

  static associate(models: Sequelize["models"]) {
    // this.belongsToMany(models.Category, {
    //   as: "category",
    // });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDERS_PRODUCTS_TABLE,
      modelName: ORDERS_PRODUCTS_MODEL,
      timestamps: false,
    };
  }
}
