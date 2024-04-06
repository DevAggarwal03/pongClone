const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const players = document.getElementsByClassName("players");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let player1score = 0;
let player2score = 0;
let play = false;
let pause = false;

restart.addEventListener("click", (e) => {
  initBall();
  restart.style.display = "none";
  play = true;
  animate();
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && !play) {
    player1.style.display = "block";
    player2.style.display = "block";
    start.style.display = "none";
    play = true;
    pause = false;
    initBall();
    init();
    animate();

    if(restart.style.display == 'inline'){
      restart.style.display = 'none';
    }

  }

  if(e.key == 'p'){
    if(!pause){
      pause = true;
    }
    else{
      pause = false;
      animate()
    }
  }

  // if(e.key = 'r' && play){
  //   start.style.display = "inline";
  //   player1score = 0;
  //   player1score = 0;
  //   player1.textContent = 0;
  //   player2.textContent = 0;
  //   player1.style.display = "none";
  //   player2.style.display = "none";
  //   play = false;
  //   ball = null;
  //   recLeft = null;
  //   rightRec = null;
  //   window.cancelAnimationFrame(myRequestId)

  //   // playStart()
  //   animate()
  // }
});

let playStart;

start.addEventListener("click", playStart = () => {
  player1.style.display = "block";
  player2.style.display = "block";
  start.style.display = "none";
  play = true;
  initBall();
  init();
  animate();
});

window.addEventListener("resize", (e) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  
});

const c = canvas.getContext("2d");

function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw = () => {
    c.beginPath();
    c.fillStyle = "brown";
    c.strokeStyle = "black";
    c.rect(this.x, this.y, this.width, this.height);
    c.lineWidth = 3;
    c.stroke();
    c.fill();
    // c.fillRect(this.x, this.y, this.width, this.height);
  };

  this.update = () => {
    this.draw();
  };
}

const constDis = 25;

let rectancles = [];

let recWidth = 20;
let recHeight = 100;
let recLeft;
let posLeftY = (innerHeight - recHeight) / 2;
let posRightY = (innerHeight - recHeight) / 2;
let recRight;

document.addEventListener("keydown", (e) => {
  if (play) {
    if (e.key == "ArrowDown") {
      if (posRightY + recHeight < innerHeight) {
        posRightY += constDis;
        init();
      }
    }
    if (e.key == "ArrowUp") {
      if (posRightY > 0) {
        posRightY -= constDis;
        init();
      }
    }
    if (e.key == "s") {
      if (posLeftY + recHeight < innerHeight) {
        posLeftY += constDis;
        init();
      }
    }
    if (e.key == "w") {
      if (posLeftY > 0) {
        posLeftY -= constDis;
        init();
      }
    }
  }
});

let ball;
let x;
let y;
let dx;
let dy;
let radius;

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "yellow";
    c.fill();
  };


  this.update = (leftRec, rightRec) => {
    //logic for bouncing it back if the ball hits the top and bottom edge
    if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
      this.dy = -this.dy;
    }

    //logic for what happens if the ball hits a rectancle
    if (
      this.y > leftRec.y &&
      this.y < leftRec.y + leftRec.height &&
      this.x - this.radius <= leftRec.x + leftRec.width &&
      this.dx <= 0
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y > rightRec.y &&
      this.y < rightRec.y + rightRec.height &&
      this.x + this.radius >= rightRec.x &&
      this.dx >= 0
    ) {
      this.dx = -this.dx;
    }

    //when ball hits the edge of the screen horizontally
    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      restart.style.display = "inline";
      window.cancelAnimationFrame(myRequestId);
      play = false;
      ball = null;
      if (this.x - this.radius <= 0) {
        player2score += 1;
        player2.textContent = `${player2score}`;
      } else {
        player1score += 1;
        player1.textContent = `${player1score}`;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
      this.draw();
  };
}

function init() {
  rectancles = [];
  recLeft = new Rectangle(80 - recWidth, posLeftY, recWidth, recHeight);
  rectancles.push(recLeft);
  recRight = new Rectangle(innerWidth - 80, posRightY, recWidth, recHeight);
  rectancles.push(recRight);
  rectancles[0].draw();
  rectancles[1].draw();
}

let speed = [Math.random() * 5 - 10, Math.random() * 5 + 5];

function initBall() {
  radius = 40;
  x = innerWidth / 2;
  y = radius + Math.random() * (innerHeight - 2 * radius);
  dx = speed[Math.floor(Math.random() * 2)];
  dy = speed[Math.floor(Math.random() * 2)];
  ball = new Circle(x, y, dx, dy, radius);
  ball.draw();
}

let myRequestId;

function animate() {
  if(pause){
    return;
  }
    console.log("hi")
    myRequestId = requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    rectancles[0].update();
    rectancles[1].update();
    ball.update(rectancles[0], rectancles[1]);
}
