import Comment from "./comment.entity";
import OrderItems from "./orderItems.entity";
import Product from "./product.entity";
import Ratting from "./ratting.entity";
import User from "./user.entity";

const createTable = () => {
  User.sync().then(() => {
    console.log("User created");
  });
  Product.sync().then(() => {
    console.log("Product created");
  });
  Ratting.sync().then(() => {
    console.log("Ratting created");
  });
  Comment.sync().then(() => {
    console.log("Comment created");
  });
  OrderItems.sync().then(() => {
    console.log("orderItems created");
  });
  OrderItems.sync().then(() => {
    console.log("OrderItems created");
  });
};

export default createTable;
