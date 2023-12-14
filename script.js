const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const ballArray = [];
const gravity = 0.9;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  ballArray.push(new Ball());
});

class Ball {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 50;
    this.speedX = Math.random() * 2;
    this.speedY = 1;
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

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(227, 189, 246)";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function handle() {
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
  myReq = requestAnimationFrame(animate);
}

animate();
