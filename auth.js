// Simulating localStorage to store users
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Signup logic
function signup(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simple validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Sign up successful! Please log in.");

    // Redirect to login page
    window.location.href = "login.html";
}

// Login logic
function login(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        localStorage.setItem('loggedInUser', username);

        // Redirect to the food ordering system page
        window.location.href = "restaurant_order.html";
    } else {
        alert("Invalid username or password.");
    }
}
