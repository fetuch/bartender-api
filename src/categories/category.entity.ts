import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Drink } from "../drinks/drink.entity";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Drink, (drink) => drink.category)
  drinks: Drink[];

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
