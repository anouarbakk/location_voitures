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
        alert('Payment successful!');
        
        
        
        
    } catch (error) {
        console.error('Error sending payment details:', error);
       
    }
}

export { sendPayment };