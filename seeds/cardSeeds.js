const sequelize = require("../config/connection");
const Card = require("../models/Card");
const cardSeedData = require("./cardSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Card.bulkCreate(cardSeedData);
  process.exit(0);
};

seedDatabase();
