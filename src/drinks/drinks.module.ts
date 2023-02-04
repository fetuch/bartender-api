import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drink } from "./drink.entity";
import { DrinksController } from "./drinks.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Drink])],
  controllers: [DrinksController],
})
export class DrinksModule {}
