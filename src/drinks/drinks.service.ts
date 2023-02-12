import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import { CreateDrinkDto } from "./create-drink.dto";
import { Drink } from "./drink.entity";
import { UpdateDrinkDto } from "./update-drink.dto";

@Injectable()
export class DrinksService {
  private readonly logger = new Logger(DrinksService.name);

  constructor(
    @InjectRepository(Drink)
    private readonly drinksRepository: Repository<Drink>
  ) {}

  private getDrinksBaseQuery() {
    return this.drinksRepository
      .createQueryBuilder("drink")
      .orderBy("drink.id", "DESC");
  }

  public async getDrink(id: number): Promise<Drink | undefined> {
    const query = this.getDrinksBaseQuery().andWhere("drink.id = :id", { id });

    this.logger.debug(query.getSql());

    return await query.getOne();
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
}
