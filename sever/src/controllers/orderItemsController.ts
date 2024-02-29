import express, { Request, Response } from "express";
import OrderItemsService from "../services/orderItems.service";

const orderItemsController = express.Router();
const orderItemsService = new OrderItemsService();

orderItemsController.get("/", async (req: Request, res: Response) => {
  const result = await orderItemsService.getAllOrderItems();
  res.status(200).json(result);
});

orderItemsController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await orderItemsService.getOrderItemsById(id);
  res.status(200).json(result);
});

orderItemsController.post("/", async (req: Request, res: Response) => {
  try {
    const newOrderItems = {
      id: req.body.id,
      productName: req.body.productName,
      price: req.body.price,
      scale: req.body.scale,
      quantity: req.body.quantity,
      img: req.body.img,
      status: req.body.status,
      code: req.body.code,
    };
    await orderItemsService.createOrderItems(newOrderItems);
    res.status(201).json({ msg: "Create successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo" });
    console.log(error);
  }
});

orderItemsController.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateOrderItems = { ...req.body };
    const result: any = await orderItemsService.updateOrderItems(
      id,
      updateOrderItems
    );
    if (result[0] == 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Update successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc cập nhật" });
  }
});

orderItemsController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await orderItemsService.deleteOrderItemsById(id);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

export default orderItemsController;
