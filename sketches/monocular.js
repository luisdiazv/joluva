let arraySize = 15
let distanceBetween = 50;
let minHouseWidth = 30;
let maxHouseWidth = 60;
let first = new Array();
let second = new Array();
let third = new Array(); 


function setup() {
    createCanvas(500, 300);
    background(color(0,176,176));
    for(let i=0;i<arraySize;i++){first.push([floor(random(minHouseWidth,maxHouseWidth)),floor(random(30,100)),distanceBetween*i]);}
    for(let i=0;i<arraySize;i++){second.push([floor(random(minHouseWidth,maxHouseWidth)),floor(random(80,200)),distanceBetween*i]);}
    for(let i=0;i<arraySize;i++){third.push([floor(random(minHouseWidth,maxHouseWidth)),floor(random(180,300)),distanceBetween*i]);}
}
  //rgba(140,202,229,255)
function draw(){
    background(color(0,176,176));
    noStroke(0);

    for(let i=0;i<arraySize;i++){
        fill(color(140,202,229))
        rect(third[i][2],300-third[i][1],third[i][0],third[i][1]);
        third[i][2] = (third[i][2]+1)%width;
    }


    for(let i=0;i<arraySize;i++){
        fill(color(180,221,247))
        rect(second[i][2],300-second[i][1],second[i][0],second[i][1]);
        second[i][2] = (second[i][2]+2)%width;
    }


    for(let i=0;i<arraySize;i++){
        fill(color(255,255,255))
        rect(first[i][2],300-first[i][1],first[i][0],first[i][1]);
        first[i][2] = (first[i][2]+3)%width;
    }
    
    
}