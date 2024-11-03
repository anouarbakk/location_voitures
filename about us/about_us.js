
let logged=sessionStorage.getItem('logged');

function change_nav(){
    let navbar=document.querySelector('.navbar');
    let links=document.querySelector('.nav-links');
 
        let username=sessionStorage.getItem('username');
        navbar.innerHTML=` <ul>
            <li><a href="../index.html">Home</a></li>
            <li><a href="./about-us.html">About us</a></li>
            <li><a href="../profile/profile.html">${username}</a></li>
        </ul>`
}
logged ? change_nav() : null;
