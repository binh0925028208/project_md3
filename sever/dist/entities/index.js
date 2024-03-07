"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_entity_1 = __importDefault(require("./comment.entity"));
const orderItems_entity_1 = __importDefault(require("./orderItems.entity"));
const product_entity_1 = __importDefault(require("./product.entity"));
const ratting_entity_1 = __importDefault(require("./ratting.entity"));
const user_entity_1 = __importDefault(require("./user.entity"));
const createTable = () => {
    user_entity_1.default.sync().then(() => {
        console.log("User created");
    });
    product_entity_1.default.sync().then(() => {
        console.log("Product created");
    });
    ratting_entity_1.default.sync().then(() => {
        console.log("Ratting created");
    });
    comment_entity_1.default.sync().then(() => {
        console.log("Comment created");
    });
    orderItems_entity_1.default.sync().then(() => {
        console.log("orderItems created");
    });
    orderItems_entity_1.default.sync().then(() => {
        console.log("OrderItems created");
    });
};
exports.default = createTable;
