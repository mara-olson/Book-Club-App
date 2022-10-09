const getNoteList = () => {
  const book_title = document.getElementById("book-title").innerHTML;

  const contentNoteList = document.getElementById("content-notes-list");

  const quoteList = document.getElementById("quotes-notes-list");

  const vocabList = document.getElementById("vocab-notes-list");

  fetch(`/api/library/${book_title}/all-notes`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.notes);
      for (note in data.notes) {
        const newNote = document.createElement("li");
        const noteId = data.notes[note].note_id;
        // const editNoteBtn = document.createElement("i");
        // editNoteBtn.setAttribute("class", "bi bi-pencil-square");

        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "bi bi-trash-fill");
        deleteIcon.addEventListener("click", () => {
          fetch(`/api/library/${book_title}/all-notes`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
              note_id: noteId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                window.location.reload();
              }
            });
        });
        // console.log(data.notes[note].content);
        if (
          data.notes[note].content != 0 &&
          data.notes[note].category == "content"
        ) {
          contentNoteList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");

          newNote.setAttribute("id", noteId);
          newNote.insertAdjacentHTML("beforeend", data.notes[note].content);
          // newNote.appendChild(editNoteBtn);
          newNote.appendChild(deleteIcon);

          const editInput = document.createElement("input");
          editInput.setAttribute("type", "text");
          editInput.setAttribute("id", "note-" + noteId + "-input");
          editInput.setAttribute("class", "hidden-note-input");

          const saveEditInput = document.createElement("button");
          saveEditInput.setAttribute("onclick", `editNote(this.id, ${noteId})`);
          saveEditInput.setAttribute("id", "note-" + noteId + "-input-btn");
          saveEditInput.setAttribute("class", "hidden-note-input");
          saveEditInput.innerHTML = "Save";

          newNote.addEventListener("click", function () {
            editInput.setAttribute("class", "show-note-input");
            saveEditInput.setAttribute("class", "show-note-input");
          });

          newNote.insertAdjacentElement("beforeend", editInput);
          newNote.insertAdjacentElement("beforeend", saveEditInput);

          newNote.addEventListener("submit", (evt) => {
            evt.preventDefault();

            newNote.setAttribute("contenteditable", "true");

            const editedNoteContent = {
              book_title: book_title,
              note_id: newNote.id,
              note_content: newNote.innerHTML,
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
                window.location.reload();
              });
          });
        } else if (data.notes[note].category == "quote") {
          quoteList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");
          newNote.setAttribute("id", data.notes[note].note_id);
          newNote.insertAdjacentHTML("beforeend", data.notes[note].content);

          newNote.addEventListener("click", (evt) => {
            newNote.setAttribute("contenteditable", "true");

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
                window.location.reload();
              });
          });
        } else if (data.notes[note].category == "vocab") {
          vocabList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");
          newNote.setAttribute("id", data.notes[note].note_id);
          newNote.insertAdjacentHTML("beforeend", data.notes[note].content);

          newNote.addEventListener("click", (evt) => {
            newNote.setAttribute("contenteditable", "true");

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
                window.location.reload();
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
    category: "content",
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
      window.location.reload();
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
const editNote = (target_id, note_id) => {
  // evt.preventDefault();

  book_title = window.sessionStorage.getItem("title");
  console.log(window.sessionStorage.getItem("title"));

  const newContent = document.getElementById(target_id.slice(0, 13)).value;

  const editedNoteContent = {
    book_title: book_title,
    note_id: note_id,
    note_content: newContent,
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
      console.log("edited");
      window.location.reload();
    });
};
