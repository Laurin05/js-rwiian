import './style.css'; // Lösche diese Zeile nach dem Download!

//////////////////////
// Global variables //
//////////////////////

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let ballPositionX = 250
let ballPositionY = 200

let leftRectangleY = 150
let rightRectangleY = 150

let leftPoints = 0
let rightPoints = 0

let speedX = 1
let speedY = 0.25


////////////////////
// Draw Functions //
////////////////////

function drawCanvas() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,500,400);
  
}



function drawBall() {
  ctx.fillStyle = "green"
  ctx.strokeStyle = "green"
  ctx.arc(ballPositionX,ballPositionY,10,0,2*Math.PI)
  ctx.fill()
}

function drawLeftRectangle() {

  ctx.fillStyle = "red";
  ctx.fillRect(20,leftRectangleY,10,100);
}

function drawRightRectangle() {
  ctx.fillStyle = "blue";
  ctx.fillRect(470,rightRectangleY,10,100);
}

function drawPoints() {
  ctx.font = '15px sans-serif';
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(leftPoints +':'+rightPoints, 250, 205);
}


function drawEverything() {
  drawCanvas();
  drawBall();
  drawLeftRectangle();
  drawRightRectangle();
  drawPoints();
}

///////////////////////////
// Calculation Functions //
///////////////////////////
//w=87
//s=83
//up=38
//down=40

function keyDown(event) {
  if(event.keyCode === 87){
    leftRectangleY = leftRectangleY - 30;
    drawEverything();
    
  }else if (event.keyCode === 83){
    leftRectangleY = leftRectangleY + 30;
    drawEverything();

  }else if (event.keyCode === 38){
    rightRectangleY = rightRectangleY - 30
    drawEverything();
  }else if (event.keyCode === 40){
    rightRectangleY = rightRectangleY + 30
    drawEverything();
  }

}

function resetMovingElements() {
  ballPositionX = 250
  ballPositionY = 200
  leftRectangleY = 150
  rightRectangleY = 150
}

function checkBallPosition() {
  if (ballPositionY >= 391 || ballPositionY <= 9) {
    speedY = -speedY
  }
  if (ballPositionY >= rightRectangleY && ballPositionY <= rightRectangleY + 100 && ballPositionX >= 465){
    speedX = -speedX
  }

  if (ballPositionY >= leftRectangleY && ballPositionY <= leftRectangleY + 100 && ballPositionX <= 35){
    speedX = -speedX
    speedY = speedY + Math.floor(Math.random() * 11)
  }
  if (ballPositionX >= 500){
    leftPoints = leftPoints + 1
    resetMovingElements();
  }
  if (ballPositionX <= 0){
    rightPoints = rightPoints + 1
    resetMovingElements();
  }

}

function playBall() {
  ballPositionX = ballPositionX + speedX
  ballPositionY = ballPositionY + speedY
  checkBallPosition();
  drawEverything();
  window.requestAnimationFrame(playBall);

}

function main() {
  window.addEventListener('keydown', keyDown, false);
  document.getElementById('button').addEventListener('click', playBall);
  playBall(); // temporär
  drawEverything();
}

///////////////
// Main code //
///////////////

main();
