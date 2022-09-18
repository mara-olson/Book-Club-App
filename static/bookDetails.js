// function addRowHandlers() {
//   const table = document.getElementById("book-table");
//   const rows = table.getElementsByTagName("tr");
//   for (i = 0; i < rows.length; i++) {
//     const currentRow = table.rows[i];
//     const createClickHandler = function (row) {
//       return function () {
//         const cell = row.getElementsByTagName("td")[0];
//         const id = cell.innerHTML;
//         alert("id:" + id);
//       };
//     };
//     currentRow.onclick = createClickHandler(currentRow);
//   }
// }

// window.onload = addRowHandlers();
