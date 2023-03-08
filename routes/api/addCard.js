const router = require("express").Router();
const Card = require("../../models/Card");

router.post("/", async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    res.render("addCard", newCard);
  } catch (err) {
    res.status(500).send("Could not add card to database", err);
  }
});

module.exports = router;
