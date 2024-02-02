import ApiService from "../api/apiService";

class AdminRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllUsers(): Promise<any> {
    const result: Response = await this.apiService.GetAll("users");
    return result;
  }
  async getAdminById(id: number): Promise<any> {
    const result: Response = await this.apiService.GetById("users", id);
    return result;
  }
  async getUserById(id: number): Promise<any> {
    const result: Response = await this.apiService.GetById("users", id);
    return result;
  }
  async patchUserById(id: number, data: any): Promise<any> {
    await this.apiService.Patch("users", id, "status", data);
  }
  async deleteAdmin(id: number): Promise<any> {
    const result: Response = await this.apiService.Delete("users", id);
    return result;
  }
}

export default AdminRepository;
