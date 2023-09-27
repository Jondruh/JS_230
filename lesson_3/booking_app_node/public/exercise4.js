const staffLoaded = new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open('GET', '/api/staff_members');
  request.setRequestHeader('Content-Type', 'application/json');

  request.send();
  request.addEventListener('load', event => {
      switch (request.status) {
          case 200:
              console.log('Staff retrieved.');
              resolve(JSON.parse(request.response));
              // staff = JSON.parse(request.response);
              break;
          case 400:
              console.log('Not able to retrieve staff')
              reject('Not able to retrieve staff');
              break;
      }
  });
});

const DOMLoaded = new Promise (resolve => {
  document.addEventListener('DOMContentLoaded', () => { resolve() })
});

Promise.all([DOMLoaded, staffLoaded]).then((values) => {
  let staff = values[1];
  const form = document.querySelector('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/api/schedules')

  const addScheduleButton = document.createElement('button');
  addScheduleButton.setAttribute('class', 'add-schedule-button');
  addScheduleButton.textContent = 'Add New Schedule';
  addScheduleButton.setAttribute('type', 'button');
  form.appendChild(addScheduleButton);

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  
  form.appendChild(submit);

  form.insertBefore(createScheduleForm(staff), submit);

  addScheduleButton.addEventListener('click', event => {
    form.insertBefore(createScheduleForm(staff), submit);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    let allForms = {schedules: []}
    formDatatoJson(allForms, new FormData(form));

    let request = new XMLHttpRequest();
    request.open('POST', form.action);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(allForms));

    request.addEventListener('load', event => {
      switch(request.status) {
        case 201:
          alert(request.response);
          form.reset();
          break;
        case 400:
          alert(request.response);
          break;
      }
    });

  });
});

function formDatatoJson(schedule, formData) {
  let json = {};

  formData.entries().forEach((pair, index) => {
    key = pair[0];
    value = pair[1];

    json[key] = value;
    if ((index + 1) % 3 === 0) {
      schedule.schedules.push(json);
      json = {}
    }
  });

  return schedule;
}

function createScheduleForm(staff) {
  const staffDiv = document.createElement('div');
  
  const staffLabel = document.createElement('label');
  staffLabel.setAttribute('for', 'staff-select');
  staffLabel.textContent = "Staff Name: ";

  const staffName = document.createElement('select');
  staffName.setAttribute('id', 'staff-select');
  staffName.setAttribute('name', 'staff_id');

  staff.forEach(staff => {
    let option = document.createElement('option');
    option.textContent = staff.name;
    option.setAttribute('value', staff.id);

    staffName.appendChild(option);
  });

  staffDiv.appendChild(staffLabel);
  staffDiv.appendChild(staffName);

  const textFields = document.createElement('div');
  textFields.classList.add('text-fields');

  const date = document.createElement('div');

  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'date');
  dateLabel.textContent = 'Date: ';

  const dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'date');
  dateInput.setAttribute('name', 'date');
  dateInput.setAttribute('id', 'date');

  date.appendChild(dateLabel);
  date.appendChild(dateInput);

  const time = document.createElement('div');

  const timeLabel = document.createElement('label');
  timeLabel.setAttribute('for', 'time');
  timeLabel.textContent = 'Time: ';

  const timeInput = document.createElement('input');
  timeInput.setAttribute('type', 'time');
  timeInput.setAttribute('name', 'time');
  timeInput.setAttribute('id', 'time');
  
  time.appendChild(timeLabel);
  time.appendChild(timeInput);
  
  textFields.appendChild(staffDiv);
  textFields.appendChild(date);
  textFields.appendChild(time);

  return textFields;
}
/*
tecreate a function that creates a new schedule form
create a button that creates and adds a new schedule form
start the page with one schedule form pre-made

submit, should submit all of the schedule forms

schedule form should have:
    drop down of staff names
        use /api/staff_members to fetch all staff members
        [ {id: name: email:}, {id: name: email:}...]
    date text input box, with mm-dd-yy
    time text input box, with hh:mm

this is the request format to POST to the API page '/api/schedules
{
    "schedules": [
        {
            "staff_id": 1,
            "date": "10-10-10",
            "time": "12:12"
        }
    ]
}

server will send back 400 if there are missing inputs

t
*/