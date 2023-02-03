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
  Param,
  Patch,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";

@Controller("/drinks")
export class DrinksController {
  constructor(
    @InjectRepository(Drink)
    private readonly repository: Repository<Drink>
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  @Post()
  async create(@Body(ValidationPipe) input: CreateDrinkDto) {
    return await this.repository.save({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @Patch(":id")
  async update(@Param("id") id, @Body() input: UpdateDrinkDto) {
    const drink = await this.repository.findOneBy({ id: id });

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
    await this.repository.remove(drink);
  }
}
