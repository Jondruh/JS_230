let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Launch School'); 
  }, 2000);
});

myPromise.then((value) => console.log(value));

const rejectPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Error: Not Launch School.'); 
  }, 2000);
});

rejectPromise.then((value) => {
  console.log(value)
}).catch((error => console.log(error)));
