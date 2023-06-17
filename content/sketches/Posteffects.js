let blurShader;
let video;
let pg;

function preload(){
  blurShader = loadShader('/showcase/sketches/shaders/effect.vert', '/showcase/sketches/shaders/effect.frag');
}

function setup() {
  createCanvas(640, 480);
  noStroke();
  video = createVideo("/showcase/sketches/cars.mp4");
  video.size(640, 480);
  video.loop();
  video.hide();
  video.volume(0)
  pg = createGraphics(640, 480, WEBGL);
  pg.noStroke();
}

function draw() {
  pg.shader(blurShader);
  blurShader.setUniform('tex0', video);
  blurShader.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurShader.setUniform('direction', [1.0, 0.0]);
  pg.rect(0,0,width, height);  

  image(pg, 0,0, 640, 480);
}