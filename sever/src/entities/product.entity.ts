import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

const Product = sequelize.define(
  "products",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    scale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Product;
