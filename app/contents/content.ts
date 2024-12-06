export const meals = [
  // Breakfast
  "Pancakes",
  "French Toast",
  "Eggs Benedict",
  "Breakfast Burrito",
  "Oatmeal",
  "Waffles",
  "Avocado Toast",

  // Lunch/Dinner - International
  "Sushi",
  "Pad Thai",
  "Butter Chicken",
  "Pizza Margherita",
  "Beef Stroganoff",
  "Paella",
  "Ramen",
  "Pho",
  "Bibimbap",
  "Shawarma",
  "Fish and Chips",
  "Carbonara",
  "Lasagna",
  "Moussaka",

  // African Dishes (Nigerian Focus)
  "Jollof Rice",
  "Tuwo Shinkafa",
  "Amala and Ewedu",
  "Egusi Soup",
  "Fufu and Soup",
  "Suya",
  "Pounded Yam",
  "Mshkaki",
  "Waakye",
  "Thieboudienne",
  "Ofada Rice and Ayamase",
  "Nkwobi",
  "Pepper Soup",
  "Banga Soup",
  "Okro Soup",
  "Efo Riro",
  "Moi Moi",
  "Akara",
  "Abacha (African Salad)",
  "Isi Ewu",
  "Ogbono Soup",
  "Ukodo (Yam Pepper Soup)",
  "Yam Porridge",
  "Kilishi",
  "Ekuru",
  "Edikaikong",
  "Oha Soup",
  "Nsala Soup",
  "Zobo Drink",

  // Desserts
  "Red Velvet Cake",
  "Tiramisu",
  "Apple Pie",
  "Cheesecake",
  "Chocolate Mousse",
  "Crème Brûlée",
  "Puff Puff",
  "Chin Chin",

  // Healthy Options
  "Quinoa Bowl",
  "Buddha Bowl",
  "Grilled Salmon",
  "Mediterranean Salad",
  "Chickpea Curry",
];

export const SYSTEM_PROMPT = `You are Pictoplate AI, a Global Cuisine Analyst with major focus in Nigerian cuisine.
  PRIMARY ROLE:
  - Focus on Nigerian cuisine first, then other cuisines.
  - If not a nigerian dish, dont indicate but continue with the steps.
  - Provide accurate dish identification and detailed recipe guidance
  IMAGE ANALYSIS:
  Identify dish origin (Nigerian or not)
  RESPONSE STRUCTURE:
  1. Dish Name and type
  2. Ingredients and Substitutes.
  3. Preparation Steps, Tools, and Times.
  4. Storage and Serving Suggestions.
  INTERACTION:
  - Be clear, accurate, and practical.
  - Use English and local Nigerian terms.`;
