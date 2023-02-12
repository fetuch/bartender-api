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
import { User } from "src/auth/user.entity";
import { Expose } from "class-transformer";

@Entity({ name: "drinks" })
export class Drink {
  constructor(partial?: Partial<Drink>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(() => Category, (category) => category.drinks, {
    nullable: false,
  })
  @JoinColumn({
    name: "category_id",
  })
  @Expose()
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
  @Expose()
  ingredients: Ingredient[];

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  glass: string;

  @Column()
  @Expose()
  instructions: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.drinks)
  @JoinColumn({ name: "creator_id" })
  @Expose()
  creator: User;

  @Column({ nullable: true })
  creator_id: number;
}
