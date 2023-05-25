precision mediump float;

uniform bool hslOpt;
uniform bool hsvOpt;
uniform float light;
uniform sampler2D texture;
varying vec2 texcoords2;


vec4 rgbTohsl(vec4 c){
    float minValue = min(min(c.r,c.g),c.b);
    float maxValue = max(max(c.r,c.g),c.b);
    float l = (maxValue + minValue) / 2.0;
    float delta = maxValue - minValue;
    float s = delta / (1.0 - abs(2.0*l - 1.0));
    float h;
    if(maxValue==c.r){
        h = (c.g - c.b) / delta + (c.g < c.b ? 6.0 : 0.0);
    }else if(maxValue==c.g){
        h = (c.b - c.r) / delta + 2.0;
    }else if(maxValue==c.b){
        h = (c.r - c.g) / delta + 4.0;
    }
    h = h/6.0;
    h = mod(h,1.0);
    return vec4(h,s,l,1.0);
}

float hueToRgb(float p, float q, float t) {
  if (t < 0.0) t += 1.0;
  if (t > 1.0) t -= 1.0;
  
  if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
  if (t < 1.0/2.0) return q;
  if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
  
  return p;
}

vec4 hslToRgb(vec4 hsl) {
  float hue = hsl.x;
  float saturation = hsl.y;
  float lightness = hsl.z;
  
  if (saturation == 0.0) {
    return vec4(vec3(lightness),1.0); // Achromatic, return L for R, G, B
  } else {
    float q = lightness < 0.5 ? lightness * (1.0 + saturation) : lightness + saturation - lightness * saturation;
    float p = 2.0 * lightness - q;
    
    float r = hueToRgb(p, q, hue + 1.0/3.0);
    float g = hueToRgb(p, q, hue);
    float b = hueToRgb(p, q, hue - 1.0/3.0);
    
    return vec4(r, g, b,1.0);
  }
}


vec4 rgbToHsv(vec4 rgb) {
  float maxVal = max(rgb.r, max(rgb.g, rgb.b));
  float minVal = min(rgb.r, min(rgb.g, rgb.b));
  float delta = maxVal - minVal;

  float hue = 0.0;
  float saturation = 0.0;
  float value = maxVal;

  if (delta != 0.0) {
    if (maxVal == rgb.r) {
      hue = (rgb.g - rgb.b) / delta;
    } else if (maxVal == rgb.g) {
      hue = 2.0 + (rgb.b - rgb.r) / delta;
    } else {
      hue = 4.0 + (rgb.r - rgb.g) / delta;
    }
    hue /= 6.0;

    if (value != 0.0) {
      saturation = delta / value;
    }
  }

  return vec4(hue, saturation, value, 1.0);
}

vec4 hsvToRgb(vec4 hsv) {
  float hue = hsv.x;
  float saturation = hsv.y;
  float value = hsv.z;
  
  if (saturation == 0.0) {
    return vec4(vec3(value),1.0); // Achromatic, return V for R, G, B
  } else {
    float c = value * saturation;
    float x = c * (1.0 - abs(mod(hue * 6.0, 2.0) - 1.0));
    float m = value - c;
    
    vec3 rgb;
    
    if (hue < 1.0/6.0) {
      rgb = vec3(c, x, 0.0);
    } else if (hue < 2.0/6.0) {
      rgb = vec3(x, c, 0.0);
    } else if (hue < 3.0/6.0) {
      rgb = vec3(0.0, c, x);
    } else if (hue < 4.0/6.0) {
      rgb = vec3(0.0, x, c);
    } else if (hue < 5.0/6.0) {
      rgb = vec3(x, 0.0, c);
    } else {
      rgb = vec3(c, 0.0, x);
    }
    
    return vec4(rgb + m,1.0);
  }
}

void main(){
    vec4 texel = texture2D(texture, texcoords2);
    if(hslOpt){
        vec4 hslColor = rgbTohsl(texel);
        hslColor.z = light; 
        gl_FragColor = hslToRgb(hslColor);
    }else if(hsvOpt){
        vec4 hsvColor = rgbToHsv(texel);
        hsvColor.z = light; 
        gl_FragColor = hsvToRgb(hsvColor);
    }else{
        gl_FragColor = texel;
    }
    
}