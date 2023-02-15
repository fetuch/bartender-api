import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./../auth/user.entity";
import { Drink } from "./drink.entity";
import { DrinksController } from "./drinks.controller";
import { DrinksService } from "./drinks.service";
import { ListDrinks } from "./input/list.drinks";

describe("EventsController", () => {
  let drinksController: DrinksController;
  let drinksService: DrinksService;
  let drinksRepository: Repository<Drink>;

  // beforeAll(() => console.log('this logged once'));
  beforeEach(() => {
    drinksService = new DrinksService(drinksRepository);
    drinksController = new DrinksController(drinksService);
  });

  it("should return a list of drinks", async () => {
    const result = {
      first: 1,
      last: 1,
      limit: 10,
      data: [],
    };

    // drinksService.getDrinksFilteredPaginated = jest
    //   .fn()
    //   .mockImplementation((): any => result);

    const spy = jest
      .spyOn(drinksService, "getDrinksFilteredPaginated")
      .mockImplementation((): any => result);

    expect(await drinksController.findAll(new ListDrinks())).toEqual(result);
    expect(spy).toBeCalledTimes(1);
  });

  it("should not delete a drink, when it's not found", async () => {
    const deleteSpy = jest.spyOn(drinksService, "deleteDrink");
    const findSpy = jest
      .spyOn(drinksService, "findOne")
      .mockImplementation((): any => undefined);

    try {
      await drinksController.remove(1, new User());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }

    expect(deleteSpy).toBeCalledTimes(0);
    expect(findSpy).toBeCalledTimes(1);
  });
});
