const Sequelize = require("sequelize");
const config = require("../config/database.js");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

const Books = require("./Model/BookModel.js")(sequelize, Sequelize);

module.exports = {
  sequelize,
  Books,
};
