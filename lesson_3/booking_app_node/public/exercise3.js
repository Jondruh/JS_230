document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.add-staff');    
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let name = event.target.name.value;
        let email = event.target.email.value;
        let requestBody = {email, name}
        
        let request = new XMLHttpRequest();
        request.open('POST', '/api/staff_members');
        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('load', event => {
            switch (request.status) {
                case 400:
                    alert(request.responseText);
                    break;
                case 201:
                    const response = JSON.parse(request.response);
                    alert(`Succesfully created staff with id: ${response.id}`);
                    break;
            }
        });

        request.send(JSON.stringify(requestBody));
    });
});