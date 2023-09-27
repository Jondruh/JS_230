document.addEventListener('DOMContentLoaded', () => {

  function highlight() {
    let currentlyLit;

    return ((element) => {
    if (currentlyLit) {
      currentlyLit.classList.remove("highlight");
      element.classList.add('highlight');
    } else {
      element.classList.add('highlight');
    }

    currentlyLit = element;
    });
  }

  let articleHighlight = highlight();

  document.addEventListener('click', event => {
    let main = document.querySelector('main');
    articleHighlight(main);
  });

  let navArticles = document.querySelectorAll('header ul a');

  for (let i = 0; i < navArticles.length; i += 1) {
    navArticles[i].addEventListener('click', (event) => {
      let articleName = event.target.href.match(/#\S*$/)
      let articleElement = document.querySelector(articleName);

      event.preventDefault();
      event.stopPropagation();
      articleHighlight(articleElement);
      articleElement.scrollIntoView({behavior: "smooth"});
    }, true); 
  }

  let articles = document.querySelectorAll('article');

  for (let i = 0; i < articles.length; i += 1) {
    articles[i].addEventListener('click', (event) => {
      articleHighlight(articles[i]);
      event.stopPropagation();
    }, true);
  }
  
  // if i click anywhere but the articles or the article nav links, highlight the main element
  
});
