const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const userData = req.body;

    // Basic validation
    if (!/^[a-zA-Z0-9]+$/.test(userData.username)) {
        return res.status(400).json({ success: false, message: 'Username must be alphanumeric.' });
    }

    if (!/^[a-zA-Z0-9]+$/.test(userData.password) || userData.password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and alphanumeric.' });
    }

    // Read the existing users data
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        // Check for duplicate username
        if (users.find(user => user.username === userData.username)) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }

        // Check for duplicate email
        if (users.find(user => user.email === userData.email)) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
        }

        // Add new user to the users array
        users.push(userData);

        // Write the updated users data to the file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            res.json({ success: true, message: 'Sign Up Successful!' }); // Send JSON response here
        });
    });
});

app.post('/login', (req, res) => {
    const loginData = req.body;

    // Read the existing users data
    fs.readFile('users.json', 'utf8', (err,     ) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Please create the first account first.' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        // Check for user by username or email
        const user = users.find(user => (user.username === loginData.identifier || user.email === loginData.identifier) && user.password === loginData.password);

        if (user) {
            return res.json({ success: true, message: 'Login Successful!' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid username/email or password.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
