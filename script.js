$(document).ready(function () {
  class Snake {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.len = 1;
      this.body = [];
      this.body.push(new Point(x, y));
    }
  }

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  let boardSize;
  let optionNumBoardSize = 1;
  let board = $("#game-board");
  const snake = new Snake(5, 5);

  let snackI;
  let snackJ;

  $("#start").click(function () {
    optionNumBoardSize = $("#table-size-select").val();
    localStorage.setItem("board-size", optionNumBoardSize);
    // startGame();
    window.location.href = "zmijica-igra.html";
    // alert("A");
    // startGame();
  });

  startGame();

  function gameOver() {
    alert("game over");
  }

  function checkForFoodCollision(x, y) {
    if (y == snackI && x == snackJ) {
      snake.len++;
      $(".circle").remove();
      generateSnack();
      return true;
    }
    return false;
  }

  function checkForSnakeCollision() {
    let s =
      "#game-board tr:nth-child(" +
      snake.y +
      ") td:nth-child(" +
      snake.x +
      ") .snake";

    if ($(s).length) {
      return true;
    }
    return false;
  }

  function moveSnake(newY, newX) {
    // directions.unshift(dir);

    last = snake.body[snake.body.length - 1];

    let str =
      "#game-board tr:nth-child(" +
      last.y +
      ") td:nth-child(" +
      last.x +
      ") .snake";
    $(str).remove();
    snake.body.pop();
    snake.y = newY;
    snake.x = newX;
    snake.body.unshift(new Point(newX, newY));
    if (checkForSnakeCollision()) gameOver();

    drawSnake();
    if (checkForFoodCollision(newX, newY)) {
      let p;
      p = new Point(last.x, last.y);

      snake.body.push(p);
      let str =
        "#game-board tr:nth-child(" + last.y + ") td:nth-child(" + last.x + ")";
      $(str).append($("<div></div>").attr("class", "snake"));
    }
  }

  function keyHandler(event) {
    if (event.keyCode == 38) {
      newSnakeY = snake.y - 1;
      if (newSnakeY == 0) gameOver();
      moveSnake(newSnakeY, snake.x);
    }
    //dole
    if (event.keyCode == 40) {
      newSnakeY = snake.y + 1;
      if (newSnakeY == boardSize + 1) gameOver();
      moveSnake(newSnakeY, snake.x);
    }
    //levo
    if (event.keyCode == 37) {
      newSnakeX = snake.x - 1;
      if (newSnakeX == 0) gameOver();
      moveSnake(snake.y, newSnakeX);
    }
    //desno
    if (event.keyCode == 39) {
      newSnakeX = snake.x + 1;
      if (newSnakeX == boardSize + 1) gameOver();
      moveSnake(snake.y, newSnakeX);
    }
  }

  // MAIN
  function startGame() {
    // alert("aa");
    optionNumBoardSize = localStorage.getItem("board-size");
    drawBoard(optionNumBoardSize);
    generateSnack();
    $(document).keydown((event) => {
      keyHandler(event);
    });
  }

  function drawSnake() {
    let str =
      "#game-board tr:nth-child(" + snake.y + ") td:nth-child(" + snake.x + ")";

    $(str).append($("<div></div>").attr("class", "snake"));
  }

  function drawBoard(optionNumBoardSize) {
    if (optionNumBoardSize == 1) {
      boardSize = 15;
    } else if (optionNumBoardSize == 2) {
      boardSize = 25;
    } else if (optionNumBoardSize == 3) {
      boardSize = 35;
    }

    let colors = ["rgb(66, 112, 153)", "rgb(56, 89, 119)"];
    let flag = 0;

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
    drawSnake();
  }

  function generateSnack() {
    let n = Math.floor(Math.random() * (boardSize * boardSize));
    snackI = Math.floor(n / boardSize) + 1;
    snackJ = Math.floor(n % boardSize) + 1;
    let s =
      "#game-board tr:nth-child(" +
      snackI +
      ") td:nth-child(" +
      snackJ +
      ") .snake";

    while ($(s).length) {
      n = Math.floor(Math.random() * (boardSize * boardSize));
    }

    snackI = Math.floor(n / boardSize) + 1;
    snackJ = Math.floor(n % boardSize) + 1;

    let str =
      "#game-board tr:nth-child(" + snackI + ") td:nth-child(" + snackJ + ")";

    $(str).append($("<div></div>").attr("class", "circle"));
  }
});
