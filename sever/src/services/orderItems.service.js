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
const orderItems_repository_1 = __importDefault(require("../repositories/orderItems.repository"));
class OrderItemsService {
    constructor() {
        this.orderItemsRepository = new orderItems_repository_1.default();
    }
    updateOrderItems(formUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderItemsRepository.updateOrderItems(formUpdate, id);
        });
    }
    getOrderItemsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderItemsRepository.getOrderItemsById(id);
        });
    }
    getAllOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderItemsRepository.getAllOrderItems();
        });
    }
    createOrderItems(formRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderItemsRepository.createOrderItems(formRequest);
        });
    }
    deleteOrderItemsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.orderItemsRepository.deleteOrderItemsById(id);
            return data;
        });
    }
}
exports.default = OrderItemsService;
