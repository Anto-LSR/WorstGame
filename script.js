let app = document.getElementById("app");
let btn = document.getElementById("btn");
let score = document.getElementById("score");
let nbClick = 0;
let vitesse = 1000;
let timer = 60;
let taille = 10;
let bonus = 0;
spanTimer = document.getElementById("spanTimer");
btn.style.transitionDuration = vitesse;




//localStorage.clear()



btn.addEventListener("mouseover", () => {
  changePos();
});

btn.addEventListener("click", () => {
  if (verifSerie()) {
    nbClick++;
    score.innerHTML = nbClick + bonus;
    if (vitesse > 124) {
      vitesse -= 25;
    }
    if (taille > 4) {
      taille -= 1;
      btn.style.width = taille + "em";
      btn.style.height = taille + "em";
    }
  }
  random_bg_color();
  changePos();
  btn.style.transitionDuration = vitesse + "ms";
});

//************BONNE SERIE******************/
let fillBar = document.getElementById("fillBar");
let lastClick = 0;
let serie = false;
let nbClickSerie = 0;

function verifSerie() {
  let timeNow = new Date().getTime();

  //Sécurité anti double click
  if (timeNow > lastClick + 300) {
    //Verif si nouvelle série
    if (lastClick > 0 && timeNow - lastClick < 5000 && serie == false) {
      serie = true;
      let debutSerie = new Date().getTime();
      console.log("Nouvelle série!");
    }

    //Verif si série en cours
    if (serie) {
      debutSerie = new Date().getTime();
      bonus++;
      nbClickSerie++;
      console.log("Point bonus !");
      fillBar.classList.remove("fillBarAnim");
      void fillBar.offsetWidth;
      fillBar.classList.add("fillBarAnim");

      //Bonus de séries
      if (nbClickSerie > 5) {
        bonus += 1;
      }

      if (nbClickSerie == 5) {
        bonus += 5;
        console.log("maxiBonus!");
      }

      if (nbClickSerie == 10) {
        bonus += 10;
        console.log("ULTRABONUS!");
      }
    }

    lastClick = timeNow;
    return true;
  } else {
    return false;
  }
}

/******TIMER SERIE EN COURS***********/
var intervSerie = setInterval(verifTime, 300);
let serieBar = document.getElementById("serieBar");
let serieTexte = document.getElementById("serieText");
let multip = document.getElementById("multiplicateur");

function verifTime() {
  let compareDate = new Date().getTime();

  if (serie) {
    btn.innerHTML = "😨";
    serieTexte.style.display = "block";
    multip.innerHTML = "2";
    if (debutSerie + 3000 < compareDate) {
      console.log("Fin de série");
      serie = false;
      btn.innerHTML = "Click me!";
      btn.style.background = "white";
      serieBar.style.background =
        "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)";
      serieTexte.style.display = "none";
      serieTexte.classList.remove("shuffle");
      nbClickSerie = 0;
    }
  }

  if (nbClickSerie >= 3) {
    btn.innerHTML = "😤";
    serieBar.style.background =
      "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)";
  }

  if (nbClickSerie >= 5) {
    btn.innerHTML = "🔥";
    btn.style.background = "red";
    serieBar.style.background =
      "linear-gradient(90deg, #FF9A8B 0%, #f2103c 55%, #fd284c 100%)";
    multip.innerHTML = "3";
    serieTexte.classList.add("shuffle");
  }
}

//****************POSITION ALEATOIRE*************** */
let max = 100;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomInt2(max) {
  return Math.floor(Math.random() * max);
}

function changePos() {
  let n = getRandomInt(max) + "%";
  let m = getRandomInt(max) + "%";
  btn.style.top = n;
  btn.style.left = m;
  btn.style.transform = "translate(-" + m + ", -" + n + ")";
}

//*****************GENERER BACKGROUND COLOR********* */

function random_bg_color() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  app.style.background = bgColor;
}

//********TIMER******** */

spanTimer.innerHTML = timer + "s";

