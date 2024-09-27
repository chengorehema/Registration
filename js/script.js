document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const showLoginButton = document.getElementById('showLogin');
    const showRegisterButton = document.getElementById('showRegister');
    const registerButton = document.getElementById('registerButton');

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const dob = document.getElementById('dob');
    const terms = document.getElementById('terms');

    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');

    showLoginButton.addEventListener('click', () => {
        registrationForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    showRegisterButton.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registrationForm.classList.remove('hidden');
    });

     // Registration form validation
     registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateRegistrationForm()) {
            alert('Registration successful!');
            registrationForm.reset();
        }
    });

    // Login form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateLoginForm()) {
            alert('Login successful!');
            loginForm.reset();
        }
    });

      // Real-time validation
      fullName.addEventListener('input', validateFullName);
      email.addEventListener('input', validateEmail);
      password.addEventListener('input', validatePassword);
      confirmPassword.addEventListener('input', validateConfirmPassword);
      dob.addEventListener('input', validateDOB);
      terms.addEventListener('change', validateTerms);
  
      loginEmail.addEventListener('input', validateLoginEmail);
      loginPassword.addEventListener('input', validateLoginPassword);

        // Validation functions
    function validateFullName() {
        const fullNameValue = fullName.value.trim();
        if (fullNameValue.length < 3) {
            setError(fullName, 'Full name must be at least 3 characters long');
            return false;
        } else {
            setSuccess(fullName);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setError(email, 'Please enter a valid email address');
            return false;
        } else {
            setSuccess(email);
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = password.value.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(passwordValue)) {
            setError(password, 'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character');
            return false;
        } else {
            setSuccess(password);
            updatePasswordStrength(passwordValue);
            return true;
        }
    }

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPassword.value.trim();
        const passwordValue = password.value.trim();
        if (confirmPasswordValue !== passwordValue) {
            setError(confirmPassword, 'Passwords do not match');
            return false;
        } else {
            setSuccess(confirmPassword);
            return true;
        }
    }

    function validateDOB() {
        const dobValue = new Date(dob.value);
        const today = new Date();
        const age = today.getFullYear() - dobValue.getFullYear();
        const monthDiff = today.getMonth() - dobValue.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) {
            age--;
        }
        if (age < 18) {
            setError(dob, 'You must be at least 18 years old');
            return false;
        } else {
            setSuccess(dob);
            return true;
        }
    }

    function validateTerms() {
        if (!terms.checked) {
            setError(terms, 'You must agree to the terms and conditions');
            return false;
        } else {
            setSuccess(terms);
            return true;
        }
    }

    function validateLoginEmail() {
        const loginEmailValue = loginEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginEmailValue)) {
            setError(loginEmail, 'Please enter a valid email address');
            return false;
        } else {
            setSuccess(loginEmail);
            return true;
        }
    }
    
    function validateLoginPassword() {
        const loginPasswordValue = loginPassword.value.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(loginPasswordValue)) {
            setError(loginPassword, 'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character');
            return false;
        } else {
            setSuccess(loginPassword);
            return true;
        }
    }

     // Helper functions
     function setError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error');
        errorDisplay.innerText = message;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        input.setAttribute('aria-invalid', 'true');
        errorDisplay.setAttribute('role', 'alert');
        updateRegisterButtonState();
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error');
        errorDisplay.innerText = '';
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
        updateRegisterButtonState();
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isStrongPassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    function updatePasswordStrength(password) {
        const strengthMeter = document.getElementById('passwordStrength');
        const strengthText = ['Weak', 'Medium', 'Strong'];
        const strengthColor = ['#ff4d4d', '#ffa64d', '#4CAF50'];
        let strength = 0;

        if (password.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password.match(/[$@#&!]+/)) {
            strength += 1;
        }

        strengthMeter.style.width = (strength / 4) * 100 + '%';
        strengthMeter.style.backgroundColor = strengthColor[strength - 1];
        strengthMeter.textContent = strengthText[strength - 1];
    }

    function updateRegisterButtonState() {
        const isValid = validateFullName() && validateEmail() && validatePassword() && 
                        validateConfirmPassword() && validateDOB() && validateTerms();
        registerButton.disabled = !isValid;
    }

    function validateRegistrationForm() {
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDOBValid = validateDOB();
        const isTermsValid = validateTerms();

        return isFullNameValid && isEmailValid && isPasswordValid && 
               isConfirmPasswordValid && isDOBValid && isTermsValid;
    }

    function validateLoginForm() {
        const isLoginEmailValid = validateLoginEmail();
        const isLoginPasswordValid = validateLoginPassword();

        return isLoginEmailValid && isLoginPasswordValid;
    }
});

