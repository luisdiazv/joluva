---
weight: 3
---



## Kinegram
{{< details title="p5-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-iframe sketch="/showcase/sketches/kg.js" width="625" height="625" */>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/kg.js" width="625" height="625" >}}

### Código

{{< highlight js >}}
new p5((p)=>{

  let lenna;
  let y = 0;
  p.preload = function() {
    mask = p.loadImage('/showcase/sketches/o33t.png'); 
    ring = p.loadImage('/showcase/sketches/rings.png');
    wheel = p.loadImage('/showcase/sketches/wheel.png');
  }

  p.setup = function() {
    
    p.createCanvas(600, 600);
    mask.resize(900,700);
    ring.resize(700,800);
    wheel.resize(700,800);
  }

  p.draw = function()  {
    p.background(255);
    p.image(ring,100,-20);
    p.image(wheel,100,250);
    p.image(mask, -30, p.mouseY-150);
    
    
  }
},"kg")

{{< /highlight >}}

### Problema a resolver
Implementar un kinegrama.

### Concepto
<p style="text-align: justify;">
En términos de ilusiones visuales, un kinegrama es una técnica que crea la ilusión de movimiento a través de una serie de imágenes estáticas. Es similar a una animación, pero en lugar de mostrar una secuencia continua de imágenes, utiliza una serie de imágenes discretas que se reproducen rápidamente para crear la ilusión de movimiento.
En otras palabras, un kinegrama es una serie de imágenes que se reproducen en rápida sucesión para crear la ilusión de que la imagen está en movimiento. Esta técnica se puede utilizar en una variedad de medios, incluyendo películas, videojuegos y publicidad.
</p>

### Implementación

<p style="text-align: justify;">
Se implementaron dos kinegramas utilizando dos imágenes estáticas y una rejilla que se desplaza verticalmente, es posible observaro como se forman patrones en movimiento a medida que se desplaza la rejilla.
</p>

### Conclusiones

<p style="text-align: justify;">
En conclusión, el kinegrama es una técnica visual fascinante que crea la ilusión de movimiento a través de una serie de imágenes estáticas, esto demuestra cómo nuestro cerebro puede ser engañado por patrones y efectos visuales, y cómo la tecnología puede aprovechar esta capacidad para crear imágenes y animaciones que parecen tener vida propia.
</p>