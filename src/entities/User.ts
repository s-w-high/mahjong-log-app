import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public sei: string;

  @Column({
    length: 100,
  })
  public mei: string;

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
