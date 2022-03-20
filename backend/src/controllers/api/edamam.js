const axios = require("axios");
require("dotenv").config();

console.log("edamam id: ", process.env.EDAMAM_APP_ID);
// api stuff
const appId = process.env.EDAMAM_APP_ID;
const appKey = process.env.EDAMAM_APP_KEY;

// read a recipe with the corresponding id from Edamam recipes api
async function readExternalRecipe(id) {
  try {
    const resp = await axios.get(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${appId}&app_key=${appKey}`
    );
    console.log("readExternalRecipe", resp);
    let recipe = resp.data.recipe;

    let ingredientsList = recipe.ingredientLines.map((ingredient) => {
      return { quantity: "", ingredientName: ingredient };
    });

    const results = {
      _id: recipe.uri.slice(recipe.uri.indexOf("#") + 1),

      name: recipe.label,
      url: recipe.url,
      imagePath: recipe.image,

      time: recipe.totalTime,
      servings: recipe.yield,
      ingredients: recipe.ingredientLines,
      tags: [...recipe.cuisineType, ...recipe.mealType],
    };
    return results;
  } catch (e) {
    console.error(e);
  }
}

// read recipes that match search term from Edamam recipes api
async function readExternalRecipes(searchTerm) {
  try {
    const resp = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${appId}&app_key=${appKey}`
    );
    console.log(resp.data);
    const recipes = resp.data.hits.map((hit) => {
      console.log(hit.recipe);
      let ingredientsList = hit.recipe.ingredientLines.map((ingredient) => {
        return { quantity: "", ingredientName: ingredient };
      });
      let tags = [
        ...hit.recipe.cuisineType.values(),
        ...hit.recipe.mealType.values(),
      ];

      return {
        _id: hit.recipe.uri.slice(hit.recipe.uri.indexOf("#") + 1),

        name: hit.recipe.label,
        url: hit.recipe.url,
        imagePath: hit.recipe.image,

        time: hit.recipe.totalTime,
        servings: hit.recipe.yield,
        ingredients: hit.recipe.ingredientLines,
        tags,
      };
    });

    const results = {
      from: resp.data.to,
      to: resp.data.to,
      count: resp.data.count,
      recipes: recipes,
    };
    return results;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  readExternalRecipe,
  readExternalRecipes,
};
