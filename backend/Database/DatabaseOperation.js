const Sequelize = require("sequelize");
const BookModel = require("./Model/BookModel.js");
const BOOKS = require("../DataSeeder/BookSeeder.js");

//BookModel.bulkCreate(BOOKS);

async function getAllBooks(fromId, toId) {
  const books = await BookModel.findAll({
    where: {
      id: {
        [Sequelize.Op.between]: [fromId, toId],
      },
    },
  });

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
      ["author"]: bookAuthor,
    },
  });
  return books;
}

async function getIdBook(id) {
  const books = await BookModel.findAll({
    where: {
      ["id"]: id,
    },
  });
  return books;
}

async function addBook(bookData) {
  const book = await BookModel.create(bookData);
}

async function deleteAllBooks() {
  await BookModel.truncate();
}

async function deleteById(id) {
  BookModel.destroy({
    where: {
      ["id"]: id,
    },
  });
}

async function updateBook(updatedBook) {
  try {
    const book = await BookModel.findByPk(updatedBook.id);

    if (!book) {
      return false;
    }

    await book.update({
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
    });

    console.log("Book updated successfully");
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

async function deleteAllBooksByGenre(bookGenre) {
  BookModel.destroy({
    where: {
      ["genre"]: bookGenre,
    },
  });
}

async function getMaxId() {
  return BookModel.max("id");
}

module.exports = {
  getAllBooks,
  getAllGenreBooks,
  getAllAuthorBooks,
  getIdBook,
  addBook,
  updateBook,
  deleteAllBooks,
  deleteById,
  deleteAllBooksByGenre,
  getMaxId,
};
