import Product from "../entities/product.entity";

class ProductRepository {
  async updateProduct(formUpdate: any, id: number) {
    return await Product.update(formUpdate, { where: { id } });
  }
  async findProduct(id: number) {
    return await Product.findOne({ where: { id } });
  }
  async getAllProduct() {
    return await Product.findAll();
  }
  async createProduct(formRequest: any) {
    return await Product.create(formRequest);
  }
  async deleteById(formUpdate: any, id: number) {
    return await Product.update(formUpdate, { where: { id } });
  }
}

export default ProductRepository;
