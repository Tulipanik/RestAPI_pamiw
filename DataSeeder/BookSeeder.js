const { fakerPL } = require("@faker-js/faker");

fakerPL.seed(1234);

class Book {
  constructor() {
    this.title = fakerPL.music.songName();
    this.author = fakerPL.person.fullName();
    this.genre = fakerPL.music.genre();
    this.releaseDate = fakerPL.date.past();
  }
}

function createBook() {
  return new Book();
}

let BOOKS = Array.from({ length: 50 }, () => createBook());

module.exports = { BOOKS, Book };
