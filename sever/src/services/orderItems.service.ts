import orderItemsRepository from "../repositories/orderItems.repository";

class OrderItemsService {
  private orderItemsRepository: orderItemsRepository;
  constructor() {
    this.orderItemsRepository = new orderItemsRepository();
  }

  async updateOrderItems(formUpdate: any, id: number) {
    await this.orderItemsRepository.updateOrderItems(formUpdate, id);
  }
  async getOrderItemsById(id: number) {
    await this.orderItemsRepository.getOrderItemsById(id);
  }
  async getAllOrderItems() {
    return await this.orderItemsRepository.getAllOrderItems();
  }
  async createOrderItems(formRequest: any) {
    await this.orderItemsRepository.createOrderItems(formRequest);
  }
  async deleteOrderItemsById(id: number) {
    const data = await this.orderItemsRepository.deleteOrderItemsById(id);
    return data;
  }
}

export default OrderItemsService;
