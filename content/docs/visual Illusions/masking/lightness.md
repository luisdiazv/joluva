---
weight: 3
---
## Lightness variation
{{< details title="p5-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-iframe sketch="/showcase/sketches/lightness.js" width="700" height="900" */>}}
{{< /highlight >}}
{{< /details >}}



{{< p5-iframe sketch="/showcase/sketches/lightness.js" width="700" height="900" >}}

### Code

{{< highlight js >}}

let img;
let brightness_reduction = 0;

function calculate_hue(r_prime, g_prime, b_prime) {
  // Geometric method
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let h = 0;
  let s = 0;
  if (delta == 0) {
    h = 0; // Can be any color
  } else if (c_max == r_prime) {
    h = 60 * (((g_prime - b_prime) / delta) % 6);
  } else if (c_max == g_prime) {
    h = 60 * ((b_prime - r_prime) / delta + 2);
  } else if (c_max == b_prime) {
    h = 60 * ((r_prime - g_prime) / delta + 4);
  }

  if (c_max) {
    s = delta / c_max;
  }

  return h;
}

function calculate_saturation(r_prime, g_prime, b_prime) {
  // Distance from center to max
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let s = 0;
  if (c_max) {
    s = 1 - c_min / c_max;
  }

  return s * 100;
}


function calculate_hsl_saturation(r_prime, g_prime, b_prime) {
  // Distance from center to max
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let s = 0;
  if (calculate_lightness(r_prime, g_prime, b_prime) != 0 && calculate_lightness(r_prime, g_prime, b_prime) != 100) {
    s = delta / (1 - abs(2 * c_max - 1));
  }

  return s * 100;
}

function calculate_lightness(r_prime, g_prime, b_prime) {
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let l = (c_max + c_min) / 2;
  return l * 100;
}

function get_pixel_position(x, y, width) {
  return (x + y * width) * 4;
}

function get_pixel_color(x, y, width) {
  let xy = get_pixel_position(x, y, width);
  return [
    img.pixels[xy],
    img.pixels[xy + 1],
    img.pixels[xy + 2],
    img.pixels[xy + 3],
  ];
}


function set_hsl(colour) {
  let r_prime = colour[0] / 255;
  let g_prime = colour[1] / 255;
  let b_prime = colour[2] / 255;

  let h = calculate_hue(r_prime, g_prime, b_prime);
  let s = calculate_hsl_saturation(r_prime, g_prime, b_prime);
  let l = calculate_lightness(r_prime, g_prime, b_prime);
  let hsl = [h, s, l];
  return hsl;
}

function preload() {
  img = loadImage("/showcase/sketches/lennna.jpg");
  img.loadPixels();
}

function setup() {
  createCanvas(600, img.height*2);
  background(255);
}

function keyPressed() {
  if (keyCode === 68) { // 
    brightness_reduction -= 5;

  }
  else if (keyCode === 65) { // 
    brightness_reduction += 5;

  }
  else if (keyCode === 87) { // 
    brightness_reduction -= 1;
  }
  else if (keyCode === 83) { //
    brightness_reduction += 1;
  }

  if (brightness_reduction > 100) {
    brightness_reduction = 100;
  }
  else if (brightness_reduction < -100) {
    brightness_reduction = -100;
  }


}

function draw() {
  // put drawing code here  


  // Change the image brightness in RGB mode

  colorMode(RGB);
  background(255);
  text("Brightness reduction: " + brightness_reduction, 10, 510);

  image(img, 0, 20);
  text("Original Image", img.width / 3, 10);
  img.loadPixels();
  

  // Change image brightness with HSL color mode

  colorMode(HSL);
  changed_img = img.get();
  changed_img.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let new_hsl_color = set_hsl(get_pixel_color(i, j, img.width));
      new_hsl_color[2] = new_hsl_color[2] - (brightness_reduction  );
      changed_img.set(i, j, color(new_hsl_color));
    }
  }
  changed_img.updatePixels();

  image(changed_img, 0, img.height);

  text("Changed Image (HSL)", img.width / 3, img.height);

}

{{< /highlight >}}

### Problema a resolver
Implementar un programa que permita variar la luminosidad de una imagen.

### Concepto
<p style="text-align: justify;">
La luminosidad de una imagen se refiere a la cantidad de luz o brillo presente en la imagen en su totalidad. En términos de procesamiento de imágenes digitales, la luminosidad se puede medir en una escala de valores numéricos, que van desde 0 (negro total) hasta 255 (blanco total) en el espacio de color RGB (rojo, verde, azul).
</p>
<p style="text-align: justify;">
Por otro lado, el modelo de color HSL (tono, saturación, luminosidad) se utiliza a menudo en el procesamiento de imágenes y la edición de fotografías. En el modelo de color HSL, la luminosidad es una de las tres dimensiones de la imagen, junto con el tono y la saturación. La luminosidad en el modelo HSL se representa en una escala de valores numéricos de 0 a 100, donde 0 es el negro total y 100 es el blanco total.
</p>

<p style="text-align: justify;">
En resumen, la luminosidad de una imagen se refiere a la cantidad de luz o brillo presente en la imagen en su totalidad, mientras que el modelo de color HSL es un modelo de color que se utiliza a menudo en el procesamiento de imágenes y que incluye la dimensión de luminosidad para medir la claridad de la imagen.
</p>

### Implementación

<p style="text-align: justify;">
La implementación consta de un algoritmo en el cual se recibe una imagen cuya representación en rgb se transforma a hsl mediante el uso de las fórmulas
correspondientes. Una vez se tiene la imagen en formato hsl, la variación de la luminosidad depende de variar el valor de l.
</p>

### Conclusiones

<p style="text-align: justify;">
En conclusión, la luminosidad de una imagen es un factor importante en el procesamiento de imágenes digitales, ya que afecta la claridad y el brillo de la imagen en su totalidad.
Además, la capacidad de ajustar la luminosidad de una imagen puede tener un gran impacto en su aspecto general. Por ejemplo, aumentar la luminosidad puede hacer que la imagen parezca más brillante y vívida, mientras que reducir la luminosidad puede hacer que la imagen parezca más oscura y tenue. Por lo tanto, la comprensión de la luminosidad de una imagen y cómo se puede ajustar en el modelo HSL puede ser muy útil para los fotógrafos, diseñadores gráficos y otros profesionales que trabajan con imágenes digitales.
</p>