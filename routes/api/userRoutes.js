const router = require("express").Router();
const Card = require("../../models/Card");

// get all cards
router.get("/", async (req, res) => {
  try {
    const cardData = await Card.findAll();
    // console.log(cardData);
    const cards = cardData.map((c) => c.get({ plain: true }));
    res.render("card", { cards });
    // res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a card by an id
router.get("/:id", async (req, res) => {
  try {
    const cardData = await Card.findByPk(req.params.id);
    const card = cardData.get({ plain: true });
    // res.status(200).json(card);
    res.render("card-details", { card });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/color/:color", async (req, res) => {
  try {
    const colorCards = await Card.findAll({
      where: {
        colorId: req.params.color,
      },
    });
    // const cards = colorCards.map((c) => c.get({ plain: true }));
    // res.render("card", cards);
    res.status(200).json(colorCards);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/type/:type", async (req, res) => {
  try {
    const foundCards = await Card.findAll({
      where: {
        cardType: req.params.type,
      },
    });
    res.status(200).json(foundCards);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editedCard = await Card.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!editedCard) {
      res.send("Could not find a card with that id");
      return;
    }
    editedCard.update(req.body);
    res.status(200).json(editedCard);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Card.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    });
    res.status(200).send("card was successfully deleted");
  } catch {
    res.status(500).send("there was a problem deleting card");
  }
});

module.exports = router;
