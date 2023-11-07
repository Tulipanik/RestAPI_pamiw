import { getAllBooks } from "../Services/AccuWeatherService.js";

export class BookViewModel {
  constructor() {
    var self = this;

    self.array = ko.observableArray("");
    getAllBooks(1, 10);
  }

  set(array) {
    this.array(array);
  }

  get() {
    return this.array;
  }
}
