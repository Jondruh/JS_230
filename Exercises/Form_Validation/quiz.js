const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

document.addEventListener('DOMContentLoaded', () => {
  let quiz = document.querySelector('.quiz');

  questions.forEach(question => {
    let questionField = document.createElement('fieldset');

    let questionText = document.createElement('legend');
    questionText.innerHTML = question.description;
    questionField.appendChild(questionText);

    question.options.forEach(option => {
      let label = document.createElement('label');

      let radio = document.createElement('input');
      radio.setAttribute('type', 'radio');
      radio.setAttribute('value', option);
      radio.setAttribute('name', question.id);

      label.appendChild(radio);
      questionField.appendChild(label);

      let labelText = document.createElement('span');
      labelText.innerHTML = option;

      label.appendChild(labelText);
    });

    let result = document.createElement('div');
    result.className = 'result'
    result.id = 'result-' + question.id;

    quiz.appendChild(questionField);
    quiz.appendChild(result);
  });

  let submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Submit Quiz');

  let reset = document.createElement('button');
  reset.innerText = 'Reset';

  let quizControls = document.createElement('div');
  quizControls.className = 'quiz-controls';

  quizControls.appendChild(submit);
  quizControls.appendChild(reset);

  quiz.appendChild(quizControls);

  reset.addEventListener('click', e => {
    e.preventDefault();
    quiz.reset();
    submit.disabled = false;
    quiz.querySelectorAll('fieldset').forEach(field => field.disabled = false);
    quiz.querySelectorAll('.result').forEach(result => {
      result.innerHTML = '';
      result.className = 'result';
    })
  });

  quiz.addEventListener('submit', e => {
    e.preventDefault();
    let answers = Object.fromEntries(new FormData(e.target));
    
    Object.keys(answerKey).forEach(key => {
      let resultMessage = document.querySelector('#result-' + key);
      
      if (!answers[key]) {
        resultMessage.innerHTML = `You didn't anwer this question. Correct Answer: ${answerKey[key]}`
        resultMessage.classList.add('incorrect');
      } else if (answers[key] && answers[key] === answerKey[key]) {
        resultMessage.innerHTML = `Correct Answer`
        resultMessage.classList.add('correct');
      } else {
        resultMessage.innerHTML = `Wrong Answer. Correct Answer: ${answerKey[key]}`
        resultMessage.classList.add('incorrect');
      } 
    });

    submit.disabled = true;
    quiz.querySelectorAll('fieldset').forEach(field => field.disabled = true);
  });
});