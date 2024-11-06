import { sign_up } from "./new_sign_up.js";
import { sign_in } from "./new_sign_in.js";


const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sign-up-button').addEventListener('click', sign_up);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sign-in-button').addEventListener('click', sign_in);
});
