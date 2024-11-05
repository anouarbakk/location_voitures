async function fetchLastLocation() {
    const url = 'http://localhost:3000/id_location';

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

       
        const data = await response.json();
        sessionStorage.setItem('last_id_location', data.last_id_location);
    } catch (error) {
        console.error('Error fetching last location:', error);
    }
}
export { fetchLastLocation };