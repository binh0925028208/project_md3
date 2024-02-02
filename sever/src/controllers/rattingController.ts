import express, { Request, Response } from "express";
import RattingService from "../services/ratting.service";

const rattingController = express.Router();
const rattingService = new RattingService();

rattingController.get("/", async (req: Request, res: Response) => {
  const result = await rattingService.getAllRatting();
  res.status(200).json(result);
});

rattingController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await rattingService.getRattingById(id);
  res.status(200).json(result);
});

rattingController.post("/", async (req: Request, res: Response) => {
  try {
    const newRatting = {
      status: req.body.status,
      ratting: req.body.ratting,
    };
    await rattingService.createRatting(newRatting);
    res.status(201).json({ msg: "Create ratting successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo ratting" });
    console.log(error);
  }
});

rattingController.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateRatting = { ...req.body };
    const result: any = await rattingService.updateRatting(id, updateRatting);
    if (result[0] == 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Update successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc cập nhật" });
  }
});
rattingController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await rattingService.deleteRattingById(id);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

export default rattingController;
