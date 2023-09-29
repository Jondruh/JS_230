document.addEventListener('DOMContentLoaded', () => {
  let groceryForm = document.querySelector('.grocery-input');
  let groceryList = document.querySelector('.grocery-list');

  groceryForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let itemInput = event.target.querySelector('#item');
    let quantityInput = event.target.querySelector('#quantity');

    let itemObj = {item: itemInput.value};
    if (!quantityInput.value.match(/^[1-9]+$/)) {
      itemObj.quantity = '1';
    } else {
      itemObj.quantity = quantityInput.value;
    }

    let itemEle = document.createElement('li');
    itemEle.textContent = itemObj.quantity + ' ' + itemObj.item;

    groceryList.appendChild(itemEle);
  });
});
