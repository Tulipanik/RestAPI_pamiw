const DataTypes = require("sequelize");
const sequelize = require("../startBase.js");

const BookModel = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
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
