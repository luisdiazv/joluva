precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform float mask[25];
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
    vec2 tc9 = texpos + vec2(-texOffset.s-texOffset.s, -texOffset.t-texOffset.t);
    vec2 tc10 = texpos + vec2(-texOffset.s-texOffset.s, -texOffset.t);
    vec2 tc11 = texpos + vec2(-texOffset.s-texOffset.s, 0);
    vec2 tc12 = texpos + vec2(-texOffset.s-texOffset.s, +texOffset.t);
    vec2 tc13 = texpos + vec2(-texOffset.s-texOffset.s, +texOffset.t+texOffset.t);
    vec2 tc14 = texpos + vec2(-texOffset.s,+texOffset.t+texOffset.t);
    vec2 tc15 = texpos + vec2(0.0,+texOffset.t+texOffset.t);
    vec2 tc16 = texpos + vec2(+texOffset.s,+texOffset.t+texOffset.t);
    vec2 tc17 = texpos + vec2(+texOffset.s+texOffset.s,+texOffset.t+texOffset.t);
    vec2 tc18 = texpos + vec2(+texOffset.s+texOffset.s,+texOffset.t);
    vec2 tc19 = texpos + vec2(+texOffset.s+texOffset.s,0.0);
    vec2 tc20 = texpos + vec2(+texOffset.s+texOffset.s,-texOffset.t);
    vec2 tc21 = texpos + vec2(+texOffset.s+texOffset.s,-texOffset.t-texOffset.t);
    vec2 tc22 = texpos + vec2(+texOffset.s,-texOffset.t-texOffset.t);
    vec2 tc23 = texpos + vec2(0.0,-texOffset.t-texOffset.t);
    vec2 tc24 = texpos + vec2(-texOffset.s,-texOffset.t-texOffset.t);
    

    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[25];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);
    rgba[9] = texture2D(texture, tc9);
    rgba[10] = texture2D(texture, tc10);
    rgba[11] = texture2D(texture, tc11);
    rgba[12] = texture2D(texture, tc12);
    rgba[13] = texture2D(texture, tc13);
    rgba[14] = texture2D(texture, tc14);
    rgba[15] = texture2D(texture, tc15);
    rgba[16] = texture2D(texture, tc16);
    rgba[17] = texture2D(texture, tc17);
    rgba[18] = texture2D(texture, tc18);
    rgba[19] = texture2D(texture, tc19);
    rgba[20] = texture2D(texture, tc20);
    rgba[21] = texture2D(texture, tc21);
    rgba[22] = texture2D(texture, tc22);
    rgba[23] = texture2D(texture, tc23);
    rgba[24] = texture2D(texture, tc24);
    // 3. Apply convolution kernel
    vec4 convolution;
    for (int i = 0; i < 25; i++) {
        convolution += rgba[i]*mask[i];
    }

    
    
    gl_FragColor = max(min(vec4(convolution.rgb, 1.0),vec4(1.0)),vec4(0.0)); 
  }else if(magnify && distance(mouse,texcoords2)<=radius){
    gl_FragColor =  texture2D(texture,vec2(mouse.x+(dx/aumentFactor),mouse.y+(dy/aumentFactor)));
  }else{
    gl_FragColor =  texture2D(texture, texcoords2);
  }
  
}