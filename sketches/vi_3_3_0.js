let corrections =[
  [0, 1.05118294, -0.05116099, 0, 1, 0, 0, 0, 1], // 0- Dicromatismo  Protanopia - noR
  [1, 0, 0, 0.9513092, 0, 0.04866992, 0, 0, 1], // 1- Dicromatismo  Deuteranopia - noG
  [1, 0, 0, 0, 1, 0, -0.86744736, 1.86727089, 0], // 2- Dicromatismo  Tritanopia - noB
  [0.212656, 0.715158, 0.072186, 0.212656, 0.715158, 0.072186, 0.212656, 0.715158, 0.072186], // 3- Monocromatismo Rojo - onlyR
  [0.15537, 0.75792, 0.0867, 0.15537, 0.75792, 0.0867, 0.15537, 0.75792, 0.0867], // 4- Monocromatismo Verde - onlyG
  [0.01775, 0.10945, 0.87262, 0.01775, 0.10945, 0.87262, 0.01775, 0.10945, 0.87262]]; // 5- Monocromatismo Azul - onlyB

let colorMatrix = corrections[1]

function draw() {
  createCanvas(400,300);
  let img = loadImage('/showcase/sketches/store.jpg',function(){;
    image(img, 0, 0, width, height);
    colorMode(RGB, 255);
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i+1];
      let b = pixels[i+2];
      pixels[i]   = r * colorMatrix[0] + g * colorMatrix[1] + b * colorMatrix[2];
      pixels[i+1] = r * colorMatrix[3] + g * colorMatrix[4] + b * colorMatrix[5];
      pixels[i+2] = r * colorMatrix[6] + g * colorMatrix[7] + b * colorMatrix[8];
  }
})
  updatePixels();
}  