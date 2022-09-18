const book_title = document.getElementById("book-title").innerHTML;
console.log(book_title);

const handleSubmit = () => {
  const book_title = document.getElementById("book-title").innerHTML;

  const url = `/api/library/${book_title}/add-notes`;

  //   const saveNotes = () => {
  //     const notes = document.getElementById("book-list");

  //     fetch("/api/library")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const newBook = document.createElement("li");

  document
    .getElementById("notes-form")
    .addEventListener("submit", function (s) {
      s.preventDefault();
      this.action = url;
    });
};
