import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { root } from './runtime.mjs';

const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname)}catch{res.writeHead(400).end();return}
 if(pathname==='/favicon.ico'){res.writeHead(204).end();return}
 if(pathname==='/labs/qr-design-exploration'){res.writeHead(308,{'Location':pathname+'/'+new URL(req.url,'http://127.0.0.1').search}).end();return}
 const relative=pathname==='/'?'index.html':/^\/labs\/qr-design-exploration\/?$/.test(pathname)?'labs/qr-design-exploration/index.html':pathname.slice(1);
 // Serve catalog runtime assets only, never .git, skills, lockfiles, or tool caches.
 if(relative!=='index.html'&&!/^(components|assets|labs\/qr-design-exploration)\//.test(relative)){res.writeHead(404).end();return}
 const file=path.resolve(root,relative);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 const normalized=path.relative(root,file).split(path.sep).join('/');
 if(normalized!=='index.html'&&!/^(components|assets|labs\/qr-design-exploration)\//.test(normalized)){res.writeHead(403).end();return}
 try{const bytes=fs.readFileSync(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(bytes)}catch{res.writeHead(404).end()}
}).listen(4173,'127.0.0.1',()=>console.log('AXO-02 catalog test server http://127.0.0.1:4173'));
