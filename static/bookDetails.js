const noteContent = document.getElementById("content-notes-header");

const setNoteContent = () => {
  const book_title = document.getElementById("book-title").innerHTML;

  const tinyEditor = document.getElementById("edit-content-notes-tiny");

  const tinyEditorContent = tinyEditor.value;
  console.log(tinyEditorContent);

  const quoteContent = document.getElementById("quotes-notes-list");

  const vocabContent = document.getElementById("vocab-notes-list");

  const getTinyContent = () => {
    if (!tinyEditor.getContent()) {
      tinyEditor.setContent("Click to add notes");
    } else {
      tinyEditor.getContent();
    }
  };

  fetch(`/api/library/${book_title}/all-notes`)
    .then((response) => response.json())
    .then((data) => {
      console.log("DONE");
      // if ((data.notes = null)) {
      //   console.log(data.notes);
      // } else {
      // console.log(tinyContent);
      if (tinyEditor.value == null) {
        tinyEditor.value = "Click to add notes";
      } else {
        tinyEditor.value = data.notes[0].content;
      }
      console.log(data.notes[0].content);

      // }
      // tinyEditor.setContent(tinyContent);
    });
};

noteContent.addEventListener("click", setNoteContent, false);
