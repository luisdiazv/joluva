// instance mode of: 
// https://p5js.org/examples/color-relativity.html

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