// HANDLE SIGNUP

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mailingList = document.getElementById('mailingList').checked;
    const messageElement = document.getElementById('message');

    messageElement.textContent = ''; // Clear previous messages

    // Basic validation
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        messageElement.textContent = 'Username must be alphanumeric.';
        messageElement.style.color = "#dc4949";
        return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(password) || password.length < 8) {
        messageElement.textContent = 'Password must be at least 8 characters long and alphanumeric.';
        messageElement.style.color = "#dc4949";
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password,
        mailingList: mailingList
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageElement.textContent = 'Sign Up Successful!';
            messageElement.style.color = "#00c214";
            document.getElementById('signupForm').reset();  // Reset form fields after submission
        } else {
            messageElement.textContent = data.message;
            messageElement.style.color = "#dc4949";
        }
    })
    .catch(error => {
        console.error(error);
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.style.color = "#dc4949";
    });
});




// HANDLE LOGIN

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginIdentifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');

    messageElement.textContent = ''; // Clear previous messages

    const loginData = {
        identifier: loginIdentifier,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageElement.textContent = 'Login Successful!';
            messageElement.style.color = "#00c214";
            alert("login successfull!")
            document.getElementById('loginForm').reset();
        } else {
            messageElement.textContent = data.message;
            messageElement.style.color = "#dc4949";
        }
    })
    .catch(error => {
        console.error('Error:', error); 
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.style.color = "#dc4949";
    });
});

function switchPages() {
    document.getElementById("signup").classList.toggle("hidden")
    document.getElementById("login").classList.toggle("hidden")
}