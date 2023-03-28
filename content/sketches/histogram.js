var red_arr = new Array(256);
var green_arr = new Array(256);
var blue_arr = new Array(256);


var colors = new Array(3);
var img,img1,img2,img3;
var leftM = 30;
var upM = 15;


function preload() {
  img1 = loadImage("/showcase/sketches/lennna.jpg");
  img2 = loadImage("/showcase/sketches/mandrill.png");
  img3 = loadImage("/showcase/sketches/sample_cb.png");
}

function getIndex(x, y) {
  return (x + y * img.width) * 4;
}


function setup() {
  img = img1;
  createCanvas(img.width + 2 * leftM, img.height * 2 + 2 * upM);
  button1 = createButton("Imagen 1");
  button2 = createButton("Imagen 2");
  button3 = createButton("Imagen 3");
  button1.mouseClicked(assingImg1);
  button2.mouseClicked(assingImg2);
  button3.mouseClicked(assingImg3);
  button1.size(100,50);
  button2.size(100,50);
  button3.size(100,50);
  button1.position(10,10);
  button2.position(115,10);
  button3.position(220,10);
  for (let i = 0; i < 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  img.loadPixels();
  filtered = createImage(img.width, img.height);
  filtered.loadPixels();


  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let idx = getIndex(i, j);
      let r = img.pixels[idx + 0];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let a = img.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  img.updatePixels();
  filtered.updatePixels();
  updatePixels();
  strokeWeight(4);

}
function calculateHistogram(imagen) {
  for (let i = 0; i < 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  imagen.loadPixels();
  filtered.loadPixels();


  for (let i = 0; i < imagen.width; i++) {
    for (let j = 0; j < imagen.height; j++) {
      let idx = getIndex(i, j);
      let r = imagen.pixels[idx + 0];
      let g = imagen.pixels[idx + 1];
      let b = imagen.pixels[idx + 2];
      let a = imagen.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  imagen.updatePixels();
  updatePixels();
  strokeWeight(4);
}



function draw() {
  background(220);
  
  //image(img, leftM, upM);
  
  image(img, leftM, upM);
  stroke(0);
  

  push();

  paint(color('rgba(255,0,0,0.1)'), colors[0]);
  paint(color('rgba(0,255,0,0.1)'), colors[1]);
  paint(color('rgba(0,0,255,0.1)'), colors[2]);
  pop();
  graph();
}

function graph() {
  push();
  stroke(0);
  strokeWeight(1);
  fill(0);

  textAlign(CENTER);
  textSize(20);

  text('Valores del color (0 - 255) ', leftM + img.width / 2, 2 * img.height + 2 * upM);
  let angle2 = radians(270);
  translate(leftM / 2, (3 / 2) * img.height);
  rotate(angle2);
  // Draw the letter to the screen
  text("Frecuencias", 0, 0);
  pop();
}

function paint(color, array) {
  
  push();
  stroke(color);
  for (let i = 1; i < 256; i++) {
    xPos = map(i, 0, 256, leftM, leftM + img.width)
    xPrev = map(i - 1, 0, 256, leftM, leftM + img.width)
    yPos = map(array[i], 0, max(array), 2 * img.height, img.height + 25)
    yPrev = map(array[i - 1], 0, max(array), 2 * img.height, img.height + 25)
    line(xPrev, yPrev, xPos, yPos)
    line(xPos, 2 * img.height, xPos, yPos)
  }
  pop();
}






function assingImg1() {
  img = img1;
  calculateHistogram(img);
}

function assingImg2() {
  img = img2;
  calculateHistogram(img);
}

function assingImg3() {
  img = img3;
  calculateHistogram(img);
}