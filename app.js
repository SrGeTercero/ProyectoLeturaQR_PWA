// Simulación de inicio de sesión
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('qr-screen').style.display = 'block';
});

// Variables para QR
let qrResult = document.getElementById('qr-result');
let registerBtn = document.getElementById('register-btn');

// Iniciar escaneo QR
document.getElementById('scan-qr-btn').addEventListener('click', function() {
    const video = document.getElementById('qr-video');
    const qrScanner = new QrScanner(video, result => {
        qrResult.textContent = `Resultado: ${result}`;
        registerBtn.disabled = false;
        qrScanner.stop();  // Detener escaneo tras obtener resultado
    });
    qrScanner.start();
});

// Acción del botón de registrar
registerBtn.addEventListener('click', function() {
    alert('QR registrado exitosamente');
    registerBtn.disabled = true;  // Desactivar hasta nuevo escaneo
});

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado con éxito:', registration.scope);
        })
        .catch(err => {
            console.log('Error al registrar el Service Worker:', err);
        });
    });
}
