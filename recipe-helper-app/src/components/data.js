// template for recipe object:
// {
//     id:,
//     recipeName:,
//     imagePath:,
// }

// const data = [
//   {
//     id: 1,
//     name: "Grilled Chicken Breast",
//     imagePath: "/assets/placeholder.png",
//     time: "15 min",
//     ingredients: [
//       "1 boneless, skinless chicken breast",
//       "kosher salt",
//       "1/2 tbsp black pepper",
//       "1/3 tbsp garlic powder",
//       "1/3 tbsp onion powder",
//       "1/4 tbsp paprika",
//     ],
//     directions:
//       "Liberally sprinkle kosher salt on both sides of the chicken breast. Let sit in the fridge for at least 1 hour before cooking. Finish seasoning after removing from the fridge. Heat up oil in a pan until shimmering. Cook until 155F and let sit for 5 min.",
//   },
//   {
//     id: 2,
//     name: "Chicken Alfredo",
//     imagePath: "/assets/placeholder.png",
//     time: "20 min",
//     ingredients: [
//       "1 boneless, skinless chicken breast",
//       "kosher salt",
//       "1/2 tbsp black pepper",
//       "1 cup heavy cream",
//       "6 oz parmesan cheese",
//       "1/3 tbsp garlic powder",
//     ],
//     directions: "Cook chicken as desired. Lorem ipsum",
//   },

//   {
//     id: 3,
//     name: "Bacon Cheeseburger",
//     imagePath: "/assets/placeholder2.png",
//     time: "20 min",
//     ingredients: [
//       "1 boneless, skinless chicken breast",
//       "kosher salt",
//       "1/2 tbsp black pepper",
//       "1 cup heavy cream",
//       "6 oz parmesan cheese",
//       "1/3 tbsp garlic powder",
//     ],
//     directions: "Cook chicken as desired. Lorem ipsum",
//   },
// ];

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
