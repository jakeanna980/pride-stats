// Pride Stats – offline support. Bump VERSION when you change any file.
const VERSION = 'pride-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest', './fonts/fonts.css',
  './fonts/inter-latin-400-normal.woff2', './fonts/inter-latin-500-normal.woff2', './fonts/inter-latin-600-normal.woff2',
  './fonts/inter-latin-700-normal.woff2', './fonts/inter-latin-800-normal.woff2',
  './fonts/jetbrains-mono-latin-400-normal.woff2', './fonts/jetbrains-mono-latin-500-normal.woff2', './fonts/jetbrains-mono-latin-700-normal.woff2',
  './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png', './icons/favicon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // Network first (so updates show up), but fall back to the saved copy after 3 s or when offline.
    e.respondWith(new Promise(resolve => {
      let done = false;
      const fallback = () => caches.match('./index.html').then(r => { if (!done && r) { done = true; resolve(r); } });
      const t = setTimeout(fallback, 3000);
      fetch(req).then(res => {
        clearTimeout(t);
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
        if (!done) { done = true; resolve(res); }
      }).catch(() => { clearTimeout(t); caches.match('./index.html').then(r => { if (!done) { done = true; resolve(r || Response.error()); } }); });
    }));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
