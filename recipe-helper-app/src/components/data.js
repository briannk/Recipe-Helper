const data = [
  {
    _id: -1,
    author: "author of the recipe",
    name: "the name of the recipe",
    description: "a brief description of the recipe",
    imagePath: "a path to a CDN where the images will be uploaded",
    time: "time in seconds estimating the time it takes to make the dish",
    servings: "number of servings the recipe makes",
    ingredients: [
      {
        quantity:
          "(OPTIONAL) attribute denoting how much of the ingredient the recipe calls for",
        ingredientName: "an ingredient",
      },
      {
        quantity:
          "(OPTIONAL) attribute denoting how much of the ingredient the recipe calls for",
        ingredientName: "an ingredient",
      },
    ],
    directions: ["an array of directions on how to cook the recipe"],
    visibility: "either public or private determined by the user",
  },
];

export default data;
