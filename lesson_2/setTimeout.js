function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

function afterNSeconds(callback, delay) {
  setTimeout(callback, delay * 1000);
}



