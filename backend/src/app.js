// add a separate route i.e. /e-recipes/:recipe
// to the front and backend to avoid id duplication/collision

const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const { validateToken } = require("./controllers/auth");

const serviceAccount = require("./serviceAccountKey.json");
const { response } = require("express");

// routes
const recipeRoutes = require("./routes/recipe");

const app = express();

// may need to adjust to accommodate env vars once in production
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// // entry point for database operations
// async function callDatabase(operation, data) {
//   try {
//     let results;
//     switch (operation) {
//       case "createUser":
//         results = await createUser(client, data);
//         break;
//       case "editUser":
//         results = await editUser(client, data);
//         break;
//       case "deleteUser":
//         results = await deleteUser(client, data);
//         break;
//       case "upsertRecipe":
//         results = await upsertRecipe(client, data);
//         break;
//       case "readOneRecipe":
//         results = await readRecipe(client, data);
//         break;
//       case "readSomeRecipes":
//         results = await readCertainRecipes(client, data);
//         break;
//       case "readAllRecipes":
//         results = await readRecipes(client, data);
//         break;
//       case "updateRecipe":
//         results = await updateRecipe(client, data);
//         break;
//       case "deleteRecipe":
//         results = await deleteRecipe(client, data);
//         break;
//       default:
//         throw Error("Invalid operation attempted.");
//     }

//     console.log(results);
//     return results;
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

async function createUser(client, data) {}

async function editUser(client, data) {}

async function deleteUser(client, data) {}

app.use(cors());
app.use(express.json());
app.use(validateToken);

app.use("/api/v1/recipes", recipeRoutes);

// app.get("/api/v1/recipes", async (req, res) => {
//   let results;
//   console.log("query params: ", req.query);
//   console.log(req.query.search);
//   let searchTerm = req.query.search || req.headers.searchterm;
//   console.log(req.headers);
//   if (searchTerm) {
//     results = await callDatabase("readSomeRecipes", searchTerm);
//   } else {
//     results = await callDatabase("readAllRecipes");
//   }

//   console.log("returning: ", results);
//   res.status(200).json({ success: true, payload: { recipeData: results } });
// });

// app.get("/api/v1/recipes/:recipeId", async (req, res) => {
//   const { recipeId } = req.params;
//   const data = { recipe: { _id: recipeId } };

//   const results = await callDatabase("readOneRecipe", data);
//   // TO-DO: check db for recipe
//   if (1) {
//     res.status(200).json({ success: true, payload: { recipe: results } });
//   }
//   // res.status(404).json({
//   //   success: false,
//   //   message: "Recipe was not found or does not exist.",
//   // });
// });

// app.delete("/api/v1/recipes/:recipe", async (req, res) => {
//   const { recipe } = req.params;
//   const data = { recipe: recipe };
//   const results = await callDatabase("deleteRecipe", data);
//   console.log(results);
//   res.status(200).json({
//     success: false,
//     message: results,
//   });
// });

// app.post("/api/v1/saveRecipe", async (req, res) => {
//   if (req.user) {
//     console.log("logged in as ", req.user);
//     const results = await callDatabase("upsertRecipe", req.body);
//     // if (req.body._id === -1) {
//     //   //save recipe as new
//     //   delete req.body._id;
//     //   console.log(req.body);
//     //   const results = await callDatabase("create", req.body);
//     // } else {
//     //   //edit recipe belonging to id
//     //   const results = await callDatabase("update", req.body);
//     // }
//     res.status(200).json({
//       success: true,
//       payload: { message: "Recipe Created/Updated.", _id: results },
//     });
//   } else {
//     console.log("not logged in");
//     delete req.body._id;
//     console.log(req.body);
//     const results = await callDatabase("createRecipe", req.body);
//     res.status(401).json({
//       success: false,
//       message: "User is not logged in.",
//     });
//   }
// });

app.all("*", (req, res) => {
  res.status(404).send({ success: false, payload: false });
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
