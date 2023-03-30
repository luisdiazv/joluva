---
bookFlatSection: true
weight: 2
---
# __Spacial Coherence__

## Pixelator Demo

{{< hint info >}}
**Ejercicio**  
A continuación se implementa una aplicación de video pixelador y se realiza una evaluación comparativa de los resultados (promedio de color frente a coherencia espacial). Y se evaluará cobre la calidad visual de los resultados.
{{< /hint >}}

## Introducción
<p style="text-align: justify;">
El pixelado de videos es una técnica utilizada para ocultar o difuminar ciertas partes de una imagen en movimiento. Esta técnica se basa en la reducción del tamaño de los píxeles que componen la imagen, lo que resulta en una apariencia borrosa y poco clara de la parte de la imagen pixelada. El pixelado de videos se utiliza comúnmente en la televisión y en el cine para ocultar contenido inapropiado, como desnudos o violencia, o para preservar la privacidad de las personas, como en los casos de testigos de crímenes o de entrevistados anónimos.</p>
<p style="text-align: justify;">
Además, también se utiliza en el mundo digital, como en las transmisiones en vivo, para ocultar información confidencial o proteger la identidad de los usuarios. El pixelado de videos es una técnica importante en la protección de la privacidad y en la censura de contenido, y su uso está en constante evolución y adaptación a las necesidades de la sociedad.</p>

## Antecedentes y trabajo previo
<p style="text-align: justify;">
En los inicios de la televisión, el pixelado se realizaba manualmente mediante la colocación de filtros en la lente de la cámara, lo que producía una imagen borrosa y poco clara. Con el avance de la tecnología, se desarrollaron técnicas de pixelado digital que permiten la ocultación de contenido en tiempo real.</p>
<p style="text-align: justify;">
En la década de 1980, el pixelado comenzó a utilizarse en el cine para ocultar desnudos y escenas de violencia en películas clasificadas para adultos. En la década de 1990, la técnica se popularizó en la televisión y se utilizó en programas de noticias para ocultar la identidad de testigos o entrevistados que deseaban permanecer anónimos.</p>

### Solución 

{{< details title="details" open=false >}}
{{< highlight js >}}
const videoXResolution = 640;
const videoYResolution = 480;

let video;
let pixelSize = 10;
const minSize = 5;
const maxSize = 50;
let windowVideoRatio;
let colorButton;
let videoModeButton;
let isProcessingEnabled = true;
let colorModeIndex = 0;
let lastColorModeIndex = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(videoXResolution, videoYResolution);
  video.hide();
  windowVideoRatio = windowWidth / video.width;
  
  colorButton = createButton("Toggle color modes");
  colorButton.size(200, 50);
  colorButton.position(220, windowHeight - 60);
  colorButton.mousePressed(changeColorMode);

  colorButton = createButton("Toggle processing");
  colorButton.size(200, 50);
  colorButton.position(10, windowHeight - 60);
  colorButton.mousePressed(changeProcessing);
}

function draw() {
  background(0);
  video.loadPixels();
  if (isProcessingEnabled) {
    pixelSize = int(map(mouseX, 0, windowWidth, minSize, maxSize));

    for (let x = 0; x < video.width; x += pixelSize) {
      for (let y = 0; y < video.height; y += pixelSize) {
        
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        let newColor = getColor(r, g, b);

        // Scale to fit windowWidth:
        let scaledX = floor(x * windowVideoRatio);
        let scaledY = floor(y * windowVideoRatio);
        let scaledPixelSize = ceil(pixelSize * windowVideoRatio);

        noStroke();
        fill(newColor);
        rect(scaledX, scaledY, scaledPixelSize, scaledPixelSize);
      }
    }
  } else {
    image(video, 0,0, videoXResolution * windowVideoRatio, 
          videoYResolution * windowVideoRatio);
  }
  
  textSize(16);
  fill(255);
  text(`Pixel size: ${pixelSize} - Frame rate: ${int(frameRate())}`, 10, windowHeight - 80);
}

function changeColorMode() {
  if (colorModeIndex < lastColorModeIndex) {
    colorModeIndex++;
  } else {
    colorModeIndex = 0;
  }
}

function changeProcessing() {
  isProcessingEnabled = !isProcessingEnabled;
}

function getColor(r, g, b) {
  let newColor;
  switch (colorModeIndex) {
    case 0:
      newColor = color(r, g, b);
      break;
    case 1:
      newColor = getGrayScaleColor(r, g, b);
      break;
    case 2:
      newColor = getGameboyColor(r, g, b);
      break;
    case 3:
      newColor = getFunkyFutureColor(r, g, b);
      break;
    case 4:
      newColor = getFairyDustColor(r, g, b);
      break;
  }

  return newColor;
}

