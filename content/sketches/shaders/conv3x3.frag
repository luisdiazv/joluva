precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform float mask[9];
uniform float radius;
uniform vec2 mouse;
uniform bool magnify;
uniform bool zone;
uniform bool conv;
varying vec2 texcoords2;

void main() {

  float aumentFactor = 2.0;
  float dx = texcoords2.x - mouse.x;
  float dy = texcoords2.y - mouse.y;
  
  if((distance(mouse,texcoords2)<=radius && conv) || (!zone && conv)){
    
    vec2 texpos = magnify ? vec2(mouse.x+(dx/aumentFactor),mouse.y+(dy/aumentFactor)):texcoords2;
    vec2 tc0 = texpos + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texpos + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texpos + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texpos + vec2(-texOffset.s,          0.0);
    vec2 tc4 = texpos + vec2(         0.0,          0.0);
    vec2 tc5 = texpos + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texpos + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texpos + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texpos + vec2(+texOffset.s, +texOffset.t);

    vec4 rgba[9];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);


    vec4 convolution;
    for (int i = 0; i < 9; i++) {
      convolution += rgba[i]*mask[i];
    }
    gl_FragColor = vec4(convolution.rgb, 1.0); 
  }else if(magnify && distance(mouse,texcoords2)<=radius){
    gl_FragColor =  texture2D(texture,vec2(mouse.x+(dx/aumentFactor),mouse.y+(dy/aumentFactor)));
  }else{
    gl_FragColor =  texture2D(texture, texcoords2);
  }
  
}