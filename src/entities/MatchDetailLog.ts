import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "match_detail_logs" })
class MatchLog {
  @PrimaryGeneratedColumn("uuid")
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

export default MatchLog;
