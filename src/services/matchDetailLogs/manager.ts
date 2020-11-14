import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import MatchDetailLog from "../../entities/MatchDetailLog";
import { IManager } from "../common/manager";

interface MatchDetailLogInput extends MatchDetailLog {
  password: string;
}

class MatchDetailLogManager implements IManager {
  protected matchDetailLogRepository: Repository<MatchDetailLog>;

  constructor() {
    this.matchDetailLogRepository = getRepository(MatchDetailLog);
  }

  public async getAllMatchDetailLog(): Promise<MatchDetailLog[]> {
    const matchDetailLog = await this.matchDetailLogRepository.find();
    return Promise.resolve(matchDetailLog);
  }

  // public async getByUserId(userId: string): Promise<MatchDetailLog> {
  // const user = await this.userRepository.findOne({ username: userName });
  // return Promise.resolve(user);
  // }

  //public async createUser(userDetails: Partial<MatchDetailLogInput>): Promise<MatchDetailLog> {
  // const saltRound = 10;
  // const passwordHash = await bcrypt.hash(userDetails.password, saltRound);

  // const newUser = new MatchDetailLog();
  // newUser.username = userDetails.username;
  // newUser.email = userDetails.email;
  // newUser.passwordhash = passwordHash;

  // return this.userRepository.save(newUser);
  //}

  // public async updateUser(
  //   userName: string,
  //   updates: Partial<MatchDetailLog>
  // ): Promise<MatchDetailLog> {
  // const updateUser = await this.userRepository.findOne({
  //   username: userName,
  // });
  // if (updateUser) {
  //   Object.assign(updateUser, updates);
  //   await this.userRepository.save(updateUser);
  // }
  // return Promise.resolve(updateUser);
  //}

  // public async removeUser(userName: string): Promise<DeleteResult | void> {
  // const deleteUser = await this.userRepository.delete({ username: userName });
  // return Promise.resolve(deleteUser);
  //}
}

export default MatchDetailLogManager;
