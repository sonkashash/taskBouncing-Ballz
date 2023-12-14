const ballArray = [];
const gravity = 1;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//изменения размеров при сужении окна
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
//

//обработка клика
const mouse = {
  x: undefined,
  y: undefined,
};
//
let speedX = Math.random() * 2;
let speedY = 1;
canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  ballArray.push(new Ball(speedX, speedY, mouse.y));
});

let y = mouse.y;

//класс Ball
class Ball {
  constructor(speedX, speedY, y) {
    this.x = mouse.x;
    this.y = y;
    this.size = Math.random() * 50;
    this.speedX = Math.random() * 2;
    this.speedY = speedY;
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
      this.speedY *= -0.99;
    }
    if (this.y > canvas.height - this.size) {
      this.y = canvas.height - this.size;
      this.speedY = 0;
      this.speedX = 0;
    }
    return speedY;
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
//конец класс Ball

//отрисовка компонентов и падение мяча
function handle() {
  for (i = 0; i < ballArray.length; i++) {
    ballArray[i].draw();
    ballArray[i].update();
  }
}
//

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle();
  // setTimeout(function greet() {
  //   if (ballArray.length>=1 && JSON.parse((ballArray[ballArray.length-1].speedY))==0 ) {
  //   cancelAnimationFrame(myReq)
  //  }
  //   }, 15000)
  myReq = requestAnimationFrame(animate);
  // if (ballArray.length>=1 && JSON.parse((ballArray[ballArray.length-1].speedY))==0) {
  //   cancelAnimationFrame(myReq) }
}

animate();
