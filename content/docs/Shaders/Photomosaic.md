---
bookFlatSection: true
weight: 4
---
# Photomosaic

## Strategy

{{< hint info >}}
**Ejercicio**  
A continuación se implementó una aplicación visual de mosaico. 
{{< /hint >}}

## Introducción
<p style="text-align: justify;">
En el campo de la informática visual, las aplicaciones basadas en mosaicos han ganado popularidad debido a su capacidad para representar y manipular imágenes de una manera única y creativa. Los mosaicos consisten en la subdivisión de una imagen en pequeñas piezas llamadas teselas, que se ensamblan para formar una composición visual. Algunos de los enfoques más comunes incluyen la selección de teselas basada en la similitud de color, textura o forma con la región objetivo. [1]</p>

## Antecedentes y trabajo previo
<p style="text-align: justify;">
Los mosaicos han sido utilizados durante siglos como una forma de arte decorativo en la arquitectura, el diseño de interiores y la creación de obras pictóricas. Sin embargo, con el avance de la tecnología digital, se han desarrollado herramientas y algoritmos que permiten la creación automatizada de mosaicos a partir de imágenes digitales.</p>

<p style="text-align: justify;">
En el ámbito de la informática, varios investigadores han explorado el uso de algoritmos de mosaicos para la generación y manipulación de imágenes. Estos algoritmos se basan en técnicas de segmentación de imágenes, donde la imagen original se divide en regiones o teselas de forma coherente. Ha demostrado su utilidad en diversas áreas, como la creación de collages, la generación de efectos artísticos, la compresión de imágenes y en el campo de la realidad aumentada para la superposición de imágenes virtuales en entornos del mundo real. Estas aplicaciones han demostrado el potencial creativo y estético de los mosaicos, así como su utilidad en la representación visual de información. [2]</p>

## Solución 

{{< details title="details" open=false >}}
{{< highlight js >}}
let img;
let showOriginal = false; // Variable para controlar si se muestra la imagen original

function preload() {
    img = loadImage('/showcase/sketches/paisaje.jpg');
}

function setup() {
    createCanvas(img.width, img.height);
    noLoop();

    // Crear el botón de interruptor
    let switchButton = createButton('Mostrar Original');
    switchButton.position(10, 10);
    switchButton.mousePressed(toggleShowOriginal);
}

function draw() {
    drawMosaic(3, color(30, 30, 30));

    // Mostrar la imagen original si showOriginal es true
    if (showOriginal) {
        image(img, 0, 0);
    }
}

function toggleShowOriginal() {
    // Cambiar el estado de showOriginal al hacer clic en el botón de interruptor
    showOriginal = !showOriginal;
    redraw(); // Volver a dibujar la pantalla
}

const columnWidth = (dotRadius) => dotRadius * 3;

const numberOfColumns = (dotRadius) =>
    Math.ceil(width / columnWidth(dotRadius));

function drawColumnDots(dotRadius, offsetX) {
    line(offsetX, 0, offsetX, height);
}

function drawMosaic(dotRadius, backgroundColor) {
    background(backgroundColor);
    for (let i = 0; i < numberOfColumns(dotRadius); i++) {
        offsetX = i * columnWidth(dotRadius);
        drawColumnDots(dotRadius, offsetX);
    }
}

function drawColumnDots(dotRadius, offsetX) {
    line(offsetX, 0, offsetX, height);

    let dotDiameter = 2 * dotRadius;
    let dotHeightWithPadding = dotDiameter + 2;
    let numDotsInColumn = Math.floor(height / dotHeightWithPadding);
    let topY = Math.floor(random(10));

    for (let i = 0; i < numDotsInColumn; i++) {
        let centerX = Math.floor(random(
            offsetX + dotRadius,
            offsetX + columnWidth(dotRadius) - dotRadius,
        ))

        let centerY = topY + i * dotHeightWithPadding + dotRadius;

        let dotColor = img.get(centerX, centerY);
        noStroke()
        fill(dotColor);

        ellipse(centerX, centerY, dotDiameter, dotDiameter);
    }
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/mosaic.js" width="720" height="424" >}}

<p style="text-align: justify;">
El programa carga una imagen y genera una cuadrícula de mosaicos. Para cada celda de la cuadrícula, se calcula el color promedio en la región correspondiente de la imagen original y luego se dibujan los mosaicos en el lienzo. Se utilizó un fondo oscuro para poder visualizar mejor las teselas que forman parte de la composición visual. La imagen original que se subdividió para formar el mosaico visual se puede visualizar haciendo click en el botón 'Mostrar Original', se puede cambiar de nuevo al mosaico haciendo click en dicho botón nuevamente. [3]</p>

## Conclusiones
<p style="text-align: justify;">
Las aplicaciones visuales de mosaicos han evolucionado significativamente con el avance de la tecnología digital y los algoritmos de procesamiento de imágenes. La capacidad para representar imágenes de manera creativa y generar efectos visuales únicos ha impulsado su popularidad en diversos campos, desde el arte y el diseño hasta la realidad aumentada. La técnica de mosaicos ofrece una forma interesante de dividir y reorganizar la información visual, creando composiciones visuales llamativas y originales.</p>

## Trabajo futuro
<p style="text-align: justify;">
A pesar de los avances logrados en las aplicaciones visuales de mosaicos, aún existen varias direcciones de investigación prometedoras para el futuro. Donde se puede mejorar la calidad y precisión de los algoritmos de selección de teselas, explorar nuevos tipos de mosaicos con formas irregulares no convencionales u objetos 3D e integraciones con técnicas de inteligencia artificial. A medida que se sigan explorando nuevas técnicas y enfoques, es probable que veamos un crecimiento continuo en su utilidad y potencial creativo, abriendo un mundo de posibilidades en la representación visual y la manipulación de imágenes.</p>

## Referencias
[1] https://www.significados.com/mosaico/

[2] https://sisbib.unmsm.edu.pe/bibvirtual/publicaciones/risi/2009_n2/v6n2/a02v6n2.pdf

[3] https://dev.to/andyhaskell/convert-images-to-mosaics-in-p5js-2dlc