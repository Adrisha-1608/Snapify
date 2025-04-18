import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "isAdmin">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: "User" }
);

export default User;
