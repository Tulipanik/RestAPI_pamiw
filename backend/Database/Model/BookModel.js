const { DataTypes } = require("sequelize");
const sequelize = require("../startBase.js");

const BookModel = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  releaseDate: {
    type: DataTypes.DATE,
  },
});

module.exports = BookModel;
