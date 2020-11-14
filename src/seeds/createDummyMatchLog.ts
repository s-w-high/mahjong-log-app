import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import MatchLog from "../entities/MatchLog";
import matchLogJson from "./matchLogs.json";

export default class CreateMatchLogs implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(MatchLog)
      .values(matchLogJson)
      .execute();
  }
}
