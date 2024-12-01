// Código en JS para capturar el formulario y enviar los datos al servidor
document.getElementById('form-contrato').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevenir que el formulario se envíe de manera convencional

    // Obtener los datos del formulario
    const data = {
        contrato: document.getElementById('contrato').value,
        zona: document.getElementById('zona').value,
        estrategia: document.getElementById('estrategia').value,
        firma: document.getElementById('firma').value,
        obra: document.getElementById('obra').value,
        contratista: document.getElementById('contratista').value,
        residente: document.getElementById('residente').value,
        importe: document.getElementById('importe').value,
        fecha_inicio: document.getElementById('fecha_inicio').value,
        fecha_termino: document.getElementById('fecha_termino').value,
        plazo: document.getElementById('plazo').value,
        estatus: document.getElementById('estatus').value
    };

    // Enviar los datos al servidor
    fetch('/submit-contract', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())  // Convertir la respuesta a JSON
    .then(responseData => {
        if (responseData.message) {
            alert(responseData.message);  // Muestra mensaje de éxito
            window.location.href = responseData.redirectTo;
        } else {
            alert('Hubo un problema al enviar los datos.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al enviar los datos.');
    });
});
