import { Express } from "express";
import usersController from "../controllers/userController";
import productController from "../controllers/productController";
import orderItemsController from "../controllers/orderItemsController";
import commentController from "../controllers/commentController";
import rattingController from "../controllers/rattingController";
import adminsController from "../controllers/adminController";

const Router = (app: Express) => {
  app.use("/user", usersController);
  app.use("/products", productController);
  app.use("/orderItems", orderItemsController);
  app.use("/comment", commentController);
  app.use("/ratting", rattingController);
  app.use("/admin", adminsController);
};

export default Router;
