const CACHE_NAME="politics-focus-source-units-1e6891a35c8f";
const OFFLINE_FILES=[
  './',
  './basic-cloze-data.js',
  './chapter3.html',
  './chapter5.html',
  './chapter6.html',
  './chapter7.html',
  './chapter8.html',
  './focus-data.js',
  './index.html',
  './legacy.html',
  './manifest.webmanifest',
  './mztChapter1.html',
  './mztChapter2.html',
  './mztChapter3.html',
  './mztChapter4.html',
  './mztChapter5.html',
  './mztChapter6.html',
  './mztChapter7.html',
  './mztChapter8.html',
  './mztIntro.html',
  './offline-init.js',
  './study.html',
  './xiao8-data.js',
  './xiao8-study.html',
  './xiao8.html',
  './xiChapter1.html',
  './xiChapter11.html',
  './xiChapter12.html',
  './xiChapter13.html',
  './xiChapter14.html',
  './xiChapter15.html',
  './xiChapter16.html',
  './xiChapter17.html',
  './xiChapter2.html',
  './xiChapter3.html',
  './xiChapter4.html',
  './xiChapter5.html',
  './xiChapter6.html',
  './xiChapter7.html',
  './xiChapter8.html',
  './xiChapter9.html',
  './xiIntro.html'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(OFFLINE_FILES.map(path=>new Request(path,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const names=await caches.keys();
  const old=names.filter(name=>name.startsWith('politics-')&&name!==CACHE_NAME);
  await Promise.all(old.map(name=>caches.delete(name)));
  await self.clients.claim();
  if(old.length){for(const client of await self.clients.matchAll({type:'window'})){
    if(client.url.startsWith(self.registration.scope))client.navigate(client.url).catch(()=>{});
  }}
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||!event.request.url.startsWith(self.registration.scope))return;
  event.respondWith(caches.open(CACHE_NAME).then(cache=>cache.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok)event.waitUntil(cache.put(event.request,response.clone()));
    return response;
  }).catch(()=>event.request.mode==='navigate'?cache.match('./'):Promise.reject(new Error('Offline resource unavailable'))))));
});
