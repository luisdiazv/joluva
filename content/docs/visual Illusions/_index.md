---
bookFlatSection: true
weight: 2
---
# Visual Illusions

{{< hint info >}}
**Ejercicio**  
A continuación, se explican, implementan y se discuten posibles aplicaciones de algunos fenómenos visuales conocidos e ilusiones ópticas.
{{< /hint >}}

## Introducción
<p style="text-align: justify;">
Los fenómenos visuales y las ilusiones ópticas han sido objeto de estudio y fascinación durante siglos. Nuestro sistema visual es una maravilla de la naturaleza, capaz de procesar enormes cantidades de información y crear imágenes coherentes de nuestro entorno. Sin embargo, también es susceptible a engaños y errores, lo que ha llevado al desarrollo de las ilusiones ópticas, efectos visuales que nos hacen percibir algo diferente a la realidad. </p>

<p style="text-align: justify;">
Aunque las ilusiones ópticas son a menudo vistas como curiosidades divertidas, en realidad son un recordatorio de lo complejo y sorprendente que puede ser el proceso de la visión. En este contexto, es importante entender la ciencia detrás de los fenómenos visuales y las ilusiones ópticas, para poder apreciar mejor nuestra percepción visual y cómo nuestro cerebro la procesa.</p>

## Antecedentes y trabajo previo
<p style="text-align: justify;">
Los fenómenos visuales son aquellos eventos que ocurren en el mundo que nos rodea y que son percibidos por nuestro sistema visual. Desde la antigüedad, los seres humanos han intentado comprender cómo funciona la visión y cómo se procesa la información visual en el cerebro. Ya en el siglo IV a.C., el filósofo griego Aristóteles describió la teoría de la visión según la cual los ojos emiten un rayo visual que llega hasta el objeto que se está observando y que es reflejado de vuelta a los ojos. </p>
<p style="text-align: justify;">
Con el paso del tiempo, la comprensión de los fenómenos visuales se ha ido desarrollando gracias a los avances en la tecnología y la ciencia, y en la actualidad se dispone de técnicas sofisticadas para estudiar la visión. Los fenómenos visuales, como las ilusiones ópticas y los efectos visuales, han despertado un gran interés tanto en la ciencia como en la cultura popular, y continúan siendo objeto de investigación y estudio. [1]</p>

## Fenómenos visuales
<p style="text-align: justify;">
Los fenómenos visuales se refieren a cualquier experiencia visual que resulta de la interacción entre la luz, el ojo y el cerebro. Incluyen tanto las experiencias visuales simples, como la percepción de colores y formas, como las más complejas, como la percepción de profundidad y movimiento. [2]</p>

### Círculos que desaparecen [3]

{{< details title="details" open=false >}}
{{< highlight js >}}
const CANVAS_SIZE = 800;
const SMALL_CIRCLE_AMOUNT = 20;
const INTERVAL = 50; //millisecond

//constant variables
const ANGLE_SLICE = 360 / SMALL_CIRCLE_AMOUNT;
const POINTER_SIZE = CANVAS_SIZE / 45;
const CIRCLE_SIZE = CANVAS_SIZE / 1.8;

let highlightAngle = 0;
let elapsedTime = 0;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255, 11, 0);
  stroke(0);

  //pointer
  line(
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 + POINTER_SIZE,
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 - POINTER_SIZE
  );
  line(
    CANVAS_SIZE / 2 + POINTER_SIZE,
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 - POINTER_SIZE,
    CANVAS_SIZE / 2
  );
}

