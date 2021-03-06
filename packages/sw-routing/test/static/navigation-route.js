/* global goog */

importScripts('/packages/sw-routing/build/sw-routing.js');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const route = new goog.routing.NavigationRoute({
  whitelist: [new RegExp('navigation$')],
  handler: {
    handle: () => Promise.resolve(new Response('navigation response')),
  },
});

const router = new goog.routing.Router();
router.registerRoute({route});
