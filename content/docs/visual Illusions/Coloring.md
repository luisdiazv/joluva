---
weight: 1
---
# __Coloring__

## __Color blindness__ 

### Imagen Original

{{< p5-iframe sketch="/showcase/sketches/vi_3_1.js" width="425" height="325" >}}

### Simulando el daltonismo
Para éstos ejercicios decidimos trabajar sobre los dicromatismos, debido a que es el tipo de daltonismo más común, y son los cuales se pueden simular y corregir con mayor exactitud.

#### Protanopia
La protanopia es el tipo de daltonismo en el cual no funcionan los conos que perciben las ondas electromagnéticas largas que representan el rojo.

{{< p5-iframe sketch="/showcase/sketches/vi_3_2_1.js" width="425" height="325" >}}

#### Deuteranopia
La deuteranopia es el tipo de daltonismo en el cual no funcionan los conos que perciben las ondas electromagnéticas medianas que representan el verde.

{{< p5-iframe sketch="/showcase/sketches/vi_3_2_2.js" width="425" height="325" >}}

#### Tritanopia
La tritanopia es el tipo de daltonismo en el cual no funcionan los conos que perciben las ondas electromagnéticas cortas que representan el color azul.

{{< p5-iframe sketch="/showcase/sketches/vi_3_2_3.js" width="425" height="325" >}}

### Corrigiendo el daltonismo

#### Protanopia
{{< p5-iframe sketch="/showcase/sketches/vi_3_3_1.js" width="425" height="325" >}}

#### Deuteranopia
{{< p5-iframe sketch="/showcase/sketches/vi_3_3_2.js" width="425" height="325" >}}

#### Tritanopia
{{< p5-iframe sketch="/showcase/sketches/vi_3_3_3.js" width="425" height="325" >}}


### Referencias
https://ixora.io/projects/colorblindness/color-blindness-simulation-research/
http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf

## __Color Models__

Los modelos de color HSL, HSB y XYZ son tres formas diferentes de representar los colores.
### HSL
El modelo de color HSL (Hue, Saturation, Lightness) describe el color en términos de matiz, saturación y luminosidad. El matiz se refiere al tono del color, mientras que la saturación se refiere a la pureza del color y la luminosidad se refiere a la cantidad de luz presente en el color. En el modelo HSL, los valores de matiz varían de 0 a 360 grados, los valores de saturación varían de 0 a 100% y los valores de luminosidad varían de 0 a 100%.

### HSB
El modelo de color HSB (Hue, Saturation, Brightness) es similar al modelo HSL, pero en lugar de luminosidad utiliza el brillo para describir la cantidad de luz presente en el color. El matiz y la saturación son los mismos que en el modelo HSL, mientras que el brillo varía de 0 a 100%.

### XYZ
El modelo de color XYZ se basa en la percepción del color por parte del ojo humano. Describe los colores en términos de tres componentes: X, Y y Z. La componente X se refiere a la cantidad de luz roja-verde, la componente Y se refiere a la cantidad de luz amarillo-azul y la componente Z se refiere a la cantidad de luz blanca-negra. Los valores de cada componente varían de 0 a 100.

### CIE Lab
El modelo de color CIE Lab* (también conocido como CIELAB o simplemente Lab) es un modelo de color que se utiliza para describir los colores en términos de tres componentes: luminosidad (L*), eje a* (que va de rojo a verde) y eje b* (que va de amarillo a azul). El componente L* se refiere a la luminosidad del color y varía de 0 a 100, donde 0 representa el negro absoluto y 100 representa el blanco absoluto. El eje a* varía de -128 a +127 y representa la intensidad de rojo o verde del color, siendo valores positivos para el rojo y valores negativos para el verde. El eje b* varía de -128 a +127 y representa la intensidad de amarillo o azul del color, siendo valores positivos para el amarillo y valores negativos para el azul.

### LMS

El modelo de color LMS es un modelo de color que se basa en la respuesta de los tres tipos de células cónicas en la retina del ojo humano: los conos sensibles a la luz de longitud de onda corta (L), los conos sensibles a la luz de longitud de onda media (M) y los conos sensibles a la luz de longitud de onda larga (S). El modelo de color LMS se utiliza comúnmente en la visión computacional y en la psicología de la visión para medir la sensibilidad de la percepción humana a diferentes longitudes de onda de la luz. El modelo se basa en la premisa de que cualquier color puede ser generado a partir de la combinación de los tres colores primarios L, M y S.  En el modelo de color LMS, se utilizan tres valores numéricos para representar un color: L, M y S. Estos valores representan la cantidad de estimulación de los tres tipos de conos cónicos en la retina. Los valores L, M y S se miden en unidades arbitrarias que representan la tasa de absorción de fotones en los conos cónicos. El modelo de color LMS es importante porque permite una mejor comprensión de cómo el ojo humano percibe los colores. Al comprender cómo la retina y los conos cónicos funcionan juntos para percibir los colores, los científicos pueden desarrollar tecnologías más avanzadas y precisas para la visión computacional y la reproducción de color en pantallas.