import ApiService from "../api/apiService";
import { ICart, IUser } from "../types/interface";

class UserRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async login(formRequest: any): Promise<any> {
    const result = await this.apiService.Post("login", formRequest);
    return result;
  }
  async register(formRequest: any): Promise<any> {
    const result = await this.apiService.Post("register", formRequest);
    return result;
  }
  async getAllUsers(): Promise<any> {
    const result: Response = await this.apiService.GetAll("users");
    return result;
  }
  async getUserById(id: number | undefined): Promise<any> {
    const result: Response = await this.apiService.GetById("users", id);
    return result;
  }
  async patchNewCart(idUser: number, formRequest: ICart[]) {
    await this.apiService.Patch("users", idUser, "cart", formRequest);
  }
  async patchNewProfileUser(idUser: number, formRequest: IUser) {
    await this.apiService.PatchNew("users", idUser, formRequest);
  }
  async getAdminById(id: number): Promise<any> {
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

export default UserRepository;
