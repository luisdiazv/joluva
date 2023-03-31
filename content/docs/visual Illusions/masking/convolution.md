---
weight: 3
---



## Convolution


### Problema a resolver
Implementar un programa que permita implementar distintos kernels.

### Introducción
<p style="text-align: justify;">
Los filtros de convolución son herramientas esenciales en el procesamiento de imágenes. Son matrices numéricas que se aplican a una imagen para resaltar características específicas de la misma, como bordes, texturas y detalles.
</p>
<p style="text-align: justify;">
El proceso de convolución consiste en deslizar el filtro por la imagen y calcular el producto punto entre los valores del filtro y los valores de la imagen en la región de la imagen que coincide con el filtro en cada posición. Esta operación produce un nuevo valor que se coloca en una nueva imagen en la posición correspondiente.
</p>
<p style="text-align: justify;">
La convolución se utiliza en muchos aspectos del procesamiento de imágenes, como la mejora de la calidad de la imagen, la eliminación de ruido y la detección de bordes. Los filtros de convolución también se pueden combinar y aplicar en varias etapas para crear efectos más complejos en una imagen.
</p>
<p style="text-align: justify;">
En resumen, los filtros de convolución son una herramienta poderosa y versátil para procesar imágenes y extraer información relevante de ellas.
</p>

### Antecedentes y trabajo previo
<p style="text-align: justify;">
Los filtros de convolución tienen una larga historia en el procesamiento de señales, y han sido ampliamente utilizados en aplicaciones de procesamiento de imágenes desde la década de 1960. En particular, se han utilizado para el análisis de imágenes médicas, la detección de bordes, la eliminación de ruido y la compresión de imágenes.
</p>
<p style="text-align: justify;">
Además, con el avance de la tecnología informática, se han desarrollado técnicas más sofisticadas de filtrado de imágenes basadas en la convolución. Por ejemplo, el filtro de convolución profunda (Deep Convolutional Filter, DCF) se utiliza en el aprendizaje profundo para la detección de objetos y la segmentación de imágenes.
</p>




### Solución
{{< details title="p5-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-iframe sketch="/showcase/sketches/histogram.js" width="780" height="1000" */>}}
{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/convolution.js" width="720" height="690" >}}

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

var inp;
let filter = [
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2]
];
var showFilter = false;
var leftM = 30;
var upM = 15;


function preload() {
    img = loadImage("/showcase/sketches/lennna.jpg");
}
  
function getIndex(x, y) {
    return (x + y * img.width) * 4;
}

function myInputEvent() {
    let filterRows = this.value().substring(1,this.value().length-1).split(',');
  
    let newFilter = new Array();
    for(let i=0;i<3;i++){
      let tmp = new Array();
      for(let j=0;j<3;j++){
          tmp.push(parseInt(filterRows[3*i+j]));
      }
      newFilter.push(tmp);
    }
    filter = newFilter;
}



function setup() {
    createCanvas(img.width + 2*leftM, img.height + 2*upM );
    inp = createInput('');
    inp.position(0, 0);
    inp.size(150);
    inp.input(myInputEvent);
      
  
    // img.filter(GRAY);
    loadPixels();
    img.loadPixels();
    filtered = createImage(img.width, img.height);
    filtered.loadPixels();
  
  
    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        let idx = getIndex(i, j);
        //kernel
        let filteredPixel = convolute(i, j);
        filtered.pixels[idx + 0] = red(filteredPixel);
        filtered.pixels[idx + 1] = green(filteredPixel);
        filtered.pixels[idx + 2] = blue(filteredPixel);
        filtered.pixels[idx + 3] = alpha(filteredPixel);
      }
    }
  
    img.updatePixels();
    filtered.updatePixels();
    updatePixels();
    strokeWeight(4);
  
}



function draw() {
    background(220);
    
    //image(img, leftM, upM);
    
    if (showFilter)
      image(filtered, leftM, upM);
    else
      image(img, leftM, upM);
    stroke(0);
    
  
    push();
}

function convolute(x, y) {
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let pix = getIndex(x + i, y + j);
        let factor = filter[j + 1][i + 1];
  
        sumR += (img.pixels[pix + 0] * factor);
        sumG += (img.pixels[pix + 1] * factor);
        sumB += (img.pixels[pix + 2] * factor);
      }
    }
    return color(
      sumR, sumG, sumB
    );
  }


  function keyPressed() {
    if (keyCode === 32) {
      showFilter = !showFilter
      if (showFilter){
        filtered = createImage(img.width, img.height);
        filtered.loadPixels();
        for (let i = 0; i < img.width; i++) {
          for (let j = 0; j < img.height; j++) {
            let idx = getIndex(i, j);
            let filteredPixel = convolute(i, j);
            filtered.pixels[idx + 0] = red(filteredPixel);
            filtered.pixels[idx + 1] = green(filteredPixel);
            filtered.pixels[idx + 2] = blue(filteredPixel);
            filtered.pixels[idx + 3] = alpha(filteredPixel);
          }
        }
        filtered.updatePixels();
        updatePixels();
        strokeWeight(4);
        calculateHistogram(filtered);
        console.log(filter);
      }
      else{
        calculateHistogram(img);
      }
        
    }
  
  }

{{< /highlight >}}

### Conclusiones
<p style="text-align: justify;">
Los filtros de convolución son una herramienta esencial en el procesamiento de imágenes. Permiten resaltar características específicas de una imagen, como bordes, texturas y detalles, y se utilizan ampliamente en aplicaciones de mejora de la calidad de la imagen, eliminación de ruido y detección de objetos.
</p>
<p style="text-align: justify;">
Además, los filtros de convolución se han beneficiado enormemente del avance de la tecnología informática y del aprendizaje profundo. Con el uso de técnicas más sofisticadas, como los filtros de convolución profunda, se pueden detectar objetos y características complejas en una imagen de manera más precisa y eficiente.
</p>
<p style="text-align: justify;">
En conclusión, los filtros de convolución son una herramienta poderosa y versátil en el procesamiento de imágenes, y continuarán siendo una parte importante de la investigación y la industria en el futuro.
</p>


### Trabajo futuro
<p style="text-align: justify;">
Filtros de convolución de aprendizaje profundo: los filtros de convolución se han beneficiado enormemente de la popularidad del aprendizaje profundo. Los investigadores están trabajando en el desarrollo de filtros de convolución más profundos y complejos para mejorar la detección de objetos y la segmentación de imágenes.
</p>
<p style="text-align: justify;">
Filtros de convolución para la realidad virtual y aumentada: los filtros de convolución se utilizan en la realidad virtual y aumentada para procesar imágenes en tiempo real. Los investigadores están trabajando en el desarrollo de filtros de convolución que puedan mejorar la calidad de las imágenes en realidad virtual y aumentada para proporcionar una experiencia más inmersiva.
</p>
<p style="text-align: justify;">
Filtros de convolución en tiempo real: el procesamiento de imágenes en tiempo real es un desafío importante. Los investigadores están trabajando en el desarrollo de algoritmos de filtro de convolución que puedan procesar imágenes de alta resolución en tiempo real, lo que podría tener importantes aplicaciones en la robótica, la visión por computadora y otros campos.
</p>

### Referencias

[1] Pequeños fragmentos de código tomados con autorización de los propietarios de https://github.com/Visual-Computing-2022-2/Talleres 

