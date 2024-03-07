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
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: "dzk6s6cvc",
    api_key: "315828545543434",
    api_secret: "Js5AarxXi7qN0eUuTwivEergpOc",
});
const store = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "images",
            format: "png",
        };
    }),
});
const fileFilter = (req, file, cb) => {
    // Kiểm tra kiểu file
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        const maxSize = 10 * 1024 * 1024; // 10MB
        console.log(file);
        if (file.size > maxSize) {
            cb(null, false);
        }
        else {
            cb(null, true);
        }
    }
    else {
        cb("Upload failed", false);
    }
};
const uploadCloud = (0, multer_1.default)({
    storage: store,
    fileFilter,
});
exports.default = uploadCloud;
