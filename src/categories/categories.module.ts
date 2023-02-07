import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoriesController } from "./categories.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
})
export class CategoriesModule {}