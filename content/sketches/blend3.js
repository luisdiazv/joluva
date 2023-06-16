let additiveBlending;
let color1, color2;
let radius;

function preload() {
  additiveBlending = readShader('/showcase/sketches/shaders/blend3.frag');
}

function setup() {
  createCanvas(300, 300, WEBGL);
  colorMode(RGB, 1);
  radius = width / 5;
  noStroke();
  color1 = createColorPicker(color(0, 0, 1));
  color1.position(10, 10);
  color2 = createColorPicker(color(1, 0, 0));
  color2.position(width / 2 + 10, 10);
  shader(additiveBlending);
}

function draw() {
  let lado = 0.8;
  let dezplazamiento = (1 - lado) / 2;
  let color1Color = color1.color();
  let color2Color = color2.color();
  background(0);
  additiveBlending.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  additiveBlending.setUniform('uMaterial2', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  beginShape();
  vertex(-dezplazamiento - lado, +dezplazamiento, 0);
  vertex(-dezplazamiento, +dezplazamiento, 0);
  vertex(-dezplazamiento, +dezplazamiento + lado, 0);
  vertex(-dezplazamiento - lado, +dezplazamiento + lado, 0);
  endShape();
  additiveBlending.setUniform('uMaterial1', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  additiveBlending.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  beginShape();
  vertex(+dezplazamiento, +dezplazamiento, 0);
  vertex(+dezplazamiento + lado, +dezplazamiento, 0);
  vertex(+dezplazamiento + lado, +dezplazamiento + lado, 0);
  vertex(+dezplazamiento, +dezplazamiento + lado, 0);
  endShape();
  additiveBlending.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  additiveBlending.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  beginShape();
  vertex(-lado, -dezplazamiento - lado, 0);
  vertex(+lado, -dezplazamiento - lado, 0);
  vertex(+lado, -dezplazamiento, 0);
  vertex(-lado, -dezplazamiento, 0);
  endShape();
}