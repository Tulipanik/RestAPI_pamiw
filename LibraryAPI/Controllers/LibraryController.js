const express = require("express");
let BOOKS = require("../../DataSeeder/BookSeeder.js");
const operations = require("../../Database/DatabaseOperation.js");
const router = express.Router();

const endpoints = require("../../config/endpoints.json").endpoints;

router.get(endpoints.getAll, (req, res) => {
  operations.getAllBooks().then((data) => {
    return res.status(200).json(data);
  });
});

router.get(endpoints.getAllGenre, (req, res) => {
  operations.getAllGenreBooks(req.params.genre).then((data) => {
    return res.status(200).json(data);
  });
});

router.get(endpoints.getAllAuthor, (req, res) => {
  operations.getAllAuthorBooks(req.params.author).then((data) => {
    return res.status(200).json(data);
  });
});

router.post(endpoints.add, (req, res) => {
  let toAdd = req.body;
  operations
    .addBook(toAdd)
    .then(() => {
      res.status(201).json({ message: "Udało się dodać do bazy" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Błąd podczas dodawania do bazy" });
    });
});

router.put(endpoints.update, (req, res) => {
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

router.delete(endpoints.deleteAll, (req, res) => {
  operations.deleteAllBooks().then(() => {
    res.status(200).json({ message: "Wszystko usunięto pomyślnie" });
  });
});

router.delete(endpoints.deleteAllGenre, (req, res) => {
  BOOKS = BOOKS.filter((book) => {
    return book.genre != req.params.genre;
  });
  res.status(200).json({
    message: `Usunięto wszystkie książki z kategorii ${req.params.genre}`,
  });
});

module.exports = router;
