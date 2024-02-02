import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminRepository from "../repositories/admin.repository";
class AdminService {
  private adminRepository: AdminRepository;
  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async register(newAdmin: any) {
    await this.adminRepository.register(newAdmin);
  }

  async updateAdmin(formUpdate: any, id: number) {
    await this.adminRepository.updateAdmin(formUpdate, id);
  }

  async login(loginForm: any) {
    try {
      const checkEmail = await this.adminRepository.getOneAdminByEmail(
        loginForm.email
      );
      if (checkEmail?.dataValues) {
        const comparePassword = bcrypt.compareSync(
          loginForm.password,
          checkEmail.dataValues.password
        );
        const { password, createdAt, updatedAt, ...restAdmin } =
          checkEmail.dataValues;
        const accessToken = jwt.sign(restAdmin, "secret");
        if (comparePassword) {
          return {
            data: restAdmin,
            accessToken,
          };
        } else {
          return 2;
        }
      } else {
        return 1;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllAdmin() {
    return await this.adminRepository.getAllAdmin();
  }
}

export default AdminService;
