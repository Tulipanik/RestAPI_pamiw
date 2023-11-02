const Books = require("./startBase.js");

function getAllBooks() {
  Books.findAll()
    .then((books) => {
      console.log(users);
    })
    .catch((err) => {
      console.error("Something's wrong");
    });
}

module.exports = getAllBooks;
