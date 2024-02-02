import User from "../entities/user.entity";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(newUser: any) {
    await this.userRepository.register(newUser);
  }

  async updateUser(formUpdate: any, id: number) {
    await this.userRepository.updateUser(formUpdate, id);
  }

  async login(loginForm: any) {
    try {
      const checkEmail = await this.userRepository.getOneUserByEmail(
        loginForm.email
      );
      if (checkEmail?.dataValues) {
        const comparePassword = bcrypt.compareSync(
          loginForm.password,
          checkEmail.dataValues.password
        );
        const { password, createdAt, updatedAt, ...restUser } =
          checkEmail.dataValues;
        const accessToken = jwt.sign(restUser, "secret");
        if (comparePassword) {
          return {
            data: restUser,
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

  async getAllUser() {
    return await this.userRepository.getAll();
  }
}

export default UserService;
