let pg;
let bricks;

function preload() {
  bricks = readShader('/showcase/sketches/shaders/Bricks.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(bricks);
  pg.emitResolution(bricks);
  bricks.setUniform('u_resolution', [100,100]);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  background(55,4,5);
  rotateY(millis() / 2500);
  cylinder(100, 200);
}