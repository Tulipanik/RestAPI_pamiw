const Sequelize = require("sequelize");
const BookModel = require("./Model/BookModel.js");
const BOOKS = require("../DataSeeder/BookSeeder.js");

// BookModel.bulkCreate(BOOKS);

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

async function getAllGenreBooks(bookGenre, fromId, toId) {
  const books = await BookModel.findAll({
    where: {
      ["genre"]: bookGenre,
      id: {
        [Sequelize.Op.between]: [fromId, toId],
      },
    },
  });
  return books;
}

async function getAllAuthorBooks(bookAuthor) {
  const books = await BookModel.findAll({
    where: {
      ["author"]: bookAuthor,
      id: {
        [Sequelize.Op.between]: [fromId, toId],
      },
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
  console.log(books);
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
    // Find the book by ID
    const book = await BookModel.findByPk(updatedBook.id);

    if (!book) {
      console.log("Book not found");
      return;
    }

    // Update book properties
    await book.update({
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      // Add more fields to update as needed
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
