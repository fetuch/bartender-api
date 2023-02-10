import { Expose } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Drink } from "../drinks/drink.entity";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @OneToMany(() => Drink, (drink) => drink.category)
  @Expose()
  drinks: Drink[];

  @Column()
  @Expose()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
