const e = require("express");
const express = require("express");
const router = express.Router();

const {
  readRecipe,
  readRecipes,
  upsertRecipe,
  deleteRecipe,
  readCertainRecipes,
} = require("../controllers/recipe");

const { checkCache } = require("../controllers/cache");

router.route("/").get((req, res) => {
  console.log("searchTerm: ", req.query.searchTerm);
  if (req.query.searchTerm) {
    readCertainRecipes(req, res);
  } else {
    readRecipes(req, res);
  }
});

router.route("/recipe").post(upsertRecipe);

router
  .route("/recipe/:recipeId")
  .get(checkCache, readRecipe)
  .post(upsertRecipe)
  .delete(deleteRecipe);

module.exports = router;
