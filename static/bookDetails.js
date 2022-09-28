const getNoteList = () => {
  const book_title = document.getElementById("book-title").innerHTML;

  const noteList = document.getElementById("content-notes-list");

  fetch(`/api/library/${book_title}/all-notes`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.notes);
      for (note in data.notes) {
        // noteList.append("<li>New Note<li>");
        const newNote = document.createElement("li");

        console.log(data.notes[note].content);
        noteList
          .insertAdjacentElement("beforeend", newNote)
          .classList.add("list-group-item");
        newNote.insertAdjacentHTML("beforeend", data.notes[note].content);
      }
    });
};

window.addEventListener("load", () => {
  getNoteList();
});
//   const newRow = noteList.insertRow(-1);

//   const newTitleCell = newRow.insertCell(0);
//   const newAuthorCell = newRow.insertCell(1);
//   const newPubYearCell = newRow.insertCell(2);
//   const newDateReadCell = newRow.insertCell(3);
//   const newRatingCell = newRow.insertCell(4);

//   newTitleCell.innerHTML = data.books[book].title;
//   newAuthorCell.innerHTML = data.books[book].author;
//   newPubYearCell.innerHTML = data.books[book].year_published;
//   // newDateReadCell.innerHTML = data.books[book].date_read;
//   const formattedDateRead = new Date(data.books[book].date_read)
//     .toISOString()
//     .substring(0, 10);
//   newDateReadCell.innerHTML = formattedDateRead;
//   newRatingCell.innerHTML = data.books[book].rating;
// }
// addRowHandlers();
// });
// };

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
      // newNote.contentEditable = "true";
      newNote.insertAdjacentHTML("beforeend", data.noteContent);
    });
});
// });

// const handleDelete = (evt) => {
//   evt.preventDefault();

//   const book_title = document.getElementById("book-title").innerHTML;

//   const content = evt.target.innerHTML;

//   fetch(`/api/library/${book_title}/remove`, {
//     method: "DELETE",
//     credentials: "include",
//     body: JSON.stringify({
//       book_title: book_title,
//       content: content,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.success);
//       if (data.success) {
//         console.log(data.reponse);
//       }
//     });
// };
