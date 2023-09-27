function getOpenTeacherSlots() {
  const result = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject('Error: request timed out.');
    }, 5000);

    let request = new XMLHttpRequest();
    request.open('GET', '/api/schedules');
    request.responseType = 'json';
  
    request.addEventListener('load', event => {
      let schedules = event.target.response;

      let openSlots = schedules.filter(schedule => {
        return !schedule.student_email;
      });

      let slotPerTeacher = {};

      if (openSlots.length > 0) {
        openSlots.forEach(schedule => {
          let teacher = `staff ${schedule.staff_id}`;

          if (slotPerTeacher[teacher]) {
            slotPerTeacher[teacher] += 1;
          } else {
            slotPerTeacher[teacher] = 1;
          }
        }); 
      } else {
        resolve('There are no schedules to book at the moment.');
      }

      let message = '';
      Object.keys(slotPerTeacher).forEach(teacher => {
        message += teacher + ': ' + slotPerTeacher[teacher] + '\n';
      });
      resolve(message);
    });

    request.send();
  });

  result.then(alertPromiseResult, alertPromiseResult);
}

function alertPromiseResult(message) {
  alert(message);
}

function retrieveSchedules() {
  const request = new XMLHttpRequest();
  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let schedules = event.target.response;

    let openSlots = schedules.filter(schedule => {
      return !schedule.student_email;
    });

    let slotPerTeacher = {};

    if (openSlots.length > 0) {
      openSlots.forEach(schedule => {
        let teacher = `staff ${schedule.staff_id}`;

        if (slotPerTeacher[teacher]) {
          slotPerTeacher[teacher] += 1;
        } else {
          slotPerTeacher[teacher] = 1;
        }
      }); 
    } else {
      alert ('There are no open slots currently');
    }

    if (openSlots) {
      let message = '';
      Object.keys(slotPerTeacher).forEach(teacher => {
        message += teacher + ': ' + slotPerTeacher[teacher] + '\n';
      });
      alert(message);
    }
  });

  request.addEventListener('timeout', event => {
    alert('The request timed out, please try again');
  });

  request.addEventListener('loadend', event => {
    alert('Request complete');
  });

  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  retrieveSchedules();
  // getOpenTeacherSlots();
});
