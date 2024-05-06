"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ballArray = [];
var gravity = 0.9;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("click", function (e) {
  var mouse = {
    x: e.clientX,
    y: e.clientY,
  };
  var ball = new Ball(mouse.x, mouse.y);
  ballArray.push(ball);
});

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 50;
    this.speedX = Math.random() * 2;
    this.speedY = Math.random() * 2;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(227, 189, 246)";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.speedY += gravity; 

    this.x += this.speedX;
    this.y += this.speedY;

    for (let i = 0; i < ballArray.length; i++) {
      const otherBall = ballArray[i];
      if (otherBall !== this) {
        const dx = otherBall.x - this.x;
        const dy = otherBall.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + otherBall.radius;

        if (distance < minDistance) {
          const collisionAngle = Math.atan2(dy, dx);
          const overlap = minDistance - distance;

          this.x -= overlap * Math.cos(collisionAngle);
          this.y -= overlap * Math.sin(collisionAngle);
          otherBall.x += overlap * Math.cos(collisionAngle);
          otherBall.y += overlap * Math.sin(collisionAngle);

          const thisSpeed = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
          const otherSpeed = Math.sqrt(
            otherBall.speedX ** 2 + otherBall.speedY ** 2
          );
          const thisDirection = Math.atan2(this.speedY, this.speedX);
          const otherDirection = Math.atan2(otherBall.speedY, otherBall.speedX);
          const collisionNormal = collisionAngle + Math.PI / 2;

          const thisNewSpeedX =
            thisSpeed * Math.cos(thisDirection - collisionNormal);
          const thisNewSpeedY =
            thisSpeed * Math.sin(thisDirection - collisionNormal);
          const otherNewSpeedX =
            otherSpeed * Math.cos(otherDirection - collisionNormal);
          const otherNewSpeedY =
            otherSpeed * Math.sin(otherDirection - collisionNormal);

          this.speedX =
            otherNewSpeedX * Math.cos(collisionNormal) +
            thisNewSpeedX * Math.cos(collisionNormal + Math.PI / 2);
          this.speedY =
            otherNewSpeedX * Math.sin(collisionNormal) +
            thisNewSpeedX * Math.sin(collisionNormal + Math.PI / 2);
          otherBall.speedX =
            thisNewSpeedY * Math.cos(collisionNormal) +
            otherNewSpeedY * Math.cos(collisionNormal + Math.PI / 2);
          otherBall.speedY =
            thisNewSpeedY * Math.sin(collisionNormal) +
            otherNewSpeedY * Math.sin(collisionNormal + Math.PI / 2);
        }
      }
    }

    const friction = 0.05;
    this.speedX *= 1 - friction;

    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius; 
      this.speedX *= -1; 
    } else if (this.x - this.radius < 0) {
      this.x = this.radius; 
      this.speedX *= -1; 
    }

    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius; 
      this.speedY *= -1; 
    } else if (this.y - this.radius < 0) {
      this.y = this.radius; 
      this.speedY *= -1; 
    }
  }
}

function handle() {
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle();
  requestAnimationFrame(animate);
}

animate();

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", function () {
  ballArray = [];
});
