import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "m_users" })
class User {
  @PrimaryGeneratedColumn()
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
