import { Drink } from "./drink.entity";

test("Drink should be initialized through constructor", () => {
  const drink = new Drink({
    name: "Margarita",
    instructions: "Margarita instructions",
  });

  expect(drink).toEqual({
    id: undefined,
    name: "Margarita",
    glass: undefined,
    instructions: "Margarita instructions",
    created_at: undefined,
    updated_at: undefined,
    category: undefined,
    ingredients: undefined,
    creator: undefined,
    creator_id: undefined,
  });
});
