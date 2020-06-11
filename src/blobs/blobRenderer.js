class blobRenderer {

	constructor(_space) {
		this.space = _space;
		this.sampleSize = 6;

		this.numRows = Math.ceil(this.space.size.height / this.sampleSize);
		this.numCols = Math.ceil(this.space.size.width / this.sampleSize);

		this.k = 1;
	}

	render() {

		// let pathCount = 0;

		// strokeWeight(12); stroke(255, 21, 60); // strokeJoin(ROUND); // fill(255, 21, 60);
		// strokeWeight(12); stroke(255, 21, 60); fill(255, 21, 60);
		strokeWeight(4); stroke(233, 33, 90); strokeJoin(ROUND); // fill(255, 21, 60);
		// noStroke(); fill(255, 0, 128);

		const tailOffsets = [[-1, 0], [0, -1], [1, 0], [0, 1]];
		let tailDir = 0;

		let visitedSamplePoints = {};
		let startingPoint = this.findNextStartingPoint(0, 0);

		while (startingPoint != null) {

			let headStartRow = startingPoint[0];
			let headStartCol = startingPoint[1];

			let currentHeadRow = headStartRow;
			let currentHeadCol = headStartCol;



			if (headStartRow in visitedSamplePoints && visitedSamplePoints[headStartRow].includes(headStartCol)) {
				startingPoint = this.findNextStartingPoint(headStartRow, headStartCol + 1);
				continue;
			}

			beginShape();

			// pathCount++;

			while (true) {

				const tailRow = currentHeadRow + tailOffsets[tailDir][0];
				const tailCol = currentHeadCol + tailOffsets[tailDir][1];

				const tailSample = this.space.sample(tailCol * this.sampleSize, tailRow * this.sampleSize);
				const headSample = this.space.sample(currentHeadCol * this.sampleSize, currentHeadRow * this.sampleSize);

				if (tailSample < this.k) {
					tailDir = (tailDir + 1) % 4;
					vertex(...this.linearInterpolate(currentHeadRow, currentHeadCol, tailRow, tailCol, headSample, tailSample));

					if (currentHeadRow in visitedSamplePoints) visitedSamplePoints[currentHeadRow].push(currentHeadCol);
					else visitedSamplePoints[currentHeadRow] = [currentHeadCol];

				} else {
					currentHeadRow = tailRow;
					currentHeadCol = tailCol;
					tailDir = --tailDir == -1 ? 3 : tailDir % 4;
				}

				if (currentHeadRow == headStartRow && currentHeadCol == headStartCol && tailDir == 0) break;
			}

			endShape(CLOSE);

			startingPoint = this.findNextStartingPoint(headStartRow, headStartCol + 1);

		}

		// console.log(pathCount);

	}

	linearInterpolate(headRow, headCol, tailRow, tailCol, headSample, tailSample) {
		let x;
		let y;

		const r = (headSample - this.k) / (headSample - tailSample);

		if (headCol == tailCol) {
			x = (headCol + tailCol) / 2;
			y = headRow + (r * (tailRow - headRow));
		} else {
			x = headCol + (r * (tailCol - headCol));
			y = (headRow + tailRow) / 2;
		}

		return [x * this.sampleSize, y * this.sampleSize];
	}

	findNextStartingPoint(row, col) {
		while (row < this.numRows) {
			if (this.space.sample(col * this.sampleSize, row * this.sampleSize) > this.k && this.space.sample((col - 1) * this.sampleSize, row * this.sampleSize) < this.k)
				return [row, col];
			else {
				col++;
				if (col >= this.numCols) {
					col = 0;
					row++;
				}
			}
		}
		return null;
	}

	debugDraw() {
		stroke(255); strokeWeight(1);
		for (let i = 0; i < this.space.size.width; i += this.sampleSize) {
			for (let j = 0; j < this.space.size.height; j += this.sampleSize) {	
				fill(min(max(0, this.space.sample(i, j)), 1) * 255);
				rect(i, j, this.sampleSize, this.sampleSize);
			}
		}

		this.space.debugDraw();
	}

}