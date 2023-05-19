$(document).ready(function () {
  showResults();

  function showResults() {
    let scoress = localStorage.getItem("scores");
    if (scoress != null) {
      scores = JSON.parse(scoress);
      lastPlayer = scores[scores.length - 1].name;
      lastScore = scores[scores.length - 1].score;
      $("#playerName").text(lastPlayer);
      $("#scoree").text(lastScore);

      sortScores(scores);
      let i = 0;

      for (let i = 0; i < 5; i++) {
        row = $("<tr></tr>");
        row.append($("<td></td>").text(scores[i].name));
        row.append($("<td></td>").text(scores[i].score));
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