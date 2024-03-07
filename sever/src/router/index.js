"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const productController_1 = __importDefault(require("../controllers/productController"));
const orderItemsController_1 = __importDefault(require("../controllers/orderItemsController"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const rattingController_1 = __importDefault(require("../controllers/rattingController"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const Router = (app) => {
    app.use("/user", userController_1.default);
    app.use("/products", productController_1.default);
    app.use("/orderItems", orderItemsController_1.default);
    app.use("/comment", commentController_1.default);
    app.use("/ratting", rattingController_1.default);
    app.use("/admin", adminController_1.default);
};
exports.default = Router;
