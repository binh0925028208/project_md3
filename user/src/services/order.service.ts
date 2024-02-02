import OrderRepository from "../repositories/order.repositories";
import { IOrder } from "../types/interface";

class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async postOrder(formData: IOrder) {
    try {
      return await this.orderRepository.postOrder(formData);
    } catch (error) {
      throw error;
    }
  }
  public async getAllOrders(): Promise<IOrder[]> {
    const result = await this.orderRepository.getAllOrder();
    return result.data;
  }
  public async getOrder(idUser: number) {
    let data = await this.orderRepository.getOrder();
    let orders = data.data;
    let result: IOrder[] = orders.filter(
      (item: IOrder) => Number(item.idUser) === idUser
    );
    return result;
  }
  public async getOrderById(id: number): Promise<IOrder> {
    const data = await this.getAllOrders();
    const result: any = data.find((item: IOrder) => item.id === id);
    return result;
  }
  // public async revenue(): Promise<number> {
  //   const orders: IOrder[] = await this.getAllOrders();

  //   const result = orders.reduce(
  //     (init: number, order: IOrder) => init + order.totalPrice,
  //     0
  //   );
  //   return result;
  // }
  public async changeStatusOrder(id: number, status: number) {
    await this.orderRepository.patchStatusOrder(id, status);
  }
  public async searchOrderByDate(date: string): Promise<IOrder[]> {
    const data = await this.getAllOrders();
    const result: IOrder[] = data.filter((item: IOrder) =>
      item.date.split("-").includes(String(date.split("-")))
    );
    return result;
  }
}

export default OrderService;
