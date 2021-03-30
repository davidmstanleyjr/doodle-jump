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
		clearInterval(upTimerId);
		downTimerId = setInterval(function() {
			doodlerBottomSpace -= 5;
			doodler.style.bottom = doodlerBottomSpace + 'px';
		}, 30);
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
