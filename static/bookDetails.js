// const handleSubmit = () => {

document.getElementById("notes-form").addEventListener("submit", function (s) {
  s.preventDefault();

  const book_title = document.getElementById("book-title").innerHTML;

  this.action = `/api/library/${book_title}/add-notes`;

  const notes = document.getElementById("notes-form").innerText;

  fetch(`/api/library/${book_title}/add-notes`, {
    method: "POST",
    body: JSON.stringify({ notes, book_title }),
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
