$(function () {
  $('a').on('click', event => {
    event.preventDefault();

    let tabData = $(event.target).attr('data-block');

    let $article = $(`article[data-block="${tabData}"]`);
    let $allArticles = $('article');
    let $articleList = $('ul');

    $allArticles.css('visibility', 'hidden');
    $article.css('visibility', 'visible');
    $article.insertAfter($articleList);
  })
});
