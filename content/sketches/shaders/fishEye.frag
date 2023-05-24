precision mediump float;

uniform float radius;
uniform vec2 mouse;
uniform sampler2D texture;
uniform vec2 texOffset;
varying vec2 texcoords2;

float atan2(float y, float x) {
  if (x > 0.0) {
    return atan(y / x);
  } else if (x < 0.0 && y >= 0.0) {
    return atan(y / x) + 3.141592653589793;
  } else if (x < 0.0 && y < 0.0) {
    return atan(y / x) - 3.141592653589793;
  } else if (x == 0.0 && y > 0.0) {
    return 1.5707963267948966;
  } else if (x == 0.0 && y < 0.0) {
    return -1.5707963267948966;
  } else {
    return 0.0;
  }
}


void main(){
    float dis = distance(mouse,texcoords2);
    float dx = texcoords2.x - mouse.x;
    float dy = texcoords2.y - mouse.y;
    if(dis<=radius){
        float r = dis/radius;
        float theta = atan2(dy,dx);
        float distortionFactor = 0.2;
        float xDistorted = mouse.x + (r*r*lensRadius*distortionFactor)*cos(theta)*texOffset.s;

        float yDistorted = mouse.y + (r*r*lensRadius*distortionFactor)*sin(theta)*texOffset.t;
        //let xDistorted = mouseX + (r * r * lensRadius * distortionFactor) * cos(theta);
        //let yDistorted = mouseY + (r * r * lensRadius * distortionFactor) * sin(theta);
        //set(x, y, get(xDistorted, yDistorted));
        gl_FragColor = texture2D(texture, vec2(xDistorted,yDistorted));

    }else{
        gl_FragColor = texture2D(texture, texcoords2);
    }

}