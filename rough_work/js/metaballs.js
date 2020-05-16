PADDING = 128

class Circle {

	constructor() {
		this.x = random(PADDING, width - PADDING);
		this.y = random(PADDING, height - PADDING);	
		this.r = random(64, 128);
	}

	draw() {
		stroke(0, 255, 255); strokeWeight(2); noFill();
		ellipse(this.x, this.y, this.r * 2);
	}

	getSampleValue(x, y) {
		return ( Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) ) / Math.pow(this.r, 2);
	}

}


const SAMPLE_SIZE = 32;


function setup() {

	createCanvas(512, 512);

	circle = new Circle();

}

function draw() {

	background(255);

	sample();
	generatePath();
	// circle.draw();

	noLoop();

}

function sample() {
	stroke(0); strokeWeight(1);
	for (let x = 0; x < width; x += SAMPLE_SIZE) {
		for (let y = 0; y < height; y += SAMPLE_SIZE) {
			let s = circle.getSampleValue(x + SAMPLE_SIZE / 2, y + SAMPLE_SIZE / 2);
			if (s < 1) fill(128); else fill(0);
			// rect(x, y, SAMPLE_SIZE, SAMPLE_SIZE);
		}
	} 
}

function drawPoint(x, y, c=0) {

	let color = [0, 0, 0];
	color[c] = 255;

	strokeWeight(4); noFill(); stroke(...color);
	point(x + SAMPLE_SIZE / 2, y + SAMPLE_SIZE / 2);

}


let tailOffsets = [
	[-SAMPLE_SIZE, 0],
	[0, -SAMPLE_SIZE],
	[SAMPLE_SIZE, 0],
	[0, SAMPLE_SIZE],
];

function generatePath() {

	function findStartingPoint(x, y) {
		while (y < height) {

			// drawPoint(x, y);

			if (circle.getSampleValue(x + SAMPLE_SIZE / 2, y + SAMPLE_SIZE / 2) < 1) {
				// drawPoint(x, y, 1);
				return [x, y];
			}
			else {
				x += SAMPLE_SIZE;
				if (x >= width) {
					x = 0;
					y += SAMPLE_SIZE;
				}
			}
		}

		return [null, null];
	}

	sp = findStartingPoint(0, 0);

	// console.log(sp);

	let headStartX = sp[0];
	let headStartY = sp[1];

	let tailDir = 0;

	let currentX = headStartX;
	let currentY = headStartY;

	stroke(0, 0, 255); strokeWeight(32); strokeJoin(ROUND); fill(0, 0, 255);
	// noStroke(); fill(12, 136, 200);

	beginShape();

	while (true) {

		let tailX = currentX + tailOffsets[tailDir][0];
		let tailY = currentY + tailOffsets[tailDir][1];

		// drawPoint(currentX, currentY, 2);

		// console.log(circle.getSampleValue(tailX, tailY));

		if (circle.getSampleValue(tailX + SAMPLE_SIZE / 2, tailY + SAMPLE_SIZE / 2) > 1) {
			tailDir = (tailDir + 1) % 4;
			// drawPoint((currentX + tailX) / 2, (currentY + tailY) / 2, 1);
			vertex((currentX + tailX + SAMPLE_SIZE) / 2, (currentY + tailY + SAMPLE_SIZE) / 2);
		} else {
			currentX = tailX;
			currentY = tailY;
			tailDir = tailDir - 1;
			// tailDir = (tailDir - 1) % 4;
			if (tailDir == -1) tailDir = 3;
			else tailDir = tailDir % 4;
		}

		if (currentX == headStartX && currentY == headStartY && tailDir == 0) break;

	}

	endShape(CLOSE);

}