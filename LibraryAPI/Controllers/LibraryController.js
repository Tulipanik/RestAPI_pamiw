const express = require("express");
let BOOKS = require("../../DataSeeder/BookSeeder.js");
const router = express.Router();

router.get("/getAllBooks", (req, res) => {
  return res.status(200).json(BOOKS);
});

router.get("/getBookByGenre/:genre", (req, res) => {
  return res.status(200).json(
    BOOKS.filter((book) => {
      return book.genre == req.params.genre;
    })
  );
});

router.get("/getBookByAuthor/:author", (req, res) => {
  return res.json(
    BOOKS.filter((item) => {
      return item.author == req.params.author;
    })
  );
});

router.post("/addBook", (req, res) => {
  let toAdd = req.body;

  BOOKS.push(toAdd);
  res.send("Dodano do bazy");
});

router.put("/updateBook/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const toUpdate = BOOKS[bookId];

  if (bookId >= BOOKS.length) {
    return res.status(404).json({ error: "Nie znaleziono ksiązki" });
  }

  const update = req.body;

  const keys = Object.keys(update);
  keys.forEach((key) => {
    if (!toUpdate[key]) {
      return res.status(400).json({ error: `Brakujący klucz: ${key}` });
    }
    toUpdate[key] = update[key];
  });

  BOOKS[1] = toUpdate;
  return res.status(200).json({ message: "Książka uaktualniona pomyślnie" });
});

router.delete("/deleteAllBooks", (req, res) => {
  res.status(200).json({ message: "Wszystko usunięto pomyślnie" });
});

router.delete("/deleteAllGenreBooks/:genre", (req, res) => {
  BOOKS = BOOKS.filter((book) => {
    return book.genre != req.params.genre;
  });
  res.status(200).json({
    message: `Usunięto wszystkie książki z kategorii ${req.params.genre}`,
  });
});

module.exports = router;
