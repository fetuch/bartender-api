import { Repository } from "typeorm/repository/Repository";
import { CreateDrinkDto } from "./create-drink.dto";
import { Drink } from "./drink.entity";
import { UpdateDrinkDto } from "./update-drink.dto";
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";
import { DrinksService } from "./drinks.service";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import {
  ClassSerializerInterceptor,
  SerializeOptions,
} from "@nestjs/common/serializer";
import { UseInterceptors } from "@nestjs/common/decorators";

@Controller("/drinks")
@SerializeOptions({ strategy: "excludeAll" })
export class DrinksController {
  private readonly logger = new Logger(DrinksController.name);

  constructor(
    @InjectRepository(Drink)
    private readonly repository: Repository<Drink>,
    private readonly drinksService: DrinksService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    this.logger.log("Hit the find all drinks route");
    const drinks = await this.repository.find({
      relations: ["category"],
    });
    this.logger.debug(`Found ${drinks.length} drinks.`);
    return drinks;
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param("id") id: number) {
    const drink = await this.drinksService.getDrink(id);
    // const drink = await this.repository.findOne({
    //   where: {
    //     id,
    //   },
    //   relations: ["category"],
    // });

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
    @Param("id") id: number,
    @Body() input: UpdateDrinkDto,
    @CurrentUser() user: User
  ) {
    const drink = await this.repository.findOneBy({ id: id });

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
  async remove(@Param("id") id: number, @CurrentUser() user: User) {
    const drink = await this.repository.findOneBy({ id: id });

    if (!drink) {
      throw new NotFoundException();
    }

    if (drink.creator_id !== user.id) {
      throw new ForbiddenException(
        null,
        "You are not authorized to remove this drink"
      );
    }

    await this.repository.remove(drink);
  }
}
