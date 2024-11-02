


async function date() {
    const id_voiture = document.querySelector('.car-item').value;
    const date_debut = document.querySelector('.start_date').value;
    const date_fin = document.querySelector('.end_date').value;
    const id_client = sessionStorage.getItem('userId');
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
        if (response.ok){
          //will be useful later
        }
      
    } catch (error) {
        const errorMessage = document.getElementById('errorMessage'); // Ensure errorMessage is defined
        errorMessage.textContent = 'Network error: ' + error.message;
        errorMessage.style.display = 'block';
    }
}

export { date };