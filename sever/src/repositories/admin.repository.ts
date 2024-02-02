import Admin from "../entities/admin.entity";

class AdminRepository {
  async register(newAdmin: any) {
    await Admin.create(newAdmin);
  }

  async updateAdmin(formUpdate: any, id: number) {
    await Admin.update(formUpdate, { where: { id } });
  }

  async getOneAdminByEmail(param?: any) {
    return await Admin.findOne({
      where: {
        email: param,
      },
    });
  }

  async getAllAdmin() {
    return await Admin.findAll();
  }
}

export default AdminRepository;
