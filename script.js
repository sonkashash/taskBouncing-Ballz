
"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ballArray = [];
const gravity = 1;
const textStart = document.querySelector(".text");


window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("click", createNewBall);

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 80;
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

  checkCollision(otherBall) {
    const dx = otherBall.x - this.x;
    const dy = otherBall.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = this.radius + otherBall.radius;

    if (distance <= minDistance) {
      const collisionAngle = Math.atan2(dy, dx);

      const overlap = minDistance - distance;

      this.x -= overlap * Math.cos(collisionAngle);
      this.y -= overlap * Math.sin(collisionAngle);
      otherBall.x += overlap * Math.cos(collisionAngle);
      otherBall.y += overlap * Math.sin(collisionAngle);

      const thisMass = this.radius ** 3;
      const otherMass = otherBall.radius ** 3;

      const thisSpeedNormal = (this.speedX * dx + this.speedY * dy) / distance;
      const otherSpeedNormal =
        (otherBall.speedX * dx + otherBall.speedY * dy) / distance;

      const restitution = 1;

      const thisNewSpeedNormal =
        (restitution * otherMass * (otherSpeedNormal - thisSpeedNormal) +
          thisMass * thisSpeedNormal +
          otherMass * otherSpeedNormal) /
        (thisMass + otherMass);
      const otherNewSpeedNormal =
        (restitution * thisMass * (thisSpeedNormal - otherSpeedNormal) +
          thisMass * thisSpeedNormal +
          otherMass * otherSpeedNormal) /
        (thisMass + otherMass);

      this.speedX += (thisNewSpeedNormal - thisSpeedNormal) * dx / distance;
      this.speedY += (thisNewSpeedNormal - thisSpeedNormal) * dy / distance;
      otherBall.speedX +=
        (otherNewSpeedNormal - otherSpeedNormal) * dx / distance;
      otherBall.speedY +=
        (otherNewSpeedNormal - otherSpeedNormal) * dy / distance;
    }
  }

  update() {
    this.draw();
    this.speedY += gravity;

    this.x += this.speedX;
    this.y += this.speedY;

    for (let i = 0; i < ballArray.length; i++) {
      const otherBall = ballArray[i];
      if (otherBall !== this) {
        this.checkCollision(otherBall);
      }
    }

    const friction = 0.3;
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
      this.speedY *= -0.8;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.speedY *= -0.8;
    }
  }
}

function handleBalls() {
  for (const ball of ballArray) {
    ball.update();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBalls();
  requestAnimationFrame(animate);
}

animate();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createNewBall(e) {
  const mouse = { x: e.clientX, y: e.clientY };
  const ball = new Ball(mouse.x, mouse.y);
  ballArray.push(ball);
  textStart.classList.add("hide");
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", function () {
  ballArray = [];
  textStart.classList.remove("hide");
});