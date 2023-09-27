function test(firstBranch) {
  // let testVar;

  if (firstBranch) {
    testVar = 'First Branch!';
  } else {
    testVar = 'Second Branch!';
  }

  return testVar;
}

console.log(test(true)); // first Branch
console.log(test()); // second Branch
