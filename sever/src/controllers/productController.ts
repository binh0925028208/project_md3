import express, { Request, Response } from "express";
import ProductService from "../services/product.service";

const productController = express.Router();
const productService = new ProductService();

productController.get("/", async (req: Request, res: Response) => {
  const result = await productService.getAllProduct();
  res.status(200).json(result);
});

productController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await productService.getProductById(id);
  res.status(200).json(result);
});

productController.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct = {
      id: req.body.id,
      productName: req.body.productName,
      price: req.body.price,
      scale: req.body.scale,
      stock: req.body.stock,
      decs: req.body.decs,
      img: req.body.img,
      brand: req.body.brand,
      isDelete: req.body.isDelete,
    };
    await productService.createProduct(newProduct);
    res.status(201).json({ msg: "Create successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo" });
    console.log(error);
  }
});

productController.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateProduct = { ...req.body };
    const result: any = await productService.updateProduct(id, updateProduct);
    if (result[0] == 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Update successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc cập nhật" });
  }
});
productController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { isDelete } = req.body;
    const updateProduct: any = { isDelete };
    const result: any = await productService.updateProduct(id, updateProduct);
    if (result[0] == 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

export default productController;
