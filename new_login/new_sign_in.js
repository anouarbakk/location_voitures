async function sign_in() {
    const email = document.getElementById('signin-email').value;
    const mot_de_passe = document.getElementById('signin-pass').value;
    let logged=false;
    console.log("work");
    sessionStorage.setItem('logged', logged);
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, mot_de_passe }),
        });

        
        const data = await response.json();

        if (response.ok) {
            document.querySelector('.error-message').style.display = 'none';
            alert('Login successful!');
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('userId', data.userId);
            window.location.href = '../index.html';
            let logged=true;
            sessionStorage.setItem('logged', logged);
        } else {
            
            document.querySelector('.error-message').innerText = data.message;
            document.querySelector('.error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.querySelector('.error-message').innerText = 'An error occurred. Please try again.';
        document.querySelector('.error-message').style.display = 'block';
    }
}

export { sign_in };