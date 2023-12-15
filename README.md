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
  

* Creating a new ball in balls array after click (copy of class Ball)
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

/// *FUNCTIONS draw(), updated() DESCRIBED IN CLASS "Ball"*

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle();
  requestAnimationFrame(animate);
}
```

* Transformation typescript in javascript by command *tsc script.js*
* Сonnecting js file to html
  ```
   <script src="script.js"></script>
  ```

## Some troubles

> <strong style="green">Note</strong><br/>
The function **animation()** (whichworks cyclically) does not stop after the ball hits the ground. I tried to use setInterval, but face new trouble, where function was stopped after some time and new balls could not be created. You could see using code below.

```
 setTimeout(function greet() {
     if (ballArray.length>=1 && JSON.parse((ballArray[ballArray.length-1].speedY))==0 ) {
     cancelAnimationFrame(myReq)
  }
}, 10000)
```
