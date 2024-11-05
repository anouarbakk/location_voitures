async function sendPayment(id_location, montant, date_paiement, mode_paiement) {
    const paymentData = {
        id_location,
        montant,
        date_paiement,
        mode_paiement
    };

    try {
        const response = await fetch('http://localhost:3000/postPayments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Payment successful:', result);
        
        // Redirect only if the payment was successful
        window.location = '../index.html';
    } catch (error) {
        console.error('Error sending payment details:', error);
        // You might want to show an error message to the user here
    }
}

export { sendPayment };