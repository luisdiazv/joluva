let Shader;
let src;
let img_src;


function preload() {
  Shader = readShader('/showcase/sketches/shaders/texturing.frag',
    { varyings: Tree.texcoords2 });
  Shader1 = readShader('/showcase/sketches/shaders/colorMixing.frag',
    { varyings: Tree.texcoords2 });
  img_src = loadImage('/showcase/sketches/eye.jpg');
  img1 = loadImage('/showcase/sketches/space.jpg')
  src = img_src;
}

function setup() {
  createCanvas(img_src.width, img_src.height, WEBGL);
  noStroke();
  textureMode(NORMAL);
  slider = createSlider(0, 1, 0.2, 0.025);
  src =img_src;
  hslCheckbox = createCheckbox('hsl', true);
  hsvCheckbox = createCheckbox('hsv', true);
  mixCheckbox = createCheckbox('Colormix', true);
  imgsCheckbox = createCheckbox('Imagemix', true);
  colorPicker = createColorPicker('#ed225d');
}

function draw() {
  if(!mixCheckbox.checked() && !imgsCheckbox.checked()){
    shader(Shader);
    Shader.setUniform('light',slider.value());
    Shader.setUniform('texture', src);
    Shader.setUniform('hslOpt',hslCheckbox.checked());
    Shader.setUniform('hsvOpt',hsvCheckbox.checked()&&(!hslCheckbox.checked()));
  }else{
    shader(Shader1);
    Shader1.setUniform('texture', src);
    Shader1.setUniform('texture1', img1);
    Shader1.setUniform('img',imgsCheckbox.checked());
    Shader1.setUniform('tint',[colorPicker.color().levels[0]/255, colorPicker.color().levels[1]/255, colorPicker.color().levels[2]/255, slider.value()]);
  }
 
 
  
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}