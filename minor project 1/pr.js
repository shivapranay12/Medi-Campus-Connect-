document.addEventListner("DOMContentLoaded" ,function() {
    document.getElementById('diseases').addEventListener('change', function() {
        // Hide all descriptions
        document.querySelectorAll('.description').forEach(function(div) {
            div.style.display = 'none';
        });

        // Get the selected value
        const selectedValue = this.value;

        // Show the corresponding description
        if (selectedValue) {
            document.getElementById(selectedValue).style.display = 'block';
        }
    });






});
    
