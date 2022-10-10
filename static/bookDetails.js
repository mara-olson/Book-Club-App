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
        const noteId = data.notes[note].note_id;
        const noteCategory = data.notes[note].category;
        console.log(typeof noteCategory);
        const newNote = document.createElement("li");
        const newNoteText = document.createElement("a");
        newNoteText.setAttribute("id", "a-" + noteId);
        newNote.insertAdjacentElement("beforeend", newNoteText);

        // const deleteBtn = document.createElement("button");
        // deleteBtn
        const deleteIcon = document.createElement("button");

        deleteIcon.setAttribute("class", "bi bi-trash-fill");
        deleteIcon.classList.add("class", "hidden-note-input");
        deleteIcon.classList.add("btn");
        deleteIcon.classList.add("btn-danger");
        deleteIcon.classList.add("delete-note-btn");
        deleteIcon.setAttribute("data-toggle", "modal");
        deleteIcon.setAttribute("data-target", "#delete-note-modal");

        const confirmDeleteBtn = document.getElementById("delete-modal-btn");

        confirmDeleteBtn.addEventListener("click", (evt) => {
          evt.preventDefault();
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
        if (data.notes[note].content != 0 && noteCategory == "content") {
          contentNoteList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");

          newNote.setAttribute("id", noteId);
          newNoteText.insertAdjacentHTML("beforeend", data.notes[note].content);
          newNoteText.insertAdjacentElement("beforeend", deleteIcon);

          const editInput = document.createElement("textarea");
          editInput.setAttribute("value", newNoteText.innerHTML);
          editInput.setAttribute("id", "note-" + noteId + "-input");
          editInput.setAttribute("class", "hidden-note-input");

          const saveEditInput = document.createElement("button");
          saveEditInput.setAttribute(
            "onclick",
            `editNote(this.id, ${noteId}, ${noteCategory})`
          );
          saveEditInput.setAttribute("id", "note-" + noteId + "-input-btn");
          saveEditInput.classList.add("hidden-note-input");
          saveEditInput.classList.add("btn");
          saveEditInput.classList.add("btn-secondary");
          saveEditInput.innerHTML = "Save";

          newNoteText.addEventListener("click", function () {
            editInput.value = newNoteText.innerHTML;

            if (editInput.classList.contains("hidden-note-input")) {
              newNoteText.style.color = "silver";
              editInput.setAttribute("class", "show-note-input");
              saveEditInput.classList.add("show-note-input");
              deleteIcon.classList.add("show-note-input");
            } else {
              newNoteText.style.color = "black";
              editInput.setAttribute("class", "hidden-note-input");
              saveEditInput.classList.remove("show-note-input");
              deleteIcon.classList.remove("show-note-input");
            }
          });

          newNote.insertAdjacentElement(
            "beforeend",
            document.createElement("div")
          );
          newNote.insertAdjacentElement("beforeend", editInput);
          newNote.insertAdjacentElement(
            "beforeend",
            document.createElement("div")
          );
          newNote.insertAdjacentElement("beforeend", saveEditInput);
          newNote.insertAdjacentElement("beforeend", deleteIcon);
        } else if (noteCategory == "quote") {
          quoteList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");

          newNote.setAttribute("id", noteId);
          newNoteText.insertAdjacentHTML("beforeend", data.notes[note].content);
          newNoteText.insertAdjacentElement("beforeend", deleteIcon);

          const editInput = document.createElement("textarea");
          editInput.setAttribute("value", newNoteText.innerHTML);
          editInput.setAttribute("id", "note-" + noteId + "-input");
          editInput.setAttribute("class", "hidden-note-input");

          const saveEditInput = document.createElement("button");
          saveEditInput.setAttribute(
            "onclick",
            `editNote(this.id, ${noteId}, ${noteCategory})`
          );
          saveEditInput.setAttribute("id", "note-" + noteId + "-input-btn");
          saveEditInput.classList.add("hidden-note-input");
          saveEditInput.classList.add("btn");
          saveEditInput.classList.add("btn-secondary");
          saveEditInput.innerHTML = "Save";

          newNoteText.addEventListener("click", function () {
            editInput.value = newNoteText.innerHTML;

            if (editInput.classList.contains("hidden-note-input")) {
              newNoteText.style.color = "silver";
              editInput.setAttribute("class", "show-note-input");
              saveEditInput.classList.add("show-note-input");
              deleteIcon.classList.add("show-note-input");
            } else {
              newNoteText.style.color = "black";
              editInput.setAttribute("class", "hidden-note-input");
              saveEditInput.classList.remove("show-note-input");
              deleteIcon.classList.remove("show-note-input");
            }
          });

          newNote.insertAdjacentElement(
            "beforeend",
            document.createElement("div")
          );
          newNote.insertAdjacentElement("beforeend", editInput);
          newNote.insertAdjacentElement(
            "beforeend",
            document.createElement("div")
          );
          newNote.insertAdjacentElement("beforeend", saveEditInput);
          newNote.insertAdjacentElement("beforeend", deleteIcon);
        } else if (noteCategory == "vocab") {
          vocabList
            .insertAdjacentElement("beforeend", newNote)
            .classList.add("list-group-item");

          newNote.setAttribute("id", noteId);
          newNoteText.insertAdjacentHTML("beforeend", data.notes[note].content);
          newNoteText.insertAdjacentElement("beforeend", deleteIcon);

          const editInput = document.createElement("textarea");
          editInput.setAttribute("value", newNoteText.innerHTML);
          editInput.setAttribute("id", "note-" + noteId + "-input");
          editInput.setAttribute("class", "hidden-note-input");

          const saveEditInput = document.createElement("button");
          saveEditInput.setAttribute(
            "onclick",
            `editNote(this.id, ${noteId}, ${noteCategory})`
          );
          saveEditInput.setAttribute("id", "note-" + noteId + "-input-btn");
          saveEditInput.classList.add("hidden-note-input");
          saveEditInput.classList.add("btn");
          saveEditInput.classList.add("btn-secondary");
          saveEditInput.innerHTML = "Save";

          newNoteText.addEventListener("click", function () {
            editInput.value = newNoteText.innerHTML;

            if (editInput.classList.contains("hidden-note-input")) {
              newNoteText.style.color = "silver";
              editInput.setAttribute("class", "show-note-input");
              saveEditInput.classList.add("show-note-input");
              deleteIcon.classList.add("show-note-input");
            } else {
              newNoteText.style.color = "black";
              editInput.setAttribute("class", "hidden-note-input");
              saveEditInput.classList.remove("show-note-input");
              deleteIcon.classList.remove("show-note-input");
            }
          });

          newNote.insertAdjacentElement(
            "beforeend",
            document.createElement("div")
          );
          newNote.insertAdjacentElement("beforeend", editInput);
          newNote.insertAdjacentElement(
            "beforeend",
            document.createElement("div")
          );
          newNote.insertAdjacentElement("beforeend", saveEditInput);
          newNote.insertAdjacentElement("beforeend", deleteIcon);
        }
      }
    });
};

