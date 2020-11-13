import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import User from "../../entities/User";
import { IManager } from "../common/manager";

interface UserInput extends User {
  password: string;
}

class UserManager implements IManager {
  protected userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    return Promise.resolve(user);
  }

  public async createUser(userDetails: Partial<UserInput>): Promise<User> {
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(userDetails.password, saltRound);

    const newUser = new User();
    newUser.sei = userDetails.sei;
    newUser.mei = userDetails.mei;

    return this.userRepository.save(newUser);
  }

  public async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    const updateUser = await this.userRepository.findOne(userId);
    if (updateUser) {
      updateUser.sei = updates.sei;
      updateUser.mei = updates.mei;
      await this.userRepository.save(updateUser);
    }
    return Promise.resolve(updateUser);
  }

  public async removeUser(userId: string): Promise<DeleteResult | void> {
    const deleteUser = await this.userRepository.delete(userId);
    return Promise.resolve(deleteUser);
  }

  public async verifyAndGetUser(sei: string): Promise<User> {
    const user = await this.userRepository.findOne({ sei });
    if (!user) {
      throw new Error("sei not found");
    }

    return user;
  }
}

export default UserManager;
