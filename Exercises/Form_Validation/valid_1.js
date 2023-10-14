document.addEventListener('DOMContentLoaded', () => {
  let firstName = document.querySelector('#first-name');
  let lastName = document.querySelector('#last-name');
  let email = document.querySelector('#email');
  let password = document.querySelector('#password');
  let phone = document.querySelector('#phone');
  let form = document.querySelector('#signup-form');
  let formError = document.querySelector('div.form-error-message');

  form.addEventListener('submit', e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      formError.classList.add('invalid');    
    }
  });

  [firstName, lastName, email, password, phone].forEach(input => {
    input.addEventListener('blur', e => {
      console.log(e.target.validity.valid);

      if (e.target.validity.valid) {
        e.target.classList.remove('invalid');
        e.target.nextElementSibling.classList.remove('invalid');
      } else {
        e.target.classList.add('invalid');
        e.target.nextElementSibling.classList.add('invalid');
      }

      if (form.checkValidity()) {
        formError.classList.remove('invalid');
      }
    });
  });
});
