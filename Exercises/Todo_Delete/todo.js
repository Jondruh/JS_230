todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '},
  { id: 5, title: 'Coffee with <b>INJECTION</b>' }
];

document.addEventListener("DOMContentLoaded", () => {
  let todoList = document.querySelector('#todos');
  let deleteDialog = document.querySelector('#delete-dialog');

  todo_items.forEach(item => {
    let id = String(item.id);
    let title = String(item.title);

    let todoTemplate = `
    <li id=${escape(id)}>
      <div class="title">${escape(title)}</div>
      <button class='delete'>Delete</button>
    </li>
    `

    todoList.insertAdjacentHTML('beforeend', todoTemplate);
  });

  todoList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      let message = deleteDialog.firstElementChild;
      let title = event.target.parentElement.querySelector('.title').innerText;
      let todoId = event.target.parentElement.id;

      message.innerText = `Are you sure you'd like to delete '${title}'?` 
      deleteDialog.setAttribute("data-id", todoId)
      
      deleteDialog.className = 'show';
    }
  });

  let deleteNoButton = document.querySelector('#no');
  let deleteYesButton = document.querySelector('#yes');

  deleteNoButton.addEventListener('click', e => {
    deleteDialog.className = 'hide'; 
  });

  deleteYesButton.addEventListener('click', e => {
    let todoId = e.target.parentElement.dataset.id;
    deleteDialog.className = 'hide'; 
    deleteItem(todoId);
  })
  
});

function deleteItem(itemId) {
  document.getElementById(itemId).remove()

  let itemIndex = todo_items.find(todo => todo.id === itemId);
  todo_items.splice(itemIndex, 1);
}

function escape(string) {
  return string.replace(/[^0-9a-zA-Z]/g, char => {
    return "&#" + char.charCodeAt(0) + ";";
  });
}