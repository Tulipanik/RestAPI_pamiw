import { BookModel } from "../Models/BookModel.js";
import { getAllBooks } from "../Services/AccuWeatherService.js";

export class BookViewModel {
  constructor() {
    var self = this;

    self.array = ko.observableArray("");
    getAllBooks();
  }

  set(array) {
    this.array(array);
    getAllBooks();
  }

  get() {
    return this.array;
  }
}
