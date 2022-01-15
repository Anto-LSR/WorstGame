let scores = JSON.parse(localStorage.getItem("scores"));
list = document.getElementById("score_ul");

//****TRI DES SCORES */
for (let j = 0; j < scores.length; j++) {
  for (let i = 0; i < scores.length; i++) {
    if (scores[i + 1] > scores[i]) {
      temp = scores[i];
      scores[i] = scores[i + 1];
      scores[i + 1] = temp;
    }
  }
  console.log(scores);
}
//****affichage des scores */
let z = 1;
for (let i = 0; i < scores.length; i++) {
  if (i == 5) {
    break;
  }
  let medal = "medal" + z;
  let li = document.createElement("li");
  let medalDiv = document.createElement("div");
  let emoji = document.createElement("p");
  li.innerHTML = scores[i];
  emoji.setAttribute("class", medal);
  list.appendChild(li);
  li.appendChild(medalDiv);
  medalDiv.appendChild(emoji);
  if (z == 1) {
    emoji.innerHTML = "🥇";
  }
  if (z == 2) {
    emoji.innerHTML = "🥈";
  }
  if (z == 3) {
    emoji.innerHTML = "🥉";
  }
  z++;
}
