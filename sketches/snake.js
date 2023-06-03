const GRID_SIZE = 30;

const WITDH = 600;
const HEIGHT = 600;
const CUBE_SIZE = 300;
let rot = false;
let from, to;
let snake, food;
let cam;

function setup() {
   createCanvas(WITDH, HEIGHT, WEBGL);
   cam = createCamera();
   frameRate(3);
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

let cont = 0;

function draw() {
   background(0);
   camera(0,0,900);
   
   fill(255,255,255);
   box(CUBE_SIZE);
   reference();


   
   
    //console.log(cont);
   if(!snake.isDead){
      drawSnake();
   } else {
      newGame()
   }
   cont = cont+1;
   if(cont==5){
    cont = 0;
    snake.length++;
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
   if(snake.head.x == food.x && snake.head.y == food.y){
      eatFood();
   }
}

function newGame() {
   snake = new Snake();
   food = new Food();
}

function eatFood() {
   snake.length++;
   food.newFood();
}

function keyPressed() {
   if(snake.cubeFace==1 || snake.cubeFace==5){
      if (keyCode == UP_ARROW) {
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



class Food{
    constructor () {
       this.newFood();
    }
    newFood(){
       this.x = Math.floor(random(width));
       this.y = Math.floor(random(height));
 
       this.x = Math.floor(this.x / GRID_SIZE) * GRID_SIZE;
       this.y = Math.floor(this.y / GRID_SIZE) * GRID_SIZE;
    }
    show(){
       fill(255, 40, 0);
       rect(this.x, this.y, GRID_SIZE, GRID_SIZE);
    }
 }

/*
Convención de caras del cubo
1 = {x:1,y:0,z:0}.   
2 = {x:-1,y:0,z:0}
3 = {x:0,y:1,z:0}
4 = {x:0,y:-1,z:0}
5 = {x:0,y:0,z:1}
6 = {x:0,y:0,z:-1}

*/




const faceChange = (curFace,x,y,z) =>{
   from = curFace;
   let newFace = curFace, newSnakeVel;
   if(curFace==1 || curFace==2){
      let flag = false;
      if(y==CUBE_SIZE/2+GRID_SIZE)newFace = 3,flag = true; 
      else if(y==-CUBE_SIZE/2-GRID_SIZE)newFace = 4,flag = true;
      else if(z==CUBE_SIZE/2+GRID_SIZE)newFace = 5,flag = true;
      else if(z==-CUBE_SIZE/2-GRID_SIZE)newFace = 6,flag = true;
      if(curFace==1 && flag)newSnakeVel = createVector(-1,0,0);
      else if(curFace==2 && flag)newSnakeVel = createVector(1,0,0);
   }else if(curFace==3 || curFace==4){
      let flag = false;
      if(x==CUBE_SIZE/2+GRID_SIZE)newFace = 1,flag = true; 
      else if(x==-CUBE_SIZE/2-GRID_SIZE)newFace = 2,flag = true;
      else if(z==CUBE_SIZE/2+GRID_SIZE)newFace = 5,flag = true;
      else if(z==-CUBE_SIZE/2-GRID_SIZE)newFace = 6,flag = true;
      if(curFace==3 && flag)newSnakeVel = createVector(0,-1,0);
      else if(curFace==4 && flag) newSnakeVel = createVector(0,1,0);
   }else if(curFace==5 || curFace==6){
      let flag = false;
      if(x==CUBE_SIZE/2+GRID_SIZE)newFace = 1,flag = true; 
      else if(x==-CUBE_SIZE/2-GRID_SIZE)newFace = 2,flag = true;
      else if(y==CUBE_SIZE/2+GRID_SIZE)newFace = 3,flag = true;
      else if(y==-CUBE_SIZE/2-GRID_SIZE)newFace = 4,flag = true;
      if(curFace==5 && flag)newSnakeVel = createVector(0,0,-1);
      else if(curFace==6 && flag) newSnakeVel = createVector(0,0,1);
   }
   if(newSnakeVel){
      rot = true;
      snake.vel.x = newSnakeVel.x;
      snake.vel.y = newSnakeVel.y;
      snake.vel.z = newSnakeVel.z;
   }
   to = newFace;
   snake.cubeFace = newFace;
}

 class Snake {
    constructor(){
       this.vel = createVector(0,1,0);
       this.head = createVector(CUBE_SIZE/2+GRID_SIZE,0,0);
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
       
       faceChange(this.cubeFace,this.head.x,this.head.y,this.head.z);

       if(this.length < this.body.length)this.body.shift();
       
 
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