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

  public async updateMatchLog(
    matchId: string,
    updates: Partial<MatchLog>
  ): Promise<MatchLog> {
    const updateMatchLog = await this.matchLogRepository.findOne({
      id: matchId,
    });
    if (updateMatchLog) {
      Object.assign(updateMatchLog, updates);
      await this.matchLogRepository.save(updateMatchLog);
    }
    return Promise.resolve(updateMatchLog);
  }

  public async removeMatchLogByMatch(
    matchId: string
  ): Promise<DeleteResult | void> {
    const deleteMatchLog = await this.matchLogRepository.delete({
      id: matchId,
    });
    return Promise.resolve(deleteMatchLog);
  }
}

export default MatchLogManager;
