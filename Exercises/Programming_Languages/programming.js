const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

const languagesLess = languages.map(lang => {
  let langCopy = Object.assign({}, lang);
  langCopy.description = langCopy.description.slice(0, 120) + "..."
  return langCopy;
});

document.addEventListener("DOMContentLoaded", () => {
  let langaugesTemplate = Handlebars.compile(document.querySelector('#languages').innerHTML);
  Handlebars.registerPartial('language_description', document.querySelector('#language').innerHTML);

  let langContainer = document.querySelector('main');

  langContainer.innerHTML = langaugesTemplate({languages: languagesLess});
  let buttons = document.querySelectorAll('.show-hide');

  buttons.forEach(button => {
    button.addEventListener('click', event => {
      let languageName = event.target.parentElement.querySelector('h2').innerHTML
      let languageDescription;

      if (event.target.innerText === 'Show More') {
        languageDescription = findLangDescription(languages, languageName);
        event.target.innerText = 'Show Less';
      } else {
        languageDescription = findLangDescription(languagesLess, languageName);
        event.target.innerText = 'Show More';
      }

      event.target.nextElementSibling.innerHTML = languageDescription;
    });
  })
});

function findLangDescription(languages, langName) {
  return languages.find(lang => lang.name === langName).description;
}