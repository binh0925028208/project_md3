"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_service_1 = __importDefault(require("../services/product.service"));
const productController = express_1.default.Router();
const productService = new product_service_1.default();
productController
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productService.getAllProduct();
    console.log(result);
    res.status(200).json(result);
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield productService.getProductById(id);
    res.status(200).json(result);
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = {
            id: req.body.id,
            productName: req.body.productName,
            price: req.body.price,
            scale: req.body.scale,
            stock: req.body.stock,
            decs: req.body.decs,
            img: req.body.img,
            brand: req.body.brand,
            isDelete: req.body.isDelete,
        };
        yield productService.createProduct(newProduct);
        res.status(201).json({ msg: "Create successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo" });
        console.log(error);
    }
}))
    .patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const updateProduct = Object.assign({}, req.body);
        const result = yield productService.updateProduct(id, updateProduct);
        if (result[0] == 0) {
            res.status(404).json({ msg: "not found" });
        }
        else {
            res.status(201).json({ msg: "Update successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra lúc cập nhật" });
    }
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { isDelete } = req.body;
        const updateProduct = { isDelete };
        const result = yield productService.updateProduct(id, updateProduct);
        if (result[0] == 0) {
            res.status(404).json({ msg: "not found" });
        }
        else {
            res.status(201).json({ msg: "Delete successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
    }
}));
exports.default = productController;
