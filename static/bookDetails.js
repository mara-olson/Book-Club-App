const noteContent = document.getElementById("content-notes-header");

const setNoteContent = () => {
  const book_title = document.getElementById("book-title").innerHTML;

  const tinyEditor = document.getElementById("edit-content-notes-tiny");

  const tinyEditorContent = tinyEditor.value;
  // console.log(tinyEditor);

  const quoteContent = document.getElementById("quotes-notes-list");

  const vocabContent = document.getElementById("vocab-notes-list");

  fetch(`/api/library/${book_title}/all-notes`)
    .then((response) => response.json())
    .then((data) => {
      if (data.notes[0].category === "content") {
        tinyEditor.value = data.notes[0].content;
      } else {
        tinyEditor.value = "Click to add notes";
      }
      console.log(data.notes[0].category);
    });
};

noteContent.addEventListener("click", setNoteContent);