let gameTimer = setInterval(function () {
  timer -= 1;
  spanTimer.innerHTML = timer + "s";
  changePos();
  if (timer === 0) {
    clearInterval(gameTimer);
    clearInterval(bonusPicker);
    btn.style.display = "none";
    endScreen.style.display = "flex";
    setScoreFin();
  }
}, 1000);

//********BONUSES*********/

let nbClickBonus = 0;
let bonusPicker = setInterval(function () {
  pick = randomBonus();
  if (pick === 0) {
    triggerTimeBonus();
  } else if (pick === 1) {
    triggerPointBonus();
  } else if (pick === 2) {
    triggerSpeedBonus();
  } else if (pick === 3) {
    triggerRandomBonus();
  }
}, 5000);

function randomBonus() {
  numBonus = Math.floor(Math.random() * 4);
  console.log(numBonus);
  return numBonus;
}

//*TIME BONUS*/
let timeBonus = document.getElementById("timeBonus");
function triggerTimeBonus() {
  timeBonus.classList.add("timeBonusAnim");
  let timeBonusTO = setTimeout(removeTimeBonus, 3000);
}
function removeTimeBonus() {
  timeBonus.classList.remove("timeBonusAnim");
  timeBonus.innerHTML = "⏱";
  nbClickBonus = 0;
  timeMessage.style.display = "none";
  timeMessage.classList.remove("setOpacity");
}
timeBonus.addEventListener("click", () => {
  nbClickBonus++;
  if (nbClickBonus === 1) {
    timer += 10;
    timeBonus.innerHTML = "✔";
    timeMessage.style.display = "block";
    timeMessage.classList.add("setOpacity");
  }
});

//*POINT BONUS*/
let pointBonus = document.getElementById("pointBonus");
function triggerPointBonus() {
  pointBonus.classList.add("pointBonusAnim");
  let pointBonusTO = setTimeout(removePointBonus, 3000);
}

function removePointBonus() {
  pointBonus.classList.remove("pointBonusAnim");
  pointBonus.innerHTML = "➕";
  nbClickBonus = 0;
  pointMessage.style.display = "none";
  pointMessage.classList.remove("setOpacity");
}

pointBonus.addEventListener("click", () => {
  nbClickBonus++;
  if (nbClickBonus === 1) {
    bonus += 10;
    score.innerHTML = nbClick + bonus;
    pointBonus.innerHTML = "✔";
    pointMessage.style.display = "block";
    pointMessage.classList.add("setOpacity");
  }
});

//*SPEED BONUS*//
let speedBonus = document.getElementById("speedBonus");
let oldVitesse;

function triggerSpeedBonus() {
  speedBonus.classList.add("speedBonusAnim");
  let speedBonusTO = setTimeout(removeSpeedBonus, 3000);
}

function removeSpeedBonus() {
  speedBonus.classList.remove("speedBonusAnim");
  speedBonus.innerHTML = "🐌";
  nbClickBonus = 0;
}

speedBonus.addEventListener("click", () => {
  nbClickBonus++;
  if (nbClickBonus === 1) {
    speedBonus.innerHTML = "✔";
    oldVitesse = vitesse;
    vitesse = 2000;
    btn.style.transitionDuration = vitesse + "ms";
    let resetSpeedTO = setTimeout(removeVitesse, 5000);
    speedMessage.style.display = "block";
  }
});

function removeVitesse() {
  vitesse = oldVitesse;
  btn.style.transitionDuration = vitesse + "ms";
  speedMessage.style.display = "none";
}

//*RANDOM BONUS/MALUS *//
let rndBonus = document.getElementById("randomBonus");

function triggerRandomBonus() {
  rndBonus.classList.add("rndBonusAnim");
  let rndBonusTO = setTimeout(removeRandomBonus, 3000);
}

let verifMsg = false;
function removeRandomBonus() {
  rndBonus.classList.remove("rndBonusAnim");
  rndBonus.innerHTML = "❔";
  nbClickBonus = 0;
  if (verifMsg) {
    rndMessage.style.display = "none";
    verifMsg = false;
  }
}

