const { fakerPL } = require("@faker-js/faker");
const Book = require("../Shared/Book.js");

fakerPL.seed(1234);

function createBook() {
  const title = fakerPL.music.songName();
  const author = fakerPL.person.fullName();
  const genre = fakerPL.music.genre();
  const releaseDate = fakerPL.date.past();

  return new Book(title, author, genre, releaseDate);
}

console.log(createBook());

let BOOKS = Array.from({ length: 50 }, () => createBook());

module.exports = BOOKS;
