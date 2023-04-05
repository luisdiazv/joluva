---
weight: 3
---

## Kinegram

### Problema a resolver
Implementar un kinegrama.

### Introducción
<p style="text-align: justify;">
En términos de ilusiones visuales, un kinegrama es una técnica que crea la ilusión de movimiento a través de una serie de imágenes estáticas. Es similar a una animación, pero en lugar de mostrar una secuencia continua de imágenes, utiliza una serie de imágenes discretas que se reproducen rápidamente para crear la ilusión de movimiento.
En otras palabras, un kinegrama es una serie de imágenes que se reproducen en rápida sucesión para crear la ilusión de que la imagen está en movimiento. Esta técnica se puede utilizar en una variedad de medios, incluyendo películas, videojuegos y publicidad.
</p>

### Antecedentes y trabajo previo

<p style="text-align: justify;">
La técnica de los kinogramas, también conocida como "cinemagraphs" en inglés, fue desarrollada en 2011 por los fotógrafos Jamie Beck y Kevin Burg. Ellos querían crear una nueva forma de contar historias a través de imágenes en movimiento que fueran más sutiles y evocadoras que los videos tradicionales.
</p>

<p style="text-align: justify;">
Antes de los kinogramas, existían técnicas similares de animación de imágenes, como los GIF animados, que habían sido populares durante décadas en la cultura digital. Sin embargo, los kinogramas se destacaron por su sofisticación y su capacidad para crear ilusiones visuales realistas y atractivas.
</p>

<p style="text-align: justify;">
Desde entonces, los kinogramas se han convertido en una forma popular de arte digital y publicidad en línea. Muchos fotógrafos y diseñadores han utilizado esta técnica para crear imágenes en movimiento con efectos visuales sorprendentes, y las marcas han utilizado los kinogramas en campañas publicitarias para capturar la atención de los consumidores.
</p>

<p style="text-align: justify;">
En términos de trabajo previo, la técnica de superponer animación en fotografías para crear ilusiones visuales había sido utilizada anteriormente en películas y animaciones. Por ejemplo, la técnica de "rotoscopio" se utilizó en la década de 1910 para animar películas, y también se utilizó en la película animada de Disney de 1977, "The Rescuers". Sin embargo, los kinogramas fueron la primera vez que esta técnica se utilizó específicamente para crear imágenes fijas en movimiento.
</p>

### Solución
{{< details title="p5-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-iframe sketch="/showcase/sketches/kg.js" width="625" height="625" */>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/kg.js" width="625" height="625" >}}
### Implementación

<p style="text-align: justify;">
Se implementaron dos kinegramas utilizando dos imágenes estáticas y una rejilla que se desplaza verticalmente, es posible observaro como se forman patrones en movimiento a medida que se desplaza la rejilla.
</p>

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

### Conclusiones

<p style="text-align: justify;">
En conclusión, el kinegrama es una técnica visual fascinante que crea la ilusión de movimiento a través de una serie de imágenes estáticas, esto demuestra cómo nuestro cerebro puede ser engañado por patrones y efectos visuales, y cómo la tecnología puede aprovechar esta capacidad para crear imágenes y animaciones que parecen tener vida propia.
</p>

### Trabajo futuro
<p style="text-align: justify;">
En cuanto al futuro de los kinogramas, se espera que continúen evolucionando y siendo utilizados en una amplia variedad de campos, incluyendo el arte, la publicidad, el cine y la fotografía. 
</p>