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
const ratting_service_1 = __importDefault(require("../services/ratting.service"));
const rattingController = express_1.default.Router();
const rattingService = new ratting_service_1.default();
rattingController
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rattingService.getAllRatting();
    res.status(200).json(result);
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield rattingService.getRattingById(id);
    res.status(200).json(result);
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRatting = {
            status: req.body.status,
            ratting: req.body.ratting,
        };
        yield rattingService.createRatting(newRatting);
        res.status(201).json({ msg: "Create ratting successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo ratting" });
        console.log(error);
    }
}))
    .patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const updateRatting = Object.assign({}, req.body);
        const result = yield rattingService.updateRatting(id, updateRatting);
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
        const result = yield rattingService.deleteRattingById(id);
        if (!result) {
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
exports.default = rattingController;
