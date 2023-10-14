document.addEventListener("DOMContentLoaded", () => {
  let editorWindow = document.querySelector('.editor-window');
  let boldButton = document.querySelector('button.bold');
  let italicButton = document.querySelector('button.italic');
  let underlineButton = document.querySelector('button.underline');
  let strikeButton = document.querySelector('button.strike-through');
  let linkButton = document.querySelector('button.link');
  let bulletButton = document.querySelector('button.bullet-list');
  let numberButton = document.querySelector('button.number-list');
  let leftJustButton = document.querySelector('button.left-justify');
  let rightJustButton = document.querySelector('button.right-justify');
  let centerButton = document.querySelector('button.center-text');
  let blockButton = document.querySelector('button.block-text');

  editorWindow.focus();

  boldButton.addEventListener('click', e => {
    document.execCommand('bold');
    e.target.classList.toggle('active');
    editorWindow.focus();
  });
  
  italicButton.addEventListener('click', e => {
    document.execCommand('italic');
    e.target.classList.toggle('active');
    editorWindow.focus();
  });

  underlineButton.addEventListener('click', e => {
    document.execCommand('underline');
    e.target.classList.toggle('active');
    editorWindow.focus();
  });

  strikeButton.addEventListener('click', e => {
    document.execCommand('strikethrough');
    e.target.classList.toggle('active');
    editorWindow.focus();
  });

  linkButton.addEventListener('click', e => {
    document.execCommand('createLink', false, window.getSelection().toString());
    editorWindow.focus();
  });

  bulletButton.addEventListener('click', e => {
    document.execCommand('insertUnorderedList');
    editorWindow.focus();
  });

  numberButton.addEventListener('click', e => {
    document.execCommand('insertOrderedList');
    editorWindow.focus();
  });
  
  leftJustButton.addEventListener('click', e => {
    document.execCommand('justifyLeft');
    editorWindow.focus();
  });
  
  rightJustButton.addEventListener('click', e => {
    document.execCommand('justifyRight');
    editorWindow.focus();
  });  

  centerButton.addEventListener('click', e => {
    document.execCommand('justifyCenter');
    editorWindow.focus();
  });
    
  blockButton.addEventListener('click', e => {
    document.execCommand('justify');
    editorWindow.focus();
  });
});