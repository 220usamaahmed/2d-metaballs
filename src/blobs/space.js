class Space {
	
	constructor(_width, _height) {
		this.size = { width: _width, height: _height };

		this.initializeBalls();
	}

	initializeBalls() {
		this.balls = [];

		this.balls.push(new Ball(300, 124, 60));
		this.balls.push(new Ball(440, 124, 60));
		this.balls.push(new Ball(380, 244, 60));

		this.balls.push(new Ball(180, 424, 50));
		this.balls.push(new Ball(280, 480, 50));
		this.balls.push(new Ball(200, 344, 50));

		this.balls.push(new Ball(400, 400, 30));
		this.balls.push(new Ball(150, 130, 30));

	}

	update() {
		for (let ball of this.balls)
			ball.update();
	}

	applyForce(repX, repY) {
		for (let ball of this.balls)
			ball.applyForce(repX, repY);
	}

	sample(x, y) {
		return this.balls.reduce((total, ball) => total + ball.sample(x, y), 0);
	}

	debugDraw() {
		for (let ball of this.balls)
			ball.debugDraw();
	}

}