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
} from "@nestjs/common";

@Controller("/drinks")
export class DrinksController {
  private drinks: Drink[] = [];

  @Get()
  findAll() {
    return this.drinks;
  }

  @Get(":id")
  findOne(@Param("id") id) {
    const drink = this.drinks.find((drink) => drink.id === parseInt(id, 10));
    return drink;
  }

  @Post()
  create(@Body() input: CreateDrinkDto) {
    const drink: Drink = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: this.drinks.length + 1,
    };

    this.drinks.push(drink);

    return drink;
  }

  @Patch(":id")
  update(@Param("id") id, @Body() input: UpdateDrinkDto) {
    const index = this.drinks.findIndex(
      (drink) => drink.id === parseInt(id, 10)
    );

    this.drinks[index] = {
      ...this.drinks[index],
      ...input,
      updatedAt: new Date(),
    };

    return this.drinks[index];
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id) {
    this.drinks = this.drinks.filter((drink) => drink.id !== parseInt(id, 10));
  }
}
