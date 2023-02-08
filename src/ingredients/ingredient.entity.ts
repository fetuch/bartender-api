import { Drink } from "src/drinks/drink.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ingredients" })
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Drink, (drink) => drink.ingredients)
  drinks: Drink[];

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
