function cancelBooking(id) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${id}`);
  xhr.send();

  xhr.addEventListener('load', () => {
    alert(xhr.response);
  });
}

function cancelSchedule(id) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${id}`);
  xhr.send();

  xhr.addEventListener('load', () => {
    switch (xhr.status) {
      case 204:
        alert('Schedule has been removed');
        break;
      case 403:
      case 404:
        alert(xhr.response);
        break;
    }
  });
}