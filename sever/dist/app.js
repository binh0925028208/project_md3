"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = __importDefault(require("body-parser"));
const entities_1 = __importDefault(require("./entities"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
dotenv.config();
const server = (0, express_1.default)();
server.use((0, cookie_parser_1.default)());
server.use((0, express_session_1.default)({
    secret: "binh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
server.use(express_1.default.static("public"));
const port = process.env.PORT || 8000;
server.use((0, express_1.urlencoded)());
server.use(body_parser_1.default.json());
db_config_1.default.authenticate();
const app = http_1.default.createServer(server);
server.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    optionsSuccessStatus: 200,
}));
console.log("hahahahah");
(0, router_1.default)(server);
(0, entities_1.default)();
// app.post(
//   "/uploads",
//   uploadCloud.array("productImg", 10),
//   (req: any, res: any) => {
//     const uploadFiles = req.files as Express.Multer.File[];
//     console.log(1, uploadFiles);
//     const filePaths = uploadFiles.map((file) => {
//       return file.path;
//     });
//     console.log(filePaths);
//     res.json(filePaths);
//   }
// );
app.listen(port, () => {
    console.log(`server on port ${port}`);
});
