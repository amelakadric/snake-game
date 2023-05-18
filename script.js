$(document).ready(function () {
  let playerName;
  let score = 0;
  let scores = [];
  let optionNumBoardSize = 1;
  let interval = 500;

  $("#start").click(function () {
    optionNumBoardSize = $("#table-size-select").val();
    localStorage.setItem("board-size", optionNumBoardSize);
    window.location.href = "zmijica-igra.html";
  });
});
