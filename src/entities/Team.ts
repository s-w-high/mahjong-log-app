import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "m_teams" })
class Team {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    length: 100,
  })
  public teamname: string;
}

export default Team;
