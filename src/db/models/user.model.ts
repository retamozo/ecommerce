import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, Sequelize } from 'sequelize';

export const TABLE_NAME = "users"

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare email: string
  declare password: string
  declare createdAt: string | null

  static associate() {
    // associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "User",
      timestamps: false
    }
  }
}

export const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    default: "customer"
  }
}
