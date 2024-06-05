const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const signUp = document.querySelector(".signup-link");
const login = document.querySelector(".login-link");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

function saveRegisteredUsers() {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                });
            } else {
                pwField.type = "password";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                });
            }
        });
    });
});

signUp.addEventListener("click", () => {
    container.classList.add("active");
});

login.addEventListener("click", () => {
    container.classList.remove("active");
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = registeredUsers.find(user => user.email === email);

    if (user && user.password === password) {
        // Save user's first name to local storage
        localStorage.setItem("firstName", user.firstName);
        document.querySelector(".loader-container").style.display = "flex"; // Show loading animation

        setTimeout(function() {
            window.location.href = "homepage.html"; // Redirect to homepage after delay
        }, 2000); // Adjust delay time as needed
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const firstName = document.getElementById("signupFirstName").value;
    const lastName = document.getElementById("signupLastName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Password and confirm password don't match. Please try again.");
        return;
    }

    if (!validateEmail(email)) {
        alert('Your Email must contain "@".');
        return;
    }

    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
        alert("Email was already registered. Please use a different email.");
        return;
    }

    if (password.length < 8) {
        alert("Password must contain 8 characters");
        return;
    }

    const newUser = {
        firstName,
        lastName,
        email,
        password
    };

    registeredUsers.push(newUser);
    saveRegisteredUsers();
    signupForm.reset();
    container.classList.remove("active");
    alert("Registration successful! You can now login using your credentials.");
});

document.addEventListener("DOMContentLoaded", function() {
    // Simulate loading delay (You can adjust the delay time as needed)
    setTimeout(function() {
        // Hide loader and show login container
        document.querySelector(".loader-container").style.display = "none";
        document.querySelector(".login-container").style.display = "block";
    }, 2000); // Adjust the delay time (in milliseconds) as needed
});
