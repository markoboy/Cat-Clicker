/**
 * @file: app.js
 * This is the main app file. In order for the app to run
 * it needs this file.
 *
 * CatClicker is an app that shows how many times you have clicked
 * on a cute cat picture. Each cat is special so show them
 * your love! :)
 * 
 * @author: Athanasios Markou
 */

const catClicker = (function() {
	/* Store all cats data in an array */
	const allCats = [
		{
			name: 'Kitty',
			src: 'img/cat01.jpg',
			counter: 0
		},
		{
			name: 'Hello Kitty',
			src: 'img/cat02.jpg',
			counter: 0
		},
		{
			name: 'Kitty Hello',
			src: 'img/cat03.jpg',
			counter: 0
		},
		{
			name: 'Kitty Kitty',
			src: 'img/cat04.jpg',
			counter: 0
		},
		{
			name: 'Pitty Kitty',
			src: 'img/cat05.jpg',
			counter: 0
		}
	];

	/* Initialize all cats and place them in the cats-container */
	function init() {
		displayCat(0);
		listCats();
	}

	/**
	 * Create a displayCat function to display the selected cat
	 * in the cats-area container.
	 * @param {number} id - The cat's id to be displayed.
	 */
	function displayCat(id) {
		// Create the variables for DOM elements.
		let catsArea = document.querySelector('.cats-area'),
			catPlaceholder,
			catName,
			catCounter,
			catImg;

		// Clear cats-area before displaying the cat.
		catsArea.innerHTML = '';

		// Create cat's placeholder elements.
		catPlaceholder = document.createElement('div');
		catPlaceholder.classList.add('cat-placeholder');

		// Create cat's name and counter placeholder.
		catName = document.createElement('p');
		catName.innerHTML = allCats[id].name + ' ';
		catCounter = document.createElement('span');
		catCounter.classList.add('counter');
		catCounter.id = id;
		catCounter.innerHTML = allCats[id].counter;
		// Create cat's images.
		catImg = document.createElement('img');
		catImg.classList.add('cat-img');
		catImg.src = allCats[id].src;

		// Append elements in the placeholder.
		catName.appendChild(catCounter);
		catPlaceholder.appendChild(catName);
		catPlaceholder.appendChild(catImg);

		// Append placeholder in the catsArea container.
		catsArea.appendChild(catPlaceholder);
	}

	/**
	 * Create a listCats function to list all cats
	 * in order to select them.
	 */
	function listCats() {
		// Create variables for the DOM content.
		let catsContainer = document.querySelector('.cats-container'),
			catLink;

		// Loop through the allCats data to list the cats.
		allCats.forEach(function(cat, ind) {
			// Create the cat's link.
			catLink = document.createElement('a');
			catLink.href = '#';
			catLink.innerHTML = cat.name;

			// Append the link to the container.
			catsContainer.appendChild(catLink);

			// Add an event listener to change the displayed cat.
			catLink.addEventListener('click', (function(id) {
				return function() {
					displayCat(id);
				}
			})(ind));
		});
	}

	/* Create a catCounter function to increase the clicks
	 * on each cat and then add them all together.
	 */
	function catCounter(id, counter) {
		// Increase cat's counter and display it.
		allCats[id].counter++;
		counter.innerHTML = allCats[id].counter;
	}

	init();

	/* Add a click event listener to the document element
	 * that trigers when the pointer clicks on an cat-img
	 */
	document.addEventListener('click', function(e) {
		// If the cat's image is clicked.
		if (e.target.className === 'cat-img') {
			// Get cat's counter.
			let counter = e.target.parentNode.firstElementChild.firstElementChild;
			// Execute cat counter.
			catCounter(counter.id, counter);
		}
	});
})();