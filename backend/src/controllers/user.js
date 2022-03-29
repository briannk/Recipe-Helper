const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "src/.env" });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yv1xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createUser(req, res) {
  try {
    const user = req.user.uid;
    await client
      .db("recipe-helper")
      .collection("users")
      .updateOne({ uid: user }, { uid: user, history: [] }, { upsert: true });
    res.status(201).send({ success: true, payload: null });
  } catch (e) {
    res.status(500).send({ success: false, payload: null });
  }
}

async function editUser(client, data) {}

async function deleteUser(client, data) {}

module.exports = { createUser };
