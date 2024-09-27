// Event Listener for Registration Form Submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const termsChecked = document.getElementById('terms').checked;

    // Validation flags
    let valid = true;

    // Full Name Validation (at least 3 characters)
    if (fullName.length < 3) {
        document.getElementById('nameError').textContent = 'Full Name must be at least 3 characters long.';
        valid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    // Email Validation (valid format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Password Validation (at least 8 characters, 1 uppercase, 1 number, 1 special character)
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters, include one uppercase, one number, and one special character.';
        valid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    // Confirm Password Validation (must match password)
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        valid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }

    // Date of Birth Validation (must be 18 years or older)
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18 || (age === 18 && today < new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate()))) {
        document.getElementById('dobError').textContent = 'You must be at least 18 years old.';
        valid = false;
    } else {
        document.getElementById('dobError').textContent = '';
    }

    // Terms & Conditions Checkbox Validation
    if (!termsChecked) {
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions.';
        valid = false;
    } else {
        document.getElementById('termsError').textContent = '';
    }

    // Enable Submit if Valid
    if (valid) {
        alert('Registration successful!');
    }
});

// Password Strength Meter (using zxcvbn.js)
document.getElementById('password').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const result = zxcvbn(password);
    const strengthMeter = document.getElementById('passwordStrength');

    const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    strengthMeter.textContent = 'Password strength: ' + strengthText[result.score];
});

// Event Listener for Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email address.';
        return;
    } else {
        document.getElementById('loginEmailError').textContent = '';
    }

    // Password Validation (should not be empty)
    if (password.trim() === '') {
        document.getElementById('loginPasswordError').textContent = 'Password cannot be empty.';
        return;
    } else {
        document.getElementById('loginPasswordError').textContent = '';
    }

    alert('Login successful!');
});

// Toggle Between Registration and Login Forms
document.getElementById('showRegisterLink').addEventListener('click', function () {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

document.getElementById('showLoginLink').addEventListener('click', function () {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
