import express, { Request, Response } from "express";
import UserService from "../services/user.service";
import uploadCloud from "../configs/multerCloud.config";
import checkUsers from "../middlewares/checkUsers";
import bcrypt from "bcryptjs";
import authMiddleware from "../middlewares/authMiddleware";
import checkRole from "../middlewares/checkRoleUser";
import checkRoleUser from "../middlewares/checkRoleUser";

const usersController = express.Router();
const userService = new UserService();

usersController
  .post("/register", async (req, res) => {
    try {
      var salt = bcrypt.genSaltSync(10); // định nghĩa thuật toán để băm password => thường là 10->11)
      var hashPass = bcrypt.hashSync(req.body.password, salt); //hàm hash để băm password
      const newUser = {
        email: req.body.email,
        password: hashPass,
      };
      await userService.register(newUser);
      res.status(201).json({ msg: "create successfully" });
    } catch (error) {
      res.status(400).json({ msg: "create failed" });
    }
  })
  .post("/login", checkRoleUser, async (req: any, res: Response) => {
    try {
      const loginForm = {
        email: req.body.email,
        password: req.body.password,
      };
      const result = await userService.login(loginForm);
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
    checkUsers,
    uploadCloud.single("avatar"),
    async (req, res) => {
      try {
        const id = Number(req.params.id);
        let updateUser;
        if (req.file) {
          updateUser = {
            ...req.body,
            avatar: req.file.path,
          };
        } else {
          updateUser = {
            ...req.body,
          };
        }
        await userService.updateUser(updateUser, id);
        res.status(200).json({ msg: "updated" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "update failed" });
      }
    }
  )
  .get("/get-all", authMiddleware, async (req: any, res) => {
    try {
      const data = await userService.getAllUser();
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ msg: "get failed" });
    }
  })
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

export default usersController;
