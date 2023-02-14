import { IsNumberString, IsOptional } from "class-validator";

export class ListDrinks {
  @IsOptional()
  @IsNumberString()
  page: number; //TODO: change
}
