
import { useEffect, useState } from "react";
import { getRandomMeals } from "@/helpers/getRandomMeal";

const useSuggestedMeals = () => {
  const [meals, setMeals] = useState<string[]>([]);
  useEffect(() => {
    const randomMeals: string[] = getRandomMeals(8);
    setMeals(randomMeals);
  }, []);

  return meals;
};

export default useSuggestedMeals;
