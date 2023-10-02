document.addEventListener('DOMContentLoaded', () => {
  let images = document.querySelectorAll('.image-gallery img');
  let viewer = document.querySelector('.active-image');
  let imageGallery = document.querySelector('.image-gallery');

  images[0].classList.add('active');
  viewer.insertBefore(images[0].cloneNode(), viewer.firstElementChild);

  let activeImage = document.querySelector('.active-image img');

  imageGallery.addEventListener('click', event => {
    if (event.target.tagName === 'IMG' && !event.target.classList.contains('active')) {
      activeImage = switchActive(images, event.target, activeImage);
    }
  });
});

function switchActive(images, targetImage, targetDisplay) {
  images.forEach(image => {
    if (image === targetImage) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });

  smoothReplaceChild(targetImage.cloneNode(), targetDisplay);

  return document.querySelector('.active-image img');
}

function smoothReplaceChild(newNode, targetNode) {
  targetNode.parentNode.insertBefore(newNode, targetNode);
  fadeRemove(targetNode);
}

function fadeRemove(ele) {
  let opacity = 1;
  let timer = setInterval(() => {
    if (opacity <= 0.1) {
      clearInterval(timer);
      ele.remove();
    }
    ele.style.opacity = opacity;
    ele.style.filter = `alpha(opacity='${opacity * 100}')`;
    opacity -= 0.1;
  }, 50);
}