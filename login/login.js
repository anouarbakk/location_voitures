import{sign_up} from "./sign_up.js";
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sign-up-button').addEventListener('click', sign_up);
});
let success=sessionStorage.getItem('success');
if(success){
    
    let logged=true;
    sessionStorage.setItem('logged',logged);
}
else{
    let logged=false;
    sessionStorage.setItem('logged',logged);
}