const express = require("express");
const router = express.Router();

const { getHistory } = require("../controllers/meta");
const { createUser } = require("../controllers/user");
const { checkCache } = require("../controllers/cache");

router.route("/").post(createUser);
router.route("/recentRecipes").get(getHistory);

module.exports = router;
