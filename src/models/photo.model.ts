import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";

interface PhotoAttributes {
  id: number;
  caption: string;
  url: string;
  publicId: string;
  size: number;
  userId: number;
}

type PhotoCreationAttributes = Optional<PhotoAttributes, "id">;

class Photo extends Model<PhotoAttributes, PhotoCreationAttributes> implements PhotoAttributes {
  public id!: number;
  public caption!: string;
  public url!: string;
  public publicId!: string;
  public size!: number;
  public userId!: number;
}

Photo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    caption: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING, allowNull: false },
    publicId: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Photo" }
);

export default Photo;
