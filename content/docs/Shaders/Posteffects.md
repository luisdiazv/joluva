---
weight: 1
---

# Posteffects
## Blur
{{< p5-iframe sketch="/showcase/sketches/Posteffects.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="656" height="504" >}}

## Problema
Implement some posteffects you find interesting.

## Implementación 
El vertex shader toma la posición y las coordenadas de textura de un vértice en el espacio 3D. Primero, se asignan las coordenadas de textura a la variable vTexCoord. Luego, se crea un vector positionVec4 con la posición del vértice en coordenadas homogéneas. Las coordenadas x e y de positionVec4 se escalan por 2.0 y se les resta 1.0 para normalizarlas en el rango de -1.0 a 1.0. El resultado final se asigna a gl_Position, que representa la posición del vértice después de todas las transformaciones. Por otro lado tenemos el fragment shader que aplica un efecto de desenfoque gaussiano a una textura. Comienza invirtiendo las coordenadas de textura verticalmente para tener en cuenta las diferencias entre las coordenadas de textura OpenGL y las coordenadas de imagen normales. Luego, se llama a la función gaussianBlur pasando la textura de entrada (tex0), las coordenadas de textura invertidas (uv) y el tamaño del texel multiplicado por la dirección del desenfoque (texelSize * direction). La función gaussianBlur realiza múltiples muestreos de la textura en diferentes ubicaciones y aplica los pesos correspondientes para calcular el color resultante del desenfoque. El color resultante se asigna a gl_FragColor, que es el fragmento de salida con un valor alfa de 1.0.

El programa en P5.js carga los shaders effect.vert y effect.frag utilizando loadShader() en la función preload(). En la función setup(), se crea un lienzo de 640x480 píxeles y se configura un elemento de video mediante createVideo(). Luego, se crea un lienzo en 3D del mismo tamaño utilizando createGraphics(). En la función draw(), se establece el shader blurShader en el lienzo en 3D y se configuran los uniformes del shader. A continuación, se dibuja un rectángulo en el lienzo en 3D para aplicar el efecto de desenfoque. Finalmente, se muestra el lienzo en 3D en el lienzo principal utilizando la función image().Es decir, se utilizamos los shaders effect.vert y effect.frag para aplicar un efecto de desenfoque gaussiano a un video en un lienzo en 3D. El video se muestra en el lienzo principal, y el efecto de desenfoque se aplica utilizando el shader blurShader en el lienzo en 3D.

## Código
Código js del blur posteffect
{{< highlight js >}}
let blurShader;
let video;
let pg;

function preload(){
  blurShader = loadShader('/showcase/sketches/shaders/effect.vert', '/showcase/sketches/shaders/effect.frag');
}

function setup() {
  createCanvas(640, 480);
  noStroke();
  video = createVideo("/showcase/sketches/cars.mp4");
  video.size(640, 480);
  video.loop();
  video.hide();
  video.volume(0)
  pg = createGraphics(640, 480, WEBGL);
  pg.noStroke();
}

function draw() {
  pg.shader(blurShader);
  blurShader.setUniform('tex0', video);
  blurShader.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurShader.setUniform('direction', [1.0, 0.0]);
  pg.rect(0,0,width, height);  

  image(pg, 0,0, 640, 480);
}
{{< /highlight >}}

Vertex shader (effect.vert)
{{< highlight js >}}
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
    vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
{{< /highlight >}}

Fragment shader (effect.frag)
{{< highlight js >}}
precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform vec2 texelSize;
uniform vec2 direction;

vec3 gaussianBlur( sampler2D t, vec2 texUV, vec2 stepSize ){                                                                                                                                                  
	vec3 colOut = vec3( 0.0 );                                                                                                                                                                                                                                      
	const int stepCount = 9;
    
	float gWeights[stepCount];
	    gWeights[0] = 0.10855;
	    gWeights[1] = 0.13135;
	    gWeights[2] = 0.10406;
	    gWeights[3] = 0.07216;
	    gWeights[4] = 0.04380;
	    gWeights[5] = 0.02328;
	    gWeights[6] = 0.01083;
	    gWeights[7] = 0.00441;
	    gWeights[8] = 0.00157;
        
	float gOffsets[stepCount];
	    gOffsets[0] = 0.66293;
	    gOffsets[1] = 2.47904;
	    gOffsets[2] = 4.46232;
	    gOffsets[3] = 6.44568;
	    gOffsets[4] = 8.42917;
	    gOffsets[5] = 10.41281;
	    gOffsets[6] = 12.39664;
	    gOffsets[7] = 14.38070;
	    gOffsets[8] = 16.36501;
        
	for( int i = 0; i < stepCount; i++ ){                                                                                                                                                
	    vec2 texCoordOffset = gOffsets[i] * stepSize;          
	    vec3 col = texture2D( t, texUV + texCoordOffset ).xyz + texture2D( t, texUV - texCoordOffset ).xyz; 
		col *= gWeights[i];
	    colOut +=  col;                                                                                                                               
	}
	return colOut;                                                                                                                                                   
} 

void main() {
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  vec3 blur = gaussianBlur(tex0, uv, texelSize * direction);
  gl_FragColor = vec4(blur, 1.0);
}
{{< /highlight >}}