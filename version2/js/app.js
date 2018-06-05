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
			formView.init();
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
		},

		addCat: function(cat) {
			model.cats.push(cat);
			catListView.render();
			formView.render();
		}
	}

	/* Create the cat list view to render the cat links */
	const catListView = {
		init: function() {
			this.catsList = document.querySelector('.cats-list');
			this.render();
		},

		render: function() {
			// Clear the cats list before rendering.
			this.catsList.innerHTML = '';

			// Create the elements to store cat's link.
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

	/* Create the form view to render the cat form */
	const formView = {
		init: function() {
			// Select the Admin button to show the cat form.
			this.adminBtn = document.querySelector('#admin');

			// Select the DOM elements for the cat form.
			this.catForm = document.querySelector('.cat-form');
			this.catName = document.querySelector('#cat-form-name');
			this.catSrc  = document.querySelector('#cat-form-src');
			this.catCounter = document.querySelector('#cat-form-counter');
			this.cancelForm = document.querySelector('#form-cancel');
			this.saveForm = document.querySelector('#form-save');

			this.render();
			// Add buttons event listeners.
			this.admin();
			this.cancel();
			this.save();
		},

		admin: function() {
			// Add a listener to adminBtn to display or hide the form.
			this.adminBtn.addEventListener('click', (function(form) {
				return function() {
					// Get catForm classes to check if it is hidden.
					let formClasses = form.catForm.classList,
						hasClass = false;

					formClasses.forEach(function(cl) {
						if (cl === 'show' && !hasClass)
							hasClass = true;
					});

					// Show the form or hide it.
					hasClass ? formClasses.remove('show') : formClasses.add('show');
				}
			})(this));
		},

		cancel: function() {
			// Clear the form and hide it.
			this.cancelForm.addEventListener('click', (function(form) {
				return function() {
					form.render();
				}
			})(this));
		},

		save: function() {
			// Save the current form into a new cat and clear/hide the form.
			this.saveForm.addEventListener('click', (function(form) {
				return function() {
					// Create an empty cat obj.
					let cat = {};

					cat.name = form.catName.value;
					cat.src = form.catSrc.value;
					cat.counter = form.catCounter.value;

					// Add the cat to the model.
					octopus.addCat(cat);
				}
			})(this));
		},

		render: function() {
			// Clear the form.
			this.catName.value = '';
			this.catSrc.value = '';
			this.catCounter.value = '';

			// Hide the form.
			this.catForm.classList.remove('show');
		}
	}

	// Initialize the app.
	octopus.init();
})());