function colorGeneration(targetGen) {
  let topEle = document.getElementById('1');

  if (targetGen === 1) {
    topEle.classList.add('generation-color');
    return;
  }

  (function findGeneration(parentEle, genLevel) {
    let nextGen = parentEle.children;

    if (genLevel + 1 !== targetGen && nextGen.length > 0) {
      for (let i = 0; i < nextGen.length; i += 1) {
        findGeneration(nextGen[i], genLevel + 1)
      }
    } else if (genLevel + 1 === targetGen && nextGen.length > 0) {
        for (let x = 0; x < nextGen.length; x += 1) {
          nextGen[x].classList.add('generation-color');
      }
    }
 
  })(topEle, 1); 
}

colorGeneration(8);
