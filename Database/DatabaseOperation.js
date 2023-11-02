const BookModel = require("./Model/BookModel.js");
const BOOKS = require("../DataSeeder/BookSeeder.js");

BookModel.bulkCreate(BOOKS);

async function getAllBooks() {
  const books = await BookModel.findAll();

  console.log(JSON.stringify(books, null, 2));
}

getAllBooks();

module.exports = getAllBooks;
