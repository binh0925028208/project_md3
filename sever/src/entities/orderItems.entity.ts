import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.entity";

const OrderItems = sequelize.define(
  "OrderItems",
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
      unique: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    scale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    code: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
OrderItems.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(OrderItems, { foreignKey: "userId" });
export default OrderItems;
