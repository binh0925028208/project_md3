import ProductRepository from "../repositories/product.repository";

class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async updateProduct(formUpdate: any, id: number) {
    await this.productRepository.updateProduct(formUpdate, id);
  }
  async getProductById(id: number) {
    await this.productRepository.findProduct(id);
  }
  async getAllProduct() {
    return await this.productRepository.getAllProduct();
  }
  async createProduct(formRequest: any) {
    await this.productRepository.createProduct(formRequest);
  }
  async deleteProductById(formUpdate: any, id: number) {
    const data = await this.productRepository.deleteById(formUpdate, id);
    return data;
  }
}

export default ProductService;
