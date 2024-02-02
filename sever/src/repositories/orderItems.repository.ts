import { Op } from "sequelize";
import OrderItems from "../entities/orderItems.entity";

class OrderItemsRepository {
  async getAllOrderItems() {
    return await OrderItems.findAll();
  }

  async getOrderItemsById(id: number) {
    return await OrderItems.findOne({
      where: {
        id,
      },
    });
  }

  async createOrderItems(formRequest: any) {
    return await OrderItems.create(formRequest);
  }

  async deleteOrderItemsById(id: number) {
    return await OrderItems.destroy({
      where: {
        id,
      },
    });
  }

  async updateOrderItems(id: number, formUpdate: any) {
    return await OrderItems.update(formUpdate, {
      where: {
        id,
      },
    });
  }
}

export default OrderItemsRepository;
