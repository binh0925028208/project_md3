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
const user_service_1 = __importDefault(require("../services/user.service"));
const multerCloud_config_1 = __importDefault(require("../configs/multerCloud.config"));
const checkUsers_1 = __importDefault(require("../middlewares/checkUsers"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkRoleUser_1 = __importDefault(require("../middlewares/checkRoleUser"));
const usersController = express_1.default.Router();
const userService = new user_service_1.default();
usersController
    .post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var salt = bcryptjs_1.default.genSaltSync(10); // định nghĩa thuật toán để băm password => thường là 10->11)
        var hashPass = bcryptjs_1.default.hashSync(req.body.password, salt); //hàm hash để băm password
        const newUser = {
            email: req.body.email,
            password: hashPass,
        };
        yield userService.register(newUser);
        res.status(201).json({ msg: "create successfully" });
    }
    catch (error) {
        res.status(400).json({ msg: "create failed" });
    }
}))
    .post("/login", checkRoleUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginForm = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = yield userService.login(loginForm);
        if (result == 1) {
            res.status(400).json({ msg: "Email wrong" });
        }
        else if (result == 2) {
            res.status(400).json({ msg: "Password wrong" });
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(400).json({ msg: "login failed" });
    }
}))
    .patch("/update/:id", checkUsers_1.default, multerCloud_config_1.default.single("avatar"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        let updateUser;
        if (req.file) {
            updateUser = Object.assign(Object.assign({}, req.body), { avatar: req.file.path });
        }
        else {
            updateUser = Object.assign({}, req.body);
        }
        yield userService.updateUser(updateUser, id);
        res.status(200).json({ msg: "updated" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: "update failed" });
    }
}))
    .get("/get-all", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userService.getAllUser();
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(400).json({ msg: "get failed" });
    }
}))
    .get("/create-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const random = Math.ceil(Math.random() * 10000);
        var salt = bcryptjs_1.default.genSaltSync(10);
        var hashRandom = bcryptjs_1.default.hashSync(String(random), salt);
        res.cookie("otp", hashRandom, {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
        });
        res.status(200).json(random);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: "get failed" });
    }
}))
    .post("/confirm-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpCookie = req.cookies.otp;
        const bodyOtp = req.body.otp;
        const checkOTP = bcryptjs_1.default.compareSync(bodyOtp, otpCookie);
        if (checkOTP) {
            res.status(200).json("confirm successfully");
        }
        else {
            res.status(400).json("confirm failed");
        }
    }
    catch (error) {
        res.status(400).json({ msg: "time out otp" });
    }
}));
exports.default = usersController;
