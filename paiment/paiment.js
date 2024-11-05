import { fetchLastLocation } from "./getLocation.js";
import { sendPayment } from "./postPayment.js";
fetchLastLocation();





let valid=false;
let id_location=sessionStorage.getItem('last_id_location');
id_location=parseInt(id_location);
console.log("id_location",id_location);
let today=new Date();
let datePaiment=today.toISOString().split('T')[0];
let date_paiement=datePaiment;
let prix_jour=0;
let montant=0;
let mode_paiement="carte";
let id_voiture=sessionStorage.getItem('id_voiture');
let dated=sessionStorage.getItem('date_debut');
dated=new Date(dated);
let datef=sessionStorage.getItem('date_fin');
datef=new Date(datef);
async function calculateMontant() {
    await getCarPrice(id_voiture); 
    montant = price(dated, datef, prix_jour);
    montant = parseFloat(montant.toFixed(2));
    console.log(montant);
}
calculateMontant();



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
        valid=true;
        
    }
});
function price(dated, datef, pricePerDay) {
    let differenceMilli = datef - dated;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    let difference = Math.floor(differenceMilli / millisecondsInADay);
    let totalPrice = difference * parseFloat(pricePerDay);
    return totalPrice;
}
async function getCarPrice(id_voiture) {

    if (!id_voiture) {
        console.error('id_voiture is required.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/voiture/prix/${id_voiture}`);

        if (!response.ok) {
            if (response.status === 404) {
                console.error('Car not found.');
            } else {
                console.error('Error fetching car price:', response.statusText);
            }
            return;
        }

        const data = await response.json();
        prix_jour = data.prix_jour;
        console.log('Prix par jour:', prix_jour);

    } catch (error) {
        console.error('Error fetching car price:', error);
    }
}

    let button=document.querySelector('.btn');
button.addEventListener('click', function() {
    console.log({
    id_location,
    montant,
    date_paiement,
    mode_paiement
});
    sendPayment(id_location, montant, date_paiement, mode_paiement);
    window.location='../index.html';
});

  
