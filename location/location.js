import {date} from "./post_date.js"


let car_list={}
async function fetchCars() {
    try {
        const response = await fetch('http://localhost:3000/voitures');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars = await response.json();
        car_list=cars;
        addedcars();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function addedcars(){
    let select_cars= document.querySelector('.cars');
    select_cars.innerHTML='';
    car_list.forEach(car => {
        const carItem = document.createElement('option');
        carItem.value=car.id_voiture;
        carItem.classList.add('car-item');
        carItem.textContent = `${car.marque} ${car.modele}`;
        select_cars.appendChild(carItem);
    });
}
fetchCars();

let submit=document.querySelector('.submit');
submit.addEventListener('click',()=>{
    date();
});
