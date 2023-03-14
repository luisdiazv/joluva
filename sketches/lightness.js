let img;
let brightness_reduction = 0;

function calculate_hue(r_prime, g_prime, b_prime) {
  // Geometric method
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let h = 0;
  let s = 0;
  if (delta == 0) {
    h = 0; // Can be any color
  } else if (c_max == r_prime) {
    h = 60 * (((g_prime - b_prime) / delta) % 6);
  } else if (c_max == g_prime) {
    h = 60 * ((b_prime - r_prime) / delta + 2);
  } else if (c_max == b_prime) {
    h = 60 * ((r_prime - g_prime) / delta + 4);
  }

  if (c_max) {
    s = delta / c_max;
  }

  return h;
}

function calculate_saturation(r_prime, g_prime, b_prime) {
  // Distance from center to max
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let s = 0;
  if (c_max) {
    s = 1 - c_min / c_max;
  }

  return s * 100;
}


function calculate_hsl_saturation(r_prime, g_prime, b_prime) {
  // Distance from center to max
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let delta = c_max - c_min; // delta rgb
  let s = 0;
  if (calculate_lightness(r_prime, g_prime, b_prime) != 0 && calculate_lightness(r_prime, g_prime, b_prime) != 100) {
    s = delta / (1 - abs(2 * c_max - 1));
  }

  return s * 100;
}

function calculate_lightness(r_prime, g_prime, b_prime) {
  let c_max = max(r_prime, g_prime, b_prime); // max of r', g', b'
  let c_min = min(r_prime, g_prime, b_prime); // min of r', g', b'
  let l = (c_max + c_min) / 2;
  return l * 100;
}

function get_pixel_position(x, y, width) {
  return (x + y * width) * 4;
}

function get_pixel_color(x, y, width) {
  let xy = get_pixel_position(x, y, width);
  return [
    img.pixels[xy],
    img.pixels[xy + 1],
    img.pixels[xy + 2],
    img.pixels[xy + 3],
  ];
}


function set_hsl(colour) {
  let r_prime = colour[0] / 255;
  let g_prime = colour[1] / 255;
  let b_prime = colour[2] / 255;

  let h = calculate_hue(r_prime, g_prime, b_prime);
  let s = calculate_hsl_saturation(r_prime, g_prime, b_prime);
  let l = calculate_lightness(r_prime, g_prime, b_prime);
  let hsl = [h, s, l];
  return hsl;
}

function preload() {
  img = loadImage("/showcase/sketches/lennna.jpg");
  img.loadPixels();
}

function setup() {
  createCanvas(600, img.height*2);
  background(255);
}

function keyPressed() {
  if (keyCode === 68) { // 
    brightness_reduction -= 5;

  }
  else if (keyCode === 65) { // 
    brightness_reduction += 5;

  }
  else if (keyCode === 87) { // 
    brightness_reduction -= 1;
  }
  else if (keyCode === 83) { //
    brightness_reduction += 1;
  }

  if (brightness_reduction > 100) {
    brightness_reduction = 100;
  }
  else if (brightness_reduction < -100) {
    brightness_reduction = -100;
  }


}

function draw() {
  // put drawing code here  


  // Change the image brightness in RGB mode

  colorMode(RGB);
  background(255);
  text("Brightness reduction: " + brightness_reduction, 10, 510);

  image(img, 0, 20);
  text("Original Image", img.width / 3, 10);
  img.loadPixels();
  

  // Change image brightness with HSL color mode

  colorMode(HSL);
  changed_img = img.get();
  changed_img.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let new_hsl_color = set_hsl(get_pixel_color(i, j, img.width));
      new_hsl_color[2] = new_hsl_color[2] - (brightness_reduction  );
      changed_img.set(i, j, color(new_hsl_color));
    }
  }
  changed_img.updatePixels();

  image(changed_img, 0, img.height);

  text("Changed Image (HSL)", img.width / 3, img.height);

}