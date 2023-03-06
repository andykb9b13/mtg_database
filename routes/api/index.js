const router = require("express").Router();

const userRoutes = require("./userRoutes");

router.use("/cards", userRoutes);

module.exports = router;
