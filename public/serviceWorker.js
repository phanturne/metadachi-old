// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/e69d20a2092686fbfa2f67b2398019207969e892/public/serviceWorker.js

const METADACHI_WEB_CACHE = 'metadachi-web-cache';

self.addEventListener('activate', function (event) {
  console.log('ServiceWorker activated.');
});

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(METADACHI_WEB_CACHE).then(function (cache) {
      return cache.addAll([]);
    })
  );
});

self.addEventListener('fetch', (e) => {});
