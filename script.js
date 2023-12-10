// document.onmousemove = (e) => {
//     document.onclick = () => {
//         let ball = document.createElement('ball');
//         ball.classList.add('click');
//         ball.style.left = e.pageX + 'px';
//         ball.style.top = e.pageY + 'px';
//         document.body.appendChild(ball)
//     }
// }
// function draw() {
//     background(0, 200, 0)
// }

// const ball    = document.querySelector('.ball');
// let y_coord = 1;
// let dy_coord = 1;

// const gravity = () => {
//     myReq = requestAnimationFrame(gravity)
//     if(y_coord > 460) {
//         dy_coord = -dy_coord;
//     } else {
//         dy_coord -= 1
//     }
//     dy_coord += 2;
//     if(y_coord > 465){
//         cancelAnimationFrame(myReq);
//     }
//     if(y_coord === 420){
//         console.log('dy_coord is ', dy_coord)
//     }
//     console.log(dy_coord);
//     y_coord += dy_coord;
//     ball.style.top = (y_coord) + "px";
// }

// gravity();
// setInterval(function(){

//   if(y_coord>425) {dy_coord = -dy_coord;}
//   dy_coord+=1;
//   y_coord = y_coord + dy_coord;
//   ball.style.top = (y_coord) + "px";
// },40);
var example = document.getElementById("example"),
ctx = example.getContext("2d");
ctx.fillRect(0, 0, example.width, example.height);

const ball = document.querySelector(".ball");
let x_coord = 1;
let dx_coord = 1;
let y_coord = 1;
let dy_coord = 1;
const gravity = 0.5;

const bounce = () => {
  myReq = requestAnimationFrame(bounce);
  dy_coord += gravity;
  y_coord += dy_coord;
  x_coord += dx_coord;
  if (x_coord > 270 || x_coord<1 ) {
    dx_coord *= -1;
  }
  if (y_coord > 450) {
    dy_coord *= -1;
  }
  ball.style.top = y_coord + "px";
  ball.style.left = x_coord + "px";
  if (y_coord > 451) {
    cancelAnimationFrame(myReq);
  }
  if (mouseIsPressed) {
    y_coord = mouseY;
    x_coord = mouseX;
  }
};

bounce();
