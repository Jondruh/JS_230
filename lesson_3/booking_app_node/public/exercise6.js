document.addEventListener('DOMContentLoaded', () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/bookings');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.addEventListener('load', event => {
    if (xhr.status === 200) {
      let dates = JSON.parse(xhr.response);
      let datesList = document.querySelector('.list-dates');

      dates.forEach(date => {

        dateNode = document.createElement('li');
        dateNode.classList.add('date');
        dateNode.textContent = date;

        bookingNode = document.createElement('ul');
        bookingNode.classList.add('booking');

        dateNode.appendChild(bookingNode);
      
        datesList.appendChild(dateNode);

        dateNode.addEventListener('click', event => {
          if (event.target.nodeName === 'LI' && event.target.classList[0] === 'date') {
            let bookingxhr = new XMLHttpRequest();
            bookingxhr.open('GET', `/api/bookings/${event.target.textContent}`);
            bookingxhr.setRequestHeader('Content-Type', 'application/json');
            bookingxhr.send();

            bookingxhr.addEventListener('load', bookingEvent => {
              let bookings = JSON.parse(bookingxhr.response);

              bookings.forEach(booking => {
                let bookingNode = document.createElement('li');
                bookingNode.classList.add('booking');
                booking = booking.join(' | ');
                bookingNode.textContent = booking;

                event.target.querySelector('ul').appendChild(bookingNode);
              });
            });

          }
        }, {once: true});
      });
    }
  });
});