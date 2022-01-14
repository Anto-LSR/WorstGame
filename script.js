let app = document.getElementById('app')
let btn = document.getElementById("btn");
let score = document.getElementById("score")
let nbClick = 0;
let vitesse = 1000
let timer = 60
spanTimer = document.getElementById('spanTimer')
btn.style.transitionDuration = vitesse

btn.addEventListener("mouseover", () => {
  changePos()
});

btn.addEventListener("click", () => {
    nbClick++;
    score.innerHTML= nbClick;
    if(vitesse >101){
        vitesse -= 100;
    }
    random_bg_color()
    
    btn.style.transitionDuration = vitesse+'ms'
    console.log(vitesse)
  });

let max = 100;
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomInt2(max){
    return Math.floor(Math.random() * max);
}

function changePos(){
let n = getRandomInt(max);
let m = getRandomInt(max);
btn.style.top = n+'%'
btn.style.left = m+'%'

}


//*****************GENERER BACKGROUND COLOR********* */

function random_bg_color(){
    let x = Math.floor(Math.random() * 256)
    let y = Math.floor(Math.random() * 256)
    let z = Math.floor(Math.random() * 256)
    var bgColor = "rgb(" + x + "," + y +"," + z +")";
    app.style.background = bgColor;
}

//********TIMER******** */

spanTimer.innerHTML = timer+ 's';


let interval = setInterval(function () {
    timer -= 1;
    spanTimer.innerHTML= timer +'s'
    changePos()
    if (timer === 0){
       clearInterval(interval)
       btn.style.display="none"
       endScreen.style.display="flex"
       setScoreFin()
    }
}, 1000)

//***********MODAL DE FIN************ */
let endScreen = document.getElementById('modalContainer')
let scoreFin = document.getElementById('scoreFin')
let againBtn = document.getElementById('againBtn')

function setScoreFin(){
    scoreFin.innerHTML = nbClick
}

againBtn.addEventListener('click', ()=>{
    location.reload();
})
