import express, { Request, Response } from "express";
import CommentService from "../services/comment.service";

const commentController = express.Router();
const commentService = new CommentService();

commentController.get("/", async (req: Request, res: Response) => {
  const result = await commentService.getAllComment();
  res.status(200).json(result);
});

commentController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await commentService.getCommentById(id);
  res.status(200).json(result);
});

commentController.post("/", async (req: Request, res: Response) => {
  try {
    const newComment = {
      status: req.body.status,
      comment: req.body.comment,
    };
    await commentService.createComment(newComment);
    res.status(201).json({ msg: "Create comment successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo comment" });
    console.log(error);
  }
});

commentController.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateComment = { ...req.body };
    const result: any = await commentService.updateComment(id, updateComment);
    if (result[0] == 0) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Update successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc cập nhật" });
  }
});
commentController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await commentService.deleteCommentById(id);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

export default commentController;
