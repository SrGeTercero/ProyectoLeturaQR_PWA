// Instalar el Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('qr-app-cache').then(function(cache) {
            // Archivos que serán almacenados en caché
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.js',
                '/manifest.json',
                '/codigo-qr_128.png',
                '/codigo-qr_512.png'
            ]);
        })
    );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker activado');
});

self.addEventListener('activate', event => {
    const cacheWhitelist = ['qr-app-cache-v2']; // Nueva versión del caché
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// Interceptar peticiones de red (fetch)
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Si el archivo está en caché, devolverlo
            if (response) {
                return response;
            }
            // De lo contrario, hacer la solicitud normal a la red
            return fetch(event.request);
        })
    );
});

