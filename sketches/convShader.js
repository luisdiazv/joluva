let Shader;
let src;
let img_src;
let mask;


function preload() {
  Shader = readShader('/showcase/sketches/shaders/fishEye.frag',
    { varyings: Tree.texcoords2 });


  img_src = loadImage('/showcase/sketches/caramia.jpg');
  src = img_src;
}

function setup() {
  console.log('Hola');
  createCanvas(img_src.height, img_src.width, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(Shader);
   
  src =img_src;
  //mask = [1, 4, 6, 4, 1,4, 16, 24, 16, 4,6, 24, -476, 24, 6,4, 16, 24, 16, 4,1, 4, 6, 4, 1];
  //for(let i=0;i<25;i++)mask[i] = -mask[i]/256;
  //console.log(mask);
  mask = [-0.125,-0.125,-0.125,-0.125,1,-0.125,-0.125,-0.125,-0.125];
}

function draw() {
  
  Shader.setUniform('texture', src);
 // Shader.setUniform('mask',mask);fishEye
  Shader.setUniform('texOffset', [1 / src.width, 1 / src.height]);
  Shader.setUniform('mouse',[mouseX/src.height,mouseY/src.width]);
  Shader.setUniform('radius',0.2);
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}