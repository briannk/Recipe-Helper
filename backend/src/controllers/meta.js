const { MongoClient, ObjectID } = require("mongodb");
const { cacheData } = require("./cache");
require("dotenv").config({ path: "src/.env" });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yv1xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// retrieve the recipe with the matching id
async function getHistory(req, res) {
  try {
    const user = req.user.uid;
    let result;

    await client.connect();
    result = await client
      .db("recipe-helper")
      .collection("users")
      .findOne({ uid: user }, { projection: { history: 1 } });

    if (result) {
      console.log("Result found!");
      console.log(result);
      // await cacheData(result);
      res
        .status(200)
        .send({ success: true, payload: { history: result.history } });
    } else {
      res.status(404).send({ success: false, payload: null });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false, payload: null });
  }
}

// insert or update a recipe
async function setHistory(user, recipe) {
  try {
    let result;
    let history;
    let recipeId = recipe._id;

    await client.connect();
    result = await client
      .db("recipe-helper")
      .collection("users")
      .findOne({ uid: user }, { projection: { history: 1 } });

    result.history = result.history.filter(
      (historyItem) => !historyItem.recipeId.equals(recipeId)
    );

    // remove the least recently viewed item
    if (result.history.length > 9) {
      result.history.sort((a, b) => a.visitedAt - b.visitedAt);
      result.history.shift();
    }

    history =
      result.history.length > 0
        ? [
            ...result.history,
            {
              recipeId: recipeId,
              viewedAt: Date.now(),
              imagePath: recipe.imagePath,
              name: recipe.name,
              description: recipe.description,
            },
          ]
        : [
            {
              recipeId: recipeId,
              viewedAt: Date.now(),
              imagePath: recipe.imagePath,
              name: recipe.name,
              description: recipe.description,
            },
          ];

    result = await client
      .db("recipe-helper")
      .collection("users")
      .updateOne(
        { uid: user },
        { $set: { history: history } },
        { upsert: true }
      );

    if (result) {
      // console.log("result: ", result);
      console.log("Update Successful!");
    }
  } catch (e) {
    console.log(e);
    throw e;
    // res.status(500).send({ success: false, payload: null });
  }
}

async function removeHistory(user, recipe) {
  try {
    let result;
    let history;
    let recipeId = recipe._id;

    await client.connect();
    result = await client
      .db("recipe-helper")
      .collection("users")
      .findOne({ uid: user }, { projection: { history: 1 } });

    if (result.history.find((recipe) => recipe.recipeId.equals(recipeId))) {
      return;
    } else {
      history = result.history.filter(
        (historyItem) => !historyItem.recipeId.equals(recipeId)
      );

      result = await client
        .db("recipe-helper")
        .collection("users")
        .updateOne({ uid: user }, { $set: { history: history } });

      if (result) {
        // console.log("result: ", result);
        console.log("Update Successful!");
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
    // res.status(500).send({ success: false, payload: null });
  }
}

module.exports = { getHistory, setHistory, removeHistory };
