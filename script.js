$(document).ready(function () {
  let playerName;
  let score = 0;
  let scores = [];
  let optionNumBoardSize = 1;
  let interval = 500;

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
    })
    .then((data) => {
      let as = JSON.parse(localStorage.getItem("allScores"));
      lastPlayer = as[as.length - 1].name;
      lastScore = as[as.length - 1].score;

      console.log(allScores);
      $("#playerName").text(lastPlayer);
      $("#scoree").text(lastScore);

      sortScores(allScores);

      for (
        let i = 0;
        i < (allScores.length > 10 ? 10 : allScores.length);
        i++
      ) {
        row = $("<tr></tr>");
        row.append($("<td></td>").text(allScores[i].name));
        row.append($("<td></td>").text(allScores[i].score));
        $("#results-table").append(row);
      }
      $(".loadingScreen").css("display", "none");
      setTimeout(function () {});
    });

  $("#start").click(function () {
    optionNumBoardSize = $("#table-size-select").val();
    optionGameLevel = $("#level-select").val();
    console.log(optionGameLevel);
    localStorage.setItem("level", optionGameLevel);
    localStorage.setItem("board-size", optionNumBoardSize);

    window.location.href = "game.html";
  });

  function sortScores(scores) {
    for (let i = 0; i < scores.length; i++) {
      for (let j = 0; j < scores.length; j++) {
        if (scores[j].score < scores[i].score) {
          tmp = scores[j];
          scores[j] = scores[i];
          scores[i] = tmp;
        }
      }
    }
  }
});
