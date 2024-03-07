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
const ratting_repository_1 = __importDefault(require("../repositories/ratting.repository"));
class RattingService {
    constructor() {
        this.rattingRepository = new ratting_repository_1.default();
    }
    getAllRatting() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.rattingRepository.getAllRatting();
        });
    }
    getRattingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.rattingRepository.getRattingById(id);
            return data;
        });
    }
    createRatting(formRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rattingRepository.createRatting(formRequest);
        });
    }
    deleteRattingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.rattingRepository.deleteById(id);
            return data;
        });
    }
    updateRatting(id, formUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.rattingRepository.updateRatting(id, formUpdate);
            return data;
        });
    }
}
exports.default = RattingService;
