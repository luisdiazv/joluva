---
weight: 1
---
# Texturing
{{< p5-iframe sketch="/showcase/sketches/spcoh.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

### Problema
Implemente un banco de imágenes de tal forma que pueda escoger imágenes de el, implemente un pixelator que no use coherencia espacial.

### Manual de usuario del Sketch
<p style="text-align: justify;">
El skectch cuenta con un slider, el cual permite cambiar el nivel de pixelamiento de la imagen, entre mas grande sea el valor del slider, menos pixelada estará la imagen. Gracias al selector debajo del slider, es posible cambiar entre la imagen pixelada y la imagen original.
</p>

### Implementación


<p style="text-align: justify;">
La implementación de este sketch es bastante similar a la implementación dada en la página del curso, es decir, en ambos casos se usa el mapeo de los valores de los pixeles asignándoles el valor del pixel en la posición floor(x*value)/value tanto para el eje x como el eje y. 
</p>
<p style="text-align: justify;">
El valor agregado de este sketch consiste en que se reduce la coherencia espacial cambiando la fórmula dependiendo de las posiciones de los pixeles (inicialmente se buscó implementarlo de forma aleatoria pero glsl no tiene la capacidad de generar números aleatorios). Para algunos pixeles se utilizaba la función mencionada anteriormente mientras que para otros se reemplazaba la función "floor()" por la función "ceil()", de esta manera se rompe un poco la coherencia espacial ya que se disminuye la uniformidad de la imagen pixelada. 
</p>

<p style="text-align: justify;">
El cambio mencionado anteriormente genera un par de diferencias visuales con respecto al sketch original. Primero que todo se genera un mayor nivel de pixelamiento para el mismo valor de "value", la otra diferencia radica en que se generan ciertos patrones de cuadrículas que deforman ligeramente la imagen.
</p>



### Código

{{< highlight js >}}
precision mediump float;
uniform sampler2D source;
uniform bool original;
uniform float resolution;


varying vec2 texcoords2; 

void main() {

   float randx = mod(floor(texcoords2.x*10.0),2.0);
   float randy = mod(floor(texcoords2.y*10.0),2.0); 

   if (original) {
     gl_FragColor = texture2D(source, texcoords2);
   }else {
     vec2 stepCoord = texcoords2 * resolution;
     float x = randx == 0.0 ? floor(stepCoord.x) : ceil(stepCoord.x);
     float y = randy == 0.0 ? floor(stepCoord.y) : ceil(stepCoord.y);
     stepCoord = vec2(x,y);
     stepCoord = stepCoord / vec2(resolution);
     gl_FragColor =  texture2D(source, stepCoord);
   }
}
{{< /highlight >}}