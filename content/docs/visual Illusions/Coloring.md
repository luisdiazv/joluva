---
weight: 1
---
# __Coloring__

## __Color blindness__ 

### Problema
Implementar una aplicación de mapeo de colores que ayude a las personas daltónicas a ver los colores que les rodean.

### Introducción
La daltonismo es una discapacidad visual que afecta a aproximadamente el 8% de la población masculina y el 0.5% de la población femenina. Esta condición hace que las personas tengan dificultades para distinguir ciertos colores y tonalidades, lo que puede dificultar su vida cotidiana en situaciones en las que los colores son importantes, como la señalización vial o la elección de la ropa.

### Antecedentes y trabajo previo
Existen diversas herramientas y tecnologías que pueden ayudar a las personas daltónicas a identificar los colores que les rodean. Por ejemplo, se han desarrollado gafas especiales que filtran ciertos tonos de luz para mejorar la percepción de los colores. También existen aplicaciones móviles que utilizan la cámara del dispositivo para identificar los colores y mostrarlos en una escala de tonalidades más amplia, permitiendo a las personas daltónicas distinguir mejor los colores.
En este contexto, se propone el desarrollo de una aplicación de mapeo de colores que permita a las personas daltónicas ver los colores que les rodean de una manera más clara y precisa. Esta aplicación podría ser útil en una amplia variedad de situaciones, desde la navegación en espacios públicos hasta la elección de la ropa.

### Implementación
En esta implementación se usó la _imagen original_ como referencia y se aplico la simulación y la corrección de color de dicha imagen usando el modelo de color LMS, ya que esté modelo de color se basa en 3 componentes equivalentes a cada cono que hay en el ojo humano.

### Solución
{{< details title="Código (simulación de daltonismo)" open=false >}}
{{< highlight js >}}
let colorMatrix = [0, 0, 0, 0, 1, 0, 0, 0, 1]

function draw() {
  createCanvas(400,300);
  let img = loadImage('/showcase/sketches/store.jpg',function(){;
    image(img, 0, 0, width, height);
    colorMode(RGB, 255);
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i+1];
      let b = pixels[i+2];
      pixels[i]   = r * colorMatrix[0] + g * colorMatrix[1] + b * colorMatrix[2];
      pixels[i+1] = r * colorMatrix[3] + g * colorMatrix[4] + b * colorMatrix[5];
      pixels[i+2] = r * colorMatrix[6] + g * colorMatrix[7] + b * colorMatrix[8];
  }
})
  updatePixels();
}
{{< /highlight >}}
{{< /details >}}

{{< details title="Código (corrección de color)" open=false >}}
{{< highlight js >}}
let colorMatrix = [0, 1.05118294, -0.05116099, 0, 1, 0, 0, 0, 1]; //Protanopia
function draw() {
  createCanvas(400,300);
  let img = loadImage('/showcase/sketches/store.jpg',function(){;
    image(img, 0, 0, width, height);
    colorMode(RGB, 255);
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i+1];
      let b = pixels[i+2];
      pixels[i]   = r * colorMatrix[0] + g * colorMatrix[1] + b * colorMatrix[2];
      pixels[i+1] = r * colorMatrix[3] + g * colorMatrix[4] + b * colorMatrix[5];
      pixels[i+2] = r * colorMatrix[6] + g * colorMatrix[7] + b * colorMatrix[8];
  }
})
  updatePixels();
}  
{{< /highlight >}}
{{< /details >}}

#### Imagen Original

{{< p5-iframe sketch="/showcase/sketches/vi_3_1.js" width="425" height="325" >}}

#### Simulando el daltonismo
Para éstos ejercicios decidimos trabajar sobre los dicromatismos, debido a que es el tipo de daltonismo más común, y son los cuales se pueden simular y corregir con mayor exactitud.

##### Protanopia
La protanopia es el tipo de daltonismo en el cual no funcionan los conos que perciben las ondas electromagnéticas largas que representan el rojo.

{{< p5-iframe sketch="/showcase/sketches/vi_3_2_1.js" width="425" height="325" >}}

##### Deuteranopia
La deuteranopia es el tipo de daltonismo en el cual no funcionan los conos que perciben las ondas electromagnéticas medianas que representan el verde.

{{< p5-iframe sketch="/showcase/sketches/vi_3_2_2.js" width="425" height="325" >}}

##### Tritanopia
La tritanopia es el tipo de daltonismo en el cual no funcionan los conos que perciben las ondas electromagnéticas cortas que representan el color azul.

{{< p5-iframe sketch="/showcase/sketches/vi_3_2_3.js" width="425" height="325" >}}

#### Corrigiendo el daltonismo

##### Protanopia
{{< p5-iframe sketch="/showcase/sketches/vi_3_3_1.js" width="425" height="325" >}}

##### Deuteranopia
{{< p5-iframe sketch="/showcase/sketches/vi_3_3_2.js" width="425" height="325" >}}

##### Tritanopia
{{< p5-iframe sketch="/showcase/sketches/vi_3_3_3.js" width="425" height="325" >}}




### Conclusiones
El desarrollo de una aplicación de mapeo de colores para personas daltónicas puede ser una herramienta muy útil para mejorar la calidad de vida de las personas que sufren de esta discapacidad visual. Con la ayuda de esta aplicación, las personas daltónicas pueden tener una mejor comprensión de los colores que les rodean y, por lo tanto, tomar decisiones más informadas en su vida cotidiana.

