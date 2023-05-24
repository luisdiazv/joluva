precision mediump float;

uniform float radius;
uniform vec2 mouse;
uniform sampler2D texture;
uniform vec2 texOffset;
varying vec2 texcoords2;



void main(){
    float aumentFactor = 1.5;
    float dis = distance(mouse,texcoords2);
    float dx = texcoords2.x - mouse.x;
    float dy = texcoords2.y - mouse.y;
    if(dis<=radius){
        gl_FragColor = texture2D(texture, vec2(mouse.x+(dx/aumentFactor),mouse.y+(dy/aumentFactor)));

    }else{
        gl_FragColor = texture2D(texture, texcoords2);
    }

}