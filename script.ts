"use strict";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
var ballArray: any[] = [];
var gravity = 0.9;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: 0,
  y: 0,
};

canvas.addEventListener("click", (e: any) => {
  mouse.x = e.x;
  mouse.y = e.y;
  const ball: Ball = new Ball();
  ballArray.push(ball);
});

class Ball {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;

  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 50;
    this.speedX = Math.random() * 2;
    this.speedY = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(227, 189, 246)";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw;
    this.speedY += gravity;
    this.x += this.speedX;
    this.y += this.speedY;

    if (
      this.x + this.speedX > canvas.width - this.size ||
      this.x + this.speedX < this.size
    ) {
      this.speedX *= -1;
    }
    if (
      this.y + this.speedY > canvas.height - this.size ||
      this.y + this.speedY < this.size
    ) {
      this.speedY *= -0.9;
    }
    if (this.y > canvas.height - this.size) {
      this.y = canvas.height - this.size;
      this.speedY = 0;
      this.speedX = 0;
    }
  }
}

function handle() {
  let i: number;
  for (i = 0; i < ballArray.length; i++) {
    ballArray[i].draw();
    ballArray[i].update();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle();
  // setTimeout(function greet() {
  //   if (ballArray.length>=1 && JSON.parse((ballArray[ballArray.length-1].speedY))==0 ) {
  //   cancelAnimationFrame(myReq)
  //  }
  //   }, 10000)
  requestAnimationFrame(animate);
}

animate();
