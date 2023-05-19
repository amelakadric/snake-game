$(document).ready(function () {
  showResults();

  let url = "https://snake-game-cdrt.onrender.com/scores";
  function showResults() {
    let scoress = localStorage.getItem("scores");

    if (scoress != null) {
      scores = JSON.parse(scoress);
      lastPlayer = scores[scores.length - 1].name;
      lastScore = scores[scores.length - 1].score;

      let allScores = JSON.parse(localStorage.getItem("allScores"));
      console.log(allScores);
      $("#playerName").text(lastPlayer);
      $("#scoree").text(lastScore);

      sortScores(allScores);

      for (let i = 0; i < allScores.length; i++) {
        row = $("<tr></tr>");
        row.append($("<td></td>").text(allScores[i].name));
        row.append($("<td></td>").text(allScores[i].score));
        $("#results-table").append(row);
      }
    }
  }

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
