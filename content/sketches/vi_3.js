// instance mode of: 
// https://p5js.org/examples/color-relativity.html

new p5((p) => {
  var columns, rows;
  
  //"Tamaño" de los poligonos
  // Más pequeño = Más poligonos 
  let scale = 25; 
  
  //Terreno que se le hará el perl noise
  var terrain = [];
  
  //tamaño del plano (divisiones)
  var w = 1400;
  var h = 1000;
  
  //Velocidad de "vuelo" -> Refiere al movimiento
  var flying = 0;
  
  
  p.setup = function() {
    p.createCanvas(600, 600, WEBGL);
    
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
  
  p.draw =function() {
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
  
    p.background(0);
  
    //mover el plano (hacia atras)
    p.translate(0, 60);
  
    //rotar el plano
    p.rotateX(PI / 3);
    p.fill(200, 200, 200, 150);
  
    //Como el plano aparece desde 0,0 hacia la cordenada creciente (inf. izq):
    //Movemos el plano al centro del canvas
    p.translate(-w / 2, -h / 2);
  
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
}, "3");