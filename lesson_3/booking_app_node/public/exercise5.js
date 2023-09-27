/*
select input box for schedules to be displayed, don't load until the select box has been clicked on.
    then, load and populate the list.
    display the name, date and time of booking as: name | date | time
    api will use the booking id so, use that as our value to post from the selection

input for student email, which we will use to determine if the student exists
    /api/bookings returns a 404 StudentNotFound and a booking sequence if the student doesn't exist

        if a new student doesn't exist, we need to add a new student form that uses the returned booking sequence and email given
        to populate the form, which then just needs a name
    
        that form wil post to /api/students
        then repost the request to make a booking for that student

return an error if any of the fields are empty



POST
/api/students

email	String	
(required) Email of the student

name	String	
(required) Name of the student

booking_sequence	Number	
(required) This is proof that student tried to book a schedule first. Only students with a booking sequence can be added to the database.


POST
/api/bookings
Parameter
Field	Type	Description
id	Number	
(required) ID of the Schedule

student_email	String	
(required) Email of the student

*/

document.addEventListener('DOMContentLoaded', () => {
    let scheduleSelect = document.getElementById('schedule-select');
    let staff_members;
    let scheduleForm = document.querySelector('.book-schedule');

    let staffRequest = new XMLHttpRequest();
    staffRequest.open('GET', '/api/staff_members');
    staffRequest.setRequestHeader('Content-Type', 'application/json');
    staffRequest.send();

    staffRequest.addEventListener('load', () => {
        staff_members = JSON.parse(staffRequest.response);
        loadSchedules(staff_members);
    });

    scheduleForm.addEventListener('submit', event => {
        event.preventDefault();

        let formData = new FormData(scheduleForm);
        let formValues = formDataToJson(formData);
        formValues.id = Number(formValues.id);

        let scheduleRequest = new XMLHttpRequest();
        scheduleRequest.open('POST', scheduleForm.action);
        scheduleRequest.setRequestHeader('Content-type', 'application/json');
        scheduleRequest.send(JSON.stringify(formValues));

        scheduleRequest.addEventListener('load', () => {
            switch(scheduleRequest.status) {
                case 204:
                    alert("Booked");
                    scheduleForm.reset();
                    scheduleSelect.querySelector(`option[value="${formValues["id"]}"]`).remove();
                    break;
                case 404:
                    alert(scheduleRequest.response);

                    if (scheduleRequest.response.match('booking_sequence')) {
                        let bookingSeq = Number(scheduleRequest.response.match(/\d+$/)[0]);
                        let newStudentForm = createNewStudentForm(formValues["student_email"], bookingSeq);
                        
                        document.body.append(newStudentForm);

                        newStudentForm.addEventListener('submit', event => {
                            event.preventDefault();

                            let formData = new FormData(newStudentForm);
                            let newStudentFormValues = formDataToJson(formData);
                            newStudentFormValues["booking_sequence"] = Number(newStudentFormValues["booking_sequence"]);

                            let request = new XMLHttpRequest();
                            request.open('POST', newStudentForm.action);
                            request.setRequestHeader('Content-Type', 'application/json');

                            request.send(JSON.stringify(newStudentFormValues));

                            request.addEventListener('load', () => {
                                switch(request.status) {
                                    case 201:
                                        alert(request.response);

                                        let newScheduleRequest = new XMLHttpRequest();
                                        newScheduleRequest.open('POST', scheduleForm.action);
                                        newScheduleRequest.setRequestHeader('Content-Type', 'application/json');
                                        newScheduleRequest.send(JSON.stringify(formValues));

                                        newScheduleRequest.addEventListener('load', event => {
                                            switch(newScheduleRequest.status) {
                                                case 204:
                                                    alert("Booked");
                                                    scheduleForm.reset();
                                                    scheduleSelect.querySelector(`option[value="${formValues["id"]}"]`).remove();
                                                    break;
                                                case 404:
                                                    alert(NewScheduleRequest.response);
                                            }
                                        });

                                        newStudentForm.remove();
                                        break;
                                    case 403:
                                    case 400:
                                        alert(request.response);
                                        break;
                                }
                            });
                        });

                        //  if that submission is successful
                        //    re-submit the booking request 
                        //  if not, display the issue
                    }
                    break;
            }
        });
    });
});

function createNewStudentForm(email, bookingSeq) {
    let form = document.createElement('form');
    form.setAttribute('class', 'new-student-form');
    form.setAttribute('action', '/api/students');
    form.setAttribute('method', 'POST');

    let emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email-input');
    emailLabel.textContent = 'Email: ';

    let emailInput = document.createElement('input');
    emailInput.setAttribute('id', 'email-input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'email')
    emailInput.setAttribute('value', email);

    form.appendChild(emailLabel);
    form.appendChild(emailInput);

    let nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name-input');
    nameLabel.textContent = 'Name: ';

    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'name-input');
    nameInput.setAttribute('name', 'name')

    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    let seqLabel = document.createElement('label');
    seqLabel.setAttribute('for', 'seq-input');
    seqLabel.textContent = 'Booking Sequence: ';

    let seqInput = document.createElement('input');
    seqInput.setAttribute('id', 'seq-input');
    seqInput.setAttribute('name', 'booking_sequence')
    seqInput.setAttribute('value', bookingSeq);

    form.appendChild(seqLabel);
    form.appendChild(seqInput);

    let submit = document.createElement('input');
    submit.setAttribute('id', 'seq-submit');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Submit');

    form.appendChild(submit);

    return form;
}

function formDataToJson(formData) {
  let json = {};

  formData.entries().forEach(pair => {
    key = pair[0];
    value = pair[1];

    json[key] = value;
  });

  return json;
}

function loadSchedules(staff, event) {
    let request = new XMLHttpRequest();
    let scheduleSelect = document.getElementById('schedule-select');

    let loadingAnimation = document.createElement('option');
    loadingAnimation.textContent = 'Loading.';
    let animationHandler = animateLoading(loadingAnimation);
    
    scheduleSelect.appendChild(loadingAnimation);

    request.open('GET', '/api/schedules');
    request.setRequestHeader('Content-Type', 'application/json');

    request.send();
    request.addEventListener('load', event => {
        clearInterval(animationHandler);

        schedules = JSON.parse(event.target.response);
        availableSchedules = schedules.filter(schedule => !schedule["student_email"]);
        
        availableSchedules.forEach(schedule => {
           let select = document.createElement('option');
           select.setAttribute('value', schedule["id"]);

           let staffMember = staff.filter(staffMember => staffMember.id === schedule["staff_id"])[0].name;
           
           select.textContent = staffMember + ' | ' + schedule["date"] + ' | ' + schedule["time"];
           
           scheduleSelect.appendChild(select);
        });

        loadingAnimation.remove();
    });
}

function animateLoading(element) {
    return setInterval(() => {
        if (element.textContent.match(/\.+/)[0].length >= 3) {
            element.textContent = element.textContent.replace(/\.+/, '.');
        } else {
            element.textContent += '.'
        }
    }, 500);
}
