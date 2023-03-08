const router = require("express").Router();
const addCard = require("./addCard");
const userRoutes = require("./userRoutes");

router.use("/cards", userRoutes);
router.use("/add", addCard);

module.exports = router;
