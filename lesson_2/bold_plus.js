let sectionElement = document.querySelector('section');
sectionElement.addEventListener('bolded', (event) => {
  alert(event.target.tagName);

  event.target.classList.add('highlight');  
});

function makeBold(ele) {
  ele.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  ele.dispatchEvent(event);
}

makeBold(sectionElement)

console.log(sectionElement.classList.contains('highlight'));
console.log(sectionElement.style.fontWeight);
