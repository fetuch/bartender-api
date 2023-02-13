import { Repository } from "typeorm/repository/Repository";
import { CreateDrinkDto } from "./input/create-drink.dto";
import { UpdateDrinkDto } from "./input/update-drink.dto";
import { Drink } from "./drink.entity";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { DrinksService } from "./drinks.service";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { ListDrinks } from "./input/list.drinks";

@Controller("/drinks")
@SerializeOptions({ strategy: "excludeAll" })
export class DrinksController {
  private readonly logger = new Logger(DrinksController.name);

  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListDrinks) {
    this.logger.log("Hit the find all drinks route");

    const drinks = await this.drinksService.getDrinksFilteredPaginated(filter, {
      total: true,
      currentPage: filter.page,
      limit: 10,
    });

    return drinks;
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const drink = await this.drinksService.findOne(id);

    if (!drink) {
      throw new NotFoundException();
    }

    return drink;
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateDrinkDto, @CurrentUser() user: User) {
    return this.drinksService.createDrink(input, user);
  }

  @Patch(":id")
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateDrinkDto,
    @CurrentUser() user: User
  ) {
    const drink = await this.drinksService.findOne(id);

    if (!drink) {
      throw new NotFoundException();
    }

    if (drink.creator_id !== user.id) {
      throw new ForbiddenException(
        null,
        "You are not authorized to change this drink"
      );
    }

    return await this.drinksService.updateDrink(drink, input);
  }

  @Delete(":id")
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: User
  ) {
    const drink = await this.drinksService.findOne(id);

    if (!drink) {
      throw new NotFoundException();
    }

    if (drink.creator_id !== user.id) {
      throw new ForbiddenException(
        null,
        "You are not authorized to remove this drink"
      );
    }

    await this.drinksService.deleteDrink(id);
  }
}
