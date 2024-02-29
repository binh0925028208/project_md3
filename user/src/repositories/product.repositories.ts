import ApiService from "../api/apiService";
import { IProduct } from "../types/interface";

export class ProductRepository {
  apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  public async onSearch(value: string) {
    const result = await this.getAllProducts();
    const searchProducts = result.filter((item: IProduct) =>
      item.productName.toLowerCase().includes(value)
    );
    return searchProducts;
  }
  async getAllProducts(): Promise<any> {
    const result: any = await this.apiService.GetAll("products");
    console.log(result);
    return result.data;
  }
  async getProduct() {
    return await this.apiService.GetAll("products");
  }
  async getProductsById(id: number | undefined): Promise<any> {
    const result: Response = await this.apiService.GetById("products", id);
    return result;
  }
  public async updateStock(data: any) {
    const result = await Promise.all(
      data.map(async (item: any) => {
        return await this.onMinusStock(item.id, item.stock - item.quantity);
      })
    );
    return result;
  }
  async onMinusStock(id: number, data: any): Promise<any> {
    const result: Response = await this.apiService.Patch(
      "products",
      id,
      "stock",
      data
    );
    return result;
  }
  async isDeleteById(id: number, status: boolean) {
    await this.apiService.Patch("products", id, "isDelete", status);
  }
  async patchNew(id: number, data: IProduct) {
    await this.apiService.PatchNew("products", id, data);
  }
  async postProduct(data: IProduct) {
    await this.apiService.Post("products", data);
  }
}
