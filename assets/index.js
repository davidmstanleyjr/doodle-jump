//this loads the page and doesn't allow an automatic refresh
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = 250;
	let isGameOver = false;
	let platformCount = 5;
	let platforms = [];

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
