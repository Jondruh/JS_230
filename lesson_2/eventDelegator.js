document.addEventListener('DOMContentLoaded', () => {
	// Possible elements for use with the scenarios
	const element1 = document.querySelector('table');
	const element2 = document.querySelector('main h1');
	const element3 = document.querySelector('main');

	// Possible callback for use with the scenarios
	const callback = ({target, currentTarget}) => {
	  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
	};

	function delegateEvent(parentElement, selector, eventType, callback) {
		if (parentElement && parentElement instanceof Element) {
			parentElement.addEventListener(eventType, event => {
				let allSelectors = Array.prototype.slice.call(parentElement.querySelectorAll(selector));
				if (allSelectors.includes(event.target)) {
					callback(event);
				}
			});
			return true;
		} 
	}

	
	console.log(delegateEvent(element1, 'p', 'click', callback)); // undefined
	// console.log(delegateEvent(element2, 'p', 'click', callback)); // true
	// console.log(delegateEvent(element2, 'h1', 'click', callback)); // true
	// console.log(delegateEvent(element3, 'h1', 'click', callback)); // true
	// console.log(delegateEvent(element3, 'aside p', 'click', callback)); // true
	// console.log(delegateEvent(element2, 'p', 'click', callback)); // true
});
