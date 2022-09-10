// Adding new books
const addBookBtn = document.getElementById("add-book-btn");

window.onload = function () {
  document.getElementById("add-book-form").style.display = "none";
};

addBookBtn.addEventListener("click", () => {
  const addBookForm = document.getElementById("add-book-form");

  if (addBookForm.style.display === "none") {
    addBookForm.style.display = "block";
    addBookBtn.style.display = "none";
  } else {
    addBookForm.style.display = "none";
    addBookBtn.style.display = "block";
  }
});

// const newBookTitle = document.getElementById("add-title").value;

document.getElementById("add-book-form").addEventListener("submit", (evt) => {
  evt.preventDefault();

  const queryString = new URLSearchParams({
    new_book_title: document.getElementById("add-title").value,
    new_book_author: document.getElementById("add-author").value,
    new_book_year: document.getElementById("add-year").value,
    new_book_date_read: document.getElementById("add-date-read").value,
    new_book_rating: document.getElementById("add-rating").value,
  }).toString();

  const url = `/add-book?${queryString}`;

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    });

  // const formInputs = {
  //   title: document.getElementById("add-title").value,
  //   author: document.querySelector("#add-author").value,
  // };

  // fetch("/add-book", {
  //   method: "POST",
  //   body: JSON.stringify(formInputs),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => {
  //     console.log("next");
  //     response.json();
  //   })
  //   .then((data) => {
  //     alert(data.bookTitle);
  //   });
});

// addBookBtn.addEventListener("click", addBook);
