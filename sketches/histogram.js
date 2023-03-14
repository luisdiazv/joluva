var red_arr = new Array(256);
var green_arr = new Array(256);
var blue_arr = new Array(256);
var showFilter = false;
const filter = [
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2],
];
const filter2 = [
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, 0, 1],
];
var colors = new Array(3);

var leftM = 30;
var upM = 15;


function preload() {
  img = loadImage("/showcase/sketches/lennna.jpg");
}

function getIndex(x, y) {
  return (x + y * img.width) * 4;
}
function setup() {
  createCanvas(img.width + 2 * leftM, img.height * 2 + 2 * upM);
    
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
      //kernel
      let filteredPixel = convolute(i, j);
      filtered.pixels[idx + 0] = red(filteredPixel);
      filtered.pixels[idx + 1] = green(filteredPixel);
      filtered.pixels[idx + 2] = blue(filteredPixel);
      filtered.pixels[idx + 3] = alpha(filteredPixel);
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
  
  if (showFilter)
    image(filtered, leftM, upM);
  else
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


function convolute(x, y) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let pix = getIndex(x + i, y + j);
      let factor = filter[j + 1][i + 1];

      sumR += img.pixels[pix + 0] * factor;
      sumG += img.pixels[pix + 1] * factor;
      sumB += img.pixels[pix + 2] * factor;
    }
  }
  return color(
    sumR, sumG, sumB
  );
}


function keyPressed() {
  if (keyCode === 84) {
    showFilter = !showFilter
    if (showFilter)
      calculateHistogram(filtered);
    else
      calculateHistogram(img);
  }

}