import { meals } from "@/app/contents/content";

export const getRandomMeals = (count = 4) => {
  const shuffled = [...meals].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


