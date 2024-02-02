import ApiService from "../api/apiService";
import { IOrder } from "../types/interface";

class OrderRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }

  async postOrder(formData: IOrder) {
    const result = await this.apiService.Post("orders", formData);
    return result;
  }
  async getOrder(): Promise<any> {
    const result = await this.apiService.GetAll("orders");
    return result;
  }

  async getAllOrder(): Promise<any> {
    const result = await this.apiService.GetAll("orders");
    return result;
  }
  async patchStatusOrder(id: number, data: number) {
    await this.apiService.Patch("orders", id, "status", data);
  }
}

export default OrderRepository;