### Trabajo futuro
En el futuro, se podrían seguir mejorando las tecnologías existentes para ayudar a las personas daltónicas a percibir los colores con mayor claridad. Además, se podrían desarrollar nuevas herramientas y aplicaciones para ayudar a las personas daltónicas en situaciones específicas, como la elección de la ropa o la identificación de señales de tráfico. También sería importante seguir investigando sobre la percepción del color y cómo se puede mejorar la calidad de vida de las personas que sufren de daltonismo.

#### Referencias
https://ixora.io/projects/colorblindness/color-blindness-simulation-research/
http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf


## __Color Models__

### Problema
Investiga otros modelos de color como HSL, HSB, XYZ.

### Introducción
Los modelos de color son sistemas matemáticos que se utilizan para representar los colores de una manera numérica. Estos modelos son importantes en diversos campos, como el diseño gráfico, la impresión, la fotografía y la computación gráfica. Entre los modelos de color más comunes se encuentran el modelo RGB y el modelo CMYK, pero existen otros modelos que también son importantes y que ofrecen diferentes enfoques para representar los colores, como el modelo HSL, HSB y XYZ.
Los modelos de color HSL, HSB y XYZ son tres formas diferentes de representar los colores.

### Antecedentes y trabajo previo
Los modelos de color son sistemas matemáticos que se utilizan para representar los colores de una manera numérica. Estos modelos son importantes en diversos campos, como el diseño gráfico, la impresión, la fotografía y la computación gráfica. Entre los modelos de color más comunes se encuentran el modelo RGB y el modelo CMYK, pero existen otros modelos que también son importantes y que ofrecen diferentes enfoques para representar los colores.

### Solución
Además se investigó sobre el modelo CIE Lab y el LMS

#### HSL
El modelo de color HSL (Hue, Saturation, Lightness) describe el color en términos de matiz, saturación y luminosidad. El matiz se refiere al tono del color, mientras que la saturación se refiere a la pureza del color y la luminosidad se refiere a la cantidad de luz presente en el color. En el modelo HSL, los valores de matiz varían de 0 a 360 grados, los valores de saturación varían de 0 a 100% y los valores de luminosidad varían de 0 a 100%.

#### HSB
El modelo de color HSB (Hue, Saturation, Brightness) es similar al modelo HSL, pero en lugar de luminosidad utiliza el brillo para describir la cantidad de luz presente en el color. El matiz y la saturación son los mismos que en el modelo HSL, mientras que el brillo varía de 0 a 100%.

#### XYZ
El modelo de color XYZ se basa en la percepción del color por parte del ojo humano. Describe los colores en términos de tres componentes: X, Y y Z. La componente X se refiere a la cantidad de luz roja-verde, la componente Y se refiere a la cantidad de luz amarillo-azul y la componente Z se refiere a la cantidad de luz blanca-negra. Los valores de cada componente varían de 0 a 100.

#### CIE Lab
El modelo de color CIE Lab* (también conocido como CIELAB o simplemente Lab) es un modelo de color que se utiliza para describir los colores en términos de tres componentes: luminosidad (L*), eje a* (que va de rojo a verde) y eje b* (que va de amarillo a azul). El componente L* se refiere a la luminosidad del color y varía de 0 a 100, donde 0 representa el negro absoluto y 100 representa el blanco absoluto. El eje a* varía de -128 a +127 y representa la intensidad de rojo o verde del color, siendo valores positivos para el rojo y valores negativos para el verde. El eje b* varía de -128 a +127 y representa la intensidad de amarillo o azul del color, siendo valores positivos para el amarillo y valores negativos para el azul.

#### LMS

El modelo de color LMS es un modelo de color que se basa en la respuesta de los tres tipos de células cónicas en la retina del ojo humano: los conos sensibles a la luz de longitud de onda corta (L), los conos sensibles a la luz de longitud de onda media (M) y los conos sensibles a la luz de longitud de onda larga (S). El modelo de color LMS se utiliza comúnmente en la visión computacional y en la psicología de la visión para medir la sensibilidad de la percepción humana a diferentes longitudes de onda de la luz. El modelo se basa en la premisa de que cualquier color puede ser generado a partir de la combinación de los tres colores primarios L, M y S.  En el modelo de color LMS, se utilizan tres valores numéricos para representar un color: L, M y S. Estos valores representan la cantidad de estimulación de los tres tipos de conos cónicos en la retina. Los valores L, M y S se miden en unidades arbitrarias que representan la tasa de absorción de fotones en los conos cónicos. El modelo de color LMS es importante porque permite una mejor comprensión de cómo el ojo humano percibe los colores. Al comprender cómo la retina y los conos cónicos funcionan juntos para percibir los colores, los científicos pueden desarrollar tecnologías más avanzadas y precisas para la visión computacional y la reproducción de color en pantallas.

### Conclusiones
El conocimiento de modelos de color adicionales como HSL, HSB y XYZ puede ser muy útil para profesionales en áreas como diseño gráfico, impresión y fotografía, permitiéndoles tener una representación más amplia y precisa de los colores que se utilizan en su trabajo.
El modelo HSL es particularmente útil para los diseñadores gráficos, ya que les permite ajustar la saturación y luminosidad del color de una manera más intuitiva que el modelo RGB. El modelo HSB es más adecuado para la selección de colores basada en tonalidades y brillos, como en la edición de imágenes.
El modelo XYZ es especialmente importante en la investigación de la visión del color y la psicología del color, y puede proporcionar información útil para mejorar la percepción del color en las aplicaciones informáticas y de pantalla.

### Trabajo futuro
En el futuro, se podrían seguir explorando otros modelos de color y sus aplicaciones en diferentes campos, como la psicología del color, la física de la luz y la tecnología de pantallas. También sería importante investigar cómo se pueden utilizar estos modelos para mejorar la calidad de imagen y la precisión del color en las aplicaciones informáticas.