import { Request, Response } from "express";
import CommentRepository from "../repositories/comment.repository";

class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async getAllComment(): Promise<any> {
    return await this.commentRepository.getAllComment();
  }
  async getCommentById(id: number): Promise<any> {
    const data = await this.commentRepository.getCommentById(id);
    return data;
  }
  async createComment(formRequest: any) {
    await this.commentRepository.createComment(formRequest);
  }

  async deleteCommentById(id: number) {
    const data = await this.commentRepository.deleteById(id);
    return data;
  }

  async updateComment(id: number, formUpdate: any) {
    const data = await this.commentRepository.updateComment(id, formUpdate);
    return data;
  }
}

export default CommentService;
