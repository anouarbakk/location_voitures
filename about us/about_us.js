
let logged=sessionStorage.getItem('logged');

function change_nav(){
    let navbar=document.querySelector('.navbar');
    let links=document.querySelector('.nav-links');
 
        let username=sessionStorage.getItem('username');
        navbar.innerHTML=` <a href="../Landing-Page/index.html" style="--i:1" >Home</a>
        <a href="./about-us.html" style="--i:2"  class="active">About us</a>
        <a href="../index.html" style="--i:3" >Store</a>
        <a href="../profile/profile.html" style="--i:3">${username}</a>`
}
logged ? change_nav() : null;
