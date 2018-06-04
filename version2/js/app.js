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

// Ensure that the DOM has loaded.
document.addEventListener('DOMContentLoaded', (function() {
	/* Store cats data and which cat is picked */
	const model = {
		currentCat: null,
		cats: [
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
		],
	}

	/* Create an octopus object to link the model with the views */
	const octopus = {
		init: function() {
			// Set currentCat to the 1st cat.
			model.currentCat = model.cats[0];

			// Initialize the views.
			catListView.init();
			catView.init();
		},

		getCats: function() {
			return model.cats;
		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		changeCurrentCat: function(cat) {
			model.currentCat = cat;
			catView.render();
		},

		increaseCounter: function() {
			model.currentCat.counter++;
			catView.render();
		}
	}

	/* Create the cat list view to render the cat links */
	const catListView = {
		init: function() {
			this.catsList = document.querySelector('.cats-list');
			this.render();
		},

		render: function() {
			let catLink, catName;

			octopus.getCats().forEach(function(cat) {
				// Create the cat's link.
				catLink = document.createElement('li');
				catLink.classList.add('cat-link');
				catName = document.createElement('a');
				catName.href = '#';
				catName.innerHTML = cat.name;

				// Append cat's name in the catLink element.
				catLink.appendChild(catName);

				catListView.catsList.appendChild(catLink);

				// Add an event listener to change the selected cat.
				catName.addEventListener('click', (function(cat) {
					return function() {
						octopus.changeCurrentCat(cat);
					}
				})(cat));
			});
		}
	}

	/* Create the cat view to render the current cat */
	const catView = {
		init: function() {
			this.catName = document.querySelector('.cat-name');
			this.catCounter = document.createElement('span');
			this.catCounter.classList.add('counter');
			this.catImg = document.querySelector('.cat-img');

			this.catImg.addEventListener('click', function() {
				octopus.increaseCounter();
			});

			this.render();
		},

		render: function() {
			let cat = octopus.getCurrentCat();
			this.catName.innerHTML = cat.name;
			this.catCounter.innerHTML = ' ' + cat.counter;
			this.catImg.src = cat.src;
			this.catName.appendChild(this.catCounter);
		}
	}

	// Initialize the app.
	octopus.init();
})());