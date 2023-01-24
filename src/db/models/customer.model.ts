import { SchemaMap } from "joi";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
} from "sequelize";
import { USER_TABLE } from "./user.model";

export const CUSTOMERS_TABLE = "customers";

export class Customer extends Model<
  InferAttributes<Customer>,
  InferCreationAttributes<Customer>
> {
  declare id: number;
  declare lastName: string;
  declare name: string;
  declare phone: string;
  declare createdAt: string | null;
  declare userId: string;


  static associate(models) {
    // associate
    this.belongsTo(models.User, {
      as: "user",
    });
    this.hasMany(models.Order, {
      as: "orders",
      foreignKey: "customerId"
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMERS_TABLE,
      modelName: "Customer",
      timestamps: false,
    };
  }
}

export const CustomerSchema = {
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
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "last_name",
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: DataTypes.NOW,
  },
  userId: {
    allowNull: false,
    field: "user_id",
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};
