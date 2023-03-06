const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Card extends Model {}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardSubtype: {
      type: DataTypes.STRING,
    },
    setId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    setNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whiteManaCost: {
      type: DataTypes.INTEGER,
    },
    blueManaCost: {
      type: DataTypes.INTEGER,
    },
    blackManaCost: {
      type: DataTypes.INTEGER,
    },
    redManaCost: {
      type: DataTypes.INTEGER,
    },
    greenManaCost: {
      type: DataTypes.INTEGER,
    },
    colorlessManaCost: {
      type: DataTypes.INTEGER,
    },
    keywords: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "card",
  }
);

module.exports = Card;
