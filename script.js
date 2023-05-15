$(document).ready(function () {
  let boardSize;
  let optionNumBoardSize = 1;
  let board = $("#game-board");

  let snackI;
  let snackJ;

  $("#start").click(function () {
    optionNumBoardSize = $("#table-size-select").val();
    // startGame();
    window.location.href = "zmijica-igra.html";
    // startGame();
  });

  startGame();

  function startGame() {
    drawBoard(optionNumBoardSize);
    generateSnack();
  }

  function drawBoard(optionNumBoardSize) {
    if (optionNumBoardSize == 1) {
      boardSize = 25;
    } else if (optionNumBoardSize == 2) {
      boardSize = 25;
    } else if (optionNumBoardSize == 3) {
      boardSize = 35;
    }

    let colors = ["rgb(66, 112, 153)", "rgb(56, 89, 119)"];
    let flag = 0;
    // $("#game-board").append($("<tr></tr>").append($("<td></td>")));
    // console.log(boardSize);

    for (let i = 1; i <= boardSize; i++) {
      if (i % 2 == 0) flag = 0;
      else flag = 1;
      let row = $("<tr></tr>");
      for (let j = 1; j <= boardSize; j++) {
        if (flag == 0) flag = 1;
        else flag = 0;
        let field = row.append(
          $("<td></td>").css("background-color", colors[0 + (flag % 2)])
        );
      }
      $("#game-board").append(row);
    }
  }

  function generateSnack() {
    let n = Math.floor(Math.random() * (boardSize * boardSize));

    snackI = Math.floor(n / boardSize) + 1;
    snackJ = Math.floor(n % boardSize) + 1;

    let str =
      "#game-board tr:nth-child(" + snackI + ") td:nth-child(" + snackJ + ")";

    $(str).append(
      $("<div></div>").attr("class", "circle").css("background-color", "red")
    );
  }
});
