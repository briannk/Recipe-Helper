const { createClient } = require("redis");

// consider setting a TTL for keys as redis defaults
// to an unlimited TTL

let client;

// initialize client
(async () => {
  try {
    client = createClient();
    await client.connect();
  } catch (e) {
    console.log(e);
  }
})();

client.on("connect", () => {
  console.log("Redis client is connected!");
});
// client.on("error", (err) => console.log("Redis Client Error", err));

// only cache user generated recipes as edamam prohibits
// caching their data
const checkCache = async (req, res, next) => {
  try {
    console.log(
      JSON.stringify({
        key1: "value1",
        array1: [{ nKey1: "nVal1" }, { nKey2: "" }],
      })
    );
    console.log("checking cache...");
    const recipeId = req.params.recipeId;
    if (await client.exists(recipeId)) {
      console.log("cache hit!");
      const result = await client.get(recipeId);
      console.log(result);
      res
        .status(200)
        .send({ success: true, payload: { recipe: JSON.parse(result) } });
    } else {
      console.log("cache miss...");
      next();
    }
  } catch (e) {
    console.log(e);
    // the cache being unavailable will throw an error
    // therefore log the error but continue to the mongodb
    next();
  }
};

const cacheData = async (dataSet) => {
  try {
    console.log("caching data...");

    if (Array.isArray(dataSet)) {
      await Promise.all(
        dataSet.map(async (dataPoint) => {
          await client.set(dataPoint._id, JSON.stringify(dataPoint));
        })
      );
    } else {
      await client.set(dataSet._id, JSON.stringify(dataSet));
    }
  } catch (e) {
    console.log(e);
  }
};

// gracefully terminate the connection
process.on("SIGINT", client.quit);
process.on("SIGTERM", client.quit);

module.exports = {
  checkCache,
  cacheData,
};
