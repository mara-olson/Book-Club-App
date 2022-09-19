// document.querySelectorAll(".notes-text").forEach((item) => {
//   item.
document.getElementById("notes-form").addEventListener("submit", function (s) {
  s.preventDefault();

  const book_title = document.getElementById("book-title").innerHTML;

  this.action = `/api/library/${book_title}/add-notes`;

  const formInputs = {
    book_title: book_title,
    notes: document.getElementById("entered-content-notes").value,
  };

  fetch(`/api/library/${book_title}/add-notes`, {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.author);

      //   bookList
      //     .insertAdjacentElement("beforeend", newBook)
      //     .classList.add("list-group-item");
      //   newBook.insertAdjacentHTML("beforeend", data.last_book.title);
    });
});
// });
