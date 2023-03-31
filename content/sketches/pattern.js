var ditherTemplates;
var dithers;
var currentDither;
var scenes;
var currentScene;
var WHITE;

function preload() {
  ditherTemplates = [loadImage('/showcase/sketches/dithers/4x28.png'), 
                     loadImage('/showcase/sketches/dithers/4x36.png'), 
                     loadImage('/showcase/sketches/dithers/4x68.png'), 
                     loadImage('/showcase/sketches/dithers/6x42 LINES.png'), 
                     loadImage('/showcase/sketches/dithers/5x30 CIRCLES.png'),
                     loadImage('/showcase/sketches/dithers/5x30 CIRCUITS.png'),
                     loadImage('/showcase/sketches/dithers/5x45 DiagLines.png')];
}

function dither(image) {
  this.image = image;
  this.width = this.image.width;
  this.steps = this.image.height/this.width;
  this.image.loadPixels();
  //console.log(this.file + ", " + this.image + ", " + this.width + ", " + this.steps);
}

function ditherColor(color, x1, y1) {
  var c = brightness(color);
  var mX = x1 % dithers[currentDither].width;
  var mY = y1 % dithers[currentDither].width;
  var level = ceil(map(c, 0, 100, dithers[currentDither].steps, 0));
  
    var newColor = dithers[currentDither].image.get(mX, mY+(level-1)*dithers[currentDither].width);

  if(newColor.toString('#rrggbb') == "255,255,255,255") {
     return true;
     }
  else {
    return false;
  }
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  //noLoop();
  
  //Dither setup
  currentDither = 0;
  currentScene = 0;
  scenes = 3;
  WHITE = color(255, 255, 255, 255);
  dithers = [];
  for(var i = 0; i < ditherTemplates.length; i++) {
    dithers.push(new dither(ditherTemplates[i]));
  }
}

function draw() {
  background(0);  //The darker color
  fill(255);      //The lighter color
  
  var pxSize = 5;
  for(var x = 0; x < width; x+=pxSize) {
    for(var y = 0; y < height; y+=pxSize) {   
      var colorToSend;
      switch(currentScene) {
        case 0:
          //NOISE ANIMATION 
          colorToSend = color(noise(x/150, y/150, cos(frameCount/10))*256);
          break;
        case 1:
          //GRADIENT 
          colorToSend = color(y/height*255);
          break;
        case 2:
          //FOLLOW THE MOUSE
          colorToSend = color(dist(mouseX, mouseY, x, y));
          break;
      }
          
      if(ditherColor(colorToSend, x/pxSize, y/pxSize)) {
        square(x, y, pxSize);
      }
    }
  }
}

function mouseClicked() {
  //Cycles through loaded dither templates
  currentDither = (currentDither + 1) % ditherTemplates.length;
}

function keyPressed() {
  if (keyCode == 87) {  //Press 'W' for next scene
      currentScene = (currentScene + 1) % scenes;
  }
  else if(keyCode == 83) {  //Press 'S' for next scene
      currentScene = (currentScene + scenes - 1) % scenes;
  }
}