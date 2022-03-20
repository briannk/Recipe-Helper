const { MongoClient, ObjectID } = require("mongodb");
const { cacheData } = require("./cache");
require("dotenv").config();

const { readExternalRecipe, readExternalRecipes } = require("./api/edamam");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yv1xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// retrieve the recipe with the matching id
async function readRecipe(req, res) {
  try {
    const recipeId = req.params.recipeId;
    console.log(recipeId);
    let result;

    await client.connect();
    if (recipeId.startsWith("recipe_")) {
      result = await readExternalRecipe(recipeId);
    } else {
      result = await client
        .db("recipe-helper")
        .collection("recipes")
        .findOne({ _id: new ObjectID(recipeId) });
    }

    if (result) {
      console.log("Result found!");
      await cacheData(result);
      res.status(200).send({ success: true, payload: { recipe: result } });
    } else {
      res.status(404).send({ success: false, payload: null });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: null });
  }
}

// insert or update a recipe
async function upsertRecipe(req, res) {
  try {
    const recipe = JSON.parse(req.body);
    console.log(recipe);
    let result;
    let recipeId = recipe._id;

    await client.connect();
    // if recipe made from scratch or originates from external api,
    // create a new recipe
    if (recipeId === -1 || recipeId.startsWith("recipe_")) {
      delete recipeId;
      result = await client
        .db("recipe-helper")
        .collection("recipes")
        .insertOne(recipe);
    } else {
      result = await client
        .db("recipe-helper")
        .collection("recipes")
        .updateOne({ _id: new ObjectID(id) }, { $set: recipe });
    }
    if (result) {
      console.log("result: ", result);
      console.log("Update Successful!");
      res
        .status(201)
        .send({ success: true, payload: result?.insertedId || recipeId });
    } else {
      res.status(404).send({ success: false, payload: null });
    }
  } catch (e) {
    res.status(500).send({ success: false, payload: null });
  }
}

// retrieve recipes whose name matches the search term
async function readCertainRecipes(req, res) {
  try {
    const searchTerm = req.query.searchTerm;

    // read from mongodb
    console.log(new RegExp(".*" + searchTerm + ".*"));

    await client.connect();
    const resp = await client
      .db("recipe-helper")
      .collection("recipes")
      .find({ name: new RegExp(".*" + searchTerm + ".*") })
      .project({ name: 1 })
      .toArray();

    if (resp) {
      console.log("Result(s) found!");
    } else {
      console.log("Could not find a recipe that matches the term.");
    }

    // read from Edamam api
    const edamamResp = await readExternalRecipes(searchTerm);
    const result = { ...edamamResp, recipes: [...resp, ...edamamResp.recipes] };
    res.status(200).send({ success: true, payload: result });
  } catch (e) {
    res.status(500).send({ success: false, payload: null });
  }
}

// retrieve the list of public recipes
async function readRecipes(req, res) {
  try {
    // incorporate pagination
    await client.connect();
    const result = await client
      .db("recipe-helper")
      .collection("recipes")
      .find()
      .toArray();

    if (result) {
      console.log("Result(s) found!");
      let recipeObj = { recipes: result };
      res.status(200).send({ success: false, payload: recipeObj });
    } else {
      console.log("Could not find a recipe with that id.");
      res.status(404).send({ success: false, payload: null });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: null });
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipeId = req.params.recipeId;

    await client.connect();
    const result = await client
      .db("recipe-helper")
      .collection("recipes")
      .deleteOne({ _id: recipeId });

    if (result) {
      console.log("Recipe deleted!");
      res.status(200).send({ success: false, payload: result });
    } else {
      console.log("Could not find a recipe with that id");
      res.status(404).send({ success: false, payload: null });
    }
  } catch (e) {
    res.status(500).send({ success: false, payload: null });
  }
}

module.exports = {
  readRecipe,
  readRecipes,
  upsertRecipe,
  deleteRecipe,
  readCertainRecipes,
};
