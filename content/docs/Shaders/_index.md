---
bookFlatSection: true
---


# Image processing
{{< p5-iframe sketch="/showcase/sketches/fishEye.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="975" >}}

### Problema
<p style="text-align: justify;">
Implemente una app de proceso de imágenes que permita aplicar filtros de convolución de distintos tamaños, una región de interés y una herramienta de aumento.
</p>

### Manual de usuario del Sketch
<p style="text-align: justify;">
El sketch consta de un slider y distintas configuraciones con las cuales pueden variar los efectos aplicados.
El slider permite variar el tamaño de la región de interés que se forma al rededor de la posición del mouse.
</p>

<p style="text-align: justify;">
Al cambiar el estado del atributo "Filtro 3x3 o 5x5", se cambia el filtro de convolución aplicado. El filtro de tamaño 3x3 genera el efecto de los bordes de la imagen mientras que el filtro de tamaño 5x5 aumenta ligeramente la nitidez de la imagen.
</p>

<p style="text-align: justify;">
En caso de que el atributo "zone" esté desactivado, la región de interés desaparecerá tanto para las convoluciones como para el zoom y la convolución se aplicara de forma pareja a toda la imagen.
</p>

<p style="text-align: justify;">
si el atributo zone está encendido, se pueden formar las siguientes configuraciones: Zona de interés con convolución, zona de interés con aumento, zona de interés con aumento y convolución.
</p>


### Implementación

<p style="text-align: justify;">
Para poder variar los filtros de convolución se generaron dos sketches, uno correspondiente al filtro 3x3 y otro para el filtro 5x5. En ambos casos el funcionamiento es el mismo.

Para poder generar la región de interés, se tiene en cuenta la posición del mouse y la distancia de cada pixel a esta, en caso de que la distancia sea mayor a cierto radio, no se le aplicará el efecto deseado a dicho pixel.
</p>


<p style="text-align: justify;">
Para generar el efecto de aumento, se aplica un mapeo a los píxeles dentro del area de interés, en el cual a cada pixel se le asigna el valor de un pixel en una posición mas cercana a la posición del mouse, de esta forma se genera el efecto de aumento. 
</p>

<p style="text-align: justify;">
Respecto a la convolución, se utilizó el algoritmo clásico, en el cual se ponderan los valores de los pixeles aledaños a cada pixel y se le asigna ese valor a dicho pixel.
</p>

### Código
Shader para la convolución de tamaño 5x5.
{{< highlight js >}}
precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform float mask[25];
uniform float radius;
uniform vec2 mouse;
uniform bool magnify;
uniform bool zone;
uniform bool conv;
varying vec2 texcoords2;

void main() {
  float aumentFactor = 2.0;
  float dx = texcoords2.x - mouse.x;
  float dy = texcoords2.y - mouse.y;
  if((distance(mouse,texcoords2)<=radius && conv) || (!zone && conv)){
    vec2 texpos = magnify ? vec2(mouse.x+(dx/aumentFactor),mouse.y+(dy/aumentFactor)):texcoords2;
    vec2 tc0 = texpos + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texpos + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texpos + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texpos + vec2(-texOffset.s,          0.0);
    vec2 tc4 = texpos + vec2(         0.0,          0.0);
    vec2 tc5 = texpos + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texpos + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texpos + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texpos + vec2(+texOffset.s, +texOffset.t);
    vec2 tc9 = texpos + vec2(-texOffset.s-texOffset.s, -texOffset.t-texOffset.t);
    vec2 tc10 = texpos + vec2(-texOffset.s-texOffset.s, -texOffset.t);
    vec2 tc11 = texpos + vec2(-texOffset.s-texOffset.s, 0);
    vec2 tc12 = texpos + vec2(-texOffset.s-texOffset.s, +texOffset.t);
    vec2 tc13 = texpos + vec2(-texOffset.s-texOffset.s, +texOffset.t+texOffset.t);
    vec2 tc14 = texpos + vec2(-texOffset.s,+texOffset.t+texOffset.t);
    vec2 tc15 = texpos + vec2(0.0,+texOffset.t+texOffset.t);
    vec2 tc16 = texpos + vec2(+texOffset.s,+texOffset.t+texOffset.t);
    vec2 tc17 = texpos + vec2(+texOffset.s+texOffset.s,+texOffset.t+texOffset.t);
    vec2 tc18 = texpos + vec2(+texOffset.s+texOffset.s,+texOffset.t);
    vec2 tc19 = texpos + vec2(+texOffset.s+texOffset.s,0.0);
    vec2 tc20 = texpos + vec2(+texOffset.s+texOffset.s,-texOffset.t);
    vec2 tc21 = texpos + vec2(+texOffset.s+texOffset.s,-texOffset.t-texOffset.t);
    vec2 tc22 = texpos + vec2(+texOffset.s,-texOffset.t-texOffset.t);
    vec2 tc23 = texpos + vec2(0.0,-texOffset.t-texOffset.t);
    vec2 tc24 = texpos + vec2(-texOffset.s,-texOffset.t-texOffset.t);
    

    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[25];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);
    rgba[9] = texture2D(texture, tc9);
    rgba[10] = texture2D(texture, tc10);
    rgba[11] = texture2D(texture, tc11);
    rgba[12] = texture2D(texture, tc12);
    rgba[13] = texture2D(texture, tc13);
    rgba[14] = texture2D(texture, tc14);
    rgba[15] = texture2D(texture, tc15);
    rgba[16] = texture2D(texture, tc16);
    rgba[17] = texture2D(texture, tc17);
    rgba[18] = texture2D(texture, tc18);
    rgba[19] = texture2D(texture, tc19);
    rgba[20] = texture2D(texture, tc20);
    rgba[21] = texture2D(texture, tc21);
    rgba[22] = texture2D(texture, tc22);
    rgba[23] = texture2D(texture, tc23);
    rgba[24] = texture2D(texture, tc24);
    // 3. Apply convolution kernel
    vec4 convolution;
    for (int i = 0; i < 25; i++) {
        convolution += rgba[i]*mask[i];
    }

    
    
    gl_FragColor = max(min(vec4(convolution.rgb, 1.0),vec4(1.0)),vec4(0.0)); 
  }else if(magnify && distance(mouse,texcoords2)<=radius){
    gl_FragColor =  texture2D(texture,vec2(mouse.x+(dx/aumentFactor),mouse.y+(dy/aumentFactor)));
  }else{
    gl_FragColor =  texture2D(texture, texcoords2);
  }
  
}
{{< /highlight >}}
<p style="text-align: justify;">

</p>






