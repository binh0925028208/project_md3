import AdminRepository from "../repositories/admin.repositories";
import { IUser } from "../types/interface";

class AdminService {
  private adminRepository: AdminRepository;
  constructor() {
    this.adminRepository = new AdminRepository();
  }
  public async getAllUsers(): Promise<IUser[]> {
    const result = await this.adminRepository.getAllUsers();
    const users = result.data.filter((user: IUser) => user.role === 1);
    return users;
  }
  public async getUserById(id: number): Promise<IUser> {
    const result = await this.adminRepository.getUserById(id);
    return result.data;
  }
  public async getAllAdmin(): Promise<IUser[]> {
    const result = await this.adminRepository.getAllUsers();
    const admin = result.data.filter((user: IUser) => user.role !== 1);
    return admin;
  }
  public async getAdminById(id: number): Promise<IUser> {
    const result = await this.adminRepository.getAdminById(id);
    return result.data;
  }
  public async active(id: number) {
    const userNeed = await this.adminRepository.getUserById(id);
    const user = userNeed.data;
    const newUser = { ...user, status: true };
    await this.adminRepository.patchUserById(id, newUser.status);
  }
  public async block(id: number) {
    const userNeed = await this.adminRepository.getUserById(id);
    const user = userNeed.data;
    const newUser = { ...user, status: false };
    await this.adminRepository.patchUserById(id, newUser.status);
  }

  public async deleteAdmin(id: number) {
    await this.adminRepository.deleteAdmin(id);
  }
  public async searchUsers(value: string): Promise<IUser[]> {
    const users = await this.getAllUsers();
    const userNeed: IUser[] = users.filter((user) =>
      user.fullName.toLowerCase().includes(value)
    );
    return userNeed;
  }
}

export default AdminService;
