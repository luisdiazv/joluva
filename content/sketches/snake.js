const GRID_SIZE = 30;
const TRANS_STEPS = 100;
const WITDH = 600;
const HEIGHT = 600;
const CUBE_SIZE = 300;
let contSteps = 0;
let points, globalPoints;
let rot = false;
let from = 0, to = 0;
let snake, food;
let cam;
let myFont;


function setup() {
   points = 0;
   globalPoints = 0;
   myFont = loadFont('/showcase/sketches/blox/Blox2.ttf');
   createCanvas(WITDH, HEIGHT, WEBGL);
   pg = createGraphics(width, height);
   cam = createCamera();
   fillFoodPlaces();
   camera(900,0,0);
   frameRate(100);
   newGame();
}

const reference = () =>{
   push();
        translate(CUBE_SIZE/2+GRID_SIZE,0,0);
        fill(255,0,0);
        box(GRID_SIZE);
   pop();   
   push();
        translate(-CUBE_SIZE/2-GRID_SIZE,0,0);
        fill(126,0,0);
        box(GRID_SIZE);
   pop();   
   push();
        translate(0,CUBE_SIZE/2+GRID_SIZE,0);
        fill(0,255,0);
        box(GRID_SIZE);
   pop();   
   push();
        translate(0,-CUBE_SIZE/2-GRID_SIZE,0);
        fill(0,126,0);
        box(GRID_SIZE);
   pop();
   push();
        translate(0,0,CUBE_SIZE/2+GRID_SIZE);
        fill(0,0,255);
        box(GRID_SIZE);
   pop();   
   push();
        translate(0,0,-CUBE_SIZE/2-GRID_SIZE);
        fill(0,0,126);
        box(GRID_SIZE);
   pop();
}



function draw() {
   background(0);

   textFont(myFont, 36);
   beginHUD();
   text('Puntos '+points, 10, 40);
   text('Mejor '+globalPoints, 10, 80);
   endHUD();
   
   
   fill(255,255,255);
   box(CUBE_SIZE);
   reference();
   if((to.x!=from.x || to.y!=from.y ||to.z!=from.z) || contSteps>0){
      transition();
      snake.show();
   }else if(!snake.isDead){
      drawSnake();
   } else {
      globalPoints = max(globalPoints,points);
      points = 0;
      newGame()
   }

   
}

function drawSnake() {
   // update every SNAKE_SPEED frame
   
    snake.update();
   
   //
   // textSize(15);
   // text("Score: " + snake.length, 0, 15);
   
   food.show();
   snake.show();

   // Handle when snake eat food
   if(snake.head.x == food.x && snake.head.y == food.y && snake.head.z == food.z)eatFood();
   
}

function newGame() {
   snake = new Snake();
   food = new Food();
}

function eatFood() {
   snake.length++;
   points++;
   food.newFood();
}

