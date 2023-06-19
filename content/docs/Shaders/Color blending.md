---
weight: 1
---
# Color blending

## Problema 1
Figure it out the js code of the above sketches.

## Multiplicative blending
{{< p5-iframe sketch="/showcase/sketches/blend1.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Multiplicative blending (inluding brightness)
{{< p5-iframe sketch="/showcase/sketches/blend2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Manual de usuario del Sketch
<p style="text-align: justify;">
Los dos sketches cuentan con un selector de color para los 2 cuadrados de la parte superir, tal selector está ubicado en la esquina superior izquierda de cada cuadrado.

El skectch "Multiplicative blending (inluding brightness)" cuenta con un slider, el cual permite cambiar valor del brillo (brightness) despues de realizado el multiplicative blending.
</p> 

## Implementación
<p style="text-align: justify;">
La implementación de "Multiplicative blending" se basa en la implementación de la página del curso, ya que el ejercicio solicitaba averiguar el código js de tal implementación. La página del curso mencionaba que el código era "component-wise multiplication" por lo que se investigó sobre éste método de blending y se realizó la implentación propia con el modelo de color RGB. El código muestra cómo utilizar un shader en p5.js para realizar una mezcla de colores multiplicativa en un lienzo 3D, donde los colores utilizados en la mezcla se pueden seleccionar mediante selectores de color. El shader se encarga de realizar la operación de multiplicación y se aplican los colores resultantes a las formas dibujadas en el lienzo.

El programa define dos colores, color1 y color2, que se pueden seleccionar mediante selectores de color en la pantalla. Luego, se utiliza un shader llamado multiplicativeShader para realizar la mezcla de colores. En la función setup, se configura el lienzo en 3D y se carga el shader desde un archivo. También se establecen las posiciones de los selectores de color en la pantalla. En la función draw, se establecen los uniformes del shader para especificar los colores de los materiales que se utilizarán en la mezcla. Luego, se dibujan formas en el lienzo utilizando las coordenadas de los vértices y se aplican los colores de los materiales correspondientes a través del shader.

Para la implementación de "Multiplicative blending (inluding brightness)" se le añadió la multiplicación del componente alpha relacionado con el brillo, el cual se le aplica luego de haber realizado la respectiva multiplicación del resto de componentes (RGB).
</p>

## Código
Código js del sketch Multiplicative blending
{{< highlight js >}}
let multiplicativeShader;
let color1, color2;
let radius;

function preload() {
  multiplicativeShader = readShader('/showcase/sketches/shaders/blend1.frag');
}

function setup() {
  createCanvas(300, 300, WEBGL);
  colorMode(RGB, 1);
  radius = width / 5;
  noStroke();
  color1 = createColorPicker(color(0.5, 0.35, 1));
  color1.position(10, 10);
  color2 = createColorPicker(color(1, 0.32, 0.75));
  color2.position(width / 2 + 10, 10);
  shader(multiplicativeShader);
}

function draw() {
  let lado = 0.8;
  let dezplazamiento = (1 - lado) / 2;
  let color1Color = color1.color();
  let color2Color = color2.color();
  background(0);
  multiplicativeShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  multiplicativeShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
  beginShape();
  vertex(-dezplazamiento - lado, +dezplazamiento, 0);
  vertex(-dezplazamiento, +dezplazamiento, 0);
  vertex(-dezplazamiento, +dezplazamiento + lado, 0);
  vertex(-dezplazamiento - lado, +dezplazamiento + lado, 0);
  endShape();
  multiplicativeShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
  multiplicativeShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  beginShape();
  vertex(+dezplazamiento, +dezplazamiento, 0);
  vertex(+dezplazamiento + lado, +dezplazamiento, 0);
  vertex(+dezplazamiento + lado, +dezplazamiento + lado, 0);
  vertex(+dezplazamiento, +dezplazamiento + lado, 0);
  endShape();
  multiplicativeShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  multiplicativeShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  beginShape();
  vertex(-lado, -dezplazamiento - lado, 0);
  vertex(+lado, -dezplazamiento - lado, 0);
  vertex(+lado, -dezplazamiento, 0);
  vertex(-lado, -dezplazamiento, 0);
  endShape();
}
{{< /highlight >}}

Código js del sketch Multiplicative blending (inluding brightness)
{{< highlight js >}}
let mulAlphaShader;
let alphaSlider;
let color1, color2;
let radius;

function preload() {
  mulAlphaShader = readShader('/showcase/sketches/shaders/blend2.frag');
}

function setup() {
  createCanvas(300, 300, WEBGL);
  colorMode(RGB, 1);
  rectMode(RADIUS);
  radius = width / 5;
  noStroke();
  color1 = createColorPicker(color(0.5, 0.35, 1));
  color1.position(10, 10);
  color2 = createColorPicker(color(1, 0.32, 0.75));
  color2.position(width / 2 + 10, 10);
  alphaSlider = createSlider(0, 1, 0.5, 0.05);
  alphaSlider.position(width / 2 - 35, height / 2);
  alphaSlider.style('width', '80px');
  shader(mulAlphaShader);
}

function draw() {
  let lado = 0.8;
  let dezplazamiento = (1 - lado) / 2;
  let color1Color = color1.color();
  let color2Color = color2.color();
  background(0);
  mulAlphaShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  mulAlphaShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
  mulAlphaShader.setUniform('brightness', 1.0);
  beginShape();
  vertex(-dezplazamiento - lado, +dezplazamiento, 0);
  vertex(-dezplazamiento, +dezplazamiento, 0);
  vertex(-dezplazamiento, +dezplazamiento + lado, 0);
  vertex(-dezplazamiento - lado, +dezplazamiento + lado, 0);
  endShape();
  mulAlphaShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
  mulAlphaShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  mulAlphaShader.setUniform('brightness', 1.0);
  beginShape();
  vertex(+dezplazamiento, +dezplazamiento, 0);
  vertex(+dezplazamiento + lado, +dezplazamiento, 0);
  vertex(+dezplazamiento + lado, +dezplazamiento + lado, 0);
  vertex(+dezplazamiento, +dezplazamiento + lado, 0);
  endShape();
  mulAlphaShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  mulAlphaShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  mulAlphaShader.setUniform('brightness', alphaSlider.value());
  beginShape();
  vertex(-lado, -dezplazamiento - lado, 0);
  vertex(+lado, -dezplazamiento - lado, 0);
  vertex(+lado, -dezplazamiento, 0);
  vertex(-lado, -dezplazamiento, 0);
  endShape();
}
{{< /highlight >}}
_____________________________________________________________________________________________
## Problema 2
Implement other blending modes. Take this reference as starting point.

{{< p5-iframe sketch="/showcase/sketches/blend3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

### Manual de usuario del Sketch
El sketch cuenta con un selector de color para los 2 cuadrados de la parte superir, tal selector está ubicado en la esquina superior izquierda de cada cuadrado.

### Implementación

Basandose en el código de la solución del primer punto, se implementó un color blending usando un "additive blending" modificando el archivo del shader en el sketch "" para realizar una suma en vez del producto. 

### Código

Código js del Additive Blending
{{< highlight js >}}
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
{{< /highlight >}}


Shader del Additive Blending
{{< highlight js >}}
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = vec4((uMaterial1.rgb + uMaterial2.rgb)*(0.5),1);
  }
{{< /highlight >}}