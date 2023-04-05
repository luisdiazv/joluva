---
weight: 3
---
## Lightness variation

### Problema a resolver
Implementar un programa que permita variar la luminosidad de una imagen.

### Introducción
<p style="text-align: justify;">
La luminosidad de una imagen se refiere a la cantidad de luz o brillo presente en la imagen en su totalidad. En términos de procesamiento de imágenes digitales, la luminosidad se puede medir en una escala de valores numéricos, que van desde 0 (negro total) hasta 255 (blanco total) en el espacio de color RGB (rojo, verde, azul).
</p>
<p style="text-align: justify;">
Por otro lado, el modelo de color HSL (tono, saturación, luminosidad) se utiliza a menudo en el procesamiento de imágenes y la edición de fotografías. En el modelo de color HSL, la luminosidad es una de las tres dimensiones de la imagen, junto con el tono y la saturación. La luminosidad en el modelo HSL se representa en una escala de valores numéricos de 0 a 100, donde 0 es el negro total y 100 es el blanco total.
</p>

<p style="text-align: justify;">
En resumen, la luminosidad de una imagen se refiere a la cantidad de luz o brillo presente en la imagen en su totalidad, mientras que el modelo de color HSL es un modelo de color que se utiliza a menudo en el procesamiento de imágenes y que incluye la dimensión de luminosidad para medir la claridad de la imagen.
</p>

### Antecedentes y trabajo previo
<p style="text-align: justify;">
El trabajo previo relacionado con HSL ha incluido la investigación y el desarrollo de métodos para convertir entre el modelo HSL y otros modelos de color, como RGB, CMYK y CIE-LAB. También se han investigado y desarrollado métodos para manipular y transformar los valores HSL, como ajustar la saturación y la luminosidad para crear diferentes efectos visuales.
</p>
<p style="text-align: justify;">
Además, se han utilizado los valores HSL en diversas aplicaciones y campos, como la impresión, el diseño gráfico, la visualización de datos y la computación gráfica. En el diseño gráfico y la visualización de datos, la manipulación de valores HSL se utiliza a menudo para crear paletas de colores coherentes y atractivas, y para resaltar áreas de interés en los gráficos. En la computación gráfica, los valores HSL se utilizan a menudo para controlar la apariencia de los objetos tridimensionales y los efectos de iluminación en las escenas renderizadas.
</p>

### Solución
<p style="text-align: justify;">
{{< details title="p5-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-iframe sketch="/showcase/sketches/lightness.js" width="700" height="900" */>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/lightness.js" width="700" height="900" >}}
</p>

### Implementación

<p style="text-align: justify;">
La implementación consta de un algoritmo en el cual se recibe una imagen cuya representación en rgb se transforma a hsl mediante el uso de las fórmulas
correspondientes. Una vez se tiene la imagen en formato hsl, la variación de la luminosidad depende de variar el valor de l. Para obtener la nueva luminosidad 
se utiliza un input en la ezquina superior izquierda. Un problema que se evidenció en esta implementación fue que la imagen tiende a tener un tono mas rojizo
al hacer el cambio entre RGB y HSL.
</p>

### Código
{{< highlight js >}}
let img;
let brightnessValue = 45;


function get_pixel_position(x, y, width) {
  return (x + y * width) * 4;
}

function get_pixel_color(x, y, width) {
  let xy = get_pixel_position(x, y, width);
  return [
    img.pixels[xy],
    img.pixels[xy + 1],
    img.pixels[xy + 2],
    //img.pixels[xy + 3],
  ];
}


function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function preload() {
  img = loadImage("/showcase/sketches/lennna.jpg");
  img.loadPixels();
}

function setup() {
  createCanvas(600, img.height*2);
  background(255);
  inp = createInput('');
  inp.position(0, 0);
  inp.size(100);
  inp.input(myInputEvent);
}


function myInputEvent() {
  brightnessValue = parseInt(this.value());
}

function draw() {
  // put drawing code here  


  // Change the image brightness in RGB mode

  colorMode(RGB);
  background(255);
  text("Brightness value: " + brightnessValue, 10, 510);

  image(img, 0, 20);
  text("Original Image", img.width / 3, 10);
  img.loadPixels();
  

  // Change image brightness with HSL color mode

  colorMode(HSL);
  changed_img = img.get();
  changed_img.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let new_hsl_color = rgbToHsl(get_pixel_color(i, j, img.width));
      new_hsl_color[2] = brightnessValue;
      changed_img.set(i, j, color(new_hsl_color));
    }
  }
  changed_img.updatePixels();

  image(changed_img, 0, img.height);

  text("Changed Image (HSL)", img.width / 3, img.height);

}

{{< /highlight >}}

### Conclusiones

<p style="text-align: justify;">
En conclusión, la luminosidad de una imagen es un factor importante en el procesamiento de imágenes digitales, ya que afecta la claridad y el brillo de la imagen en su totalidad.
Además, la capacidad de ajustar la luminosidad de una imagen puede tener un gran impacto en su aspecto general. Por ejemplo, aumentar la luminosidad puede hacer que la imagen parezca más brillante y vívida, mientras que reducir la luminosidad puede hacer que la imagen parezca más oscura y tenue. Por lo tanto, la comprensión de la luminosidad de una imagen y cómo se puede ajustar en el modelo HSL puede ser muy útil para los fotógrafos, diseñadores gráficos y otros profesionales que trabajan con imágenes digitales.
</p>

### Trabajo futuro
<p style="text-align: justify;">
En cuanto al futuro trabajo relacionado con el modelo de color HSL, se espera que se sigan investigando y desarrollando métodos más avanzados y eficientes para la conversión y manipulación de valores HSL. En particular, se espera que se sigan explorando métodos para la manipulación de valores HSL en el espacio perceptual, lo que permitiría una mayor flexibilidad y control sobre la apariencia visual de los objetos.
</p>
<p style="text-align: justify;">
Además, se espera que el modelo de color HSL se siga utilizando y desarrollando en una amplia gama de aplicaciones, incluyendo la realidad virtual y aumentada, la automatización del diseño gráfico, la visualización científica y médica, y la generación automática de paletas de colores.
</p>

