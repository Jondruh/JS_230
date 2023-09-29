$(function() { 
  let $modalContainer = $('#modal').clone();
  let $modalOverlay = $('#modal-container');
  
  let $modal = $('#modal');

  // add listener to click event on the team member links
  $('#team a').on('click', event => {
    if ($modal.css('display') === 'none') {
      $modal.html($modalContainer.html()); // resets the modal container
      let $teamImg = $(event.target).closest('a').find('img').clone();    
      let teamName = $teamImg.attr('data-block');
      let $teamProfile = $(`.team-profile[data-block="${teamName}"]`);

      event.preventDefault();
      event.stopPropagation();

    // load that team members profile and place it in the modal
    // load the team members picture (based on the img that is in the link)
      $teamImg.prependTo($modal);
      $modal.find('h1').html(teamName);
      $modal.find('article').html($teamProfile.html());
      //$teamProfile.css('display', 'initial');
      //$teamProfile.appendTo($modal)

      $modal.fadeToggle();
      $modalOverlay.fadeToggle();
    }

    // clicking anywhere except the modal will remove the modal
    $('body').on('click.offModal', event => {
      event.preventDefault();
      if (event.target === $modal[0] || $.contains($modal[0], event.target)) {
        return;
      }
      $modal.fadeOut();
      $modalOverlay.fadeOut();
      $('body').off('click.offModal'); 
    });
  
    // pressing escape will remove the modal
    $('body').on('keyup.modal', event => {
      if (event.key === 'Escape') {
        $modal.fadeOut();
        $modalOverlay.fadeOut();
        $('body').off('keyup.modal');
      }
    });

    // clicking the 'x' will remove the modal 
    let $x = $('#close-modal');
    $x.on('mousedown.close', event => {
      $x.css('box-shadow', '2px 2px lightgray');
      $x.off('mousedown.close');
    })

    $x.on('mouseup.close', event => {
      $modal.fadeOut();
      $modalOverlay.fadeOut();
      $x.css('box-shadow', 'initial');
      $x.off('mouseup.close');
    }); 

  }); 
});
