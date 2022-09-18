const getBookList = () => {
  const bookTable = document.getElementById("book-table");

  fetch("/api/library")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.books);
      for (book in data.books) {
        bookTable.insertRow(-1);
        const newRow = bookTable.insertRow(-1);

        const newTitleCell = newRow.insertCell(0);
        const newAuthorCell = newRow.insertCell(1);
        const newPubYearCell = newRow.insertCell(2);
        const newDateReadCell = newRow.insertCell(3);
        const newRatingCell = newRow.insertCell(4);

        newTitleCell.innerHTML = data.books[book].title;
        newAuthorCell.innerHTML = data.books[book].author;
        newPubYearCell.innerHTML = data.books[book].year_published;
        // newDateReadCell.innerHTML = data.books[book].date_read;
        const formattedDateRead = new Date(data.books[book].date_read)
          .toISOString()
          .substring(0, 10);
        newDateReadCell.innerHTML = formattedDateRead;
        newRatingCell.innerHTML = data.books[book].rating;

        // console.log(data.books[book].title);
        // bookTable
        //   .insertAdjacentElement("beforeend", newBook)
        //   .classList.add("list-group-item");

        // newBook.insertAdjacentHTML("beforeend", data.books[book].title);
      }
      addRowHandlers();
    });
};

const getLastBook = () => {
  const bookList = document.getElementById("book-list");

  fetch("/api/library")
    .then((response) => response.json())
    .then((data) => {
      const newBook = document.createElement("li");
      console.log(data.last_book.title);
      bookList
        .insertAdjacentElement("beforeend", newBook)
        .classList.add("list-group-item");
      newBook.insertAdjacentHTML("beforeend", data.last_book.title);
    });
};

window.addEventListener("load", (evt) => {
  getBookList();
});

document
  .getElementById("submit-new-book-btn")
  .addEventListener("click", (evt) => {
    evt.preventDefault();

    // const queryString = new URLSearchParams({
    //   new_book_title: document.getElementById("add-title").value,
    //   new_book_author: document.getElementById("add-author").value,
    //   new_book_year: document.getElementById("add-year").value,
    //   new_book_date_read: document.getElementById("add-date-read").value,
    //   new_book_rating: document.getElementById("add-rating").value,
    // }).toString();

    // console.log(queryString);

    // const url = `/api/add-book?${queryString}`;

    const newBookInputs = {
      new_book_title: document.getElementById("add-title").value,
      new_book_author: document.getElementById("add-author").value,
      new_book_year: document.getElementById("add-year").value,
      new_book_date_read: document.getElementById("add-date-read").value,
      new_book_rating: document.getElementById("add-rating").value,
    };
    console.log(newBookInputs);

    fetch("/api/add-book", {
      method: "POST",
      body: JSON.stringify(newBookInputs),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getLastBook();
        console.log(data.bookTitle);
      });
  });

function addRowHandlers() {
  const rows = document.getElementById("book-table").rows;
  console.log(rows);
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = (function () {
      return function () {
        const id = this.cells[0].innerHTML;
        console.log(id);
        location.replace(`/library/${id}`);
      };
    })(rows[i]);
  }
}