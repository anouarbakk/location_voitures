function checkDate(){
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById('rentalForm');
        const errorMessage = document.getElementById('errorMessage');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const startDate = new Date(form.querySelector('.start_date').value);
            const endDate = new Date(form.querySelector('.end_date').value);

            if (startDate >= endDate) {
                errorMessage.textContent = "Pickup date must be before return date.";
                errorMessage.style.display = "block";
            } else {
                errorMessage.style.display = "none"; 
                anouar=true;
                sessionStorage.setItem('anouar',anouar)
                
            }
        });
    });
}
export{checkDate}