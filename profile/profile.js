
async function fetchClientDetails(id_client) {
   
    const url = `http://localhost:3000/profile/${id_client}`; 

    try {
        
        const response = await fetch(url);

       
        if (!response.ok) {
            throw new Error(`Error fetching client details: ${response.statusText}`);
        }

        
        const clientData = await response.json();

        
        const clientDetails = {
            nom: clientData.nom,
            prenom: clientData.prenom,
            email: clientData.email,
            telephone: clientData.telephone
        };

       
        first=document.querySelector('.first');
        last=document.querySelector('.last');
        email=document.querySelector('.email');
        phone=document.querySelector('.phone');
        first.textContent=clientDetails.nom;
        last.textContent=clientDetails.prenom;
        email.textContent=clientDetails.email;
        phone.textContent=clientDetails.telephone;
        console.log('Client Details:', clientDetails);

        
        return clientDetails;

    } catch (error) {
        
        console.error('Fetch error:', error);
    }
}
id_client=sessionStorage.getItem('userId');
fetchClientDetails(id_client);
let navbar=document.querySelector('.navbar');
let username=sessionStorage.getItem('username');
navbar.innerHTML=` <a href="../Landing-Page/index.html" style="--i:1" >Home</a>
            <a href="../about us/about-us.html" style="--i:2">About us</a>
            <a href="../index.html" style="--i:3" >Store</a>
            <a href="./profile.html" style="--i:3" class="active">${username}</a>`