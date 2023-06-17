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
  //pg.emitResolution(bricks);
  bricks.setUniform('u_resolution', [200,200]);
  bricks.setUniform('u_temp', 5);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  background(55,4,5);
  rotateY(frameCount * 0.006);
  ellipsoid(170,120,120);
}

function mouseMoved() {
  bricks.setUniform('u_temp', int(map(mouseY, 0.5, width, 0.5, 20)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}