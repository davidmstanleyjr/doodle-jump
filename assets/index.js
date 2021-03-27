//this loads the page and doesn't allow an automatic refresh
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = 150;
	let isGameOver = false;

	// creates the doodler. Appends it to the grid.
	function createDoodler() {
		grid.appendChild(doodler);
		doodler.classList.add('doodler');
		doodler.style.left = doodlerLeftSpace + 'px';
		doodler.style.bottom = doodlerBottomSpace + 'px';
	}

	//starts the doodler game. Doodler appears if this function is invoked.
	function start() {
		if (!isGameOver) {
			createDoodler();
		}
	}
});
