const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

$(function() {
  fillFilterSelectors();
  displayCars(cars);

  $('#filter-controls').on('submit', event => {
    event.preventDefault();
    let data = new FormData(event.target);
    let filters = {};

    data.entries().forEach(category => {
      if (category[1] !== 'all') {
        filters[category[0]] = category[1];
      }
    })

    displayCars(filterCars(cars, filters));
  });
});

function filterCars(cars, filters) {
  let filteredCars = cars;

  Object.keys(filters).forEach(category => {
    filteredCars = filteredCars.filter(car => {
      return String(car[category]) === filters[category];
    });
  });

  console.log(filteredCars);
  return filteredCars; 
}

function displayCars(cars) {
  let $car = $('#car-template');
  let $carsContainer = $('#cars-container');
  $carsContainer.empty();

  let carTemplate = Handlebars.compile($car.html());

  cars.forEach(car => {
    $carsContainer.append(carTemplate(car));
  });
}

function fillFilterSelectors() {
  let uniqueCars = { make: [], model: [], year: [], price: [] }

  Object.keys(cars[0]).forEach(category => {
    if(category !== 'image') {
      for(let i = 0; i < cars.length; i += 1) {
        if (!uniqueCars[category].includes(cars[i][category])) {
          uniqueCars[category].push(cars[i][category]);
        }
      }
    }
  });

  Object.keys(uniqueCars).forEach(category => {
    let $selectElement = $(`#${category}-select`)

    uniqueCars[category].forEach(selectOption => {
      let option = document.createElement('option');

      option.setAttribute('value', selectOption);
      option.innerText = selectOption;

      $selectElement.append(option);
    });
    
  });

}