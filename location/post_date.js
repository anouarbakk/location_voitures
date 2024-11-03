async function date() {
    const selectElement = document.querySelector('.cars');
    const id_voiture = selectElement.value; // Get the selected value from the dropdown
    const date_debut = document.querySelector('.start_date').value;
    const date_fin = document.querySelector('.end_date').value;
    const id_client = sessionStorage.getItem('userId');

    // Input validation
    if (!id_voiture || !date_debut || !date_fin) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Please fill out all fields.';
        errorMessage.style.display = 'block';
        return; // Exit the function if validation fails
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

        if (response.ok) {
            const result = await response.json();
            window.location.href = '../paiment.html';
            alert('Car successfully booked!');
        } else {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Error: ' + response.statusText;
            errorMessage.style.display = 'block';
        }
      
    } catch (error) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Network error: ' + error.message;
        errorMessage.style.display = 'block';
    }
}

export { date };