document.addEventListener('DOMContentLoaded', () => {
  let inputArea = document.querySelector('.button-container');
  let entry = document.querySelector('#entry-window');
  let operation = document.querySelector('#operation-window');

  inputArea.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      let button = e.target.innerHTML;

      switch (true) {
        case !!button.match(/[0-9\.]/):
          if (entry.innerHTML.trim() === '0') {
            entry.innerHTML = button;
          } else {
            entry.innerHTML += button;
          }
          break;
        case button === 'CE':
          entry.innerHTML = '0';
          break;
        case button === 'NEG':
          entry.innerHTML = String(Number(entry.innerHTML) * -1);
          break;
        case !!button.match(/[-+\/x%]/):
          if (operation.innerHTML.includes('=')) {
            operation.innerHTML = entry.innerHTML + ' ' + button;
          } else {
            operation.innerHTML += ' ' + entry.innerHTML + ' ' + button;
          }
          entry.innerHTML = '0';
          break;
        case button === 'C':
          operation.innerHTML = '';
          entry.innerHTML = '0';
          break;
        case (button === '=' && !operation.innerHTML.includes('=')):
          operation.innerHTML += ' ' + entry.innerHTML;
          let result = eval(operation.innerHTML.replace('x', '*'));
          operation.innerHTML += ' = ' + String(result);
          entry.innerHTML = String(result);
      }
    }
  });
});
