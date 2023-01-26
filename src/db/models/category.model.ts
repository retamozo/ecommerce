import { Model, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Sequelize } from "sequelize";

export const CATEGORY_TABLE_NAME = "categories";
export const CATEGORY_MODEL_NAME = "Category"

export const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: number;
  declare name: string;
  declare image: string

  static associate(models: Sequelize["models"]) {
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "categoryId"
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE_NAME,
      modelName: CATEGORY_MODEL_NAME,
      timestamps: false
    }
  }
}
