import { Repository } from "typeorm/repository/Repository";
import { CreateDrinkDto } from "./create-drink.dto";
import { Drink } from "./drink.entity";
import { UpdateDrinkDto } from "./update-drink.dto";
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

@Controller("/drinks")
export class DrinksController {
  private readonly logger = new Logger(DrinksController.name);

  constructor(
    @InjectRepository(Drink)
    private readonly repository: Repository<Drink>
  ) {}

  @Get()
  async findAll() {
    this.logger.log("Hit the find all drinks route");
    const drinks = await this.repository.find();
    this.logger.debug(`Found ${drinks.length} drinks.`);
    return drinks;
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const drink = await this.repository.findOneBy({ id: id });

    if (!drink) {
      throw new NotFoundException();
    }

    return drink;
  }

  @Post()
  async create(@Body() input: CreateDrinkDto) {
    return await this.repository.save({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @Patch(":id")
  async update(@Param("id") id, @Body() input: UpdateDrinkDto) {
    const drink = await this.repository.findOneBy({ id: id });

    if (!drink) {
      throw new NotFoundException();
    }

    return await this.repository.save({
      ...drink,
      ...input,
      updatedAt: new Date(),
    });
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: number) {
    const drink = await this.repository.findOneBy({ id: id });

    if (!drink) {
      throw new NotFoundException();
    }

    await this.repository.remove(drink);
  }
}
