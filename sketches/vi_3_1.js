//IMAGEN ORIGINAL
let img;

function preload(){
    img = loadImage('/showcase/sketches/store.jpg');
}

function setup(){
    createCanvas(img.width, img.height);
}

function draw(){
    background(120);
    image(img,0,0);
}