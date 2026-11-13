/* English Hub 오프라인 지원. 서비스워커는 사이트에 이 파일 하나뿐이고 통합 홈 · 세 파트를 모두 맡는다.
   앱 파일은 "네트워크 먼저, 안 되면 저장본" — 새로 올린 내용이 바로 보이고, 인터넷이 없어도 열린다.
   글꼴(CDN)은 "저장본 먼저".
   SHELL 목록과 CACHE 이름 뒤의 날짜는 tools/publish_web.sh 가 채운다(직접 고치지 않는다). */
const PREFIX = 'englishhub-';
const CACHE = PREFIX + '20261113-1429';
const SHELL = ['grammar/css/style.css', 'grammar/', 'grammar/js/app.js', 'grammar/js/core.js', 'grammar/js/data/ch1.js', 'grammar/js/data/ch2.js', 'grammar/js/data/ch3.js', 'grammar/js/data/ch4.js', 'grammar/js/data/ch5.js', 'grammar/js/data/ch6.js', 'hear/app.js', 'hear/data.js', 'hear/', 'hear/style.css', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', './', 'manifest.webmanifest', 'shared/hub.js', 'word/assets/css/style.css', 'word/assets/data/forms.js', 'word/assets/data/high.js', 'word/assets/data/middle.js', 'word/assets/data/toeic.js', 'word/assets/js/app.js', 'word/'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  /* 같은 주소(…github.io) 아래 다른 앱의 저장본은 건드리지 않고, 이 앱의 옛 저장본만 지운다. */
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin && !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  const put = (res) => {
    if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  };
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(put).catch(() => caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? c.match('./') : undefined)))));
  } else {
    e.respondWith(caches.open(CACHE).then((c) => c.match(req)).then((r) => r || fetch(req).then(put)));
  }
});
