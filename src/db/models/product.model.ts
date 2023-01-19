import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, Sequelize } from 'sequelize';

export const TABLE_NAME = "products"

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: number;
  declare name: string;
  declare price: string

  static associate() {
    // associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Product",
      timestamps: false
    }
  }
}

export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

