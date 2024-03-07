"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize("bdglcwdet2wc48k4y5nz", "ut2eepzbd3wpsifw", "Pm6XoZO7CMEr6HZhdoOw", {
    host: "bdglcwdet2wc48k4y5nz-mysql.services.clever-cloud.com",
    dialect: "mysql",
});
exports.default = sequelize;
