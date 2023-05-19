$(document).ready(function () {
  let playerName;
  let score = 0;
  let scores = [];
  let optionNumBoardSize = 1;
  let interval = 500;

  $("#start").click(function () {
    optionNumBoardSize = $("#table-size-select").val();
    optionGameLevel = $("#level-select").val();
    console.log(optionGameLevel);
    localStorage.setItem("level", optionGameLevel);
    localStorage.setItem("board-size", optionNumBoardSize);

    let allScores = [];
    fetch("https://snake-game-cdrt.onrender.com/scores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        allScores = data.data;
        localStorage.setItem("allScores", JSON.stringify(allScores));
        console.log(allScores);
        // window.location.href = "zmijica-igra.html";
      });
  });
});
