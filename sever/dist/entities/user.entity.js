"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const User = db_config_1.default.define("User", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg",
    },
    role: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    point: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true,
    },
}, {
    timestamps: true,
});
exports.default = User;
