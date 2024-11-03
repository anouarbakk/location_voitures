async function date() {
    const selectElement = document.querySelector('.cars');
    const id_voiture = selectElement.value; 
    const date_debut = document.querySelector('.start_date').value;
    const date_fin = document.querySelector('.end_date').value;
    const id_client = sessionStorage.getItem('userId');

    
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none'; 

    if (!id_voiture || !date_debut || !date_fin) {
        errorMessage.textContent = 'Please fill out all fields.';
        errorMessage.style.display = 'block';
        return; 
    }

    
    if (new Date(date_debut) >= new Date(date_fin)) {
        errorMessage.textContent = 'End date must be after start date.';
        errorMessage.style.display = 'block';
        return; 
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
    if (new Date(date_debut) <= today) {
        errorMessage.textContent = 'Pickup date must be later than today.';
        errorMessage.style.display = 'block';
        return; 
    }

    const date_data = {
        id_client: id_client, 
        id_voiture: id_voiture,
        date_debut: date_debut,
        date_fin: date_fin
    };

    try {
        const response = await fetch('http://localhost:3000/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(date_data)
        });

        
        if (response.status === 201) {
            window.location.href = '../paiment.html'; 
            alert('date is available');
           
        } else {
            const errorResponse = await response.json();
            console.error('Error:', errorResponse);
            errorMessage.textContent = 'Error: ' + (errorResponse.message || response.statusText);
            errorMessage.style.display = 'block';
        }
      
    } catch (error) {
        console.error('Network error:', error);
        errorMessage.textContent = 'Network error: ' + error.message;
        errorMessage.style.display = 'block';
    }
}

export { date };