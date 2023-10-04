document.addEventListener('DOMContentLoaded', () => {
  let photos;
  let currentPhotoId;
  let templates = {};

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(script => {   
    if (script.dataset.type === 'partial') {
      Handlebars.registerPartial(script.id, script.innerHTML);
    } else {
      templates[script["id"]] = Handlebars.compile(script.innerHTML);
    }
  });


  let request = new XMLHttpRequest();
  request.open('GET', 'photos');
  request.responseType = 'json';
  request.send();

  request.addEventListener('load', event => {
    photos = request.response;
    currentPhotoId = photos[0].id;

    attachSlideshowControls();

    let slides = document.querySelector('#slides');

    slides.innerHTML = templates["photos"]({photos: photos}); 

    renderPhotoInfo(currentPhotoId);
    loadComments(currentPhotoId);
    attachLikeButtonListener();
    attachFavoriteButtonListener();
    attachCommentSubmitListener();

  });

  function attachSlideshowControls() {
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');

    next.addEventListener('click', e => {
      e.preventDefault();

      let nextId;
      let photoIndex = photos.indexOf(photos.find(photo =>  {
        return photo.id === currentPhotoId;
      }));

      if (photoIndex === photos.length - 1) {
        nextId = photos[0].id;
      } else {
        nextId = photos[photoIndex + 1].id;
      }

      loadPhotoPage(nextId);
    });

    prev.addEventListener('click', e => {
      e.preventDefault();

      let nextId;
      let photoIndex = photos.indexOf(photos.find(photo =>  {
        return photo.id === currentPhotoId;
      }));

      if (photoIndex === 0) {
        nextId = photos[photos.length - 1].id;
      } else {
        nextId = photos[photoIndex - 1].id;
      }

      loadPhotoPage(nextId);
    });
  }

  function loadPhotoPage(photoId) {
    changeToPhoto(photoId);
    renderPhotoInfo(photoId);

    let request = getComments(photoId);
    request.addEventListener('load', e => {
      renderComments(request.response);
    });
  }

  function changeToPhoto(photoId) {
    let currentPhoto = document.querySelector(`figure[data-id="${currentPhotoId}"]`);
    let newPhoto = document.querySelector(`figure[data-id="${photoId}"]`);

    currentPhoto.style.opacity = 0;
    newPhoto.style.opacity = 1;
    currentPhotoId = photoId;
  }

  function renderComments(comments) {
    let commentList = document.querySelector('#comments ul');

    commentList.innerHTML = templates["photo_comments"]({comments: comments});
  }

  function renderPhotoInfo(photoId) {
    let photo = photos.find(photo => photo.id === photoId);

    let infoTemplate = document.querySelector('#photo_information');
    infoTemplate = Handlebars.compile(infoTemplate.innerHTML);

    let info = document.querySelector('section > header');
    info.innerHTML = templates["photo_information"](photo);
  }

  function getComments(photoId) {
    let commentRequest = new XMLHttpRequest();
    commentRequest.open('GET', `comments?photo_id=${photoId}`);
    commentRequest.responseType = 'json';
    commentRequest.send();

    return commentRequest;
  }

  function attachLikeButtonListener() {
    let likeButton = document.querySelector("a.like");

    likeButton.addEventListener('click', e => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      request.open("POST", "photos/like");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send("photo_id=" + currentPhotoId);

      request.addEventListener('load', e => {
        let totalLikes = JSON.parse(request.response).total;
        likeButton.innerHTML = likeButton.innerHTML.replace(/[0-9]+/, totalLikes);
      });
    });
  }

  function attachFavoriteButtonListener() {
    let favoriteButton = document.querySelector("a.favorite");

    favoriteButton.addEventListener('click', e => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      request.open("POST", "photos/favorite");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send("photo_id=" + currentPhotoId);

      request.addEventListener('load', e => {
        let totalFavorites = JSON.parse(request.response).total;
        favoriteButton.innerHTML = favoriteButton.innerHTML.replace(/[0-9]+/, totalFavorites);
      });
    });
  }

  function attachCommentSubmitListener() {
    let form = document.querySelector('form[action="/comments/new"]');

    form.addEventListener('submit', e => {
      e.preventDefault();
      
      let request = new XMLHttpRequest();
      request.open("POST", "comments/new");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send(new URLSearchParams(new FormData(form)));

      request.addEventListener('load', e => {
        form.reset();
        loadComments(currentPhotoId);
      });
    });
  }

  function loadComments(photoId) {
    commentRequest = getComments(photoId);

    commentRequest.addEventListener('load', event => {
      renderComments(commentRequest.response);
    });
  }
});
