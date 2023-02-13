import { IsNumberString } from "class-validator";

export class ListDrinks {
  @IsNumberString()
  page = 1;
}
