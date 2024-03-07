"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const user_entity_1 = __importDefault(require("./user.entity"));
const product_entity_1 = __importDefault(require("./product.entity"));
const Comment = db_config_1.default.define("Comment", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
Comment.belongsTo(user_entity_1.default, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
user_entity_1.default.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(product_entity_1.default, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
product_entity_1.default.hasMany(Comment, { foreignKey: "productId" });
exports.default = Comment;
