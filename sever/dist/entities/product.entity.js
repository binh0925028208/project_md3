"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const Product = db_config_1.default.define("products", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    isDelete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    scale: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false,
});
exports.default = Product;
