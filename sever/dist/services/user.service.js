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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.default();
    }
    register(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.register(newUser);
        });
    }
    updateUser(formUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.updateUser(formUpdate, id);
        });
    }
    login(loginForm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkEmail = yield this.userRepository.getOneUserByEmail(loginForm.email);
                if (checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.dataValues) {
                    const comparePassword = bcryptjs_1.default.compareSync(loginForm.password, checkEmail.dataValues.password);
                    const _a = checkEmail.dataValues, { password, createdAt, updatedAt } = _a, restUser = __rest(_a, ["password", "createdAt", "updatedAt"]);
                    const accessToken = jsonwebtoken_1.default.sign(restUser, "secret");
                    if (comparePassword) {
                        return {
                            data: restUser,
                            accessToken,
                        };
                    }
                    else {
                        return 2;
                    }
                }
                else {
                    return 1;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getAll();
        });
    }
}
exports.default = UserService;
