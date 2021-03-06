//this loads the page and doesn't allow an automatic refresh
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let isGameOver = false;
	let score = 0;
	let startPoint = 150;
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = startPoint;
	let isJumping = true;
	let isGoingLeft = false;
	let isGoingRight = false;
	let leftTimerId;
	let rightTimerId;
	let platformCount = 5;
	let platforms = [];
	let upTimerId;
	let downTimerId;

	// creates the doodler. Appends it to the grid.
	function createDoodler() {
		grid.appendChild(doodler);
		doodler.classList.add('doodler');
		doodlerLeftSpace = platforms[0].left;
		doodler.style.left = doodlerLeftSpace + 'px';
		doodler.style.bottom = doodlerBottomSpace + 'px';
	}
	class Platform {
		constructor(newPlatBottom) {
			this.left = Math.random() * 315;
			this.bottom = newPlatBottom;
			this.visual = document.createElement('div');

			const visual = this.visual;
			visual.classList.add('platform');
			visual.style.left = this.left + 'px';
			visual.style.bottom = this.bottom + 'px';
			grid.appendChild(visual);
		}
	}
	//this creates platforms
	function createPlatforms() {
		for (let i = 0; i < platformCount; i++) {
			let platGap = 600 / platformCount;
			let newPlatBottom = 100 + i * platGap;
			let newPlatform = new Platform(newPlatBottom);
			platforms.push(newPlatform);
			console.log(platforms);
		}
	}

	function movePlatforms() {
		if (doodlerBottomSpace > 200) {
			platforms.forEach((platform) => {
				platform.bottom -= 4;
				let visual = platform.visual;
				visual.style.bottom = platform.bottom + 'px';

				if (platform.bottom < 10) {
					let firstPlatform = platforms[0].visual;
					firstPlatform.classList.remove('platform');
					platforms.shift();
					console.log(platforms);
					score++;
					var newPlatform = new Platform(600);
					platforms.push(newPlatform);
				}
			});
		}
	}
	//Doodler movement
	function jump() {
		clearInterval(downTimerId);
		isJumping = true;
		upTimerId = setInterval(function() {
			console.log(startPoint);
			console.log('1', doodlerBottomSpace);
			doodlerBottomSpace += 20;
			doodler.style.bottom = doodlerBottomSpace + 'px';
			console.log('2', doodlerBottomSpace);
			console.log('s', startPoint);
			if (doodlerBottomSpace > startPoint + 200) {
				fall();
				isJumping = false;
			}
		}, 30);
	}

	//fall logic
	function fall() {
		isJumping = false;
		clearInterval(upTimerId);
		downTimerId = setInterval(function() {
			doodlerBottomSpace -= 5;
			doodler.style.bottom = doodlerBottomSpace + 'px';
			if (doodlerBottomSpace <= 0) {
				gameOver();
			}
			platforms.forEach((platform) => {
				if (
					doodlerBottomSpace >= platform.bottom &&
					doodlerBottomSpace <= platform.bottom + 15 &&
					doodlerLeftSpace + 60 >= platform.left &&
					doodlerLeftSpace <= platform.left + 85 &&
					!isJumping
				) {
					console.log('tick');
					startPoint = doodlerBottomSpace;
					jump();
					console.log('start', startPoint);
					isJumping = true;
				}
			});
		}, 20);
	}

	//move Doodler left
	function moveLeft() {
		if (isGoingRight) {
			clearInterval(rightTimerId);
			isGoingRight = false;
		}
		isGoingLeft = true;
		leftTimerId = setInterval(function() {
			if (doodlerLeftSpace >= 0) {
				doodlerLeftSpace -= 5;
				doodler.style.left = doodlerLeftSpace + 'px';
			} else moveRight();
		}, 20);
	}

	//move doodler right
	function moveRight() {
		if (isGoingLeft) {
			clearInterval(leftTimerId);
			isGoingLeft = false;
		}
		isGoingRight = true;
		rightTimerId = setInterval(function() {
			if (doodlerLeftSpace <= 313) {
				doodlerLeftSpace += 5;
				doodler.style.left = doodlerLeftSpace + 'px';
			} else moveLeft();
		}, 20);
	}

	//move Doodler straight
	function moveStraight() {
		isGoingLeft = false;
		isGoingRight = false;
		clearInterval(leftTimerId);
		clearInterval(rightTimerId);
	}

	//assign functions to Keycodes
	function control(e) {
		doodler.style.bottom = doodlerBottomSpace + 'px';
		if (e.key === 'ArrowLeft') {
			moveLeft();
		} else if (e.key === 'ArrowRight') {
			moveRight();
		} else if (e.key === 'ArrowUp') {
			moveStraight();
		}
	}

	function gameOver() {
		isGameOver = true;
		while (grid.firstChild) {
			grid.removeChild(grid.firstChild);
		}
		grid.innerHTML = score;
		clearInterval(upTimerId);
		clearInterval(downTimerId);
		clearInterval(leftTimerId);
		clearInterval(rightTimerId);
	}

	//starts the doodler game. Doodler appears if this function is invoked.
	function start() {
		if (!isGameOver) {
			createPlatforms();
			createDoodler();
			setInterval(movePlatforms, 30);
			jump(startPoint);
			document.addEventListener('keyup', control);
		}
	}
	start();
});
