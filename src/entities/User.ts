import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public username: string;
}

export default User;
