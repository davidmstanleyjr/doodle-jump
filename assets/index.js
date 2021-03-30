//this loads the page and doesn't allow an automatic refresh
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let isGameOver = false;
	let speed = 3;
	let score = 0;
	let startPoint = 150;
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = startPoint;
	const gravity = 0.9;
	let isJumping = true;
	let isGoingLeft = false;
	let isGoingRight = false;
	let leftTimerId;
	let rightTimerId;
	let isGameOver = false;
	let platformCount = 5;
	let platforms = [];
	let upTimerId;
	let downTimerId;

	// creates the doodler. Appends it to the grid.
	function createDoodler() {
		grid.appendChild(doodler);
		doodler.classList.add('doodler');
		doodler.style.left = doodlerLeftSpace + 'px';
		doodler.style.bottom = doodlerBottomSpace + 'px';
	}

	class Platform {
		constructor(newPlatBottom) {
			this.bottom = newPlatBottom;
			this.left = Math.random() * 315;
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
			platforms.forEach((Platform) => {
				Platform.bottom -= 4;
				let visual = Platform.visual;
				visual.style.bottom = Platform.bottom + 'px';

				if (platforms.bottom < 10) {
					let firstPlatform = platforms[0].visual;
					firstPlatform.classList.remove('platform');
					platforms.shift();
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
			doodlerBottomSpace += 20;
			doodler.style.bottom = doodlerBottomSpace + 'px';
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
			platforms.forEach((Platform) => {
				if (
					doodlerBottomSpace >= Platform.bottom &&
					doodlerBottomSpace <= Platform.bottom + 15 &&
					doodlerLeftSpace + 60 >= Platform.left &&
					doodlerLeftSpace <= Platform.left + 85 &&
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
				console.log('going left');
				doodlerLeftSpace -= 5;
				doodler.style.left = doodlerLeftSpace + 'px';
			} else moveRight();
		}, 20);
	}

	function moveRight() {
		if (isGoingLeft) {
			clearInterval(leftTimerId);
			isGoingLeft = false;
		}
		isGoingRight = true;
		rightTimerId = setInterval(function() {
			if (doodlerLeftSpace <= 313) {
				console.log('going right');
				doodlerLeftSpace += 5;
				doodler.style.left = doodlerLeftSpace + 'px';
			} else moveLeft();
		}, 20);
	}

	//starts the doodler game. Doodler appears if this function is invoked.
	function start() {
		if (!isGameOver) {
			createDoodler();
			createPlatforms();
			setInterval(movePlatforms, 30);
		}
	}

	start();
});
