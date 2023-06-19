---
weight: 1
---
# Procedural Texturing

{{< p5-iframe sketch="/showcase/sketches/ProcTexture.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="424" height="424" >}}

## Problema
Adapt other patterns from the book of shaders (refer also to the shadertoy collection) and map them as textures onto other 3D shapes.

## Manual de usuario del Sketch
Al mover el cursor de arriba hacia abajo dentro del sketch, se crean más o menos ladrillos correspondiente a la textura.

## Implementación
La implementación de ProceduralTexturing.js utiliza el fragment shader bricks.frag para generar una textura procedural y aplica esa textura a una forma 3D renderizada en un lienzo WebGL utilizando p5.js.
El shader bricks.frag define una función llamada brickTile que crea un patrón de ladrillos utilizando operaciones matemáticas en las coordenadas de textura. También define una función llamada box que crea una forma de caja utilizando smoothstep. Finalmente, en la función main, se llama a estas funciones para calcular el color de cada fragmento de píxel en función de las coordenadas de textura.
En ProceduralTexturing.js, el fragment shader bricks.frag se carga en la variable bricks utilizando la función readShader durante la función preload. Luego, en la función setup, se crea un lienzo WebGL y un buffer de gráficos llamado pg. Se configuran algunos parámetros, como el modo de textura y se asigna el shader bricks al buffer de gráficos pg. También se establecen los valores de los uniformes u_resolution y u_temp del shader.
Dentro de draw, se establece el color de fondo y se realiza una rotación en el eje Y basada en el recuento de frames. Luego, se dibuja una forma 3D (en este caso, un elipsoide) que se verá afectada por el shader y la textura generada.
Además, se implementa la función mouseMoved, que ajusta el valor del uniforme u_temp del shader en función de la posición del mouse. Esto permite interactuar con el shader y ajustar dinámicamente el patrón de ladrillos en función de la posición vertical del mouse.

## Código

Código js del procedural texturing
{{< highlight js >}}
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
{{< /highlight >}}

Fragment shader (bricks.frag)
{{< highlight js >}}
HOLA MUNDO
{{< /highlight >}}