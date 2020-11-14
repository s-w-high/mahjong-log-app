import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import MatchLog from "./MatchLog";

@Entity({ name: "t_match_detail_logs" })
class MatchDetailLog {
  @PrimaryGeneratedColumn()
  public id: string;

  @ManyToOne((type) => MatchLog, { onDelete: "CASCADE" })
  @JoinColumn()
  public match: MatchLog;

  @Column()
  public matchcount: Number;

  @Column()
  public eastpoint: Number;

  @Column()
  public southpoint: Number;

  @Column()
  public westpoint: Number;

  @Column()
  public northpoint: Number;
}

export default MatchDetailLog;
