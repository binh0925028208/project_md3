import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.entity";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Payment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Payment, { foreignKey: "userId" });
export default Payment;
