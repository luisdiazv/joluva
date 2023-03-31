---
weight: 3
---



## Histogram

### Problema
<p style="text-align: justify;">
Implemente un programa que soporte la visualización del histograma de una imagen
</p>

### Introducción
<p style="text-align: justify;">
Los histogramas RGB (Red-Green-Blue) son una representación gráfica de la distribución de los niveles de intensidad de los componentes rojo, verde y azul de una imagen. Cada componente de color se mide en una escala de 0 a 255, donde 0 representa la ausencia del color y 255 representa la presencia máxima del color.
</p>
<p style="text-align: justify;">
Los histogramas RGB se utilizan para analizar y visualizar la distribución de colores en una imagen. Son una herramienta importante en el procesamiento de imágenes y se utilizan en aplicaciones como la corrección de color, la eliminación de ruido y la segmentación de imágenes.
</p>
<p style="text-align: justify;">
La información contenida en un histograma RGB puede proporcionar una visión general de la imagen y ayudar a identificar problemas comunes, como una sobreexposición o una subexposición. Además, se pueden utilizar para ajustar los niveles de color y mejorar la calidad de la imagen. En general, los histogramas RGB son una herramienta útil para cualquier persona que trabaje con imágenes y quiera comprender mejor su contenido de color.
</p>

### Antecedentes y trabajo previo
<p style="text-align: justify;">
Los histogramas RGB de imágenes tienen antecedentes en la teoría del color y la fotografía. La teoría del color establece que cualquier color se puede crear a partir de una combinación de tres colores primarios: rojo, verde y azul. En la fotografía digital, una imagen se almacena como una matriz de píxeles, donde cada píxel se compone de tres valores de intensidad para los componentes rojo, verde y azul.
</p>
<p style="text-align: justify;">
El concepto de histograma RGB se ha utilizado en la fotografía digital desde sus primeros días. Los programas de procesamiento de imágenes, como Photoshop, incluyen herramientas de histograma que permiten a los usuarios ajustar los niveles de brillo y contraste de una imagen. Los histogramas RGB también se han utilizado en la corrección de color de fotografías digitales y en la eliminación de ruido.
</p>
<p style="text-align: justify;">
En la investigación de procesamiento de imágenes, los histogramas RGB se han utilizado en una variedad de aplicaciones. Por ejemplo, se han utilizado para segmentar regiones de interés en imágenes médicas y para identificar objetos en imágenes de satélite. También se han utilizado para analizar la calidad de imagen en sistemas de videovigilancia y para mejorar la eficiencia de compresión de imágenes.
</p>
<p style="text-align: justify;">
Además, se han desarrollado varias técnicas de procesamiento de imágenes basadas en histogramas RGB, como la equalización de histogramas, que se utiliza para mejorar la calidad de la imagen al mejorar la distribución de los niveles de intensidad de los colores.
</p>

### Solución

