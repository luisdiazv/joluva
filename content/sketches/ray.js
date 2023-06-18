const canvasSize = [500, 500];

let lightSource;
let numRays = 500;
let boundaries = [];
const numBoundaries = 5;

class Boundary {
    constructor(x1, y1, x2, y2) {
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
        this.norm = p5.Vector.sub(this.p2, this.p1).rotate(PI / 2);
    }

    show() {
        stroke(255);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}

class LightSource {
    constructor(numRays) {
        this.source = createVector(0, 0);
        this.rays = Array(numRays);
        this.reflect = true;
        this.maxReflects = 3;
        this.alphaLoss = 1 / 3;

        let theta = 0;
        for (let i = 0; i < numRays; i++) {
            const x = cos(radians(theta));
            const y = sin(radians(theta));
            this.rays[i] = new Ray(this.source, createVector(x, y));
            theta += (360 / numRays);
        }
    }

    setSource(x, y) {
        this.source = createVector(x, y);
    }

    setMaxReflects(n) {
        this.maxReflects = n;
    }

    setAlphaLoss(alpha) {
        this.alphaLoss = alpha > 1 ? 1 : alpha;
    }

    toggleReflect() {
        this.reflect = !this.reflect;
    }

    show(boundaries) {
        for (const ray of this.rays) {
            this.cast(this.source, ray, boundaries, null, 0);
        }
        stroke(255);
        strokeWeight(5);
        point(this.source.x, this.source.y);
        strokeWeight(1);
    }

    cast(source, ray, boundaries, currentBoundary, numReflects) {

        if (numReflects === this.maxReflects || ray.alpha <= 10) {
            return;
        }

        ray.setSource(source);

        let closestBoundary = null
        let closest = null;
        let minDist = Infinity;

        // Verify boundary / ray intersection
        // Only draw the closest intersection
        for (const boundary of boundaries) {

            if (boundary === currentBoundary) {
                continue;
            }

            let p = intersection(ray, boundary);
            if (p) {
                const newDist = p5.Vector.dist(ray.source, p);
                if (newDist < minDist) {
                    minDist = newDist;
                    closest = p;
                    closestBoundary = boundary;
                }
            }
        }
        if (closest) {
            ray.setEndpoint(closest);
            ray.show();

            if (!this.reflect) {
                return;
            }

            // Cast recursively reflected rays
            let newDirection = reflect(ray.direction.copy(), closestBoundary.norm.copy());
            let newRay = new Ray(closest, newDirection, ray.alpha * this.alphaLoss);

            this.cast(closest, newRay, boundaries, closestBoundary, numReflects + 1);
        }
    }
}

class Ray {
    constructor(source, direction, alpha = 150, endpoint = null) {
        this.source = source;
        this.direction = direction;
        this.alpha = alpha;
        this.endpoint = endpoint ?? direction;
    }

    setSource(source) {
        this.source = source;
    }

    setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }

    show() {
        stroke(255, 0, 255, this.alpha);
        line(this.source.x, this.source.y, this.endpoint.x, this.endpoint.y);
    }
}

function intersection(ray, boundary) {
    const x1 = boundary.p1.x;
    const y1 = boundary.p1.y;
    const x2 = boundary.p2.x;
    const y2 = boundary.p2.y;

    const x3 = ray.source.x;
    const y3 = ray.source.y;
    const x4 = ray.source.x + ray.direction.x;
    const y4 = ray.source.y + ray.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
        return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    } else {
        return;
    }
}

function reflect(ray, surfaceNormal) {
    ray.normalize();
    surfaceNormal.normalize();
    return ray.sub(surfaceNormal.mult(2 * ray.dot(surfaceNormal)));
}

function setup() {
    noCursor();
    createCanvas(canvasSize[0], canvasSize[1]);

    boundaries.push(new Boundary(0, 0, width, 0));
    boundaries.push(new Boundary(width, 0, width, height));
    boundaries.push(new Boundary(width, height, 0, height));
    boundaries.push(new Boundary(0, height, 0, 0));

    for (let i = 0; i < numBoundaries; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        boundaries.push(new Boundary(x1, y1, x2, y2));
    }

    lightSource = new LightSource(numRays);
}

function draw() {

    background(0);

    lightSource.setSource(mouseX, mouseY);
    lightSource.show(boundaries);

    boundaries.forEach(boundary => boundary.show());
}

function keyPressed() {
    if (keyCode === 32) {
        lightSource.toggleReflect();
    }
}

function mouseClicked() {
    if (mouseButton === LEFT) {
        lightSource.toggleReflect();
    }
}