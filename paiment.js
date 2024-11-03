document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
    });

    
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expMonth = document.getElementById('exp-month').value.trim();
    const expYear = document.getElementById('exp-year').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    let isValid = true; 

    
    if (!cardName) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        isValid = false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        document.getElementById('number-error').textContent = 'Please enter a valid 16-digit credit card number.';
        isValid = false;
    }

    if (!/^\d{2}$/.test(expMonth)) {
        document.getElementById('month-error').textContent = 'Please enter a valid expiration month.';
        isValid = false;
    }

    if (!/^\d{4}$/.test(expYear)) {
        document.getElementById('year-error').textContent = 'Please enter a valid expiration year.';
        isValid = false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        document.getElementById('cvv-error').textContent = 'Please enter a valid 3-digit CVV.';
        isValid = false;
    }

    
    if (isValid) {
        
        
        console.log({
            cardName ,
            cardNumber,
            expMonth,
            expYear,
            cvv
        });

        
  
    }
});