{{< details title="p5-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-iframe sketch="/showcase/sketches/histogram.js" width="780" height="1000" */>}}
{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/histogram.js" width="775" height="1320" >}}

### Implementación
<p style="text-align: justify;">
La implementación consta de un algoritmo bastante simple, inicialmente se tienen tres arreglos de 255 posiciones. Estos arreglos son equivalentes a RGB y todos los valores se incializan en cero. Posteriormente se itera sobre todos los pixeles de la imagen descomponiéndolos en sus valores r,g y b y contando sus valores en los tres arreglos instanciados inicialmenta. Por último se grafican los arreglos como un histograma de frecuencias.
</p>


### Implementación
<p style="text-align: justify;">
En la implementación se utilizó una imagen a la cual se le aplica un filtro de convolución pixel por pixel. Al oprimir la barra espaciadora se alterna entre la
imagen original y la imagen editada.
</p>
<p style="text-align: justify;">
Se permite que el usuario ingrese su propio filtro en el cuadro de texto de la ezquina superior izquierda, el filtro debe ser de tamaño de 3x3
y se implementa como una lista de 9 posiciones, ejemplo: [-2, -1, 0,-1, 1, 1,0, 1, 2].
</p>
<p style="text-align: justify;">
Se evidencian errores con algunos filtros, ya que dependiendo de sus valores se puede obtener que algún componente de rgb de algún pixel quede por encima de 255
o por debajo de 0, lo cual hace que la imagen quede con un tono bastante oscuro.
</p>

### Código
{{< highlight js >}}
var red_arr = new Array(256);
var green_arr = new Array(256);
var blue_arr = new Array(256);


var colors = new Array(3);
var img,img1,img2,img3;
var leftM = 30;
var upM = 15;


function preload() {
  img1 = loadImage("/showcase/sketches/lennna.jpg");
  img2 = loadImage("/showcase/sketches/mandrill.png");
  img3 = loadImage("/showcase/sketches/sample_cb.png");
}

function getIndex(x, y) {
  return (x + y * img.width) * 4;
}


function setup() {
  img = img1;
  createCanvas(img.width + 2 * leftM, img.height * 2 + 2 * upM);
  button1 = createButton("Imagen 1");
  button2 = createButton("Imagen 2");
  button3 = createButton("Imagen 3");
  button1.mouseClicked(assingImg1);
  button2.mouseClicked(assingImg2);
  button3.mouseClicked(assingImg3);
  button1.size(100,50);
  button2.size(100,50);
  button3.size(100,50);
  button1.position(10,10);
  button2.position(115,10);
  button3.position(220,10);
  for (let i = 0; i < 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  img.loadPixels();
  filtered = createImage(img.width, img.height);
  filtered.loadPixels();


  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let idx = getIndex(i, j);
      let r = img.pixels[idx + 0];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let a = img.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  img.updatePixels();
  filtered.updatePixels();
  updatePixels();
  strokeWeight(4);

}
function calculateHistogram(imagen) {
  for (let i = 0; i < 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  imagen.loadPixels();
  filtered.loadPixels();


  for (let i = 0; i < imagen.width; i++) {
    for (let j = 0; j < imagen.height; j++) {
      let idx = getIndex(i, j);
      let r = imagen.pixels[idx + 0];
      let g = imagen.pixels[idx + 1];
      let b = imagen.pixels[idx + 2];
      let a = imagen.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  imagen.updatePixels();
  updatePixels();
  strokeWeight(4);
}



function draw() {
  background(220);
  
  //image(img, leftM, upM);
  
  image(img, leftM, upM);
  stroke(0);
  

  push();

  paint(color('rgba(255,0,0,0.1)'), colors[0]);
  paint(color('rgba(0,255,0,0.1)'), colors[1]);
  paint(color('rgba(0,0,255,0.1)'), colors[2]);
  pop();
  graph();
}

function graph() {
  push();
  stroke(0);
  strokeWeight(1);
  fill(0);

  textAlign(CENTER);
  textSize(20);

  text('Valores del color (0 - 255) ', leftM + img.width / 2, 2 * img.height + 2 * upM);
  let angle2 = radians(270);
  translate(leftM / 2, (3 / 2) * img.height);
  rotate(angle2);
  // Draw the letter to the screen
  text("Frecuencias", 0, 0);
  pop();
}

function paint(color, array) {
  
  push();
  stroke(color);
  for (let i = 1; i < 256; i++) {
    xPos = map(i, 0, 256, leftM, leftM + img.width)
    xPrev = map(i - 1, 0, 256, leftM, leftM + img.width)
    yPos = map(array[i], 0, max(array), 2 * img.height, img.height + 25)
    yPrev = map(array[i - 1], 0, max(array), 2 * img.height, img.height + 25)
    line(xPrev, yPrev, xPos, yPos)
    line(xPos, 2 * img.height, xPos, yPos)
  }
  pop();
}

function assingImg1() {
  img = img1;
  calculateHistogram(img);
}

function assingImg2() {
  img = img2;
  calculateHistogram(img);
}

function assingImg3() {
  img = img3;
  calculateHistogram(img);
}
{{< /highlight >}}


### Conclusiones
<p style="text-align: justify;">
En conclusión, los histogramas RGB de imágenes son una herramienta útil y poderosa en el procesamiento de imágenes. Permiten una comprensión visual de la distribución de los niveles de intensidad de los componentes de color de una imagen y se utilizan para corregir el color, eliminar el ruido y mejorar la calidad de la imagen. Los histogramas RGB también se han utilizado en aplicaciones de segmentación de objetos y análisis de calidad de imagen.
</p>
<p style="text-align: justify;">
En general, los histogramas RGB son una herramienta importante para cualquier persona que trabaje con imágenes y quiera comprender mejor su contenido de color. Son una parte fundamental del procesamiento de imágenes digitales y se utilizan en una amplia variedad de aplicaciones, desde la fotografía hasta la investigación científica.
</p>

### Trabajo futuro
<p style="text-align: justify;">
Reconocimiento de patrones: Los histogramas RGB pueden ser utilizados como características para el reconocimiento de patrones en imágenes. Por ejemplo, se pueden utilizar algoritmos de aprendizaje automático para clasificar imágenes en función de sus histogramas RGB.
</p>
<p style="text-align: justify;">
Compresión de imágenes: Los histogramas RGB también pueden ser utilizados para la compresión de imágenes. Los valores de los píxeles en las diferentes bandas de color se pueden representar mediante una distribución de probabilidad, lo que puede permitir una compresión más eficiente de la imagen.
</p>
<p style="text-align: justify;">
Análisis de calidad de imagen: Los histogramas RGB pueden ser utilizados para analizar la calidad de imagen de una fotografía. Por ejemplo, se puede analizar la distribución de los valores de los píxeles en las diferentes bandas de color para determinar si la imagen tiene una buena exposición y un contraste adecuado.
</p>

### Referencias

[1] Pequeños fragmentos de código tomados con autorización de los propietarios de https://github.com/Visual-Computing-2022-2/Talleres 