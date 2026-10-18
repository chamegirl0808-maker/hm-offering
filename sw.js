const C='hm-v3-60fd955a';const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','data.enc'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
// 화면(HTML)은 인터넷이 되면 새 버전, 안 되면 저장본 · 나머지는 저장본 먼저
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./',cp));return r;}).catch(()=>caches.match('./')));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
