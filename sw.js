const CACHE_NAME = 'dcms-hub-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['./', './index.html', './manifest.json', './icon.png']);
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Skip caching for API calls to backend
    if (event.request.url.includes('/Mobile/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
