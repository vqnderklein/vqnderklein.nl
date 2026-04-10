const form = document.querySelector('form');
const submit = form.querySelector('input[type="submit"]');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: `${form.elements.firstName.value} ${form.elements.lastName.value}`,
        email: form.elements.email.value,
        salutation: form.elements.aanhef.value,
        subject: form.elements.subject.value,
        message: form.elements.message.value
    }
    console.log(formData);

    const url = "https://vqnderklein.nl/api/send-email";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            const response = JSON.parse(xhr.responseText);

            if (response == 'Success') {

                form.reset();
                submit.value = "Email is verstuurd!"
                submit.disabled = true;
                submit.removeAttribute("type");

            } else {

                console.error('Error:', response);
                submit.value = "Er is een fout opgetreden. Probeer het later nog eens.";

            }

        } else if (xhr.status !== 200) {
            console.error('Request Error:', xhr.statusText, `Status Code: ${xhr.status}`);
            submit.value = "Er is een fout opgetreden. Probeer het later nog eens.";
        }
    };

    xhr.onerror = function() {
        console.error("Network Error: Unable to reach the server.");
        submit.value = "Er is een fout opgetreden. Probeer het later nog eens.";
    };

    xhr.send(JSON.stringify(formData));
});