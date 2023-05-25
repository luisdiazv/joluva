precision mediump float;

uniform sampler2D texture; // The input texture
uniform sampler2D texture1;
uniform vec4 tint; // The tint color to apply
uniform bool img;
varying vec2 texcoords2; // Interpolated texture coordinates

void main() {
  // Sample the texture at the current fragment's texture coordinates
  vec4 texel = texture2D(texture, texcoords2);
  vec4 texel1 = texture2D(texture1, texcoords2);
  // Mix the texel color and the tint color
  vec4 mixedColor = img ? mix(texel, texel1, tint.a) : mix(texel, tint, tint.a);
  
  // Output the resulting color
  gl_FragColor =  mixedColor;
}
