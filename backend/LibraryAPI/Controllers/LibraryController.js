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

router.get(endpoints.getId, (req, res) => {
  operations.getIdBook(req.params.id).then((data) => {
    return res.status(200).json(data);
  });
});

router.get(endpoints.maxId, (req, res) => {
  operations.getMaxId().then((value) => {
    res.status(200).json({ max: value });
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
  operations.updateBook(req.body).then(() => {
    res.status(200).json({ message: "Zaktualizowano pomyślnie" });
  });
});

router.delete(endpoints.deleteAll, (req, res) => {
  operations.deleteAllBooks().then(() => {
    res.status(200).json({ message: "Wszystko usunięto pomyślnie" });
  });
});

router.delete(endpoints.deleteAllId, (req, res) => {
  operations.deleteById(req.params.id).then(() => {
    res.status(200).json({ message: "Usunięto pomyślnie" });
  });
});

router.delete(endpoints.deleteAllGenre, (req, res) => {
  operations.deleteAllBooksByGenre(req.params.genre).then(() => {
    res.status(200).json({
      message: `Pomyślnie usunięto wszytskie książki z gatunku ${req.params.genre}`,
    });
  });
});

module.exports = router;
