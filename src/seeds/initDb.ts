import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository, Repository } from "typeorm";
import User from "../entities/User";
import MatchLog from "../entities/MatchLog";
import MatchDetailLog from "../entities/MatchDetailLog";

export default class DBInit implements Seeder {
  protected userRepository: Repository<User>;
  protected matchLogRepository: Repository<MatchLog>;
  protected matchDetailLogRepository: Repository<MatchDetailLog>;

  constructor() {
    this.userRepository = getRepository(User);
    this.matchLogRepository = getRepository(MatchLog);
    this.matchDetailLogRepository = getRepository(MatchDetailLog);
  }
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await this.userRepository.delete({});
    await this.matchLogRepository.delete({});
    await this.matchDetailLogRepository.delete({});
  }
}
