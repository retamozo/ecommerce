import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { PRODUCTS_TABLE } from "./product.model";
import { USER_TABLE } from "./user.model";
import { OrderProductSchema } from "@custom-types/models/order-product"

export const ORDER_PRODUCT_TABLE = "order_product";

export const ORDER_PRODUCT_MODEL = "OrderProduct"

export const orderProductSchema: OrderProductSchema = {
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
      tableName: ORDER_PRODUCT_TABLE,
      modelName: ORDER_PRODUCT_MODEL,
      timestamps: false,
    };
  }
}