window.addEventListener("load", () => {
  getNoteList();
});

for (let form of document.getElementsByTagName("form")) {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    let noteCategory = "";
    let notes = "";
    let notesList = "";

    if (form.id == "notes-form") {
      noteCategory = "content";
      notes = document.getElementById("entered-content-notes").value;
      notesList = document.getElementById("content-notes-list");
    } else if (form.id == "quotes-form") {
      noteCategory = "quote";
      notes = document.getElementById("entered-quotes-notes").value;
      notesList = document.getElementById("quotes-notes-list");
    } else if (form.id == "vocab-form") {
      noteCategory = "vocab";
      notes = document.getElementById("entered-vocab-notes").value;
      notesList = document.getElementById("vocab-notes-list");
    }

    const book_title = document.getElementById("book-title").innerHTML;

    this.action = `/api/library/${book_title}/add-notes`;

    const formInputs = {
      book_title: book_title,
      notes: notes,
      category: noteCategory,
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
}

// document.getElementById("notes-form").addEventListener("submit", function (s) {
//   s.preventDefault();

//   const book_title = document.getElementById("book-title").innerHTML;

//   this.action = `/api/library/${book_title}/add-notes`;

//   const formInputs = {
//     book_title: book_title,
//     notes: document.getElementById("entered-content-notes").value,
//     category: "content",
//   };

//   const notesList = document.getElementById("content-notes-list");

//   fetch(`/api/library/${book_title}/add-notes`, {
//     method: "POST",
//     body: JSON.stringify(formInputs),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.noteContent);

//       const newNote = document.createElement("li");

//       notesList
//         .insertAdjacentElement("beforeend", newNote)
//         .classList.add("list-group-item");
//       newNote.setAttribute("id", data.noteId);
//       // newNote.contentEditable = "true";
//       newNote.insertAdjacentHTML("beforeend", data.noteContent);
//       window.location.reload();
//     });
// });

const editNote = (target_id, note_id, category) => {
  book_title = window.sessionStorage.getItem("title");

  console.log(category);

  const inputField = document.getElementById(target_id.slice(0, -4));

  const noteTextToEdit = document.getElementById("a-" + note_id);

  const deleteIcon = document.querySelectorAll(
    ".delete-note-btn.show-note-input"
  )[0];

  const newContent = inputField.value;

  const editedNoteContent = {
    book_title: book_title,
    note_id: note_id,
    note_content: newContent,
    category: category,
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
      noteTextToEdit.innerHTML = newContent;
      noteTextToEdit.style.color = "black";
      deleteIcon.classList.remove("show-note-input");

      inputField.setAttribute("class", "hidden-note-input");
      document.getElementById(target_id).classList.remove("show-note-input");

      console.log("edited");
    });
};
