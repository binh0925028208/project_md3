import { ProductRepository } from "../repositories/product.repositories";
import UserRepository from "../repositories/user.repositories";
import { ICart, IProduct } from "../types/interface";

class ProductService {
  private productRepository: ProductRepository;
  private userRepository: UserRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
  }
  async getAllProduct() {
    const data = await this.productRepository.getAllProducts();
    console.log(data);

    return data;
  }
  async getAll() {
    const data = await this.productRepository.getProduct();
    return data;
  }
  async getProductsCatetory() {
    const data = await this.productRepository.getProduct();
    // data.filter((item:any)=>item.catetory==item)
    return data;
  }

  public async getProductsById(id: number | undefined): Promise<IProduct> {
    let result = await this.productRepository.getProductsById(id);
    return result;
  }

  public async onSearch(value: string) {
    const result = await this.productRepository.getAllProducts();
    const searchProducts = result.filter((item: IProduct) =>
      item.productName.toLowerCase().includes(value)
    );
    return searchProducts;
  }

  public async updateStock(data: any) {
    const result = await Promise.all(
      data.map(async (item: any) => {
        return await this.productRepository.onMinusStock(
          item.id,
          item.stock - item.quantity
        );
      })
    );
    return result;
  }
  public async onMinusStock(carts: ICart[]) {
    const products = await this.productRepository.getAllProducts();
    let productsNeed = products.reduce((result: any[], item: any) => {
      carts.forEach((element: any) => {
        if (item.id == element.id && !result.includes(item)) {
          result.push(item);
        }
      });
      return result;
    }, []);
    let arrNeed: any = carts.reduce((result: any[], item: any) => {
      productsNeed.forEach((element: any) => {
        if (item.id == element.id) {
          result.push({
            id: item.id,
            stock: item.stock,
            quantity: item.quantity,
          });
        }
      });
      return result;
    }, []);
    this.updateStock(arrNeed);
    return arrNeed;
  }

  public async isDeleted(id: number, status: boolean) {
    await this.productRepository.isDeleteById(id, status);
  }

  public async editProduct(id: number, data: IProduct) {
    await this.productRepository.patchNew(id, data);
  }
  public async addProduct(data: IProduct) {
    await this.productRepository.postProduct(data);
  }
}

export default ProductService;
