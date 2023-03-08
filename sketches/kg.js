new p5((p)=>{

  let lenna;
  let y = 0;
  p.preload = function() {
    mask = p.loadImage('/showcase/sketches/o33t.png'); 
    ring = p.loadImage('/showcase/sketches/rings.png');
    wheel = p.loadImage('/showcase/sketches/wheel.png');
  }

  p.setup = function() {
    
    p.createCanvas(600, 600);
    mask.resize(900,700);
    ring.resize(700,800);
    wheel.resize(700,800);
  }

  p.draw = function()  {
    p.background(255);
    p.image(ring,100,-20);
    p.image(wheel,100,250);
    p.image(mask, -30, p.mouseY-150);
    
    
  }
},"kg")