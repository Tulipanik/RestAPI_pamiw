const express = require("express");
const operations = require("../../Database/DatabaseOperation.js");
const router = express.Router();

const endpoints = require("../../config/endpoints.json").endpoints;

router.get(endpoints.getAll, (req, res) => {
  const perPage = parseInt(req.query.perpage) || 50;
  const page = parseInt(req.query.page) || 1;

  const startIndex = page;
  const endIndex = startIndex + perPage - 1;

  operations.getAllBooks(startIndex, endIndex).then((data) => {
    return res.status(200).json(data);
  });
});

router.get(endpoints.getAllGenre, (req, res) => {
  const perPage = parseInt(req.query.perpage) || 50;
  const page = parseInt(req.query.page) || 1;

  operations
    .getAllGenreBooks(req.params.genre)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Błędny gatunek" });
    });
});

router.get(endpoints.getAllAuthor, (req, res) => {
  const perPage = parseInt(req.query.perpage) || 50;
  const page = parseInt(req.query.page) || 1;

  operations
    .getAllAuthorBooks(req.params.author)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Błędny autor" });
    });
});

router.get(endpoints.getId, (req, res) => {
  operations
    .getIdBook(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Błędne id" });
    });
});

router.get(endpoints.maxId, (req, res) => {
  operations.getMaxId().then((value) => {
    res.status(200).json({ max: value });
  });
});

router.post(endpoints.add, (req, res) => {
  let toAdd = req.body;
  console.log(toAdd);
  operations
    .addBook(toAdd)
    .then(() => {
      res.status(201).json({ message: "Udało się dodać do bazy" });
    })
    .catch((err) => {
      if ((toAdd.title = "")) {
        res.status(501).json({ message: "Błąd tytułu" });
      }
      res.status(500).json({ message: "Błąd podczas dodawania do bazy" });
    });
});

router.put(endpoints.update, (req, res) => {
  operations
    .updateBook(req.body)
    .then(() => {
      res.status(200).json({ message: "Zaktualizowano pomyślnie" });
    })
    .catch((err) => {
      if ((toAdd.title = "")) {
        res.status(501).json({ message: "Błąd tytułu" });
      }
      res.status(500).json({ message: "Błąd podczas dodawania do bazy" });
    });
});

router.delete(endpoints.deleteAll, (req, res) => {
  operations
    .deleteAllBooks()
    .then(() => {
      res.status(200).json({ message: "Wszystko usunięto pomyślnie" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Błąd podczas dodawania do bazy" });
    });
});

router.delete(endpoints.deleteAllId, (req, res) => {
  operations
    .deleteById(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Usunięto pomyślnie" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Błąd id" });
    });
});

router.delete(endpoints.deleteAllGenre, (req, res) => {
  operations.deleteAllBooksByGenre(req.params.genre).then(() => {
    res
      .status(200)
      .json({
        message: `Pomyślnie usunięto wszytskie książki z gatunku ${req.params.genre}`,
      })
      .catch((err) => {
        res.status(501).json({ message: "Błąd gatunku" });
      });
  });
});

module.exports = router;
