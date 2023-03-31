---
weight: 2
---
# __Mach Bands__

## Terrain with Perlin noise 

### Problema
Desarrolle una aplicación de visualización de terreno. Mira el tutorial de generación de terreno 3D con codificación de Perlin Noise. 

### Introducción
La visualización de terrenos es una técnica utilizada en muchas áreas, como la cartografía, la planificación urbana, la ingeniería y la simulación. En la actualidad, el desarrollo de tecnologías de visualización 3D ha permitido la creación de modelos digitales de terrenos con mayor precisión y detalle, lo que ha permitido el desarrollo de aplicaciones de visualización de terrenos cada vez más sofisticadas y útiles.

### Antecedentes y trabajo previo
La generación de terrenos en 3D se ha convertido en una técnica muy popular en los últimos años. Una de las formas más comunes de generar terrenos 3D es mediante el uso del algoritmo de ruido de Perlin, que permite generar mapas de altura realistas y detallados. Existen muchos tutoriales y recursos en línea para aprender a utilizar el algoritmo de ruido de Perlin y generar terrenos 3D.
El desarrollo de una aplicación de visualización de terrenos utilizando el algoritmo de ruido de Perlin implica la utilización de técnicas avanzadas de visualización 3D, como la iluminación, las texturas y las sombras. Además, la aplicación debe ser capaz de renderizar grandes cantidades de datos en tiempo real para crear una experiencia de visualización fluida e interactiva.

### Implementación
En este código se está implementando una aplicación de visualización de terreno utilizando Perlin Noise para generar una apariencia de terreno 3D. La aplicación genera una cuadrícula y, a través del uso de ruido de Perlin, da la ilusión óptica de una superficie montañosa. En la sección de configuración, se establece la cantidad de columnas y filas del plano, y se inicializa el arreglo que representará el terreno. En la sección de dibujo, se modifica el valor de la variable flying para simular el vuelo sobre el terreno, y se utiliza el ruido de Perlin para generar las coordenadas que se utilizarán para dar la ilusión óptica de terreno. Finalmente, se mueve y rota el plano y se utilizan los vértices para crear los polígonos que darán forma al terreno.

### Solución

{{< details title="Código" open=false >}}
{{< highlight js >}}
var columns, rows;
let scale = 25; 
var terrain = [];
var w = 1400;
var h = 1000;
var flying = 0;


function setup() {
  createCanvas(600, 600, WEBGL);
	
	//Establecer un número de columnas y filas del plano (cuadricula)
  columns = w / scale;
  rows = h / scale;

	//Genera cuadricula 
  for (var x = 0; x < columns; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
	//Modificar velocidad de vuelo
  flying -= 0.025;
	
	//xoff-yoff  ->  offset en x, offset en y
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < columns; x++) {
			//noise -> Genera coordenadas para dar la ilusion óptica del Perlin Noise
			//map -> Toma el valor del noise (entre 0,1) y lo convierte en un valor entre -100 y 100
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);

	//mover el plano (hacia atras)
  translate(0, 60);

	//rotar el plano
  rotateX(PI / 3);
  fill(200, 200, 200, 150);

	//Como el plano aparece desde 0,0 hacia la cordenada creciente (inf. izq):
	//Movemos el plano al centro del canvas
  translate(-w / 2, -h / 2);

	//Crea un TRIANGLE_STRIP y generar los poligonos
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < columns; x++) {
      vertex(x * scale, y * scale, terrain[x][y]);
      vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);
    }
    endShape();
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/vi_4_1.js" width="624" height="624" >}}

### Conclusiones
La creación de una aplicación de visualización de terrenos utilizando el algoritmo de ruido de Perlin es un desafío técnico interesante y puede ser una herramienta útil en muchas áreas, como la planificación urbana, la cartografía y la simulación. La aplicación puede ayudar a los usuarios a comprender mejor el terreno y visualizar posibles escenarios, lo que puede tener implicaciones importantes en la toma de decisiones.

### Trabajo futuro
En el futuro, se podrían explorar diferentes técnicas de visualización y renderización para mejorar la calidad y la precisión de la visualización de terrenos. También se podrían integrar datos de diferentes fuentes, como información de satélites y drones, para crear modelos de terrenos aún más precisos y detallados. Además, se podrían desarrollar herramientas y funcionalidades adicionales para que la aplicación sea aún más útil para los usuarios, como la integración con sistemas de navegación y la simulación de escenarios complejos.