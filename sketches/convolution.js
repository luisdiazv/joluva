var inp;
let filter = [
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2]
];
var showFilter = false;
var leftM = 30;
var upM = 15;


function preload() {
    img = loadImage("/showcase/sketches/lennna.jpg");
}
  
function getIndex(x, y) {
    return (x + y * img.width) * 4;
}

function myInputEvent() {
    let filterRows = this.value().substring(1,this.value().length-1).split(',');
  
    let newFilter = new Array();
    for(let i=0;i<3;i++){
      let tmp = new Array();
      for(let j=0;j<3;j++){
          tmp.push(parseInt(filterRows[3*i+j]));
      }
      newFilter.push(tmp);
    }
    filter = newFilter;
}



function setup() {
    createCanvas(img.width + 2*leftM, img.height + 2*upM );
    inp = createInput('');
    inp.position(0, 0);
    inp.size(150);
    inp.input(myInputEvent);
      
  
    // img.filter(GRAY);
    loadPixels();
    img.loadPixels();
    filtered = createImage(img.width, img.height);
    filtered.loadPixels();
  
  
    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        let idx = getIndex(i, j);
        //kernel
        let filteredPixel = convolute(i, j);
        filtered.pixels[idx + 0] = red(filteredPixel);
        filtered.pixels[idx + 1] = green(filteredPixel);
        filtered.pixels[idx + 2] = blue(filteredPixel);
        filtered.pixels[idx + 3] = alpha(filteredPixel);
      }
    }
  
    img.updatePixels();
    filtered.updatePixels();
    updatePixels();
    strokeWeight(4);
  
}



function draw() {
    background(220);
    
    //image(img, leftM, upM);
    
    if (showFilter)
      image(filtered, leftM, upM);
    else
      image(img, leftM, upM);
    stroke(0);
    
  
    push();
}

function convolute(x, y) {
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let pix = getIndex(x + i, y + j);
        let factor = filter[j + 1][i + 1];
  
        sumR += (img.pixels[pix + 0] * factor);
        sumG += (img.pixels[pix + 1] * factor);
        sumB += (img.pixels[pix + 2] * factor);
      }
    }
    return color(
      sumR, sumG, sumB
    );
  }


  function keyPressed() {
    if (keyCode === 32) {
      showFilter = !showFilter
      if (showFilter){
        filtered = createImage(img.width, img.height);
        filtered.loadPixels();
        for (let i = 0; i < img.width; i++) {
          for (let j = 0; j < img.height; j++) {
            let idx = getIndex(i, j);
            let filteredPixel = convolute(i, j);
            filtered.pixels[idx + 0] = red(filteredPixel);
            filtered.pixels[idx + 1] = green(filteredPixel);
            filtered.pixels[idx + 2] = blue(filteredPixel);
            filtered.pixels[idx + 3] = alpha(filteredPixel);
          }
        }
        filtered.updatePixels();
        updatePixels();
        strokeWeight(4);
        calculateHistogram(filtered);
        console.log(filter);
      }
      else{
        calculateHistogram(img);
      }
        
    }
  
  }
  

  
