precision mediump float;
uniform sampler2D source;
uniform bool original;
uniform float resolution;


varying vec2 texcoords2; 

void main() {

   float randx = mod(floor(texcoords2.x*10.0),2.0);
   float randy = mod(floor(texcoords2.y*10.0),2.0); 

   if (original) {
     gl_FragColor = texture2D(source, texcoords2);
   }else {
     vec2 stepCoord = texcoords2 * resolution;
     float x = randx == 0.0 ? floor(stepCoord.x) : ceil(stepCoord.x);
     float y = randy == 0.0 ? floor(stepCoord.y) : ceil(stepCoord.y);
     stepCoord = vec2(x,y);
     stepCoord = stepCoord / vec2(resolution);
     gl_FragColor =  texture2D(source, stepCoord);
   }
}