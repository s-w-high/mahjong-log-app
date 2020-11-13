import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public username: string;

  @Column({
    length: 100,
  })
  public email: string;

  @Column({
    length: 100,
  })
  public passwordhash: string;
}

export default User;
