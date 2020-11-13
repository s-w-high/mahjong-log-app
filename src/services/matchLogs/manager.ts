import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import MatchLog from "../../entities/MatchLog";
import { IManager } from "../common/manager";

interface MatchLogInput extends MatchLog {
  password: string;
}

class MatchLogManager implements IManager {
  protected matchLogRepository: Repository<MatchLog>;

  constructor() {
    this.matchLogRepository = getRepository(MatchLog);
  }

  // public async getAllMatchLog(): Promise<MatchLog[]> {
  //   const user = await this.matchLogRepository.find();
  //   return Promise.resolve(user);
  // }

  // public async getUser(userName: string): Promise<User> {
  //   const user = await this.userRepository.findOne({ username: userName });
  //   return Promise.resolve(user);
  // }

  // public async createUser(userDetails: Partial<UserInput>): Promise<User> {
  //   const saltRound = 10;
  //   const passwordHash = await bcrypt.hash(userDetails.password, saltRound);

  //   const newUser = new User();
  //   newUser.username = userDetails.username;
  //   newUser.email = userDetails.email;
  //   newUser.passwordhash = passwordHash;

  //   return this.userRepository.save(newUser);
  // }

  // public async updateUser(
  //   userName: string,
  //   updates: Partial<User>
  // ): Promise<User> {
  //   const updateUser = await this.userRepository.findOne({
  //     username: userName,
  //   });
  //   if (updateUser) {
  //     Object.assign(updateUser, updates);
  //     await this.userRepository.save(updateUser);
  //   }
  //   return Promise.resolve(updateUser);
  // }

  // public async removeUser(userName: string): Promise<DeleteResult | void> {
  //   const deleteUser = await this.userRepository.delete({ username: userName });
  //   return Promise.resolve(deleteUser);
  // }

  // public async verifyAndGetUser(userName: string): Promise<User> {
  //   const user = await this.userRepository.findOne({ username: userName });
  //   if (!user) {
  //     throw new Error("username not found");
  //   }

  //   return user;
  // }
}

export default MatchLogManager;
