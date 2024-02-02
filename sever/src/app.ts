import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import sequelize from "./configs/db.config";
import createTable from "./entities";
import Router from "./router";
import uploadCloud from "./configs/multerCloud.config";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "Dong",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
sequelize.authenticate();
createTable();

Router(app);

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
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
