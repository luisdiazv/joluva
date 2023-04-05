---
weight: 6
---
# __Depth Perception__

## Biocular cues

### Problema
Implemente un sketch en 2D que engañe al ojo para hacerlo percibir imágenes en 3D

### Introducción
<p style="text-align: justify;">
El paralaje de movimiento es un efecto visual que se produce cuando un observador se mueve en relación a un objeto o entorno, lo que causa un cambio en la posición aparente de los objetos cercanos y lejanos en relación al observador.
</p>
<p style="text-align: justify;">
Este efecto se debe a que los objetos más cercanos al observador parecen moverse más rápidamente que los objetos más lejanos cuando el observador se mueve. Esto crea una sensación de profundidad y movimiento en la escena observada.
</p>

### Antecedentes y trabajo previo
<p style="text-align: justify;">
En resumen, el concepto de motion parallax se remonta al siglo XVII y ha sido estudiado y utilizado en una amplia variedad de campos, desde la psicología y la neurociencia hasta la animación y la robótica. Se utiliza para crear efectos visuales más realistas, estudiar la percepción visual y la cognición espacial, y mejorar la navegación en sistemas robóticos y vehículos autónomos.
</p>

### Solución
{{< p5-iframe sketch="/showcase/sketches/monocular.js" width="525" height="325" >}}

### Implementación
<p style="text-align: justify;">
Para esta implementación se crearon tres arreglos distintos de rectángulos, a cada arreglo se le asignó un color para poder simular la profundidad (entre mas profundo mas oscuro), posteriormente se implementó el movimiento de tal forma que los edificios pequeños y claros se mueven mas altos que los altos y oscuros. Para no generar rectángulos infinitos, se le aplica la operación de módulo a la posición del eje x de los rectángulos de tal forma que vuelven al margen izquirdo una vez llegan al margen derecho.
</p>

### Código
{{< highlight js >}}
let arraySize = 15
let distanceBetween = 50;
let minHouseWidth = 30;
let maxHouseWidth = 60;
let first = new Array();
let second = new Array();
let third = new Array(); 

function setup() {
    createCanvas(500, 300);
    background(color(0,176,176));
    for(let i=0;i<arraySize;i++){first.push([floor(random(minHouseWidth,maxHouseWidth)),floor(random(30,100)),distanceBetween*i]);}
    for(let i=0;i<arraySize;i++){second.push([floor(random(minHouseWidth,maxHouseWidth)),floor(random(80,200)),distanceBetween*i]);}
    for(let i=0;i<arraySize;i++){third.push([floor(random(minHouseWidth,maxHouseWidth)),floor(random(180,300)),distanceBetween*i]);}
}
  //rgba(140,202,229,255)
function draw(){
    background(color(0,176,176));
    noStroke(0);

    for(let i=0;i<arraySize;i++){
        fill(color(140,202,229))
        rect(third[i][2],300-third[i][1],third[i][0],third[i][1]);
        third[i][2] = (third[i][2]+1)%width;
    }


    for(let i=0;i<arraySize;i++){
        fill(color(180,221,247))
        rect(second[i][2],300-second[i][1],second[i][0],second[i][1]);
        second[i][2] = (second[i][2]+2)%width;
    }


    for(let i=0;i<arraySize;i++){
        fill(color(255,255,255))
        rect(first[i][2],300-first[i][1],first[i][0],first[i][1]);
        first[i][2] = (first[i][2]+3)%width;
    }
    
    
}

{{< /highlight >}}

### Concluisiones
<p style="text-align: justify;">
Se ha demostrado que el motion parallax es un importante indicador de la profundidad y la distancia en el entorno, lo que lo convierte en una habilidad visual esencial en los seres humanos y en muchos animales y en conclusión, el motion parallax es un fenómeno visual fascinante y útil en una variedad de campos, y su estudio ha proporcionado una comprensión más profunda de la percepción visual y la cognición espacial.
</p>

### Trabajo futuro
<p style="text-align: justify;">
En la animación y los gráficos por computadora, el trabajo futuro podría centrarse en la mejora de las técnicas para crear efectos de motion parallax más realistas y eficientes. Esto podría incluir el desarrollo de algoritmos de renderizado más avanzados, la exploración de nuevas técnicas de animación y la mejora de la interacción entre los objetos animados y el entorno.
</p>
<p style="text-align: justify;">
En la robótica y la inteligencia artificial, el motion parallax podría seguir siendo un área importante de investigación para mejorar la navegación y la percepción en los robots y vehículos autónomos. Se podrían explorar nuevas formas de integrar el motion parallax con otros sensores y técnicas de navegación, y se podrían desarrollar nuevos sistemas de aprendizaje automático que permitan a los robots y vehículos autónomos adaptarse y aprender de su entorno.
</p>