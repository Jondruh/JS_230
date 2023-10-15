document.addEventListener('DOMContentLoaded', () => {
  let firstName = document.querySelector('#first-name');
  let lastName = document.querySelector('#last-name');
  let email = document.querySelector('#email');
  let password = document.querySelector('#password');
  let phone = document.querySelector('#phone');
  let form = document.querySelector('#signup-form');
  let formError = document.querySelector('div.form-error-message');
  let credits = document.querySelectorAll('.credit-input');
  let encodedForm = document.querySelector('.serialized-form-data');

  form.addEventListener('submit', e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      formError.classList.add('invalid');    
    } else {
      e.preventDefault();
      let form = new FormData(e.target);
      let credit = form.getAll('credit');
      form.set('credit', credit.join(''));

      let encoded = new URLSearchParams(form)

      encodedForm.textContent = encoded.toString();
      
    }
  });

  [firstName, lastName].forEach(input => {
    input.addEventListener('beforeinput', e => {
      if (e.inputType === 'insertText' && (!e.data.match(/[a-zA-Z'\s]/))) {
          e.preventDefault();
      }
    });
  });

  credits.forEach(input => {
    input.addEventListener('beforeinput', e => {
      if (e.inputType === 'insertText' && (!e.data.match(/[0-9]/))) {
        e.preventDefault();
      }
      
      if (e.inputType === 'insertText' && e.target.value.length >= 4) {
        e.preventDefault();
      }
    });

    input.addEventListener('blur', e => {
      if (e.target.validity.valid) {
        e.target.classList.remove('invalid');
        
        if (Array.from(credits).every(input => input.validity.valid)) {
          e.target.parentElement.nextElementSibling.classList.remove('invalid');
        }
      } else {
        e.target.classList.add('invalid');
        e.target.parentElement.nextElementSibling.classList.add('invalid');
      }

      if (form.checkValidity()) {
        formError.classList.remove('invalid');
      }
    });
  });

  Array.from(credits).slice(0, -1).forEach(input => {
    input.addEventListener('keyup', e => {
      if (e.target.value.length === 4) {
        e.target.nextElementSibling.focus();
      }
    });
  });

  [firstName, lastName, email, password, phone].forEach(input => {
    input.addEventListener('blur', e => {

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
