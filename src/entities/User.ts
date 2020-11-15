import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Team from "./Team";

@Entity({ name: "m_users" })
class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    length: 100,
  })
  public username: string;

  @ManyToOne((type) => Team, { onDelete: "CASCADE" })
  @JoinColumn()
  public team: Team;

  @Column({
    length: 100,
    nullable: true,
  })
  public email: string;

  @Column({
    length: 100,
    nullable: true,
  })
  public passwordhash: string;
}

export default User;
