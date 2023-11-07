import { BookModel } from "../Models/BookModel.js";
import { combinedViewModel } from "../ViewModel/CompleteViewModel.js";

const URL = "http://localhost:8080/";
export let maxId;
getMaxId();

export function getMax() {
  return maxId;
}
async function getAPIRequest(endpoint, metadata) {
  return fetch(endpoint, metadata).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return new Error(res.status);
    }
  });
}

export async function getAllBooks(page, perPage) {
  getAPIRequest(`${URL}getAllBooks?perpage=${perPage}&page=${page}`, {}).then(
    (Books) => {
      const books = Books.map((book) => {
        return new BookModel(book);
      });
      combinedViewModel.getBookVM().set(books);
    }
  );
}

export async function getAllGenre(genre) {
  const endpoint = `${URL}getBookByGenre/${genre}`;
  const errorMessageElement = document.getElementById("get_genre_error");

  await getAPIRequest(endpoint, {})
    .then((Books) => {
      errorMessageElement.style.display = "none";
      const books = Books.map((book) => {
        return new BookModel(book);
      });
      combinedViewModel.getBookVM().set(books);
    })
    .catch((error) => {
      console.log("Siema");
      errorMessageElement.style.display = "block";
    });
}

export async function getAllAuthor(author) {
  const endpoint = `${URL}getBookByAuthor/${author}`;
  let errorMessage = document.getElementById("get_author_error");

  await getAPIRequest(endpoint, {})
    .then((Books) => {
      errorMessage.style.display = "none";
      const books = Books.map((book) => {
        return new BookModel(book);
      });
      combinedViewModel.getBookVM().set(books);
    })
    .catch((error) => {
      console.log("Witam");
      errorMessage.style.display = "block";
    });
}

export async function getById(id) {
  const endpoint = `${URL}getBookById/${id}`;
  let errorMessage = document.getElementById("get_id_error");

  await getAPIRequest(endpoint, {})
    .then((Books) => {
      errorMessage.style.display = "none";
      const books = Books.map((book) => {
        return new BookModel(book);
      });
      combinedViewModel.getBookVM().set(books);
    })
    .catch((error) => {
      errorMessage.style.display = "block";
    });
}

export async function getMaxId() {
  const endpoint = `${URL}getMaxId`;

  await getAPIRequest(endpoint, {}).then((id) => {
    maxId = Number(id["max"]);
  });
}

export async function add(book) {
  const endpoint = `${URL}addBook`;
  let errorMessage = document.getElementById("null_title");
  let errorMessage2 = document.getElementById("not_added");

  await getAPIRequest(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => {
      errorMessage.style.display = "none";
      errorMessage2.style.display = "none";
    })
    .catch((error) => {
      if (error.message == 501) {
        errorMessage.style.display = "block";
      } else {
        errorMessage2.style.display = "block";
      }
    });
}

export async function update(book) {
  const endpoint = `${URL}updateBook/${book.id}`;
  let errorMessage = document.getElementById("null_title_2");
  let errorMessage2 = document.getElementById("null_id");

  await getAPIRequest(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => {
      errorMessage.style.display = "none";
      errorMessage2.style.display = "none";
    })
    .catch((error) => {
      if (error.message == 501) {
        errorMessage.style.display = "block";
      } else {
        errorMessage2.style.display = "block";
      }
    });
}

export async function deleteAll() {
  const endpointDailyForecast = `${URL}deleteAllBooks`;
  let errorMessage = document.getElementById("not_deleted");

  await getAPIRequest(endpointDailyForecast, { method: "DELETE" })
    .then((message) => {
      errorMessage.style.display = "none";
    })
    .catch((err) => {
      errorMessage.style.display = "block";
    });
}

export async function deleteId(id) {
  const endpointDailyForecast = `${URL}deleteBookById/${id}`;
  let errorMessage = document.getElementById("delete_id_error");

  await getAPIRequest(endpointDailyForecast, { method: "DELETE" })
    .then((message) => {
      errorMessage.style.display = "none";
    })
    .catch((err) => {
      errorMessage.style.display = "block";
    });
}

export async function deleteGenre(genre) {
  const endpointDailyForecast = `${URL}/deleteAllBooksByGenre/${genre}`;
  let errorMessage = document.getElementById("delete_genre_error");

  await getAPIRequest(endpointDailyForecast, { method: "DELETE" })
    .then((message) => {
      errorMessage.style.display = "none";
    })
    .catch((err) => {
      errorMessage.style.display = "block";
    });
}
