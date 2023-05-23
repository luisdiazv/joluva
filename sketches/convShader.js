let Shader;
let src;
let img_src;



function preload() {
  Shader = readShader('/showcase/sketches/shaders/conv.frag',
    { varyings: Tree.texcoords2 });


  img_src = loadImage('/showcase/sketches/caramia.jpg');
  src = img_src;
}

function setup() {
  createCanvas(img_src.height, img_src.width, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(Shader);
   
    src =img_src;
    
  
}

function draw() {
  Shader.setUniform('texture', src);
  Shader.setUniform('mask',[-0.125,-0.125,-0.125,-0.125,1.0,-0.125,-0.125,-0.125,-0.125]);
  Shader.setUniform('texOffset', [1 / src.width, 1 / src.height]);
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}