let img;
let showOriginal = false; // Variable para controlar si se muestra la imagen original

function preload() {
    img = loadImage('/showcase/sketches/paisaje.jpg');
}

function setup() {
    createCanvas(img.width, img.height);
    noLoop();

    // Crear el botón de interruptor
    let switchButton = createButton('Mostrar Original');
    switchButton.position(10, 10);
    switchButton.mousePressed(toggleShowOriginal);
}

function draw() {
    drawMosaic(3, color(30, 30, 30));

    // Mostrar la imagen original si showOriginal es true
    if (showOriginal) {
        image(img, 0, 0);
    }
}

function toggleShowOriginal() {
    // Cambiar el estado de showOriginal al hacer clic en el botón de interruptor
    showOriginal = !showOriginal;
    redraw(); // Volver a dibujar la pantalla
}

const columnWidth = (dotRadius) => dotRadius * 3;

const numberOfColumns = (dotRadius) =>
    Math.ceil(width / columnWidth(dotRadius));

function drawColumnDots(dotRadius, offsetX) {
    line(offsetX, 0, offsetX, height);
}

function drawMosaic(dotRadius, backgroundColor) {
    background(backgroundColor);
    for (let i = 0; i < numberOfColumns(dotRadius); i++) {
        offsetX = i * columnWidth(dotRadius);
        drawColumnDots(dotRadius, offsetX);
    }
}

function drawColumnDots(dotRadius, offsetX) {
    line(offsetX, 0, offsetX, height);

    let dotDiameter = 2 * dotRadius;
    let dotHeightWithPadding = dotDiameter + 2;
    let numDotsInColumn = Math.floor(height / dotHeightWithPadding);
    let topY = Math.floor(random(10));

    for (let i = 0; i < numDotsInColumn; i++) {
        let centerX = Math.floor(random(
            offsetX + dotRadius,
            offsetX + columnWidth(dotRadius) - dotRadius,
        ))

        let centerY = topY + i * dotHeightWithPadding + dotRadius;

        let dotColor = img.get(centerX, centerY);
        noStroke()
        fill(dotColor);

        ellipse(centerX, centerY, dotDiameter, dotDiameter);
    }
}