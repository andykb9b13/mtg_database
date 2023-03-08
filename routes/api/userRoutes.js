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

router.post("/", async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(200).json(newCard);
  } catch (err) {
    res.status(500).send("Could not add card to database", err);
  }
});

router.post("/seed", async (req, res) => {
  try {
    const cardSeeds = await Card.bulkCreate([
      {
        cardName: "Omnath, Locus of the Roil",
        cardType: "Legendary Creature",
        cardSubtype: "Elemental",
        setId: "M20",
        setNumber: 216,
        rarity: "M",
        colorId: "URG",
        whiteManaCost: null,
        blueManaCost: 1,
        blackManaCost: null,
        redManaCost: 1,
        greenManaCost: 1,
        colorlessManaCost: 1,
        keyword1: "ETB",
        keyword2: "+1/+1",
        keyword3: "cardDraw",
        keyword4: "landfall",
      },
      {
        cardName: "Skullclamp",
        cardType: "Artifact",
        cardSubtype: "Equipment",
        setId: "C17",
        setNumber: 222,
        rarity: "U",
        colorId: "C",
        whiteManaCost: null,
        blueManaCost: null,
        blackManaCost: null,
        redManaCost: null,
        greenManaCost: null,
        colorlessManaCost: 1,
        keyword1: "cardDraw",
        keyword2: "diesTrigger",
        keyword3: null,
        keyword4: null,
      },
      {
        cardName: "Vandalblast",
        cardType: "Sorcery",
        cardSubtype: null,
        setId: "RNA",
        setNumber: 111,
        rarity: "U",
        colorId: "R",
        whiteManaCost: null,
        blueManaCost: null,
        blackManaCost: null,
        redManaCost: 1,
        greenManaCost: null,
        colorlessManaCost: null,
        keyword1: "artifact",
        keyword2: "overload",
        keyword3: "removal",
        keyword4: null,
      },
      {
        cardName: "Fiery Islet",
        cardType: "Land",
        cardSubtype: null,
        setId: "MH1",
        setNumber: 238,
        rarity: "R",
        colorId: "UR",
        whiteManaCost: null,
        blueManaCost: null,
        blackManaCost: null,
        redManaCost: null,
        greenManaCost: null,
        colorlessManaCost: null,
        keyword1: "cardDraw",
        keyword2: null,
        keyword3: null,
        keyword4: null,
      },
    ]);
    res.status(200).json(cardSeeds);
  } catch (err) {
    res.status(500).json(err);
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
