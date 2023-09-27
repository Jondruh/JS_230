function startCounting() {
  let count = 1;

  return setInterval(() => {
    console.log(count);
    count += 1;
  }, 1000)
}

function stopCounting(countId) {
  clearInterval(countId);
}

let countId = startCounting();

