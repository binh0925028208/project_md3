import express, { urlencoded } from "express";
import sequelize from "./configs/db.config";
import cors from "cors";
import Router from "./router";
import bodyParser from "body-parser";
import createTable from "./entities";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import http from "http";
dotenv.config();
const server = express();
server.use(cookieParser());
server.use(
  session({
    secret: "binh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use(express.static("public"));
const port = process.env.PORT || 8000;
server.use(urlencoded());
server.use(bodyParser.json());
sequelize.authenticate();
const app = http.createServer(server);
server.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
console.log("hahahahah");

Router(server);
createTable();
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
