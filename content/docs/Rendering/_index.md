---
bookFlatSection: true
weight: 4
---
# Rendering

## Visibility

{{< hint info >}}
**Ejercicio**  
A continuación se implementa el algoritmo de ray casting sobre determinación de superficies ocultas. 
{{< /hint >}}

## Introducción
<p style="text-align: justify;">
El ray casting, o lanzamiento de rayos, es una técnica fundamental en la computación gráfica que ha sido ampliamente utilizada en la renderización de imágenes y en la simulación de interacciones de la luz con objetos tridimensionales. Esta técnica se basa en el trazado de rayos desde un punto de vista virtual hasta los objetos de la escena, permitiendo determinar qué objetos son visibles y cómo interactúan con la luz. [1]</p>

## Antecedentes y trabajo previo
<p style="text-align: justify;">
El ray casting tiene sus raíces en los primeros días de la computación gráfica, donde fue desarrollado como una alternativa al rasterizado, que se utiliza en técnicas como el escaneo de líneas y el escaneo de áreas. El ray casting se destaca por su capacidad para simular el comportamiento realista de la luz al seguir los rayos de luz desde la cámara virtual hasta los objetos de la escena.</p>

<p style="text-align: justify;">
A lo largo de los años, se han desarrollado diferentes variantes y mejoras del ray casting para abordar diversas limitaciones y mejorar la eficiencia. Uno de los avances más significativos es el ray tracing, que extiende el ray casting al trazar múltiples rayos secundarios para simular reflexiones, refracciones y sombras más realistas. El ray tracing ha revolucionado la calidad de los gráficos generados por computadora, pero su alto costo computacional ha limitado su aplicación en tiempo real. [2]</p>

## Solución 

{{< details title="details" open=false >}}
{{< highlight js >}}
const canvasSize = [500, 500];

let lightSource;
let numRays = 500;
let boundaries = [];
const numBoundaries = 5;

class Boundary {
    constructor(x1, y1, x2, y2) {
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
        this.norm = p5.Vector.sub(this.p2, this.p1).rotate(PI / 2);
    }

    show() {
        stroke(255);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}

class LightSource {
    constructor(numRays) {
        this.source = createVector(0, 0);
        this.rays = Array(numRays);
        this.reflect = true;
        this.maxReflects = 3;
        this.alphaLoss = 1 / 3;

        let theta = 0;
        for (let i = 0; i < numRays; i++) {
            const x = cos(radians(theta));
            const y = sin(radians(theta));
            this.rays[i] = new Ray(this.source, createVector(x, y));
            theta += (360 / numRays);
        }
    }

    setSource(x, y) {
        this.source = createVector(x, y);
    }

    setMaxReflects(n) {
        this.maxReflects = n;
    }

    setAlphaLoss(alpha) {
        this.alphaLoss = alpha > 1 ? 1 : alpha;
    }

    toggleReflect() {
        this.reflect = !this.reflect;
    }

    show(boundaries) {
        for (const ray of this.rays) {
            this.cast(this.source, ray, boundaries, null, 0);
        }
        stroke(255);
        strokeWeight(5);
        point(this.source.x, this.source.y);
        strokeWeight(1);
    }

    cast(source, ray, boundaries, currentBoundary, numReflects) {

        if (numReflects === this.maxReflects || ray.alpha <= 10) {
            return;
        }

        ray.setSource(source);

        let closestBoundary = null
        let closest = null;
        let minDist = Infinity;

        // Verify boundary / ray intersection
        // Only draw the closest intersection
        for (const boundary of boundaries) {

            if (boundary === currentBoundary) {
                continue;
            }

            let p = intersection(ray, boundary);
            if (p) {
                const newDist = p5.Vector.dist(ray.source, p);
                if (newDist < minDist) {
                    minDist = newDist;
                    closest = p;
                    closestBoundary = boundary;
                }
            }
        }
        if (closest) {
            ray.setEndpoint(closest);
            ray.show();

            if (!this.reflect) {
                return;
            }

            // Cast recursively reflected rays
            let newDirection = reflect(ray.direction.copy(), closestBoundary.norm.copy());
            let newRay = new Ray(closest, newDirection, ray.alpha * this.alphaLoss);

            this.cast(closest, newRay, boundaries, closestBoundary, numReflects + 1);
        }
    }
}

class Ray {
    constructor(source, direction, alpha = 150, endpoint = null) {
        this.source = source;
        this.direction = direction;
        this.alpha = alpha;
        this.endpoint = endpoint ?? direction;
    }

