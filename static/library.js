const getBookList = () => {
  const bookTable = document.getElementById("book-table");

  fetch("/api/library")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.books);
      for (book in data.books) {
        // bookTable.insertRow(-1);
        // ^^NEEDED?

        const bookTitle = data.books[book].title;

        // const redirectToBookDetails = (evt) => {
        //   evt.preventDefault();
        //   location.replace(`/library/${bookTitle}`)
        // }

        const newRow = bookTable.insertRow(-1);

        const newTitleCell = newRow.insertCell(0);
        newTitleCell.innerHTML = bookTitle;
        newTitleCell.setAttribute("id", data.books[book].title);
        newTitleCell.setAttribute("class", "bookTitleCell");
        newTitleCell.addEventListener("click", (evt) => {
          evt.preventDefault();
          location.replace(`/library/${bookTitle}`);
        });

        const newAuthorCell = newRow.insertCell(1);
        newAuthorCell.innerHTML = data.books[book].author;

        const newPubYearCell = newRow.insertCell(2);
        newPubYearCell.innerHTML = data.books[book].year_published;

        const newDateReadCell = newRow.insertCell(3);
        const formattedDateRead = new Date(data.books[book].date_read)
          .toISOString()
          .substring(0, 10);
        newDateReadCell.innerHTML = formattedDateRead;

        const newRatingCell = newRow.insertCell(4);
        newRatingCell.innerHTML = data.books[book].rating;

        const deleteBookCell = newRow.insertCell(5);
        const deleteBookButton = document.createElement("button");
        const deleteIcon = document.createElement("i");
        deleteBookCell.appendChild(deleteBookButton);
        deleteBookButton.setAttribute("class", "btn btn-danger");
        deleteBookButton.appendChild(deleteIcon);
        deleteIcon.setAttribute("class", "bi bi-trash-fill");
        deleteBookButton.addEventListener("click", handleDelete(bookTitle));
      }
      // addRowHandlers();
    });
};

const getLastBook = () => {
  const bookTable = document.getElementById("book-table");

  fetch("/api/library")
    .then((response) => response.json())
    .then((data) => {
      // NOTE: Replaced adding item to book-list with adding row to book table
      const newRow = bookTable.insertRow(-1);
      const newTitleCell = newRow.insertCell(0);
      newTitleCell.innerHTML = bookTitle;
      newTitleCell.setAttribute("id", data.books[book].title);
      newTitleCell.setAttribute("class", "bookTitleCell");

      const newAuthorCell = newRow.insertCell(1);
      newAuthorCell.innerHTML = data.books[book].author;

      const newPubYearCell = newRow.insertCell(2);
      newPubYearCell.innerHTML = data.books[book].year_published;

      const newDateReadCell = newRow.insertCell(3);
      const formattedDateRead = new Date(data.books[book].date_read)
        .toISOString()
        .substring(0, 10);
      newDateReadCell.innerHTML = formattedDateRead;

      const newRatingCell = newRow.insertCell(4);
      newRatingCell.innerHTML = data.books[book].rating;

      const deleteBookCell = newRow.insertCell(5);
      const deleteBookButton = document.createElement("button");
      const deleteIcon = document.createElement("i");
      deleteBookCell.appendChild(deleteBookButton);
      deleteBookButton.setAttribute("class", "btn btn-danger");
      deleteBookButton.appendChild(deleteIcon);
      deleteIcon.setAttribute("class", "bi bi-trash-fill");
      deleteBookButton.addEventListener("click", handleDelete(bookTitle));

      // addRowHandlers();
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
    // console.log(newBookInputs);

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
  const titles = document.getElementsByClassName("bookTitleCell");
  console.log(titles);

  // const allTitles = [];

  // for (const title in titles.item()) {
  //   allTitles.push(title);
  // }

  // console.log("Titles: ", allTitles);

  for (let i = 0; i < titles.length; i++) {
    console.log(titles.item(i));
    titles.item(i).onclick = (function () {
      return function (evt) {
        evt.preventDefault();
        const title = this.innerHTML;
        console.log(title);
        location.replace(`/library/${title}`);
      };
    })(titles.item(i));
  }
}

const handleDelete = (evt) => {
  preventDefault(evt);
  //
  // const book_title = document.getElementById("book-title").innerHTML;

  // const content = evt.target.innerHTML;

  fetch(`/api/library/${session["title"]}`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({
      book_title: session["title"],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.success);
      // if (data.success) {
      // console.log(data.reponse);
      // }
    });
};
