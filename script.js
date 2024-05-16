"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let ballArray = [];
let gravity = 1;
const textStart = document.querySelector(".text");
let lastTime = 0; 

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
  textStart.classList.add("hide");
});

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

      const thisMass = Math.PI * this.radius ** 3;
      const otherMass = Math.PI * otherBall.radius ** 3;

      const thisSpeedNormal = (this.speedX * dx + this.speedY * dy) / distance;
      const otherSpeedNormal =
        (otherBall.speedX * dx + otherBall.speedY * dy) / distance;

      const restitution = 1; //Think abour this number

      const thisNewSpeedNormal = (restitution * otherMass * (otherSpeedNormal - thisSpeedNormal) + thisMass * thisSpeedNormal + otherMass * otherSpeedNormal) / (thisMass + otherMass);
      const otherNewSpeedNormal = (restitution * thisMass * (thisSpeedNormal - otherSpeedNormal) + thisMass * thisSpeedNormal + otherMass * otherSpeedNormal) / (thisMass + otherMass);

      this.speedX += (thisNewSpeedNormal - thisSpeedNormal) * dx / distance;
      this.speedY += (thisNewSpeedNormal - thisSpeedNormal) * dy / distance;
      otherBall.speedX +=
        (otherNewSpeedNormal - otherSpeedNormal) * dx / distance;
      otherBall.speedY +=
        (otherNewSpeedNormal - otherSpeedNormal) * dy / distance;
    }
  }

  update(deltaTime) {
    this.draw();
    this.speedY += gravity * deltaTime;

    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    for (let i = 0; i < ballArray.length; i++) {
      const otherBall = ballArray[i];
      if (otherBall !== this) {
        this.checkCollision(otherBall);
      }
    }

    const friction = 0.3;
    this.speedX *= 1 - friction * deltaTime;

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

function handle(deltaTime) {
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update(deltaTime);
  }
}

function animate(currentTime) {
  const deltaTime = (currentTime - lastTime) / 30;
  lastTime = currentTime;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle(deltaTime);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", function () {
  ballArray = [];
  textStart.classList.remove("hide");
});