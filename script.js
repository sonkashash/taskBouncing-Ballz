// const ball = document.getElementById("ball");
// let x = 0;
//     let y = 0;
//     let xSpeed = 5;
//     let ySpeed = 5;
//     function animate() {
//     x += xSpeed;
//     y += ySpeed;
//     if (x + 50 > window.innerWidth || x < 0) {
//        xSpeed = -xSpeed;
//     }
//     if (y + 50 > window.innerHeight || y < 0) {
//        ySpeed = -ySpeed;
//     }
//     ball.style.left = x + "px";
//     ball.style.top = y + "px";
//     requestAnimationFrame(animate);
//  }
// animate();
// document.onmousemove = (e) => {
//     document.onclick = () => {
//         let ball = document.createElement('ball');
//         ball.classList.add('click');
//         ball.style.left = e.pageX + 'px';
//         ball.style.top = e.pageY + 'px';
//         document.body.appendChild(ball)
//     }   
// }
const ball    = document.querySelector('.ball');
let y_coord = 1;
let dy_coord = 1;

const gravity = () => {
    myReq = requestAnimationFrame(gravity)
    if(y_coord > 460) {
        dy_coord = -dy_coord;
    } else {
        dy_coord -= 1
    }
    dy_coord += 2;
    if(y_coord > 465){
        cancelAnimationFrame(myReq);
    }
    if(y_coord === 420){
        console.log('dy_coord is ', dy_coord)
    }
    console.log(dy_coord);
    y_coord += dy_coord;
    ball.style.top = (y_coord) + "px";
}

gravity();
// setInterval(function(){

//   if(y_coord>425) {dy_coord = -dy_coord;} 
//   dy_coord+=1;
//   y_coord = y_coord + dy_coord;
//   ball.style.top = (y_coord) + "px";
// },40);

