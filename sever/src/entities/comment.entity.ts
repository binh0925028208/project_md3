import { BelongsTo, DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.entity";
import Product from "./product.entity";

const Comment = sequelize.define(
  "Comment",
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
Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(Product, {
  foreignKey: "productId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.hasMany(Comment, { foreignKey: "productId" });
export default Comment;
