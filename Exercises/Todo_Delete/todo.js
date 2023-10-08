todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '},
  { id: 5, title: 'Coffee with <b>INJECTION</b>' }
];

document.addEventListener("DOMContentLoaded", () => {
  let todoList = document.querySelector('#todos');
  let deleteDialog = document.querySelector('#delete-dialog');
  let contextMenu = document.querySelector('#context-menu');
  let contextDelete = document.querySelector('#context-delete');
  let menuItems = contextMenu.querySelectorAll('button');

  setupContextMenu();
  setupTodos();
  setupDeleteButton();
  setupDeleteDialog();

  function setupDeleteButton() {
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
  }

  function setupContextMenu() {
    todoList.addEventListener('contextmenu', e => {
      if (['DIV', 'BUTTON'].includes(e.target.tagName)) {
        e.preventDefault();
  
        contextMenu.dataset.todoId = e.target.parentElement.id;
        contextMenu.dataset.todoTitle = e.target.innerText;
        contextMenu.className = 'show';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
      }
    });
  
    contextDelete.addEventListener('click', e => {
      let message = deleteDialog.firstElementChild;
      let title = contextMenu.dataset.todoTitle;
      let todoId = contextMenu.dataset.todoId;

      message.innerText = `Are you sure you'd like to delete '${title}'?` 
      deleteDialog.setAttribute("data-id", todoId)
      
      deleteDialog.className = 'show';
    });

    document.addEventListener('click', e => {
      contextMenu.className = 'hide';
    });

    setupMenuHighlights(menuItems);
  }

  function setupDeleteDialog() {
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
  }
  
  function setupTodos() {
    todoItems.forEach(item => {
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
  }
  
  function deleteItem(itemId) {
    document.getElementById(itemId).remove()
  
    let itemIndex = todoItems.find(todo => todo.id === itemId);
    todoItems.splice(itemIndex, 1);
  }
  
  function escape(string) {
    return string.replace(/[^0-9a-zA-Z]/g, char => {
      return "&#" + char.charCodeAt(0) + ";";
    });
  }
  
  function setupMenuHighlights() {
    menuItems.forEach(button => {
      button.addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = 'var(--menu-highlight)';
      });
  
      button.addEventListener('mouseleave', e => {
        e.target.style.backgroundColor = 'var(--menu-background)';
      });
    });
  }
});