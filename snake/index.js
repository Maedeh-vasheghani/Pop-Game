// Get the canvas element and Making the canvas (zone de jeu)
const canvas = document.getElementById("zone");

// Return a two dimensional drawing context
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let vitesse = 7;

let tileCount = 20;

// pour le rendre un peu plus petit on fait -2
const snakeParts = [];

let tileSize = canvas.width / tileCount;
let headX = 15;
let headY = 15;
let tailLength = 2;

let xVitesse = 0;
let yVitesse = 0;

let appleX = 5;
let appleY = 5;

//Declare points
let point = 0;

//Declare level
let level = 0;

// Make sound
const eatSound = new Audio("eat.mp3");
const deadAudio = new Audio("dead.mp3");

// Main function to keep the game running
function lanceJeu() {
  changeSnakeDirection();

  let desicion = gameIsOver();
  if (desicion) {
    return;
  }

  clearScreen();

  appleCheck();
  paintApple();
  paintSnake();
  declarePoint();
  declareLevel();

  if (point <= 10) {
    vitesse = 7;
  } else if (point > 10 && point < 15) {
    vitesse = 9;
  } else {
    vitesse = 12;
  }

  setTimeout(lanceJeu, 1000 / vitesse);
}

function gameIsOver() {
  let gameStop = false;
  if (yVitesse === 0 && xVitesse === 0) {
    return false;
  }

  // Canvas's cadre

  //Right Side
  if (headX < 0) {
    gameStop = true;
  }
  // Left Side
  else if (headX === tileCount + 10) {
    console.log("tileCount", tileCount, "headX", headX);
    gameStop = true;
  }
  // Up Side
  else if (headY < 0) {
    gameStop = true;
  }
  // Down Side
  else if (headY === tileCount + 10) {
    console.log("tileCount", tileCount, "headY", headY);
    gameStop = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameStop = true;
      break;
    }
  }

  if (gameStop) {
    ctx.fillStyle = "black";
    ctx.font = "50px bodoni_72bold" ;
    deadAudio.play();

    ctx.fillText("Your Game Is Over !", canvas.width / 5.5, canvas.height / 2);
  }
  return gameStop;
}
// Show the score
function declarePoint() {
  ctx.fillStyle = "black";
  ctx.font = "20px bodoni_72bold";

  ctx.fillText("Your Score is: " + point, 10, 25);
}

function declareLevel() {
  level = Math.floor(point / 10) ;
  console.log("level", level);
  ctx.fillStyle = "black";
  ctx.font = "20px bodoni_72bold";

  ctx.fillText(`Your Level is: ${level}`, canvas.width - 145, 20);
} 

//  Select the color to fill the drawing
function clearScreen() {
  ctx.fillStyle = "#C2CAE8 ";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Draw the snake on the canvas
function paintSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
}

// Draw the apple on the canvas
function paintApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// Random places inside the canvas
function appleCheck() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    // for increasing our score :
    point++;
    // Play sound when snake eats something :
    eatSound.play();

    declareLevel();
  }
}

function changeSnakeDirection() {
  headX = headX + xVitesse;
  headY = headY + yVitesse;
}
/* 
 flèche haut: code 38 = up
 flèche gauche: code 37 = left
 flèche bas: code 40 = down
 flèche droite: code 39 = right */

function clavier(movement) {
  //For going Up
  if (movement.keyCode == 38) {
    if (yVitesse == 1) return;
    yVitesse = -1;
    xVitesse = 0;
  }

  //For going Down
  if (movement.keyCode == 40) {
    if (yVitesse == -1) return;
    yVitesse = 1;
    xVitesse = 0;
  }

  //For going Left
  if (movement.keyCode == 37) {
    if (xVitesse == 1) return;
    yVitesse = 0;
    xVitesse = -1;
  }

  //For going Right 
  if (movement.keyCode == 39) {
    if (xVitesse == -1) return;
    yVitesse = 0;
    xVitesse = 1;
  }

  // If you want to pause 
  if (movement.keyCode == 32) {
    yVitesse = 0;
    xVitesse = 0;
  }
}

document.body.addEventListener("keydown", clavier);
lanceJeu();
