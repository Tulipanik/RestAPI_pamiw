console.log("Witam");
const BookModel = require("./Model/BookModel.js");
const BOOKS = require("../DataSeeder/BookSeeder.js");

// BookModel.bulkCreate(BOOKS);

async function getAllBooks() {
  const books = await BookModel.findAll();

  return books;
}

async function getAllGenreBooks(bookGenre) {
  const books = await BookModel.findAll({
    where: {
      ["genre"]: bookGenre,
    },
  });
  return books;
}

async function getAllAuthorBooks(bookAuthor) {
  const books = await BookModel.findAll({
    where: {
      ["author"]: bookGenre,
    },
  });
  return books;
}

async function addBook(bookData) {
  console.log(bookData);
  const book = await BookModel.create(bookData);
}

async function deleteAllBooks() {
  await BookModel.destroy();
}

async function deleteAllBooksByGenre(bookGenre) {
  await BookModel.destroy({
    where: {
      ["genre"]: bookGenre,
    },
  });
}

module.exports = {
  getAllBooks,
  getAllGenreBooks,
  getAllAuthorBooks,
  addBook,
  deleteAllBooks,
  deleteAllBooksByGenre,
};
