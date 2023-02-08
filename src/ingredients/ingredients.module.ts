import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ingredient } from "./ingredient.entity";
import { IngredientsController } from "./ingredients.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
})
export class IngredientsModule {}
