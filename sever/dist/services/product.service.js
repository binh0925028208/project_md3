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
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
class ProductService {
    constructor() {
        this.productRepository = new product_repository_1.default();
    }
    updateProduct(formUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.updateProduct(formUpdate, id);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.findProduct(id);
        });
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productRepository.getAllProduct();
            return result;
        });
    }
    createProduct(formRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.createProduct(formRequest);
        });
    }
    deleteProductById(formUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.productRepository.deleteById(formUpdate, id);
            return data;
        });
    }
}
exports.default = ProductService;
