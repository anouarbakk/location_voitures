async function sign_up() {
    const errorMessage = document.querySelector('.error-message');
    const nom = document.getElementById('signup-name').value.trim();
    const prenom = document.getElementById('signup-firstname').value.trim();
    const telephone = document.getElementById('signup-phone').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const mot_de_passe = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    
    if (!nom || !prenom || !telephone || !email || !mot_de_passe || !confirmPassword) {
        errorMessage.textContent = 'All fields must be filled out.';
        errorMessage.style.display = 'block';
        return;
    }

    if (!/^\d{8}$/.test(telephone)) {
        errorMessage.textContent = 'The phone number must contain exactly 8 digits.';
        errorMessage.style.display = 'block';
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        return;
    }

    if (mot_de_passe !== confirmPassword) {
        errorMessage.textContent = 'The passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    const userData = {
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        email: email,
        mot_de_passe: mot_de_passe
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
            let success=false;
            sessionStorage.setItem('success', success);
            const errorData = await response.json();
            if (response.status === 409) {
                errorMessage.textContent = 'Conflict: ' + (errorData.message || 'This email or phone number is already in use.');
            } else {
                errorMessage.textContent = errorData.message || 'An error occurred during signup.';
            }
            errorMessage.style.display = 'block';
            return;
        }

        let success=true;
        sessionStorage.setItem('success', success);
    } catch (error) {
        errorMessage.textContent = 'Network error: ' + error.message;
        errorMessage.style.display = 'block';
    }
}


export { sign_up };