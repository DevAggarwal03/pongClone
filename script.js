const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext("2d");

function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw = () => {
    c.beginPath();
    c.fillStyle = "brown";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.stroke();
  };

  this.update = (coun) => {
    this.draw();
  };
}

const constDis = 15;

// const recLeft = new Rectangle(80, (innerHeight-100)/2, 20, 100);
// recLeft.draw()

let rectancles = [];

let recWidth = 20;
let recHeight = 100;
let recLeft;
let posLeftY = (innerHeight - recHeight) / 2;
let posRightY = (innerHeight - recHeight) / 2;
let recRight;

document.addEventListener("keydown", (e) => {
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
    if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
      this.dy = -this.dy;
    }
    // bouncing the ball if it hits the rectangle
    
    if((this.y > leftRec.y && this.y < leftRec.y + leftRec.height) && (this.x - this.radius <= leftRec.x + leftRec.width) && (this.dx <= 0)){
      this.dx = -this.dx;
    }
    if((this.y > rightRec.y && this.y < rightRec.y + rightRec.height) && (this.x + this.radius >= rightRec.x) && (this.dx >= 0)){
      this.dx = -this.dx;
    }

    if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
      initBall()
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function init() {
  rectancles = [];
  recLeft = new Rectangle(80-recWidth, posLeftY, recWidth, recHeight);
  rectancles.push(recLeft);
  recRight = new Rectangle(innerWidth - 80, posRightY, recWidth, recHeight);
  rectancles.push(recRight);
  rectancles[0].draw();
  rectancles[1].draw();
}

let speed = [Math.random() * 5 - 10, Math.random() * 5 + 5]

function initBall() {
  radius = 40;
  x = innerWidth / 2;
  y = radius + Math.random() * (innerHeight - 2 * radius);
  dx = speed[Math.floor(Math.random() * 2)];
  dy = speed[Math.floor(Math.random() * 2)];
  ball = new Circle(x, y, dx, dy, radius);
  ball.draw();
}

initBall();
init();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  rectancles[0].update();
  rectancles[1].update();
  ball.update(rectancles[0], rectancles[1]);
}

animate();