function getGrayScaleColor(r, g, b) {
  // Gray scale based on linear luminance for each color channel:
  // https://en.wikipedia.org/wiki/Grayscale
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getGameboyColor(r, g, b) {
  // Color palette source:
  // https://lospec.com/palette-list/kirokaze-gameboy

  let grayScale = getGrayScaleColor(r, g, b);
  let colorPalette = ["#332c50", "#46878f", "#94e344", "#e2f3e4"];
  let index = floor(map(grayScale, 0, 255, 0, 4));

  return colorPalette[index];
}

function getFunkyFutureColor(r, g, b) {
  // Color palette source:
  // https://lospec.com/palette-list/funkyfuture-8

  let colorPalette = [
    "#2b0f54",
    "#ab1f65",
    "#ff4f69",
    "#fff7f8",
    "#ff8142",
    "#ffda45",
    "#3368dc",
    "#49e7ec",
  ];
 
  return getNearestColorInPalette(colorPalette, r, g, b);
}

function getFairyDustColor(r, g, b) {
  // Color palette source:
  // https://lospec.com/palette-list/fairydust-8

  let colorPalette = [
    "#f0dab1",
    "#e39aac",
    "#c45d9f",
    "#634b7d",
    "#6461c2",
    "#2ba9b4",
    "#93d4b5",
    "#f0f6e8",
  ];
 
  return getNearestColorInPalette(colorPalette, r, g, b);
}

function getNearestColorInPalette(colorPalette, r, g, b) {
  let nearestColorIndex = 0;
  let nearestColorDistance = 255;
  for (let c = 0; c < colorPalette.length; c++) {
    let indexColor = color(colorPalette[c]);
    let indexRed = red(indexColor);
    let indexGreen = green(indexColor);
    let indexBlue = blue(indexColor);
    let colorDist = dist(r, g, b, indexRed, indexGreen, indexBlue);
    if (colorDist < nearestColorDistance) {
      nearestColorDistance = colorDist;
      nearestColorIndex = c;
    }
  }

  return colorPalette[nearestColorIndex];
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/pixelator.js" width="740" height="450" >}}

<p style="text-align: justify;">
En esta aplicación se hace uso de la cámara del computador y se pixelea la imagen en simultáneo que se muestra en el lienzo. Otra característica de esta aplicación es que se puede cambiar el tamaño de los pixeles con el mouse, hacia la esquina superior izquierda disminuye y hacia la esquina inferior derecha aumenta el tamaño. También tiene dos botones uno para alternar el procesamiento entre la imagen original y la imagen pixelada y el otro botón es para alternar entre varios modos de color. En la función draw(), el código establece el fondo en negro y carga los píxeles del video. Si el procesamiento está habilitado, actualiza el tamaño de píxel según la posición del mouse y recorre cada píxel del video, recuperando su color y dibujando un rectángulo con el color correspondiente según el modo de color seleccionado.</p>
<p style="text-align: justify;">
En cuanto a el promedio de color esta es una medida simple y rápida de obtener información sobre el color de una imagen, mientras que la coherencia espacial es una medida más compleja que proporciona información sobre la calidad visual y la precisión de una imagen. El promedio de color es lo que se utiliza para definir el color que tomará el píxel cuando cambia de tamaño y se calcula rápidamente en el ejercicio cuando los píxeles son de mayor tamaño, debido a la gran cantidad de píxeles cuando estos disminuyen de tamaño se deben hacer más cálculos y es por esto que la imagen se congele. Y la coherencia espacial en este ejercicio es mejor cuando el mouse se encuentra en el punto medio del lienzo pues la calidad visual es buena y fluida y se tiene una precisión de la imagen adecuada donde se reconoce lo que se visualiza. </p>
<p style="text-align: justify;">
La calidad visual de los resultados con los píxeles de menor tamaño es pésima puesto que la imagen se congela ya que debe procesar mucha más información que cuando se visualiza el video con los píxeles de mayor tamaño, el problema es que usando los píxeles de mayor tamaño no se obtiene una imagen detallada de lo que se está visualizando. Sin embargo en el término medio, la imagen no se congela y la imagen a pesar de mostrar cierto grado de pixelado se logra reconocer lo que se está visualizando.</p>

## Conclusiones
<p style="text-align: justify;">
El pixelado de videos es un efecto visual que se produce cuando se reduce el número de píxeles de una imagen. A menudo se utiliza para ocultar detalles no deseados en un video o para crear una estética retro. Sin embargo, el pixelado también puede ser un indicio de baja calidad de video o de problemas técnicos en la transmisión o procesamiento. A medida que la tecnología avanza, el pixelado se ha vuelto menos común en los videos de alta calidad, pero sigue siendo una técnica utilizada en ciertos contextos creativos y artísticos. Es un aspecto importante a considerar en la producción y visualización de videos, ya que puede afectar la calidad visual y la experiencia del espectador.</p>

## Trabajo futuro
<p style="text-align: justify;">
Aún hay mucho espacio para el trabajo futuro en esta área en cuanto a las mejoras en la calidad del pixelado. A medida que los videos se vuelven cada vez más detallados y de alta resolución, el pixelado puede parecer menos realista o efectivo. Los investigadores podrían trabajar en desarrollar técnicas de pixelado más avanzadas que conserven más detalles en la imagen original.</p>

## Referencias
[1] https://www.tecnologia-informatica.com/que-son-pixeles-pixelado-pixel-art/

[2] https://www.youtube.com/watch?v=M3wTNVICUTg

