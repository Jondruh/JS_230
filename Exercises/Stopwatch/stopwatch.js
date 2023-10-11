document.addEventListener('DOMContentLoaded', () => {
  let startStop = document.querySelector('#start-stop');
  let reset = document.querySelector('#reset');
  let centiEle = document.querySelector('#centi span');
  let secondEle = document.querySelector('#second span');
  let minuteEle = document.querySelector('#minute span');
  let hourEle = document.querySelector('#hour span');

  let runningId;
  let running = false;

  startStop.addEventListener('click', event => {
    if (!running) {
      runningId = setInterval(runWatch, 10);
      running = true;
      startStop.innerText = 'Stop';
    } else {
      clearInterval(runningId);
      running = false;
      startStop.innerText = 'Start';
    }
  });

  reset.addEventListener('click', event => {
    if (running) {
      clearInterval(runningId);
      running = false;
      startStop.innerText = 'Start';
    } 

    resetWatch();
  });

  function resetWatch() {
    centiEle.innerText = '00';
    secondEle.innerText = '00';
    minuteEle.innerText = '00';
    hourEle.innerText = '00'; 
  }

  function runWatch() {
    let centi = Number(centiEle.innerText);
    let second = Number(secondEle.innerText);
    let minute = Number(minuteEle.innerText);
    let hour = Number(hourEle.innerText);

    centi += 1;

    if (centi === 100) {
      centi = 0;
      second += 1;
    }

    if (second === 60) {
      second = 0;
      minute += 1;
    }

    if (minute === 60) {
      minute = 0;
      hour += 1;
    }

    centiEle.innerText = String(centi).padStart(2, '0');
    secondEle.innerText = String(second).padStart(2, '0');
    minuteEle.innerText = String(minute).padStart(2, '0');
    hourEle.innerText = String(hour).padStart(2, '0');
  }

});

