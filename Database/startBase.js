const Sequelize = require("sequelize");
const sqlite3 = require("sqlite3");
const config = require("../config/database.json");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);
module.exports = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then(() => {
  console.log("Database synchronization successful");
  const Books = require("./Model/BookModel.js");
  Books.sync().then(() => {
    console.log(Books === sequelize.models.Book);
    const operations = require("./DatabaseOperation.js");
  });
});
