import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drink } from "./drink.entity";
import { DrinksController } from "./drinks.controller";
import { DrinksService } from "./drinks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Drink])],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
