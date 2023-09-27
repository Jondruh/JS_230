document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  let cursorInterval;

  textField.addEventListener('click', event => {
    if (!textField.classList.contains('focused')) {
      textField.classList.add('focused');

      cursorInterval = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);

      document.addEventListener('keydown', addContentOnKeydown);
    }

    event.stopPropagation();
  });

  document.addEventListener('click', event => {
    if (textField.classList.contains('focused')) {
      textField.classList.remove('focused');
      textField.classList.remove('cursor');
      clearInterval(cursorInterval);

      document.removeEventListener('keydown', addContentOnKeydown);
    }

  });

  function addContentOnKeydown(event) {
    if (event.code === 'Backspace') {
      content.textContent = content.textContent.slice(0, -1);
    } else if (event.key.length === 1) {
      content.textContent += event.key;
    }
  }
});