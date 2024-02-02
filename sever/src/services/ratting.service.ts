import { Request, Response } from "express";
import RattingRepository from "../repositories/ratting.repository";

class RattingService {
  private rattingRepository: RattingRepository;

  constructor() {
    this.rattingRepository = new RattingRepository();
  }

  async getAllRatting(): Promise<any> {
    return await this.rattingRepository.getAllRatting();
  }
  async getRattingById(id: number): Promise<any> {
    const data = await this.rattingRepository.getRattingById(id);
    return data;
  }
  async createRatting(formRequest: any) {
    await this.rattingRepository.createRatting(formRequest);
  }

  async deleteRattingById(id: number) {
    const data = await this.rattingRepository.deleteById(id);
    return data;
  }

  async updateRatting(id: number, formUpdate: any) {
    const data = await this.rattingRepository.updateRatting(id, formUpdate);
    return data;
  }
}

export default RattingService;
