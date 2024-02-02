import User from "../entities/user.entity";

class UserRepository {
  async register(newUser: any) {
    await User.create(newUser);
  }

  async updateUser(formUpdate: any, id: number) {
    await User.update(formUpdate, { where: { id } });
  }

  async getOneUserByEmail(param?: any) {
    return await User.findOne({
      where: {
        email: param,
      },
    });
  }

  async getAll() {
    return await User.findAll();
  }
}

export default UserRepository;
