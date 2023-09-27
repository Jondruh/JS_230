document.addEventListener('DOMContentLoaded', () => {
	const crossTable = {
		'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
		'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
		'Cold-blooded': ['Salmon', 'Turtle'],
		'Mammal': ['Bear', 'Whale'],
		'Bird': ['Ostrich'],
	}

	const classifications = document.querySelector('select#animal-classifications');
	const animals = document.querySelector('select#animals');

	animals.addEventListener('input', (event) => {
		const classificationsOpts = Array.prototype.slice.call(classifications.children);

		classificationsOpts.forEach(classification => {
			if (classification.value === 'Classifications' ||
					event.target.value === 'Animals' ||
					crossTable[classification.value].includes(event.target.value)) {
				classification.removeAttribute('disabled');
			} else {
				classification.setAttribute('disabled', true);
			}
		})
	});

	classifications.addEventListener('input', (event) => {
		const animalOptions = Array.prototype.slice.call(animals.children);

		animalOptions.forEach(animal => {
			if (animal.value === 'Animals' || 
				  event.target.value === 'Classifications' ||
				  crossTable[event.target.value].includes(animal.value)) {
				animal.removeAttribute('disabled');
			} else {
				animal.setAttribute('disabled', true);
			}
		});
	});
});
