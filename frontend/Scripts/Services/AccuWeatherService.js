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
      throw new Error("Bad response");
    }
  });
}

export async function getAllBooks() {
  getAPIRequest(`${URL}getAllBooks`, {}).then((Books) => {
    const books = Books.map((book) => {
      return new BookModel(book);
    });
    combinedViewModel.getBookVM().set(books);
  });
}

export async function getAllGenre(genre) {
  const endpoint = `${URL}getBookByGenre/${genre}`;

  await getAPIRequest(endpoint, {}).then((Books) => {
    const books = Books.map((book) => {
      return new BookModel(book);
    });
    combinedViewModel.getBookVM().set(books);
  });
}

export async function getAllAuthor(author) {
  const endpoint = `${URL}getBookByAuthor/${author}`;

  await getAPIRequest(endpoint, {}).then((Books) => {
    const books = Books.map((book) => {
      return new BookModel(book);
    });
    combinedViewModel.getBookVM().set(books);
  });
}

export async function getById(id) {
  const endpoint = `${URL}getBookById/${id}`;

  await getAPIRequest(endpoint, {}).then((Books) => {
    const books = Books.map((book) => {
      return new BookModel(book);
    });
    combinedViewModel.getBookVM().set(books);
  });
}

export async function getMaxId() {
  const endpoint = `${URL}getMaxId`;

  await getAPIRequest(endpoint, {}).then((id) => {
    maxId = Number(id["max"]);
    console.log(maxId);
  });
}

export async function add(book) {
  const endpoint = `${URL}addBook`;

  await getAPIRequest(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }).then((response) => {
    console.log(response);
  });
}

export async function update(book) {
  
  const endpoint = `${URL}updateBook/${book.id}`;

  console.log(endpoint);

  await getAPIRequest(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

export async function deleteAll() {
  const endpointDailyForecast = `${URL}deleteAllBooks`;

  await getAPIRequest(endpointDailyForecast, { method: "DELETE" }).then(
    (message) => {
      console.log(message.message);
    }
  );
}

export async function deleteId(id) {
  const endpointDailyForecast = `${URL}deleteBookById/${id}`;

  await getAPIRequest(endpointDailyForecast, { method: "DELETE" }).then(
    (message) => {
      console.log(message.message);
    }
  );
}
