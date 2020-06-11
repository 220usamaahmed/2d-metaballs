function setup() {
	let cnv = createCanvas(640, 640);
	cnv.parent('blobs-holder');
	// cnv.mouseMoved(updateSpace);

	space = new Space(width, height);
	blobRenderer = new blobRenderer(space);

	// frameRate(12);
}

function updateSpace () {
	space.applyForce(mouseX, mouseY);
}

function draw() {
	background(255);

	updateSpace();

	// blobRenderer.debugDraw();
	blobRenderer.render();
	space.update();

	// noLoop();
}

