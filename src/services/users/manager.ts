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

  public async getAllUser(): Promise<User[]> {
    const user = await (
      await this.userRepository.find({ relations: ["team"] })
    ).sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    return Promise.resolve(user);
  }

  public async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["team"],
    });
    return Promise.resolve(user);
  }

  public async getUserByTeam(teamId: string): Promise<User[]> {
    const user = await (
      await this.userRepository.find({
        where: { team: teamId },
        relations: ["team"],
      })
    ).sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    return Promise.resolve(user);
  }

  public async createUser(userDetails: Partial<UserInput>): Promise<User> {
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(userDetails.password, saltRound);

    const newUser = new User();
    newUser.username = userDetails.username;
    newUser.email = userDetails.email;
    newUser.passwordhash = passwordHash;

    return this.userRepository.save(newUser);
  }

  public async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    const updateUser = await this.userRepository.findOne({
      id: userId,
    });
    if (updateUser) {
      Object.assign(updateUser, updates);
      await this.userRepository.save(updateUser);
    }
    return Promise.resolve(updateUser);
  }

  public async removeUser(userId: string): Promise<DeleteResult | void> {
    const deleteUser = await this.userRepository.delete({ id: userId });
    return Promise.resolve(deleteUser);
  }

  public async verifyAndGetUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new Error("username not found");
    }

    return user;
  }
}

export default UserManager;
