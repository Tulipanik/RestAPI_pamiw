const dotenv = require("dotenv");
const express = require("express");
const BOOKS = require("./DataSeeder/BookSeeder.js");

dotenv.config();
const app = express();

app.get("/getAllBooks", (req, res) => {
  return res.json(BOOKS);
});

app.get("/getBook/:genre", (req, res) => {
  return res.json(
    BOOKS.filter((book) => {
      return book.genre == req.params.genre;
    })
  );
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
