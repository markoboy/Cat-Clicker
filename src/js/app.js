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
		}
	];

	/* Initialize all cats and place them in the cats-container */
	function init() {
		// Create the elements for the DOM
		let catsContainer = document.querySelector('.cats-container'),
			catPlaceholder,
			catName,
			catCounter,
			catImg;

		// Loop through the cats and place them in the DOM.
		allCats.forEach(function(cat, ind) {
			// Create cat's placeholder elements.
			catPlaceholder = document.createElement('div');
			catPlaceholder.classList.add('cat-placeholder');

			// Create cat's name and counter placeholder.
			catName = document.createElement('p');
			catName.innerHTML = cat.name + ' ';
			catCounter = document.createElement('span');
			catCounter.classList.add('counter');
			catCounter.id = ind;
			catCounter.innerHTML = cat.counter;

			// Create cat's images.
			catImg = document.createElement('img');
			catImg.classList.add('cat-img');
			catImg.src = cat.src;

			// Append elements in the placeholder.
			catName.appendChild(catCounter);
			catPlaceholder.appendChild(catName);
			catPlaceholder.appendChild(catImg);

			// Append placeholder in the container.
			catsContainer.appendChild(catPlaceholder);
		});
	}

	/* Create a catCounter function to increase the clicks
	 * on each cat and then add them all together.
	 */
	function catCounter(id, counter) {
		// Increase cat's counter and display it.
		allCats[id].counter++;
		counter.innerHTML = allCats[id].counter;

		// Create an all counter.
		let allCounter = 0;

		// Increase all Cats counter.
		allCats.forEach(function(cat) {
			allCounter += cat.counter;
		});

		// Display all counter.
		document.querySelector('.clicks .counter').innerHTML = allCounter;
	}

	init();

	/* Add a click event listener to the document element
	 * that trigers when the pointer clicks on an cat-img
	 */
	document.addEventListener('click', function(e) {
		if (e.target.className === 'cat-img') {
			// Get cat's counter.
			let counter = e.target.parentNode.firstElementChild.firstElementChild;
			// Execute cat counter.
			catCounter(counter.id, counter);
		}
	});
})();