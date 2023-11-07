import * as api from "../Services/AccuWeatherService.js";
import { BookViewModel } from "./BookViewModel.js";

export let combinedViewModel = {};
let maxId;

class CompleteViewModel {
  constructor() {
    var self = this;

    self.search = (id) => {
      let element = document.getElementById(id);
      let computedStyle = window.getComputedStyle(element);
      if (computedStyle.display == "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    };
    self.getAllGenre = () => {
      api.getAllGenre(document.getElementById("genre_find").value);
    };

    self.getAllAuthor = () => {
      api.getAllAuthor(document.getElementById("author_find").value);
    };

    self.getById = () => {
      api.getById(document.getElementById("id_find").value);
    };

    self.addBook = () => {
      let formData = this.bookParser(document.getElementById("add").elements);
      if (maxId === undefined) {
        maxId = api.getMax();
      }

      maxId += 1;
      formData["id"] = maxId;

      console.log(formData);

      api.add(formData);
    };

    self.updateBook = () => {
      let formData = this.bookParser(
        document.getElementById("update").elements
      );

      console.log(formData);
      api.update(formData);
    };

    self.deleteAllBooks = () => {
      api.deleteAll();
    };

    self.deleteId = () => {
      api.deleteId(document.getElementById("id").value);
    };

    self.deleteAllGenre = () => {};

    self.bookVM = new BookViewModel();
  }

  getBookVM() {
    return this.bookVM;
  }

  bookParser(elements) {
    const formData = {};

    for (const element of elements) {
      if (element.name) {
        formData[element.name] = element.value;
      }
    }

    return formData;
  }
}

$(document).ready(function () {
  combinedViewModel = new CompleteViewModel();
  ko.applyBindings(combinedViewModel, document.getElementById("knockout-app"));
});
