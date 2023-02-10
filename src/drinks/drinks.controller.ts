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
  UseGuards,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";
import { DrinksService } from "./drinks.service";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";

@Controller("/drinks")
export class DrinksController {
  private readonly logger = new Logger(DrinksController.name);

  constructor(
    @InjectRepository(Drink)
    private readonly repository: Repository<Drink>,
    private readonly drinksService: DrinksService
  ) {}

  @Get()
  async findAll() {
    this.logger.log("Hit the find all drinks route");
    const drinks = await this.repository.find({
      relations: ["category"],
    });
    this.logger.debug(`Found ${drinks.length} drinks.`);
    return drinks;
  }

  @Get(":id")
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
  async create(@Body() input: CreateDrinkDto, @CurrentUser() user: User) {
    return this.drinksService.createDrink(input, user);
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
      updated_at: new Date(),
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
