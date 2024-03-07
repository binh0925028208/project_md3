"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const user_entity_1 = __importDefault(require("./user.entity"));
const Payment = db_config_1.default.define("Payment", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
}, {
    timestamps: true,
});
Payment.belongsTo(user_entity_1.default, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
user_entity_1.default.hasMany(Payment, { foreignKey: "userId" });
exports.default = Payment;
