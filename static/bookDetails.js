const getNoteList = () => {
  const book_title = document.getElementById("book-title").innerHTML;

  const contentNoteList = document.getElementById("content-notes-list");

  const quoteList = document.getElementById("quotes-notes-list");

  const vocabList = document.getElementById("vocab-notes-list");

  fetch(`/api/library/${book_title}/all-notes`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.notes);
      for (note in data.notes) {
        const newNote = document.createElement("li");

        console.log(data.notes[note].content);
        if (data.notes[note].category == "content") {
          contentNoteList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");
          newNote.setAttribute("id", data.notes[note].note_id);
          newNote.insertAdjacentHTML("beforeend", data.notes[note].content);

          newNote.addEventListener("click", (evt) => {
            newNote.setAttribute("editable", "true");

            const editedNoteContent = {
              book_title: book_title,
              note_id: newNote.id,
              note_content: newNote.value,
              category: "content",
            };

            fetch(`/api/library/${book_title}/all-notes`, {
              method: "POST",
              body: JSON.stringify(editedNoteContent),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                getNoteList();
              });
          });
        } else if (data.notes[note].category == "quote") {
          quoteList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");
          newNote.setAttribute("id", data.notes[note].note_id);
          newNote.insertAdjacentHTML("beforeend", data.notes[note].content);

          newNote.addEventListener("click", (evt) => {
            newNote.setAttribute("editable", "true");

            const editedNoteContent = {
              book_title: book_title,
              note_id: newNote.id,
              note_content: newNote.value,
              category: "quote",
            };

            fetch(`/api/library/${book_title}/all-notes`, {
              method: "POST",
              body: JSON.stringify(editedNoteContent),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                getNoteList();
              });
          });
        } else if (data.notes[note].category == "vocab") {
          vocabList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");
          newNote.setAttribute("id", data.notes[note].note_id);
          newNote.insertAdjacentHTML("beforeend", data.notes[note].content);

          newNote.addEventListener("click", (evt) => {
            newNote.setAttribute("editable", "true");

            const editedNoteContent = {
              book_title: book_title,
              note_id: newNote.id,
              note_content: newNote.value,
              category: "quote",
            };

            fetch(`/api/library/${book_title}/all-notes`, {
              method: "POST",
              body: JSON.stringify(editedNoteContent),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                getNoteList();
              });
          });
        }
      }
    });
};

window.addEventListener("load", () => {
  getNoteList();
});

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
      newNote.setAttribute("id", data.noteId);
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
