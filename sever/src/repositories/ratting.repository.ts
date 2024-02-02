import { Op } from "sequelize";
import Ratting from "../entities/ratting.entity";

class RattingRepository {
  async getAllRatting() {
    return await Ratting.findAll();
  }

  async getRattingById(id: number) {
    return await Ratting.findOne({
      where: {
        id,
      },
    });
  }

  async createRatting(formRequest: any) {
    return await Ratting.create(formRequest);
  }

  async deleteById(id: number) {
    return await Ratting.destroy({
      where: {
        id,
      },
    });
  }

  async updateRatting(id: number, formUpdate: any) {
    return await Ratting.update(formUpdate, {
      where: {
        id,
      },
    });
  }
}

export default RattingRepository;
