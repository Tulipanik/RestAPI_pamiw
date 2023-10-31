const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
let BOOKS = require("./DataSeeder/BookSeeder.js");

BOOKS = BOOKS.BOOKS;
dotenv.config();
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/getAllBooks", (req, res) => {
  console.log(BOOKS[0]);
  return res.status(200).json(BOOKS);
});

app.get("/getBookByGenre/:genre", (req, res) => {
  return res.status(200).json(
    BOOKS.filter((book) => {
      return book.genre == req.params.genre;
    })
  );
});

app.get("/getBookByAuthor/:author", (req, res) => {
  return res.json(
    BOOKS.filter((item) => {
      return item.author == req.params.author;
    })
  );
});

app.post("/addBook", (req, res) => {
  let toAdd = req.body;

  BOOKS.push(toAdd);
  res.send("Dodano do bazy");
});

app.put("/updateBook/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const toUpdate = BOOKS[bookId];

  if (bookId >= BOOKS.length) {
    return res.status(404).json({ error: "Book not found" });
  }

  const update = req.body;
  console.log(update);

  const keys = Object.keys(update);
  keys.forEach((key) => {
    if (!toUpdate[key]) {
      return res.status(400).json({ error: `Missing key: ${key}` });
    }
    toUpdate[key] = update[key];
  });

  BOOKS[1] = toUpdate;
  return res
    .status(200)
    .json({ message: "Book updated successfully", book: toUpdate });
});

app.delete("/deleteAllBooks", (req, res) => {
  res.status(200).json({ message: "Wszystko usunięto pomyślnie" });
  console.log(BOOKS);
});

app.delete("/deleteAllGenreBooks/:genre", (req, res) => {
  BOOKS = BOOKS.filter((book) => {
    return book.genre != req.params.genre;
  });
  res.status(200).json({
    message: `Usunięto wszystkie książki z kategorii ${req.params.genre}`,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
