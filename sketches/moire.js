new p5((p)=>{

    let rotation = 0;
    p.preload = function() {
      mask = p.loadImage('/showcase/sketches/o33t.png'); 
      mask2 = p.loadImage('/showcase/sketches/o33t.png');
    }
  
    p.setup = function() {
      p.createCanvas(600, 600);
      mask.resize(500,500);
      mask2.resize(500,500);
      p.imageMode(p.CENTER);
      p.angleMode(p.DEGREES);
    }
  
    p.draw = function()  {
      p.background(255);
      p.image(mask2,p.width / 2,p.height / 2);
      p.translate(p.width / 2, p.height / 2);
      p.rotate(rotation);
      p.image(mask, 0, 0);
      rotation +=1;
      
      
    }
  },"moire")