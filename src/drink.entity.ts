import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "drinks" })
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  glass: string;

  @Column()
  instructions: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
