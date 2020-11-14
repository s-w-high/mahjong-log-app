import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity({ name: "t_match_logs" })
class MatchLog {
  @PrimaryGeneratedColumn()
  public id: string;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  public eastuser: User;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  public southuser: User;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  public westuser: User;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  public northuser: User;

  @Column()
  public eastuserpoint: Number;

  @Column()
  public southuserpoint: Number;

  @Column()
  public westuserpoint: Number;

  @Column()
  public northuserpoint: Number;

  @Column()
  public created: Date;
}

export default MatchLog;
