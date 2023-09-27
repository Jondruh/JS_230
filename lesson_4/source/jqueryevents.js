$(function () {
  $('form').on('submit', (event) => {
    event.preventDefault();

    let character = $("#key").val();

    $(document).off('keypress').on('keypress', function(event) {
      if (event.key !== character) {
        return;
      } 

      $("a").trigger("click");
    });
  });

  $("a").on('click', (e) => {
    e.preventDefault();

    $("#accordion").slideToggle();
  });
});
