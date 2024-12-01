document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const contractNumber = document.getElementById('contract-number').value;

    // Redirect to the results page
    window.location.href = `/contracts/${contractNumber}`;
});