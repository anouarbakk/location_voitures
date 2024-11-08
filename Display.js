
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
    const rentButton = carItem.querySelector('.add-to-cart');
        rentButton.addEventListener('click', () => {
            let logged=sessionStorage.getItem('logged');
            if(logged){
            window.location.href = './location/location.html';}
            else{
                window.location.href = './new_login/LOGIN.html';
            }
        });
        carList.appendChild(carItem);
    });
}
function change_nav(){
    let navbar=document.querySelector('.navbar');
    let links=document.querySelector('.nav-links');
 
        let username=sessionStorage.getItem('username');
        navbar.innerHTML=` <a href="./Landing-Page/index.html" style="--i:1" >Home</a>
            <a href="./about us/about-us.html" style="--i:2">About us</a>
            <a href="./index.html" style="--i:3" class="active">Store</a>
            <a href="./profile/profile.html" style="--i:3">${username}</a>`
}
let logged=sessionStorage.getItem('logged');
logged ? change_nav() : null;
let userId=sessionStorage.getItem('userId');
console.log(userId);



window.onload = fetchCars;