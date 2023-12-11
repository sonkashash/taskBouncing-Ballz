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

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  ballArray.push(new Ball());
});


//класс Ball
class Ball {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = 20;
    this.speedX = 1;
    this.speedY = 1;
  }
  update() {
    this.speedY+=gravity;
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
        this.speedY *= -1;
      }
      if (this.y>canvas.height-this.size){ //Вот тут надо еще подумать над методикой
        this.y=canvas.height-this.size;
        this.speedY = 0;
        this.speedX = 0;
      }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
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
  myReq=requestAnimationFrame(animate);
}

animate();

// const ball = document.querySelector(".ball");
// let x_coord = 1;
// let dx_coord = 1;
// let y_coord = 1;
// let dy_coord = 1;
// const gravity = 0.5;

// const bounce = () => {
//   myReq = requestAnimationFrame(bounce);
//   dy_coord += gravity;
//   y_coord += dy_coord;
//   x_coord += dx_coord;
//   if (x_coord > 270 || x_coord<1 ) {
//     dx_coord *= -1;
//   }
//   if (y_coord > 450) {
//     dy_coord *= -1;
//   }
//   ball.style.top = y_coord + "px";
//   ball.style.left = x_coord + "px";
//   if (y_coord > 451) {
//     cancelAnimationFrame(myReq);
//   }
// };

// bounce();
