async function sign_up() {
    let logged = false;
    const errorMessage = document.querySelector('.error-message');
    const name = document.getElementById('signup-name').value.trim();
    const firstname = document.getElementById('signup-firstname').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validation checks
    if (!name || !firstname || !phone || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'All fields must be filled out.';
        errorMessage.style.display = 'block';
        return;
    }

    if (!/^\d{8}$/.test(phone)) {
        errorMessage.textContent = 'The phone number must contain exactly 8 digits.';
        errorMessage.style.display = 'block';
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'The passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    
    const userData = {
        name: name,
        firstname: firstname,
        phone: phone,
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'An error occurred during signup.';
            errorMessage.style.display = 'block';
            return;
        }

        logged = true;
        sessionStorage.setItem('logged', logged);
        window.location.href = '../index.html';

    } catch (error) {
        errorMessage.textContent = 'Network error: ' + error.message;
        errorMessage.style.display = 'block';
    }
}

export { sign_up };