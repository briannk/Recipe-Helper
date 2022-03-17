// add a separate route i.e. /e-recipes/:recipe
// to the front and backend to avoid id duplication/collision

const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const { MongoClient, ObjectID } = require("mongodb");
const axios = require("axios");

const serviceAccount = require("./serviceAccountKey.json");
const { response } = require("express");

const app = express();

// may need to adjust to accommodate env vars once in production
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// api stuff
const appId = process.env.EDAMAM_APP_ID;
const appKey = process.env.EDAMAM_APP_KEY;

// entry point for database operations
async function callDatabase(operation, data) {
  const uri = process.env.DB_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    let results;
    switch (operation) {
      case "createUser":
        results = await createUser(client, data);
        break;
      case "editUser":
        results = await editUser(client, data);
        break;
      case "deleteUser":
        results = await deleteUser(client, data);
        break;
      case "upsertRecipe":
        results = await upsertRecipe(client, data);
        break;
      case "readOneRecipe":
        results = await readRecipe(client, data);
        break;
      case "readSomeRecipes":
        results = await readCertainRecipes(client, data);
        break;
      case "readAllRecipes":
        results = await readRecipes(client, data);
        break;
      case "updateRecipe":
        results = await updateRecipe(client, data);
        break;
      case "deleteRecipe":
        results = await deleteRecipe(client, data);
        break;
      default:
        throw Error("Invalid operation attempted.");
    }

    console.log(results);
    return results;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function createUser(client, data) {}

async function editUser(client, data) {}

async function deleteUser(client, data) {}

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

// insert or update a recipe
async function upsertRecipe(client, recipe) {
  let result;
  let id = recipe._id;
  // if recipe made from scratch or originates from external api, create new recipe
  if (recipe._id === -1 || recipe._id.startsWith("recipe_")) {
    delete recipe._id;
    result = await client
      .db("recipe-helper")
      .collection("recipes")
      .insertOne(recipe);
    console.log(`Successfully Inserted ${result.insertedId}`);
  } else {
    delete recipe._id;
    result = await client
      .db("recipe-helper")
      .collection("recipes")
      .updateOne({ _id: new ObjectID(id) }, { $set: recipe });
  }
  if (result) {
    console.log("result: ", result);
    console.log("Update Successful!");
    return result.insertedId || id;
  } else {
    console.log("Could not find a recipe with that id.");
  }
}

// retrieve the recipe with the matching id
async function readRecipe(client, data) {
  console.log(data.recipe._id);
  let result;
  if (data.recipe._id.startsWith("recipe_")) {
    result = await readExternalRecipe(data.recipe._id);
  } else {
    result = await client
      .db("recipe-helper")
      .collection("recipes")
      .findOne({ _id: new ObjectID(data.recipe._id) });
  }

  if (result) {
    console.log("Result found!");
    return result;
  } else {
    console.log("Could not find a recipe with that id.");
  }
}

// retrieve recipes whose name matches the search term
async function readCertainRecipes(client, searchTerm) {
  // read from mongodb
  console.log(new RegExp(".*" + searchTerm + ".*"));
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
  const result = edamamResp;
  return result;
}

// retrieve the list of public recipes
async function readRecipes(client, data) {
  // data contains search parameters
  const result = await client
    .db("recipe-helper")
    .collection("recipes")
    .find()
    .toArray();

  if (result) {
    console.log("Result(s) found!");
    let recipeObj = { recipes: result };
    return recipeObj;
  } else {
    console.log("Could not find a recipe with that id.");
  }
}

async function updateRecipe(client, data) {}

async function deleteRecipe(client, recipe) {
  const result = await client
    .db("recipe-helper")
    .collection("recipes")
    .deleteOne({ _id: recipe._id });

  if (result) {
    console.log("Recipe deleted!");
    return result;
  } else {
    console.log("Could not find a recipe with that id");
  }
}

// retrieve token from header and verify that an authorized user is
// applying CRUD operations
const validateToken = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  }
  // /else {
  //   res.status(401).json({ success: false, message: "Missing ID token." });
  //   return;
  // }

  try {
    console.log(JSON.stringify(idToken));
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedIdToken);
    req.user = decodedIdToken;
    console.log("successful validation!");
    next();
    return;
  } catch (error) {
    // res.status(403).json({ success: false, message: error });

    console.log("could not validate user.");
    console.log(error);
    next();
    return;
  }
};

app.use(cors());
app.use(express.json());
app.use(validateToken);

app.get("/api/v1/recipes", async (req, res) => {
  let results;
  console.log("query params: ", req.query);
  console.log(req.query.search);
  let searchTerm = req.query.search || req.headers.searchterm;
  console.log(req.headers);
  if (searchTerm) {
    results = await callDatabase("readSomeRecipes", searchTerm);
  } else {
    results = await callDatabase("readAllRecipes");
  }

  console.log("returning: ", results);
  res.status(200).json({ success: true, payload: { recipeData: results } });
});

app.get("/api/v1/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const data = { recipe: { _id: recipeId } };

  const results = await callDatabase("readOneRecipe", data);
  // TO-DO: check db for recipe
  if (1) {
    res.status(200).json({ success: true, payload: { recipe: results } });
  }
  // res.status(404).json({
  //   success: false,
  //   message: "Recipe was not found or does not exist.",
  // });
});

app.delete("/api/v1/recipes/:recipe", async (req, res) => {
  const { recipe } = req.params;
  const data = { recipe: recipe };
  const results = await callDatabase("deleteRecipe", data);
  console.log(results);
  res.status(200).json({
    success: false,
    message: results,
  });
});

app.post("/api/v1/saveRecipe", async (req, res) => {
  if (req.user) {
    console.log("logged in as ", req.user);
    const results = await callDatabase("upsertRecipe", req.body);
    // if (req.body._id === -1) {
    //   //save recipe as new
    //   delete req.body._id;
    //   console.log(req.body);
    //   const results = await callDatabase("create", req.body);
    // } else {
    //   //edit recipe belonging to id
    //   const results = await callDatabase("update", req.body);
    // }
    res.status(200).json({
      success: true,
      payload: { message: "Recipe Created/Updated.", _id: results },
    });
  } else {
    console.log("not logged in");
    delete req.body._id;
    console.log(req.body);
    const results = await callDatabase("createRecipe", req.body);
    res.status(401).json({
      success: false,
      message: "User is not logged in.",
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
