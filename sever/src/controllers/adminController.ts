import express, { Request, Response } from "express";
import uploadCloud from "../configs/multerCloud.config";
import bcrypt from "bcryptjs";
import authMiddleware from "../middlewares/authMiddleware";
import AdminService from "../services/admin.service";
import checkRoleAdmin from "../middlewares/checkRoleAdmin";
import checkAdmins from "../middlewares/checkAdmin";

const adminsController = express.Router();
const adminService = new AdminService();

adminsController
  .post("/register", async (req, res) => {
    try {
      var salt = bcrypt.genSaltSync(10); // định nghĩa thuật toán để băm password => thường là 10->11)
      var hashPass = bcrypt.hashSync(req.body.password, salt); //hàm hash để băm password
      const newAdmin = {
        email: req.body.email,
        password: hashPass,
      };
      await adminService.register(newAdmin);
      res.status(201).json({ msg: "create successfully" });
    } catch (error) {
      res.status(400).json({ msg: "create failed" });
    }
  })
  .post("/login", checkRoleAdmin, async (req: any, res: Response) => {
    try {
      const loginForm = {
        email: req.body.email,
        password: req.body.password,
      };
      const result = await adminService.login(loginForm);
      if (result == 1) {
        res.status(400).json({ msg: "Email wrong" });
      } else if (result == 2) {
        res.status(400).json({ msg: "Password wrong" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(400).json({ msg: "login failed" });
    }
  })
  .patch(
    "/update/:id",
    checkAdmins,
    uploadCloud.single("avatar"),
    async (req, res) => {
      try {
        const id = Number(req.params.id);
        let updateAdmin;
        if (req.file) {
          updateAdmin = {
            ...req.body,
            avatar: req.file.path,
          };
        } else {
          updateAdmin = {
            ...req.body,
          };
        }
        await adminService.updateAdmin(updateAdmin, id);
        res.status(200).json({ msg: "updated" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "update failed" });
      }
    }
  )
  .get("/get-all", authMiddleware, async (req: any, res) => {
    try {
      const data = await adminService.getAllAdmin();
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ msg: "get failed" });
    }
  })
  .post(
    "/uploads",
    uploadCloud.array("productImg", 10),
    (req: any, res: any) => {
      const uploadFiles = req.files as Express.Multer.File[];
      console.log(1, uploadFiles);
      const filePaths = uploadFiles.map((file) => {
        return file.path;
      });
      console.log(filePaths);
      res.json(filePaths);
    }
  )
  .get("/create-otp", async (req: any, res) => {
    try {
      const random = Math.ceil(Math.random() * 10000);
      var salt = bcrypt.genSaltSync(10);
      var hashRandom = bcrypt.hashSync(String(random), salt);
      res.cookie("otp", hashRandom, {
        expires: new Date(Date.now() + 120000),
        httpOnly: true,
      });
      res.status(200).json(random);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "get failed" });
    }
  })
  .post("/confirm-otp", async (req: any, res) => {
    try {
      const otpCookie = req.cookies.otp;
      const bodyOtp = req.body.otp;
      const checkOTP = bcrypt.compareSync(bodyOtp, otpCookie);
      if (checkOTP) {
        res.status(200).json("confirm successfully");
      } else {
        res.status(400).json("confirm failed");
      }
    } catch (error) {
      res.status(400).json({ msg: "time out otp" });
    }
  });

export default adminsController;
