function dither(image) {
    this.image = image;
    this.width = this.image.width;
    this.steps = this.image.height/this.width;
    this.image.loadPixels();
    //console.log(this.file + ", " + this.image + ", " + this.width + ", " + this.steps);
  }
  
  function ditherColor(color, x1, y1) {
    var c = brightness(color);
    var mX = x1 % dithers[currentDither].width;
    var mY = y1 % dithers[currentDither].width;
    var level = ceil(map(c, 0, 100, dithers[currentDither].steps, 0));
    
      var newColor = dithers[currentDither].image.get(mX, mY+(level-1)*dithers[currentDither].width);
  
    if(newColor.toString('#rrggbb') == "255,255,255,255") {
       return true;
       }
    else {
      return false;
    }
  }