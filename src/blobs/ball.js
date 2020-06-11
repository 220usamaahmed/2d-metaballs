class Ball {

	constructor(_anchor_x, _anchor_y, _r) {
		this.anchor = { x: _anchor_x, y: _anchor_y };
		this.r = _r;
		this.pos = { x: width / 2, y: height / 2 };
		this.vel = { dx: 0, dy: 0};
		this.damping = 5;
	}

	update() {
		this.pos.x += this.vel.dx;
		this.pos.y += this.vel.dy;

		this.vel.dx += ((this.anchor.x - this.pos.x) / 100) - (this.vel.dx / this.damping);
		this.vel.dy += ((this.anchor.y - this.pos.y) / 100) - (this.vel.dy / this.damping);
	}

	applyForce(repX, repY) {

		const repMag = Math.sqrt(Math.pow(this.pos.x - repX, 2) + Math.pow(this.pos.y - repY, 2));
		const repDirX = (this.pos.x - repX) / repMag;
		const repDirY = (this.pos.y - repY) / repMag; 

		this.pos.x += repDirX * 2;
		this.pos.y += repDirY * 2;
	}

	debugDraw() {
		stroke(255, 0, 0); strokeWeight(8);
		point(this.anchor.x, this.anchor.y);

		strokeWeight(4);
		line(this.anchor.x, this.anchor.y, this.pos.x, this.pos.y);

		stroke(255, 0, 0); strokeWeight(8);
		point(this.pos.x, this.pos.y);

		stroke(255, 0, 255); strokeWeight(2); noFill();
		ellipse(this.pos.x, this.pos.y, this.r * 2);
	}

	sample(x, y) {
		return Math.pow(this.r, 2) / (Math.pow(this.pos.x - x, 2) + Math.pow(this.pos.y - y, 2));
	}

}