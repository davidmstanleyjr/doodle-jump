//this loads the page and doesn't allow an automatic refresh
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = 150;
	let isGameOver = false;
	let platformCount = 5;

	// creates the doodler. Appends it to the grid.
	function createDoodler() {
		grid.appendChild(doodler);
		doodler.classList.add('doodler');
		doodler.style.left = doodlerLeftSpace + 'px';
		doodler.style.bottom = doodlerBottomSpace + 'px';
	}

	class Platform {
		constructor(newPlatformBottom) {
			this.bottom = newPlatformBottom;
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
			let platFormGap = 600 / platformCount;
			let newPlatformBottom = 100 + i * platFormGap;
			let newPlatForm = newPlatForm();
		}
	}

	//starts the doodler game. Doodler appears if this function is invoked.
	function start() {
		if (!isGameOver) {
			createDoodler();
			createPlatforms();
		}
	}

	start();
});
