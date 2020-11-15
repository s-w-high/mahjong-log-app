import bcrypt from "bcrypt";
import Team from "../../entities/Team";
import { getRepository, Repository, DeleteResult } from "typeorm";
import { IManager } from "../common/manager";

interface TeamInput extends Team {
  password: string;
}

class TeamManager implements IManager {
  protected teamRepository: Repository<Team>;

  constructor() {
    this.teamRepository = getRepository(Team);
  }

  public async getAllTeam(): Promise<Team[]> {
    const team = await (await this.teamRepository.find()).sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    return Promise.resolve(team);
  }

  public async getTeam(teamId: string): Promise<Team> {
    const team = await this.teamRepository.findOne({ id: teamId });
    return Promise.resolve(team);
  }

  public async createTeam(teamDetails: Partial<TeamInput>): Promise<Team> {
    const newTeam = new Team();
    Object.assign(newTeam, teamDetails);

    return this.teamRepository.save(newTeam);
  }

  public async updateTeam(
    teamId: string,
    updates: Partial<Team>
  ): Promise<Team> {
    const updateTeam = await this.teamRepository.findOne({
      id: teamId,
    });
    if (updateTeam) {
      Object.assign(updateTeam, updates);
      await this.teamRepository.save(updateTeam);
    }
    return Promise.resolve(updateTeam);
  }

  public async removeTeam(teamId: string): Promise<DeleteResult | void> {
    const deleteTeam = await this.teamRepository.delete({ id: teamId });
    return Promise.resolve(deleteTeam);
  }
}

export default TeamManager;
