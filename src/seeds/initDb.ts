import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository, Repository } from "typeorm";
import User from "../entities/User";
import MatchLog from "../entities/MatchLog";
import Team from "../entities/Team";

export default class DBInit implements Seeder {
  protected userRepository: Repository<User>;
  protected matchLogRepository: Repository<MatchLog>;
  protected teamRepository: Repository<Team>;

  constructor() {
    this.userRepository = getRepository(User);
    this.matchLogRepository = getRepository(MatchLog);
    this.teamRepository = getRepository(Team);
  }
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await this.teamRepository.delete({});
    await this.userRepository.delete({});
    await this.matchLogRepository.delete({});
  }
}
