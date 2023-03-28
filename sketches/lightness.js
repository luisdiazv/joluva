let img;
let brightnessValue = 45;


function get_pixel_position(x, y, width) {
  return (x + y * width) * 4;
}

function get_pixel_color(x, y, width) {
  let xy = get_pixel_position(x, y, width);
  return [
    img.pixels[xy],
    img.pixels[xy + 1],
    img.pixels[xy + 2],
    //img.pixels[xy + 3],
  ];
}


function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function preload() {
  img = loadImage("/showcase/sketches/lennna.jpg");
  img.loadPixels();
}

function setup() {
  createCanvas(600, img.height*2);
  background(255);
  inp = createInput('');
  inp.position(0, 0);
  inp.size(100);
  inp.input(myInputEvent);
}


function myInputEvent() {
  brightnessValue = parseInt(this.value());
}

function draw() {
  // put drawing code here  


  // Change the image brightness in RGB mode

  colorMode(RGB);
  background(255);
  text("Brightness value: " + brightnessValue, 10, 510);

  image(img, 0, 20);
  text("Original Image", img.width / 3, 10);
  img.loadPixels();
  

  // Change image brightness with HSL color mode

  colorMode(HSL,1,1,100);
  changed_img = img.get();
  changed_img.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let pixel_colors = get_pixel_color(i, j, img.width);
      let new_hsl_color = rgbToHsl(pixel_colors[0],pixel_colors[1],pixel_colors[2]);
      new_hsl_color[2] = brightnessValue;
      changed_img.set(i, j, color(new_hsl_color));
    }
  }
  changed_img.updatePixels();

  image(changed_img, 0, img.height);

  text("Changed Image (HSL)", img.width / 3, img.height);

}