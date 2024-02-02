import { BelongsTo, DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.entity";
import Product from "./product.entity";

const Ratting = sequelize.define(
  "Ratting",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Ratting.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Ratting, { foreignKey: "userId" });
Ratting.belongsTo(Product, {
  foreignKey: "productId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.hasMany(Ratting, { foreignKey: "productId" });
export default Ratting;