function keyPressed() {
   if(snake.cubeFace==1 ){
      if (keyCode == UP_ARROW && snake.vel.y != 1) {
         snake.vel.y = -1;
         snake.vel.z = 0;
      } else if (keyCode == DOWN_ARROW && snake.vel.y != -1) {
         snake.vel.y = 1;
         snake.vel.z = 0;
      }  else if (keyCode == RIGHT_ARROW && snake.vel.z != 1) {
         snake.vel.y = 0;
         snake.vel.z = -1;
      } else if (keyCode == LEFT_ARROW && snake.vel.z != -1) {
         snake.vel.y = 0;
         snake.vel.z = 1;
      }
   }else if(snake.cubeFace==2){
      if (keyCode == UP_ARROW && snake.vel.y != 1) {
         snake.vel.y = -1;
         snake.vel.z = 0;
      } else if (keyCode == DOWN_ARROW && snake.vel.y != -1) {
         snake.vel.y = 1;
         snake.vel.z = 0;
      }  else if (keyCode == LEFT_ARROW && snake.vel.z != 1) {
         snake.vel.y = 0;
         snake.vel.z = -1;
      } else if (keyCode == RIGHT_ARROW && snake.vel.z != -1) {
         snake.vel.y = 0;
         snake.vel.z = 1;
      }
   }else if(snake.cubeFace==3){
      if (keyCode == UP_ARROW && snake.vel.x != -1) {
         snake.vel.z = 0;
         snake.vel.x = 1;
      } else if (keyCode == DOWN_ARROW && snake.vel.x != 1) {
         snake.vel.z = 0;
         snake.vel.x = -1;
      }  else if (keyCode == LEFT_ARROW && snake.vel.z != -1) {
         snake.vel.z = 1;
         snake.vel.x = 0;
      } else if (keyCode == RIGHT_ARROW && snake.vel.z != 1) {
         snake.vel.z = -1;
         snake.vel.x = 0;
      }
   }else if(snake.cubeFace==4){
      if (keyCode == DOWN_ARROW && snake.vel.x != -1) {
         snake.vel.z = 0;
         snake.vel.x = 1;
      } else if (keyCode == UP_ARROW && snake.vel.x != 1) {
         snake.vel.z = 0;
         snake.vel.x = -1;
      }  else if (keyCode == LEFT_ARROW && snake.vel.z != -1) {
         snake.vel.z = 1;
         snake.vel.x = 0;
      } else if (keyCode == RIGHT_ARROW && snake.vel.z != 1) {
         snake.vel.z = -1;
         snake.vel.x = 0;
      }
   }else if(snake.cubeFace==5){
      if (keyCode == UP_ARROW && snake.vel.y != 1) {
         snake.vel.y = -1;
         snake.vel.x = 0;
      } else if (keyCode == DOWN_ARROW && snake.vel.y != -1) {
         snake.vel.y = 1;
         snake.vel.x = 0;
      }  else if (keyCode == LEFT_ARROW && snake.vel.x != 1) {
         snake.vel.y = 0;
         snake.vel.x = -1;
      } else if (keyCode == RIGHT_ARROW && snake.vel.x != -1) {
         snake.vel.y = 0;
         snake.vel.x = 1;
      }
   }else if(snake.cubeFace==6){
      if (keyCode == UP_ARROW && snake.vel.y != 1) {
         snake.vel.y = -1;
         snake.vel.x = 0;
      } else if (keyCode == DOWN_ARROW && snake.vel.y != -1) {
         snake.vel.y = 1;
         snake.vel.x = 0;
      }  else if (keyCode == RIGHT_ARROW && snake.vel.x != 1) {
         snake.vel.y = 0;
         snake.vel.x = -1;
      } else if (keyCode == LEFT_ARROW && snake.vel.x != -1) {
         snake.vel.y = 0;
         snake.vel.x = 1;
      }
   }
   
}

let foodPlaces = new Set();
const fillFoodPlaces = () =>{
   for(let i = -CUBE_SIZE/2;i<=CUBE_SIZE/2;i+=GRID_SIZE){
      for(let j = -CUBE_SIZE/2;j<=CUBE_SIZE/2;j+=GRID_SIZE){
         foodPlaces.add(createVector(i,j,CUBE_SIZE/2));
         foodPlaces.add(createVector(i,j,-CUBE_SIZE/2));
         foodPlaces.add(createVector(i,CUBE_SIZE/2,j));
         foodPlaces.add(createVector(i,-CUBE_SIZE/2,j));
         foodPlaces.add(createVector(CUBE_SIZE/2,i,j));
         foodPlaces.add(createVector(-CUBE_SIZE/2,i,j)); 
      }
   }
}

class Food{
    constructor () {
       this.newFood();
    }
    newFood(){
       const foodPlacesArray = Array.from(foodPlaces); 
       const randomIndex = Math.floor(Math.random() * foodPlacesArray.length);
       const randomElement = foodPlacesArray[randomIndex];
       this.x = randomElement.x;
       this.y = randomElement.y;
       this.z = randomElement.z;
       
    }
    show(){
      push();
      translate(this.x, this.y, this.z);
      fill(25,255,25);
      box(GRID_SIZE);
      pop();   
    }
 }

const camPos = {
   1 : {x:900,y:0,z:0},   
   2 : {x:-900,y:0,z:0},
   3 : {x:0.1,y:900,z:0},
   4 : {x:0.1,y:-900,z:0},
   5 : {x:0,y:0,z:900},
   6 : {x:0,y:0,z:-900},

}

const f = (a) => {
   if(a==1)return{x:900,y:0,z:0};   
   if(a==2)return{x:-900,y:0,z:0};
   if(a==3)return{x:0.1,y:900,z:0};
   if(a==4)return{x:0.1,y:-900,z:0};
   if(a==5)return{x:0,y:0,z:900};
   if(a==6)return{x:0,y:0,z:-900};

}