rndBonus.addEventListener("click", () => {
  nbClickBonus++;

  if (nbClickBonus === 1) {
    rndBonus.innerHTML = "✔";
    let dice = Math.floor(Math.random() * 100);
    console.log(dice);
    if (dice > 50) {
      triggerBonusGame();
    } else {
      rndBonus.innerHTML = "💩";
      bonus -= 15;
      score.innerHTML = nbClick + bonus;
      rndMessage.innerHTML = "Oups...💩 <br>  ➖15";
      rndMessage.style.display = "block";
      verifMsg = true;
    }
  }
});
let bonusBtn = document.getElementById("bonusBtn");

function triggerBonusGame() {
  btn.style.display = "none";
  bonusBtn.style.display = "block";
  rndMessage.innerHTML = "Clique les tous! 🍒";
  rndMessage.style.display = "block";
  let bonusTO = setTimeout(removeBonus, 5000);
}

function removeBonus() {
  btn.style.display = "block";
  rndMessage.style.display = "none";
  bonusBtn.style.display = "none";
}

bonusBtn.addEventListener("click", () => {
  randomEmoji();
  changePosBonus();
  bonus += 5;
  score.innerHTML = nbClick + bonus;
});

function changePosBonus() {
  let n = getRandomInt(max) + "%";
  let m = getRandomInt(max) + "%";
  bonusBtn.style.top = n;
  bonusBtn.style.left = m;
  bonusBtn.style.transform = "translate(-" + m + ", -" + n + ")";
}

function randomEmoji() {
  let dice = Math.floor(Math.random() * 10);
  console.log(dice);
  if (dice === 0) {
    bonusBtn.innerHTML = "🍗";
  } else if (dice === 1) {
    bonusBtn.innerHTML = "💩";
  } else if (dice === 2) {
    bonusBtn.innerHTML = "♠";
  } else if (dice === 3) {
    bonusBtn.innerHTML = "🏳‍🌈";
  } else if (dice === 4) {
    bonusBtn.innerHTML = "🥔";
  } else if (dice === 5) {
    bonusBtn.innerHTML = "🥝";
  } else if (dice === 6) {
    bonusBtn.innerHTML = "🍉";
  } else if (dice === 7) {
    bonusBtn.innerHTML = "🍎";
  } else if (dice === 8) {
    bonusBtn.innerHTML = "🍑";
  } else if (dice === 9) {
    bonusBtn.innerHTML = "🥕";
  }
}

let speedMessage = document.getElementById("speedMessage");
let pointMessage = document.getElementById("pointMessage");
let rndMessage = document.getElementById("rndMessage");
let timeMessage = document.getElementById("timeMessage");

//***********MODAL DE FIN************ */
let endScreen = document.getElementById("modalContainer");
let scoreFin = document.getElementById("scoreFin");
let againBtn = document.getElementById("againBtn");

function setScoreFin() {
  scoreFin.innerHTML = nbClick + bonus;
  let finalScore = nbClick + bonus;
  clearInterval(intervSerie);
  addScore(finalScore);
  checkBestScore(finalScore);
}
//**********PUSH des scores en localStorage************* */
let previousRecord;
let spanOldRecord = document.getElementById('previousRecord')
let recordDiv = document.getElementById('record')
function addScore(param) {
 
  if (localStorage.getItem("scores") == null) {
    localStorage.setItem("scores", "[]");
  }
  let oldScores = JSON.parse(localStorage.getItem("scores"));
  previousRecord = ((Math.max(...oldScores)))
  if(previousRecord == -Infinity){
    previousRecord = 0;
  }
  oldScores.push(param);
  localStorage.setItem("scores", JSON.stringify(oldScores));
}

function checkBestScore(param){
  scores = JSON.parse(localStorage.getItem("scores"));
  if((Math.max(...scores)) == param){
    spanOldRecord.innerHTML=previousRecord
    recordDiv.style.display="block"
    console.log('nouveau record!!!')
  }
}
//****************RELOAD */
againBtn.addEventListener("click", () => {
  location.reload();
});
