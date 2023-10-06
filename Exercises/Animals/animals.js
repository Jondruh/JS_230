document.addEventListener("DOMContentLoaded", () => {
  let images = document.querySelector("#animal-pics"); 

  function showCaption(event) {
    if (event.target.tagName === 'IMG') {
      let caption = event.target.parentElement.lastElementChild;
      let timeOutHandle = setTimeout(() => {caption.className = 'show'}, 2000);
      let figure = event.target.parentElement;

      figure.addEventListener('mouseleave', (event) => {
        clearTimeout(timeOutHandle);
        caption.className = 'hide';
      }, {once: true});
    }
  }

  images.addEventListener("mouseover", showCaption);
  
});