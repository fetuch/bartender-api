import { Repository } from "typeorm/repository/Repository";
import { CreateIngredientDto } from "./create-ingredient.dto";
import { Ingredient } from "./ingredient.entity";
import { UpdateIngredientDto } from "./update-ingredient.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";

@Controller("/ingredients")
export class IngredientsController {
  private readonly logger = new Logger(IngredientsController.name);

  constructor(
    @InjectRepository(Ingredient)
    private readonly repository: Repository<Ingredient>
  ) {}

  @Get()
  async findAll() {
    this.logger.log("Hit the find all ingredients route");
    const ingredients = await this.repository.find();
    this.logger.debug(`Found ${ingredients.length} ingredients.`);
    return ingredients;
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const ingredient = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!ingredient) {
      throw new NotFoundException();
    }

    return ingredient;
  }

  @Post()
  async create(@Body() input: CreateIngredientDto) {
    return await this.repository.save({
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  @Patch(":id")
  async update(@Param("id") id, @Body() input: UpdateIngredientDto) {
    const ingredient = await this.repository.findOneBy({ id: id });

    if (!ingredient) {
      throw new NotFoundException();
    }

    return await this.repository.save({
      ...ingredient,
      ...input,
      updated_at: new Date(),
    });
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: number) {
    const ingredient = await this.repository.findOneBy({ id: id });

    if (!ingredient) {
      throw new NotFoundException();
    }

    await this.repository.remove(ingredient);
  }
}
