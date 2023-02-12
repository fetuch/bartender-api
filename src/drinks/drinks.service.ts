import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { DeleteResult, Repository, SelectQueryBuilder } from "typeorm";
import { CreateDrinkDto } from "./input/create-drink.dto";
import { Drink } from "./drink.entity";
import { UpdateDrinkDto } from "./input/update-drink.dto";

@Injectable()
export class DrinksService {
  private readonly logger = new Logger(DrinksService.name);

  constructor(
    @InjectRepository(Drink)
    private readonly drinksRepository: Repository<Drink>
  ) {}

  private getDrinksBaseQuery(): SelectQueryBuilder<Drink> {
    return this.drinksRepository
      .createQueryBuilder("d")
      .orderBy("d.id", "DESC");
  }

  public getDrinksWithIngredientsCountQuery() {
    return this.getDrinksBaseQuery().loadRelationCountAndMap(
      "d.ingredientsCount",
      "d.ingredients"
    );
  }

  public async findOne(id: number): Promise<Drink | undefined> {
    return this.drinksRepository.findOne({
      where: { id },
      relations: ["category", "creator", "ingredients"],
    });
  }

  public async createDrink(input: CreateDrinkDto, user: User): Promise<Drink> {
    return await this.drinksRepository.save(
      new Drink({
        ...input,
        creator: user,
        created_at: new Date(),
        updated_at: new Date(),
      })
    );
  }

  public async updateDrink(
    drink: Drink,
    input: UpdateDrinkDto
  ): Promise<Drink> {
    return await this.drinksRepository.save({
      ...drink,
      ...input,
      updated_at: new Date(),
    });
  }

  public async deleteDrink(id: number): Promise<DeleteResult> {
    return await this.drinksRepository
      .createQueryBuilder("d")
      .delete()
      .where("id = :id", { id })
      .execute();
  }
}
