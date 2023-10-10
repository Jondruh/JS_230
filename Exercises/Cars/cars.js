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
  fillFilterSelectors(cars);
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
    fillFilterSelectors(cars, filters);
  });
});

function filterCars(cars, filters) {
  let filteredCars = cars;

  Object.keys(filters).forEach(category => {
    filteredCars = filteredCars.filter(car => {
      return String(car[category]) === filters[category];
    });
  });

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

function fillFilterSelectors(cars, filters = {}) {
  let seenCategories = { make: [], model: [], year: [], price: [] }

  $("#filter-controls option[value!='all']").remove(); // resets the filter fields

  cars.forEach(car => {
    Object.keys(car).forEach(category => {
      if (category === 'image') { return; }

      if (category === 'model' && filters.make) {
        if (filters.make !== car[`make`]) { return; }
      }
       
      if (seenCategories[category].includes(car[category])) {
        return;
      }

      let $selectElement = $(`#${category}-select`);
      let option = document.createElement('option');
      option.setAttribute('value', car[category]);
      option.innerText = car[category];
      if(car[category] === filters[category]) {
        option.selected = true;
      }

      seenCategories[category].push(car[category]);
      
      $selectElement.append(option);
  });
  });

}