function draw() {
  noStroke();
  for (let i = 0; i < SMALL_CIRCLE_AMOUNT; i++) {
    var angle = i * ANGLE_SLICE;
    var x =
      CANVAS_SIZE / 2 + (CIRCLE_SIZE / 2) * Math.cos((angle * Math.PI) / 180);
    var y =
      CANVAS_SIZE / 2 + (CIRCLE_SIZE / 2) * Math.sin((angle * Math.PI) / 180);
    fill(
      angle === highlightAngle
        ? 255
        : angle === highlightAngle - 180 || angle === highlightAngle + 180
        ? 150
        : 109
    );
    circle(x, y, (CANVAS_SIZE / SMALL_CIRCLE_AMOUNT) * 1.5);
  }

  if (highlightAngle === 360) {
    highlightAngle = 0;
  }

  elapsedTime += deltaTime;
  if (elapsedTime >= INTERVAL) {
    highlightAngle += ANGLE_SLICE;
    elapsedTime = 0;
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/dissapear.js" width="740" height="740" >}}

<p style="text-align: justify;">
En este fenómeno vemos cómo dos círculos en movimiento se posicionan secuencialmente sobre los 20 círculos estáticos uno en frente del otro. Cuando observamos la cruz del centro por 5 segundos los círculos estáticos comienzan a desaparecer y solo permanecen los círculos en movimiento. Este fenómeno sucede por el efecto conocido como Troxler el cual altera la percepción de lo que estamos viendo. También se debe a la desensibilización de las células fotorreceptoras que están en nuestra retina, debido al movimiento de los círculos somos inducidos a una especie de ceguera que nos hacer ver cómo los círculos estáticos desaparecen. [4] </p>

### Colisión de círculos [5]

{{< details title="details" open=false >}}
{{< highlight js >}}
class Ball {
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(3);
    this.r = r;
    this.m = r * 0.1;
  }
  update() {
    this.position.add(this.velocity);
  }

  checkBoundaryCollision() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  checkCollision(other) {
    // Get distances between the balls components
    let distanceVect = p5.Vector.sub(other.position, this.position);

    // Calculate magnitude of the vector separating the balls
    let distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    let minDistance = this.r + other.r;

    if (distanceVectMag < minDistance) {
      let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

      // get angle of distanceVect
      let theta = distanceVect.heading();
      // precalculate trig values
      let sine = sin(theta);
      let cosine = cos(theta);

      /* bTemp will hold rotated ball this.positions. You 
       just need to worry about bTemp[1] this.position*/
      let bTemp = [new p5.Vector(), new p5.Vector()];

      /* this ball's this.position is relative to the other
       so you can use the vector between them (bVect) as the 
       reference point in the rotation expressions.
       bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
       automatically to 0.0, which is what you want
       since b[1] will rotate around b[0] */
      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      // rotate Temporary velocities
      let vTemp = [new p5.Vector(), new p5.Vector()];

      vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
      vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
      vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

      /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate 
       the final this.velocity along the x-axis. */
      let vFinal = [new p5.Vector(), new p5.Vector()];

      // final rotated this.velocity for b[0]
      vFinal[0].x =
        ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
        (this.m + other.m);
      vFinal[0].y = vTemp[0].y;

      // final rotated this.velocity for b[0]
      vFinal[1].x =
        ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
        (this.m + other.m);
      vFinal[1].y = vTemp[1].y;

      // hack to avoid clumping
      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      /* Rotate ball this.positions and velocities back
       Reverse signs in trig expressions to rotate 
       in the opposite direction */
      // rotate balls
      let bFinal = [new p5.Vector(), new p5.Vector()];

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // update balls to screen this.position
      other.position.x = this.position.x + bFinal[1].x;
      other.position.y = this.position.y + bFinal[1].y;

      this.position.add(bFinal[0]);

      // update velocities
      this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }

  display() {
    noStroke();
    fill(204);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
}
let balls = [new Ball(100, 400, 20), new Ball(700, 400, 80)];
console.log(balls);
function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(51);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    balls[0].checkCollision(balls[1]);
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/collision.js" width="730" height="430" >}}

<p style="text-align: justify;">
En este ejemplo se tiene la percepción del movimiento de dos círculos en direcciones específicas, donde nuestro cerebro lo percibe como movimientos reales en esas direcciones y también percibe los tamaños específicos de estos en relación con los objetos que lo rodean, lo cual son fenómenos visuales normales. En estos tipos de fenómenos visuales se tiene una percepción normal y precisa del movimiento y tamaño real de los objetos.</p>

## Ilusiones ópticas
<p style="text-align: justify;">
Las ilusiones ópticas son fenómenos visuales específicos que engañan al cerebro para que perciba algo que no está presente en la realidad física. Las ilusiones ópticas pueden ser creadas por patrones visuales, contrastes de luz y sombra, o por efectos de perspectiva. [6]</p>

### Trapezoidal grid [7]

{{< details title="details" open=false >}}
{{< highlight js >}}
const CANVAS_SIZE = 800;
const BOX_AMOUNT_BY_ROW = 16;
const GRID_CELL = BOX_AMOUNT_BY_ROW / 4;

const BOX_SIZE = CANVAS_SIZE / BOX_AMOUNT_BY_ROW;
const INSIDE_BOX_SIZE = BOX_SIZE / 4;
const INSIDE_BOX_PADDING = BOX_SIZE * 0.05;
const CIRCLE_SIZE = (BOX_AMOUNT_BY_ROW - 2) * BOX_SIZE;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(220);
  noStroke();

  let rotate = true;

  for (let k = 0; k < GRID_CELL; k++) {
    for (let z = 0; z < GRID_CELL; z++) {
      for (let i = 0; i < GRID_CELL; i++) {
        for (let j = 0; j < GRID_CELL; j++) {
          let bg = (i % 2) - (j % 2) == 0 ? 0 : 255;
          let foreground = bg == 255 ? 0 : 255;
          let x = z * GRID_CELL * BOX_SIZE + i * BOX_SIZE;
          let y = k * GRID_CELL * BOX_SIZE + j * BOX_SIZE;
          fill(bg);
          rect(x, y, BOX_SIZE, BOX_SIZE);

          fill(foreground);
          if (rotate) {
            rect(
              x + INSIDE_BOX_PADDING,
              y + INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
            rect(
              x + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              y + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
          } else {
            rect(
              x + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              y + INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
            rect(
              x + INSIDE_BOX_PADDING,
              y + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
          }
        }
      }
      rotate = !rotate;
    }
    rotate = !rotate;
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/trapezoidal.js" width="740" height="450" >}}

<p style="text-align: justify;">
En la anterior implementación observamos una cuadrícula de cuadros negros y blancos intercalados, cada uno de estos cuadros posee en su interior dos cuadros pequeños en esquinas contrarias del cuadrado que los contiene. Estos cuadrados pequeños engañan al cerebro de manera que percibimos que la cuadrícula no es recta, cuando en realidad si lo es, esto puede deberse a que los cuadrados pequeños nos dan la ilusión de que los cuadros grandes tienen cierta dirección que produce una curvatura que en realidad no existe. [8]</p>

### Ilusión de los pasos [9]

{{< details title="details" open=false >}}
{{< highlight js >}}

// this class describes the structure
// and movents of the brick
class Brick{
  constructor(bc, y){
    this.brickColor = bc;
    this.yPos = y;
    this.xPos = 0;
  }

  // this function creates the brick
  createBrick(){
    fill(this.brickColor);
    rect(this.xPos, this.yPos, 100, 50);
  }

  // this function sets the speed
  // of movement of the brick to 1
  setSpeed(){
    this.xSpeed = 1;
  }

  // this function set the bricks in motion
  moveBrick(){
    this.xPos+=this.xSpeed;
    if(this.xPos+100 >= width || this.xPos <= 0){
      this.xSpeed*=-1;
    }
  }
}

function setup() {
  createCanvas(720, 400);
  createP("Keep the mouse clicked").style('color','#ffffff');
  createP("to check whether the bricks").style('color','#ffffff');
  createP("are moving at same speed or not").style('color','#ffffff');
}

// creating two bricks of
// colors white and black
let brick1 = new Brick("white",100);
let brick2 = new Brick("black",250);

//
brick1.setSpeed();
brick2.setSpeed();

function draw () {
  background(0);
  if(mouseIsPressed){
    background(50);
  }
  brick1.createBrick();
  brick1.moveBrick();
  if(!mouseIsPressed){
    createBars();
  }
  brick2.createBrick();
  brick2.moveBrick();
}
// this function creates the black and
// white bars across the screen
function createBars() {
  let len = 12;
  for(let i = 0; i<width/len; i++){
    fill("white");
    if(i%2 == 0)
    rect(i*len,height,len,-height);
  }
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/steps.js" width="740" height="450" >}}

<p style="text-align: justify;">
Este es un experimento psicológico muy famoso debido a que se observan dos bloques que parecen moverse a velocidades diferentes pero que en realidad se mueven a la misma velocidad. Esto se comprueba dando click dentro del lienzo y podremos observar cómo las líneas desaparecen y solamente quedan dos rectángulos moviéndose en la misma dirección y la misma velocidad. Esta es otra prueba fascinante de cómo nuestra percepción visual puede ser engañada y nos muestra que a veces lo que vemos no es necesariamente la realidad.
</p>

## Conclusiones
<p style="text-align: justify;">
Los fenómenos visuales y las ilusiones ópticas son importantes porque nos muestran cómo nuestro cerebro procesa e interpreta la información visual, y cómo a veces podemos ser engañados por nuestra propia percepción. Estos fenómenos desafían nuestra comprensión de la realidad y nos hacen cuestionar lo que vemos y cómo lo vemos.</p>
<p style="text-align: justify;">
Además, los fenómenos visuales y las ilusiones ópticas también son importantes en el diseño gráfico y la publicidad, donde se utilizan para crear efectos visuales interesantes y atractivos. Estos efectos pueden ayudar a captar la atención del espectador y transmitir un mensaje de manera efectiva.</p>

## Trabajo futuro
<p style="text-align: justify;">
Un trabajo futuro sobre los fenómenos visuales y las ilusiones ópticas podría ser la investigación de cómo estos fenómenos pueden ser utilizados para mejorar la experiencia del usuario en la realidad virtual. La realidad virtual es una tecnología en rápida evolución que busca crear una experiencia inmersiva para el usuario, y el estudio de los fenómenos visuales y las ilusiones ópticas podría ser útil en la creación de efectos visuales más realistas y envolventes.</p>
<p style="text-align: justify;">
Por ejemplo, la ilusión de movimiento o de profundidad podría utilizarse para simular una sensación de movimiento o profundidad en la realidad virtual, lo que mejoraría la experiencia del usuario y la sensación de estar inmerso en un entorno virtual. Así mismo, la comprensión de cómo nuestro cerebro procesa la información visual también podría ayudar en la creación de interfaces más intuitivas y fáciles de usar en la realidad virtual.</p>

## Referencias
[1] https://www.bbvaopenmind.com/ciencia/investigacion/por-que-las-ilusiones-opticas-enganan-a-nuestro-cerebro/

[2] https://www.clinicabaviera.com/blog/quieres-saber-como-se-produce-la-vision/#:~:text=La%20visi%C3%B3n%20es%20un%20fen%C3%B3meno,y%20estimular%20las%20c%C3%A9lulas%20fotorreceptoras.

[3] https://github.com/yigithanyucedag/optical-illusions-p5/blob/main/disappearing-circles/sketch.js

[4] https://www.psicoactiva.com/puzzleclopedia/perseguidor-del-lila/

[5] https://p5js.org/es/examples/motion-circle-collision.html

[6] https://www.oftalvist.es/blog/ilusiones-opticas

[7] https://github.com/yigithanyucedag/optical-illusions-p5/blob/main/trapezoidal-grid/README.md

[8] https://michaelbach.de/ot/ang-KitaokaBulge/index.html

[9] https://p5js.org/es/examples/simulate-stepping-feet-illusion.html