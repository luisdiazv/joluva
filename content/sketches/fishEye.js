let Shader;
let src;
let img_src;
let mask;


function preload() {
  Shader = readShader('/showcase/sketches/shaders/conv3x3.frag',
    { varyings: Tree.texcoords2 });
  Shader1 = readShader('/showcase/sketches/shaders/conv5x5.frag',
    { varyings: Tree.texcoords2 });

  img_src = loadImage('/showcase/sketches/lon.jpg');
  src = img_src;
}

function setup() {
  createCanvas(img_src.width, img_src.height, WEBGL);
  noStroke();
  textureMode(NORMAL);
  slider = createSlider(0, 0.5, 0.2, 0.025);
  magCheckbox = createCheckbox('Aumento', true);
  zoneCheckbox = createCheckbox('Zona',true);
  convCheckbox = createCheckbox('Convolución',true)
  filterCheckbox = createCheckbox('Filtro 3x3 o 5x5',true);
  src =img_src;
  //mask = [1, 4, 6, 4, 1,4, 16, 24, 16, 4,6, 24, -476, 24, 6,4, 16, 24, 16, 4,1, 4, 6, 4, 1];
  //for(let i=0;i<25;i++)mask[i] = -mask[i]/256;
  //console.log(mask);
}

function draw() {
  if(filterCheckbox.checked()){
    shader(Shader);
    mask = [-0.125,-0.125,-0.125,-0.125,1.0,-0.125,-0.125,-0.125,-0.125];
    Shader.setUniform('texture', src);
    Shader.setUniform('mask',mask);
    Shader.setUniform('texOffset', [1 / src.width, 1 / src.height]);
    Shader.setUniform('mouse',[mouseX/src.width,mouseY/src.height]);
    Shader.setUniform('radius',slider.value());
    Shader.setUniform('magnify',magCheckbox.checked()&&zoneCheckbox.checked());
    Shader.setUniform('zone',zoneCheckbox.checked());
    Shader.setUniform('conv',convCheckbox.checked());
  }else{
    shader(Shader1);
    mask = [1, 4, 6, 4, 1,4, 16, 24, 16, 4,6, 24, -476, 24, 6,4, 16, 24, 16, 4,1, 4, 6, 4, 1];
    for(let i=0;i<25;i++)mask[i] = -mask[i]/256;
    shader(Shader1);
    Shader1.setUniform('texture', src);
    Shader1.setUniform('mask',mask);
    Shader1.setUniform('texOffset', [1 / src.width, 1 / src.height]);
    Shader1.setUniform('mouse',[mouseX/src.width,mouseY/src.height]);
    Shader1.setUniform('radius',slider.value());
    Shader1.setUniform('magnify',magCheckbox.checked()&&zoneCheckbox.checked());
    Shader1.setUniform('zone',zoneCheckbox.checked());
    Shader1.setUniform('conv',convCheckbox.checked());
  }
  
  
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}