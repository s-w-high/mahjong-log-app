import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public username: string;

  @Column()
  public passwordHash: string;

  @Column({ nullable: true })
  public displayName: string;
}

export default User;
