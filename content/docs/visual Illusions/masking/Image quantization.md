---
bookFlatSection: true
weight: 2
---
# Image Quantization

{{< hint info >}}
**Ejercicio**  
A continuación se explican y se implementan algunas aplicaciones visuales de dither.
{{< /hint >}}

## Introducción
<p style="text-align: justify;">
La animación dither es una técnica de efecto visual que se utiliza para crear la ilusión de un gradiente suave utilizando patrones de píxeles pequeños. Esta técnica se ha utilizado desde hace mucho tiempo en la industria del cine y la televisión para simular un rango de colores más amplio de lo que realmente es posible mostrar en una pantalla.</p>
<p style="text-align: justify;">
El proceso de dithering implica la mezcla de diferentes patrones de píxeles para crear un efecto visual que se asemeje a un gradiente suave. Esto se logra mediante la alternancia de los patrones de píxeles de diferentes tonalidades, lo que puede dar la impresión de que hay más tonalidades de color que las que en realidad están presentes en la imagen.</p>
<p style="text-align: justify;">
En la actualidad, la técnica de animación dither se ha popularizado entre los artistas digitales y diseñadores gráficos, quienes la utilizan para crear una variedad de efectos visuales, desde fondos de pantalla hasta animaciones complejas. </p>

## Antecedentes y trabajo previo
<p style="text-align: justify;">
Originalmente la animación dither se usaba para producir una imagen de mayor calidad en las pantallas de televisión analógicas. Con la introducción de las pantallas digitales, la técnica de animación dither se ha utilizado para mejorar la calidad de imagen en pantallas de menor resolución, especialmente en la era de las primeras consolas de videojuegos y la computación personal.</p>
<p style="text-align: justify;">
Con el tiempo, el dithering se ha vuelto más sofisticado, y la técnica se utiliza en la actualidad en una variedad de campos, como la fotografía, la animación y el diseño gráfico. La animación dither es particularmente popular en el campo de la animación, donde se utiliza para crear una amplia variedad de efectos visuales, desde gradientes de color hasta patrones de texturas complejas. [1] </p>

### Solución 

{{< details title="details" open=false >}}
{{< highlight js >}}
var ditherTemplates;
var dithers;
var currentDither;
var scenes;
var currentScene;
var WHITE;

function preload() {
  ditherTemplates = [loadImage('dithers/4x28.png'), 
                     loadImage('dithers/4x36.png'), 
                     loadImage('dithers/4x68.png'), 
                     loadImage('dithers/6x42 LINES.png'), 
                     loadImage('dithers/5x30 CIRCLES.png'),
                     loadImage('dithers/5x30 CIRCUITS.png'),
                     loadImage('dithers/5x45 DiagLines.png')];
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  //noLoop();
  
  //Dither setup
  currentDither = 0;
  currentScene = 0;
  scenes = 3;
  WHITE = color(255, 255, 255, 255);
  dithers = [];
  for(var i = 0; i < ditherTemplates.length; i++) {
    dithers.push(new dither(ditherTemplates[i]));
  }
}

function draw() {
  background(0);  //The darker color
  fill(255);      //The lighter color
  
  var pxSize = 5;
  for(var x = 0; x < width; x+=pxSize) {
    for(var y = 0; y < height; y+=pxSize) {   
      var colorToSend;
      switch(currentScene) {
        case 0:
          //NOISE ANIMATION 
          colorToSend = color(noise(x/150, y/150, cos(frameCount/10))*256);
          break;
        case 1:
          //GRADIENT 
          colorToSend = color(y/height*255);
          break;
        case 2:
          //FOLLOW THE MOUSE
          colorToSend = color(dist(mouseX, mouseY, x, y));
          break;
      }
          
      if(ditherColor(colorToSend, x/pxSize, y/pxSize)) {
        square(x, y, pxSize);
      }
    }
  }
}

function mouseClicked() {
  //Cycles through loaded dither templates
  currentDither = (currentDither + 1) % ditherTemplates.length;
}

function keyPressed() {
  if (keyCode == 87) {  //Press 'W' for next scene
      currentScene = (currentScene + 1) % scenes;
  }
  else if(keyCode == 83) {  //Press 'S' for next scene
      currentScene = (currentScene + scenes - 1) % scenes;
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/pattern.js" width="740" height="450" >}}

<p style="text-align: justify;">
En esta aplicación de efecto visual dither el programa crea una animación en la que se combinan diferentes patrones de dither con diferentes efectos visuales generados por la interacción del mouse y la animación de ruido y gradiente. Cada vez que se le da click el patrón visualizado cambia el escenario mostrando un patrón diferente.[2]</p>

{{< details title="details" open=false >}}
{{< highlight js >}}
let horse;

function preload() {
    horse = loadImage("horse.png");
}

function setup() {
  createCanvas(1024, 512);

  image(horse, 0, 0);
  makeDithered(horse, 1);
  image(horse, 512, 0);
  // Apply gray filter to the whole canvas
  filter(GRAY);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/floyd.js" width="740" height="450" >}}

<p style="text-align: justify;">
En este ejemplo se aplica un efecto dither punteado. Al cargar la imagen del caballo la función makeDithered() en el código se encarga de aplicarle dicho efecto. Primero carga los pixeles de la imagen utilizando la función loadPixels(), luego los recorre todos y para cada píxel encuentra el color más cercano que se puede representar con un número limitado de valores de color. El error entre el color original y el color más cercano se distribuye a los píxeles adyacentes utilizando la función "distributeError()". Finalmente, se actualizan los píxeles de la imagen utilizando la función "updatePixels()". [3]</p>

## Conclusiones
<p style="text-align: justify;">
La animación dither es una técnica de gráficos que se utiliza para producir imágenes y animaciones con una profundidad de color limitada. Esta técnica utiliza patrones de puntos pequeños de diferentes colores para simular la apariencia de más colores de los que realmente están disponibles en una imagen. Además, la animación dither utiliza la distribución de errores para crear la ilusión de más colores. El código presentado es un ejemplo de cómo se puede aplicar la técnica dither a una imagen cargada en un programa de procesamiento de imágenes
</p>

## Trabajo futuro
<p style="text-align: justify;">
A pesar de que la animación dither tiene una larga historia y ha sido utilizada en muchas aplicaciones, todavía hay mucho trabajo futuro que se puede hacer en esta área. Aunque es una técnica simple y efectiva para simular colores faltantes en imágenes y videos, aún hay margen para mejorar su calidad visual. Los algoritmos de dithering más avanzados podrían producir resultados aún mejores y más realistas.</p>

## Referencias
[1] https://blog.landr.com/es/que-es-el-dither-y-cuando-se-usa/

[2] https://www.reddit.com/r/p5js/comments/ucmpki/custom_1bit_dithering/

[3] https://www.youtube.com/watch?v=0L2n8Tg2FwI