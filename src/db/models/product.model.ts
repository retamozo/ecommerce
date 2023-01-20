import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
} from "sequelize";
import { CATEGORY_TABLE_NAME } from "./category.model";

export const TABLE_NAME = "products";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: number;
  declare name: string;
  declare price: string;
  declare description: string;
  declare categoryId: string;

  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Category, {
      as: "category",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Product",
      timestamps: false,
    };
  }
}

export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  categoryId: {
    field: "category_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE_NAME,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};
