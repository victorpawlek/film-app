importScripts("/precache-manifest.bc19f60274c77835c5edfedc127d7b29.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const defaultOptions = {
  exclude: [/\.map$/, /img\/icons\//, /favicon\.ico$/, /^manifest.*\.js?$/],
};

if (workbox) {
  console.log(`Workbox is loaded`);
  workbox.setConfig({ debug: true });
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
  workbox.routing.registerRoute(
    "/filme",
    new workbox.strategies.NetworkFirst({
      cacheName: "victors-cache",
    })
  );
} else {
  console.log(`Workbox didn't load`);
}
self.skipWaiting();
self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body.message,
    icon: "img/icons/android-chrome-maskable-192x192.png",
  });
});

