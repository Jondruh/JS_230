document.addEventListener('DOMContentLoaded', () => {
	const mainArea = document.querySelector('main');
	const subArea = document.querySelector('#sub');

	mainArea.addEventListener('contextmenu', (event) => {
		event.preventDefault();
		alert(event.target.tagName);
	});

	subArea.addEventListener('contextmenu', (event) => {
		event.preventDefault();
		alert(event.target.id);
		event.stopPropagation();
	});
});
