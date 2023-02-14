import { Drink } from "./../drinks/drink.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity({ name: "ingredients" })
export class Ingredient {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToMany(() => Drink, (drink) => drink.ingredients)
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
