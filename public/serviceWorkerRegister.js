// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/e69d20a2092686fbfa2f67b2398019207969e892/public/serviceWorkerRegister.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/serviceWorker.js').then(
      function (registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      },
      function (err) {
        console.error('ServiceWorker registration failed: ', err);
      }
    );
  });
}
