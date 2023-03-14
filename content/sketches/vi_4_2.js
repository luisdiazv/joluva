let img;
let cols, rows;
let scale = 20;
let terrain = [];

function preload() {
  img = loadImage('iceland.png');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = img.width;
  rows = img.height;
  terrain = create2DArray(cols, rows);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = map(brightness(img.get(x, y)), 0, 255, -1, 1);
    }
  }
}

function draw() {
  background(200);
  stroke(0);
  noFill();
  translate(-width/2, -height/2);
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scale, y*scale, terrain[x][y]*scale);
      vertex(x*scale, (y+1)*scale, terrain[x][y+1]*scale);
    }
    endShape();
  }
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
