import { Op } from "sequelize";
import Comment from "../entities/comment.entity";

class CommentRepository {
  async getAllComment() {
    return await Comment.findAll();
  }

  async getCommentById(id: number) {
    return await Comment.findOne({
      where: {
        id,
      },
    });
  }

  async createComment(formRequest: any) {
    return await Comment.create(formRequest);
  }

  async deleteById(id: number) {
    return await Comment.destroy({
      where: {
        id,
      },
    });
  }

  async updateComment(id: number, formUpdate: any) {
    return await Comment.update(formUpdate, {
      where: {
        id,
      },
    });
  }
}

export default CommentRepository;
