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

  const notesList = document.getElementById("content-notes-list");

  fetch(`/api/library/${book_title}/add-notes`, {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.noteContent);

      const newNote = document.createElement("li");

      notesList
        .insertAdjacentElement("beforeend", newNote)
        .classList.add("list-group-item");
      newNote.insertAdjacentHTML("beforeend", data.noteContent);
    });
});
// });
