import{sign_up} from "./sign_up.js";
import{sign_in} from "./sign_in.js";




document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sign-up-button').addEventListener('click', sign_up);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sign-in-button').addEventListener('click', sign_in);
});
