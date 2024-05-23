# Bouncing-Ballz :balloon:

## Task 
Develop a web application using html5 canvas, where users can click on the screen to spawn a circle. This circle should realistically obey Earth-like gravity, moving vertically and bouncing upon hitting the bottom of the screen, with a dampening effect on each bounce until it comes to a stop. There can be multiple circle instances on screen at a time.

## Implementation
Demonstration is [here](https://famous-empanada-69f2cb.netlify.app)

**Steps**
- [x] Creating a canvas **HTML,CSS**
  ```
  <canvas id="canvas"></canvas> 
  

- [x] Creating a new ball in balls array after click (copy of class Ball) **TypeScript**
```
canvas.addEventListener("click", function (e: MouseEvent) {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };
  const ball = new Ball(mouse.x, mouse.y);
  ballArray.push(ball);
  textStart.classList.add("hide");
});
```


- [x] Make animation **Typescript**
The collision of the balls and their velocities are calculated based on their size by the law of conservation of momentum and the law of conservation of energy.


```
function handle() {
  let i: number;
  for (i = 0; i < ballArray.length; i++) {
    ballArray[i].draw();
    ballArray[i].update();
  }
}

/// *FUNCTIONS draw(),checkCollision(otherBall: Ball), update(deltaTime: number) DESCRIBED IN CLASS "Ball"*

```

- [x] Transformation typescript in javascript by command *tsc script.js*
- [x] Сonnecting js file to html  **HTML**
  ```
   <script src="script.js"></script>
  ```
- [ ] Stop animation

## Some points for improvement


When there are too many balls on the ‘ground’, they begin to shake endlessly as the checkCollision method is constantly triggered. I'm working on improving this now.
