let colorMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 0];

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



