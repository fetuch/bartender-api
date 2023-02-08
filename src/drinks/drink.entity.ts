import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../categories/category.entity";
import { Ingredient } from "src/ingredients/ingredient.entity";

@Entity({ name: "drinks" })
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.drinks, {
    nullable: false,
  })
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.drinks, {
    cascade: true,
  })
  @JoinTable({
    name: "drink_ingredient",
    joinColumn: {
      name: "drink_id",
    },
    inverseJoinColumn: {
      name: "ingredient_id",
    },
  })
  ingredients: Ingredient[];

  @Column()
  name: string;

  @Column()
  glass: string;

  @Column()
  instructions: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
