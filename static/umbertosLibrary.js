const getBookList = () => {
  // evt.preventDefault();
  const bookTable = document.getElementById("book-table");

  fetch("/api/umbertos-library")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.books.length; i++) {
        const newRow = bookTable.insertRow(-1);

        const bookTitle = data.books[i].title;

        const newTitleCell = newRow.insertCell(0);
        newTitleCell.innerHTML = bookTitle;
        newTitleCell.setAttribute("id", data.books[i].title);
        newTitleCell.setAttribute("class", "bookTitleCell");
        newTitleCell.addEventListener("click", (evt) => {
          evt.preventDefault();
          window.sessionStorage.setItem("title", bookTitle);
          location.replace(`/library/${bookTitle}`);
        });

        const newAuthorCell = newRow.insertCell(1);
        newAuthorCell.innerHTML = data.books[i].author;

        const newPubYearCell = newRow.insertCell(2);
        newPubYearCell.innerHTML = data.books[i].year_published;

        const newDateReadCell = newRow.insertCell(3);
        const formattedDateRead = new Date(data.books[i].date_read)
          .toISOString()
          .substring(0, 10);
        newDateReadCell.innerHTML = formattedDateRead;

        const newRatingCell = newRow.insertCell(4);
        newRatingCell.innerHTML = data.books[i].rating;

        const deleteBookCell = newRow.insertCell(5);
        const deleteBookButton = document.createElement("button");

        deleteBookCell.appendChild(deleteBookButton);
        deleteBookButton.setAttribute("class", "btn btn-danger");

        const deleteIcon = document.createElement("i");
        deleteBookButton.appendChild(deleteIcon);
        deleteIcon.setAttribute("class", "bi bi-trash-fill");
        deleteBookButton.addEventListener("click", () => {
          fetch(`/api/library/${bookTitle}`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
              book_title: bookTitle,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.success);
              if (data.success) {
                console.log(data.reponse);
              }
            });
        });
      }
    });
};

const getLastBook = () => {
  const bookTable = document.getElementById("book-table");

  fetch("/api/umbertos-library")
    .then((response) => response.json())
    .then((data) => {
      // NOTE: Replaced adding item to book-list with adding row to book table
      const newRow = bookTable.insertRow(-1);
      const newTitleCell = newRow[0];
      newTitleCell.innerHTML = last_book.title;
      newTitleCell.setAttribute("id", data.last_book.title);
      newTitleCell.setAttribute("class", "bookTitleCell");

      const newAuthorCell = newRow.insertCell(1);
      newAuthorCell.innerHTML = data.last_book.author;

      const newPubYearCell = newRow.insertCell(2);
      newPubYearCell.innerHTML = data.last_book.year_published;

      const newDateReadCell = newRow.insertCell(3);
      const formattedDateRead = new Date(data.last_book.date_read)
        .toISOString()
        .substring(0, 10);
      newDateReadCell.innerHTML = formattedDateRead;

      const newRatingCell = newRow.insertCell(4);
      newRatingCell.innerHTML = data.last_book.rating;

      const deleteBookCell = newRow.insertCell(5);
      const deleteBookButton = document.createElement("button");
      const deleteIcon = document.createElement("i");
      deleteBookCell.appendChild(deleteBookButton);
      deleteBookButton.setAttribute("class", "btn btn-danger");
      deleteBookButton.appendChild(deleteIcon);
      deleteIcon.setAttribute("class", "bi bi-trash-fill");
      deleteBookButton.addEventListener("click", (evt) => {
        fetch(`/api/umbertos-library/${bookTitle}`, {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({
            book_title: bookTitle,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.success);
          });
      });
    });
};

window.addEventListener("load", () => {
  getBookList();
});

const clickFunction = () => {
  console.log("clicked add btn");
};

document.getElementById("submit-new-book-btn").addEventListener("click", () => {
  console.log("clicked add btn");

  const newBookInputs = {
    new_book_title: document.getElementById("add-title").value,
    new_book_author: document.getElementById("add-author").value,
    new_book_year: document.getElementById("add-year").value,
    new_book_date_read: document.getElementById("add-date-read").value,
    new_book_rating: document.getElementById("add-rating").value,
  };

  fetch("/api/umbertos-library/add-book", {
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
