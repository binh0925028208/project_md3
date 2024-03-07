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
const comment_service_1 = __importDefault(require("../services/comment.service"));
const commentController = express_1.default.Router();
const commentService = new comment_service_1.default();
commentController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield commentService.getAllComment();
    res.status(200).json(result);
}));
commentController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield commentService.getCommentById(id);
    res.status(200).json(result);
}));
commentController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = {
            status: req.body.status,
            comment: req.body.comment,
        };
        yield commentService.createComment(newComment);
        res.status(201).json({ msg: "Create comment successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo comment" });
        console.log(error);
    }
}));
commentController.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const updateComment = Object.assign({}, req.body);
        const result = yield commentService.updateComment(id, updateComment);
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
}));
commentController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield commentService.deleteCommentById(id);
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
exports.default = commentController;
