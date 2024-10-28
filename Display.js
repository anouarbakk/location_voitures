
async function fetchCars() {
    try {
        const response = await fetch('http://localhost:3000/voitures');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayCars(cars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';

    cars.forEach(car => {
        const carItem = document.createElement('li');
        carItem.innerHTML = `
    <div class="card-body">
    <div class="image-wrapper">
    <img src="${car.image_path}" alt="${car.modele} ${car.marque}" class="car-image"></div>
        <div class="car-info">
            <div class="car-text">
                <h6 class="font-weight-bold">${car.modele}</h6>
                <h6>${car.marque}</h6>
            </div>
            <h5 class="car-value">$ <span class="car-price">${car.prix_jour}</span></h5>
        </div>
        <h5 class="car-value add-to-cart"> <span class="cart">Rent</span></h5>
    </div>`;
        carList.appendChild(carItem);
    });
}

window.onload = fetchCars;