"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const user_entity_1 = __importDefault(require("./user.entity"));
const OrderItems = db_config_1.default.define("OrderItems", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    scale: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
});
OrderItems.belongsTo(user_entity_1.default, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
user_entity_1.default.hasMany(OrderItems, { foreignKey: "userId" });
exports.default = OrderItems;
