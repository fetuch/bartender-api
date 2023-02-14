import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Drink } from "./../drinks/drink.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn({
    name: "profile_id",
  })
  @Expose()
  profile: Profile;

  @OneToMany(() => Drink, (drink) => drink.creator)
  @Expose()
  drinks: Drink[];
}
