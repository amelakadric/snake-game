$(document).ready(function () {
  class Snake {
    constructor(x, y) {
      this.x = x;
      this.y = y;
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
  let intervalID;
  let playerName;
  let score = 0;
  let scores = [];
  let optionNumBoardSize = 1;
  let board = $("#game-board");
  let lastDirection = 40;
  const snake = new Snake(5, 5);
  let interval = 500;
  let snackI;
  let snackJ;
  let specialI;
  let specialJ;
  let gameOverFlag;
  startGame();
  // showResults();

  function gameOver() {
    alert("game over");
    localStorage.setItem("score", score);

    playerName = prompt("Enter player name:");
    localStorage.setItem("playerName", playerName);

    let scores1 = JSON.parse(localStorage.getItem("scores"));
    if (scores1 == null) scores1 = [];
    scores1.push({ name: playerName, score: score });
    localStorage.setItem("scores", JSON.stringify(scores1));

    clearInterval(intervalID);
    gameOverFlag = true;

    window.location.href = "zmijica-rezultati.html";
  }

  function checkForFoodCollision(x, y) {
    if (y == snackI && x == snackJ) {
      score++;
      $(".circle").remove();
      generateSnack();
      $("#score").text(score);
      return true;
    }
    return false;
  }

  function checkForSpecialFoodCollision(x, y) {
    if (y == specialI && x == specialJ) {
      score += 10;
      //   specialRemoved = true;
      removeSpecialSnack();

      $("#score").text(score);
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
    if (checkForSpecialFoodCollision(newX, newY)) {
      let p;
      p = new Point(last.x, last.y);
      snake.body.push(p);
      let str =
        "#game-board tr:nth-child(" + last.y + ") td:nth-child(" + last.x + ")";
      $(str).append($("<div></div>").attr("class", "snake"));
    }
  }

  function keyHandler(event) {
    // if (gameOverFlag) return;
    if (event.keyCode == 38) {
      lastDirection = 38;
      newSnakeY = snake.y - 1;
      if (newSnakeY == 0) {
        gameOver();

        return true;
      }
      moveSnake(newSnakeY, snake.x);
    }
    //dole
    if (event.keyCode == 40) {
      lastDirection = 40;
      newSnakeY = snake.y + 1;
      if (newSnakeY == boardSize + 1) {
        gameOver();

        return true;
      }
      moveSnake(newSnakeY, snake.x);
    }
    //levo
    if (event.keyCode == 37) {
      lastDirection = 37;
      newSnakeX = snake.x - 1;
      if (newSnakeX == 0) {
        gameOver();

        return true;
      }
      moveSnake(snake.y, newSnakeX);
    }
    //desno
    if (event.keyCode == 39) {
      lastDirection = 39;
      newSnakeX = snake.x + 1;
      if (newSnakeX == boardSize + 1) {
        gameOver();

        return true;
      }
      moveSnake(snake.y, newSnakeX);
    }
  }

  function startGame() {
    let gf = false;
    optionNumBoardSize = localStorage.getItem("board-size");
    playerName = localStorage.getItem("playerName");

    drawBoard(optionNumBoardSize, playerName);
    generateSnack();
    setInterval(function () {
      generateSpecialSnack();
      setTimeout(() => {
        // if (!specialRemoved)
        removeSpecialSnack();
      }, 5000);
    }, 10000);
    $(document).keydown((event) => {
      keyHandler(event);
      gf = true;
    });
    intervalID = setInterval(function () {
      let e = new KeyboardEvent("keydown", { keyCode: lastDirection });
      keyHandler(e);
    }, interval);

    gameOverFlag = localStorage.getItem("gameOver");
    return;
  }

  function drawSnake() {
    let str =
      "#game-board tr:nth-child(" + snake.y + ") td:nth-child(" + snake.x + ")";

    $(str).append($("<div></div>").attr("class", "snake"));
  }

  function drawBoard(optionNumBoardSize, playerName) {
    $("#playerName").text(playerName);
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

  function generateSpecialSnack() {
    let n = Math.floor(Math.random() * (boardSize * boardSize));
    i = Math.floor(n / boardSize) + 1;
    j = Math.floor(n % boardSize) + 1;
    let s =
      "#game-board tr:nth-child(" + i + ") td:nth-child(" + j + ") .snake";

    while ($(s).length || (i == snackI && j == snackJ)) {
      n = Math.floor(Math.random() * (boardSize * boardSize));
      s = "#game-board tr:nth-child(" + i + ") td:nth-child(" + j + ") .snake";
    }

    specialI = Math.floor(n / boardSize) + 1;
    specialJ = Math.floor(n % boardSize) + 1;

    // specialRemoved = false;
    let str =
      "#game-board tr:nth-child(" +
      specialI +
      ") td:nth-child(" +
      specialJ +
      ")";

    $(str).append($("<div></div>").attr("class", "star"));
  }

  function removeSpecialSnack() {
    $(".star").remove();
    specialI = 0;
    specialJ = 0;
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