    setSource(source) {
        this.source = source;
    }

    setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }

    show() {
        stroke(255, 0, 255, this.alpha);
        line(this.source.x, this.source.y, this.endpoint.x, this.endpoint.y);
    }
}

function intersection(ray, boundary) {
    const x1 = boundary.p1.x;
    const y1 = boundary.p1.y;
    const x2 = boundary.p2.x;
    const y2 = boundary.p2.y;

    const x3 = ray.source.x;
    const y3 = ray.source.y;
    const x4 = ray.source.x + ray.direction.x;
    const y4 = ray.source.y + ray.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
        return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    } else {
        return;
    }
}

function reflect(ray, surfaceNormal) {
    ray.normalize();
    surfaceNormal.normalize();
    return ray.sub(surfaceNormal.mult(2 * ray.dot(surfaceNormal)));
}

function setup() {
    noCursor();
    createCanvas(canvasSize[0], canvasSize[1]);

    boundaries.push(new Boundary(0, 0, width, 0));
    boundaries.push(new Boundary(width, 0, width, height));
    boundaries.push(new Boundary(width, height, 0, height));
    boundaries.push(new Boundary(0, height, 0, 0));

    for (let i = 0; i < numBoundaries; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        boundaries.push(new Boundary(x1, y1, x2, y2));
    }

    lightSource = new LightSource(numRays);
}

function draw() {

    background(0);

    lightSource.setSource(mouseX, mouseY);
    lightSource.show(boundaries);

    boundaries.forEach(boundary => boundary.show());
}

function keyPressed() {
    if (keyCode === 32) {
        lightSource.toggleReflect();
    }
}

function mouseClicked() {
    if (mouseButton === LEFT) {
        lightSource.toggleReflect();
    }
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/ray.js" width="520" height="525" >}}

<p style="text-align: justify;">
En esta implementación, se muestra y se extiende el ray casting de la trayectoria de la luz en una escena utilizando una simple reflexión. El punto que aparece en la implementación representa el cursor y se observa que se extiende el ray casting representado por la zona morada que determina la zona visible. Este campo visual es interrumpido por las líneas que representan paredes junto con el borde, dichos obstáculos extienden el ray casting mediante la reflexión. El efecto de reflexión se puede quitar haciendo click izquierdo sobre el frame o con la barra espaciadora dejando a la vista simplemente el campo visual del cursor. [3]</p>

## Conclusiones
<p style="text-align: justify;">
El ray casting es una técnica versátil y poderosa en la computación gráfica, capaz de generar imágenes realistas al simular la interacción de la luz con los objetos en una escena tridimensional. Aunque puede ser menos preciso y eficiente que el ray tracing, el ray casting sigue siendo una opción viable en aplicaciones en tiempo real donde el rendimiento es un factor crítico.</p>

<p style="text-align: justify;">
El desarrollo continuo de hardware más rápido y potente, así como algoritmos de optimización y técnicas de paralelización, han permitido mejorar el rendimiento del ray casting y su aplicabilidad en una variedad de contextos. Además, la integración de técnicas de inteligencia artificial y aprendizaje profundo también ha demostrado el potencial de mejorar la calidad visual y la eficiencia del ray casting.</p>

## Trabajo futuro
<p style="text-align: justify;">
En el futuro, se espera que el ray casting siga evolucionando y mejorando en varias áreas. Algunas líneas de investigación prometedoras incluyen: algoritmos de trazado de rayos acelerados, simulación de materiales y fenómenos ópticos avanzados, renderizado en tiempo real e integración con técnicas de aprendizaje automático mediante la generación de modelos predictivos y la optimización de algoritmos a través del entrenamiento de redes neuronales.</p>

## Referencias
[1] https://www.computerhope.com/jargon/r/ray-casting.htm

[2] https://www.computerhope.com/jargon/r/ray-tracing.htm

[3] https://www.youtube.com/watch?v=vYgIKn7iDH8