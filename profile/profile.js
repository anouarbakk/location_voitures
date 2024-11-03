
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
navbar.innerHTML=` <ul>
            <li><a href="../index.html">Home</a></li>
            <li><a href="../about us/about-us.html">About us</a></li>
            <li><a href="./profile.html">${username}</a></li>
        </ul>`