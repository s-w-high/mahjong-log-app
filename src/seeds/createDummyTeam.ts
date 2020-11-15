import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import teamJson from "./teams.json";
import Team from "../entities/Team";

export default class CreateTeams implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values(teamJson)
      .execute();
  }
}
