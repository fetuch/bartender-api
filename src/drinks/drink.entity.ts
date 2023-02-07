import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";

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

  @Column()
  name: string;

  @Column()
  glass: string;

  @Column()
  instructions: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
