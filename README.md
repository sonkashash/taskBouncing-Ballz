# Task Bouncing-Ballz

## Description 
Develop a web application using html5 canvas, where users can click on the screen to spawn a circle. This circle should realistically obey Earth-like gravity, moving vertically and bouncing upon hitting the bottom of the screen, with a dampening effect on each bounce until it comes to a stop. There can be multiple circle instances on screen at a time.

## Implementation
Demonstration is [here](https://famous-empanada-69f2cb.netlify.app)

**Steps**
* Creating a canvas
  ```
  <canvas id="canvas"></canvas> 
  
   #canvas { 
  background: url("img/space.jpeg");
  background-size: cover;}
```
* Creating a new ball after click (copy of class Ball)
```
var mouse = {
  x: 0,
  y: 0,
};
canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  var ball = new Ball();
  ballArray.push(ball);
});
```
* Make animation

```
function handle() {
  let i: number;
  for (i = 0; i < ballArray.length; i++) {
    ballArray[i].draw();
    ballArray[i].update();
  }
}
/// functions draw(), updated() described in class "Ball"
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle();
  requestAnimationFrame(animate);
}
```


