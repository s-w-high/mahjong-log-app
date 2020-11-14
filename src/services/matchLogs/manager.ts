import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import MatchLog from "../../entities/MatchLog";
import { IManager } from "../common/manager";

class MatchLogManager implements IManager {
  protected matchLogRepository: Repository<MatchLog>;

  constructor() {
    this.matchLogRepository = getRepository(MatchLog);
  }

  public async getAllMatchLog(): Promise<MatchLog[]> {
    const matchLogs = await this.matchLogRepository.find();
    return Promise.resolve(matchLogs);
  }

  public async getMatchLogByUser(userId: string): Promise<MatchLog[]> {
    const matchLogs = await this.matchLogRepository.find({
      where: [
        { eastuser: userId },
        { westuser: userId },
        { southuser: userId },
        { northuser: userId },
      ],
    });
    return Promise.resolve(matchLogs);
  }

  public async getMatchLogByUserAndMatch(
    userId: string,
    matchId: string
  ): Promise<MatchLog[]> {
    const matchLogs = await this.matchLogRepository.find({
      where: [
        { id: matchId, eastuser: userId },
        { id: matchId, westuser: userId },
        { id: matchId, southuser: userId },
        { id: matchId, northuser: userId },
      ],
    });
    return Promise.resolve(matchLogs);
  }

  public async createMatchLog(matchLogDetails: MatchLog): Promise<MatchLog> {
    const newMatchLog = new MatchLog();
    Object.assign(newMatchLog, matchLogDetails);

    return this.matchLogRepository.save(newMatchLog);
  }

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
