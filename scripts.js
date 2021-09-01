const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const cloud1 = document.getElementById("cloud1")
const cloud2 = document.getElementById("cloud2")
const cloud3 = document.getElementById("cloud3")
const s1 = document.getElementById("strip1")
const s2 = document.getElementById("strip2")
const game = document.getElementsByClassName("game")[0]

var score = 0
var highscore = 0

var collisionInterval;
var stripInterval;
var scoreInterval;





function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump")

        setTimeout(() => {
            dino.classList.remove("jump")

        }, 300);
    }
}


function checkCollision() {
    // get current dino Y positon
    let DinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

    // get cactus X positon
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))



    //detect collision

    if (DinoTop > 140 && cactusLeft < 110 && cactusLeft > 50) {

        stopGame();
    }
}

function updateScore() {
    document.getElementById("scorebox").innerHTML = `Score = ${score}`;
    document.getElementById("highscorebox").innerHTML = `High Score = ${highscore}`
    score++;


    if (score % 100 == 0) {
        var snd1 = new Audio("./static/audio/reached100.mp3")
        snd1.play();
    }
}



function stopGame() {


    var snd2 = new Audio("./static/audio/deathsound.mp3")
    snd2.play();

    document.getElementById("textBox").innerHTML = `game over . . . . tap to play again`
    cactus.style.animationPlayState = 'paused';
    cloud1.style.animationPlayState = 'paused';
    cloud2.style.animationPlayState = 'paused';
    cloud3.style.animationPlayState = 'paused';
    strip1.style.animationPlayState = 'paused';
    strip1.style.animationPlayState = 'paused';
    clearInterval(collisionInterval)
    clearInterval(stripInterval)
    clearInterval(scoreInterval)

    if (score > highscore)
        highscore = score - 1
    score = 0



    document.addEventListener("click", startGame)
    document.addEventListener("keydown", startGame)
        // document.addEventListener("touchend",startGame,false)



}




function startGame() {

    document.getElementById("textBox").innerHTML = `playing . .  `

    document.removeEventListener("click", startGame)
    document.removeEventListener("keydown", startGame)
        // document.removeEventListener("touchend",startGame,false)


    // BELOW 3 LINES RESTART AN ANIMATION AFTER A GAME
    cactus.style.animation = "none";
    cactus.offsetWidth;
    cactus.style.animation = "blockMovement 1s   linear infinite";



    collisionInterval = setInterval(checkCollision, 10);
    scoreInterval = setInterval(updateScore, 100);








    setTimeout(() => {
        cloud1.classList.add("cloudanimation")
        cloud1.style.animationPlayState = 'running';
    }, 0)


    setTimeout(() => {
        cloud2.classList.add("cloudanimation")
        cloud2.style.animationPlayState = 'running';
    }, 2500)

    setTimeout(() => {
        cloud3.classList.add("cloudanimation")
        cloud3.style.animationPlayState = 'running';
    }, 6000)

    var stripstate = 0;



    stripInterval = setInterval(() => {


        if (stripstate == 0) {
            s1.style.backgroundImage = "url(./static/pics/strip1.png)"
            s2.style.backgroundImage = "url(./static/pics/strip2.png)"
            stripstate = 1
        } else {
            s1.style.backgroundImage = "url(./static/pics/strip2.png)"
            s2.style.backgroundImage = "url(./static/pics/strip1.png)"
            stripstate = 0;

        }


    }, 100);



}






document.addEventListener("click", startGame)
document.addEventListener("keydown", startGame)
    // document.addEventListener("touchend",startGame,false)


document.addEventListener("keydown", function(event) {
    var snd = new Audio("./static/audio/jumpsound.mp3")
    snd.play();
    jump();
})
document.addEventListener("click", function(event) {
    var snd = new Audio("./static/audio/jumpsound.mp3")
    snd.play();
    jump();
})