const faceChange = (curFace,x,y,z) =>{
   
   let newFace = curFace, newSnakeVel;
   if(curFace==1 || curFace==2){
      let flag = false;
      if(y==CUBE_SIZE/2)newFace = 3,flag = true; 
      else if(y==-CUBE_SIZE/2)newFace = 4,flag = true;
      else if(z==CUBE_SIZE/2)newFace = 5,flag = true;
      else if(z==-CUBE_SIZE/2)newFace = 6,flag = true;
      if(curFace==1 && flag)newSnakeVel = createVector(-1,0,0);
      else if(curFace==2 && flag)newSnakeVel = createVector(1,0,0);
   }else if(curFace==3 || curFace==4){
      let flag = false;
      if(x==CUBE_SIZE/2)newFace = 1,flag = true; 
      else if(x==-CUBE_SIZE/2)newFace = 2,flag = true;
      else if(z==CUBE_SIZE/2)newFace = 5,flag = true;
      else if(z==-CUBE_SIZE/2)newFace = 6,flag = true;
      if(curFace==3 && flag)newSnakeVel = createVector(0,-1,0);
      else if(curFace==4 && flag) newSnakeVel = createVector(0,1,0);
   }else if(curFace==5 || curFace==6){
      let flag = false;
      if(x==CUBE_SIZE/2)newFace = 1,flag = true; 
      else if(x==-CUBE_SIZE/2)newFace = 2,flag = true;
      else if(y==CUBE_SIZE/2)newFace = 3,flag = true;
      else if(y==-CUBE_SIZE/2)newFace = 4,flag = true;
      if(curFace==5 && flag)newSnakeVel = createVector(0,0,-1);
      else if(curFace==6 && flag) newSnakeVel = createVector(0,0,1);
   }
   if(newSnakeVel){
      rot = true;
      snake.vel.x = newSnakeVel.x;
      snake.vel.y = newSnakeVel.y;
      snake.vel.z = newSnakeVel.z;
   }

   from = f(curFace);
   to = f(newFace);
   console.log(curFace,newFace);
   console.log('faceChange',from,to);
   //diagonal 75 bis #20 74
   //camera(camPos[newFace].x,camPos[newFace].y,camPos[newFace].z,0,0,0);
   snake.cubeFace = newFace;
   console.log('snakeFace',snake.cubeFace);
}

 class Snake {
    constructor(){
       this.vel = createVector(0,1,0);
       this.head = createVector(CUBE_SIZE/2,0,0);
       this.cubeFace = 1;
       this.length = 0;
       this.body = [];
       this.isDead = false;
    }
    update(){
       this.body.push(createVector(this.head.x, this.head.y, this.head.z));
        
       this.head.x += this.vel.x * GRID_SIZE;
       this.head.y += this.vel.y * GRID_SIZE;
       this.head.z += this.vel.z * GRID_SIZE;
       foodPlaces.delete(createVector(this.head.x,this.head.y,this.head.z));

       faceChange(this.cubeFace,this.head.x,this.head.y,this.head.z);

       if(this.length < this.body.length)foodPlaces.add(this.body[0]),this.body.shift();
       
 
       for(let vector of this.body){
          if(vector.x == this.head.x && vector.y == this.head.y && vector.z == this.head.z)this.isDead = true;
       }
 
    }
    show() {
       noStroke();
       // Draw snake head

       push();
       translate(this.head.x, this.head.y,this.head.z);
       fill(255,0,0);
       box(GRID_SIZE);
       pop();   
       
 
       // Draw snake body
       for(let vector of this.body){
        push();
        translate(vector.x, vector.y,vector.z);
        fill(255,0,0);
        box(GRID_SIZE);
        pop();   

       }
    }
 }


 const transition = () =>{
   console.log(from,to);
   console.log('steps',contSteps);
   if(contSteps==TRANS_STEPS){
      contSteps = 0;
      from = to;
   }else{
      if(from.x<to.x ) from.x += 900/TRANS_STEPS;
      else if(from.x>to.x) from.x -= 900/TRANS_STEPS;
      if(from.y<to.y) from.y += 900/TRANS_STEPS;
      else if(from.y>to.y) from.y -= 900/TRANS_STEPS;
      if(from.z<to.z) from.z += 900/TRANS_STEPS;
      else if(from.z>to.z) from.z -= 900/TRANS_STEPS;
      contSteps++;
   }
   
   

   camera(from.x,from.y,from.z,0,0,0);

 }