"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize("b6iddjy3cn0uo7cqpoyx", "u8yblj8lj7n8rlm0", "GGLdeFXVmZ5jWvxTXKgF", {
    host: "b6iddjy3cn0uo7cqpoyx-mysql.services.clever-cloud.com",
    dialect: "mysql",
});
exports.default = sequelize;
