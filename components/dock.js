/* Notebook Dock V1 · isolated catalog demo, no app navigation */
const dockPaths={
home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-7h6v7"/>',
search:'<circle cx="10.8" cy="10.8" r="7.5"/><path d="m16.4 16.4 5 5"/>',
notes:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>',
tasks:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 11 3 3 6-7"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
files:'<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v6h5"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6m4-6v6"/>'
};
const dockItems=[["home","Přehled"],["search","Hledat"],["notes","Poznámky"],["tasks","Úkoly"],["calendar","Kalendář"],["files","Přílohy"],["settings","Nastavení"],["trash","Koš"]];
let dockSelected="notes";
function dockIcon(id){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+dockPaths[id]+'</svg>'}
function renderDock(){
 if(dockFrame)cancelAnimationFrame(dockFrame);dockFrame=0;dockMouseX=null;dockStates=[];
 const host=document.getElementById("dock-catalog");if(!host)return;
 host.innerHTML='<div class="dock-catalog"><section class="dock-demo-card"><div><h2>10 · Notebook Dock</h2><p>Plovoucí ikonová navigace pro budoucí Notebook. Jemný macOS magnification efekt, aktivní položka, tooltipy a stavové indikátory.</p></div><div class="dock-stage"><nav class="axo-dock" aria-label="Notebook Dock demo">'+
 dockItems.map(([id,label],i)=> (id==="trash"?'<span class="axo-dock-divider" aria-hidden="true"></span>':'')+
 '<div class="axo-dock-item"><button type="button" class="axo-dock-button" data-dock-id="'+id+'" aria-label="'+label+'" aria-pressed="'+(id===dockSelected)+'" aria-describedby="dock-tip-'+id+'">'+dockIcon(id)+(id==="tasks"?'<span class="axo-dock-count" aria-hidden="true">3</span>':id==="notes"?'<span class="axo-dock-notification" aria-hidden="true"></span>':'')+'</button><span class="axo-dock-indicator" aria-hidden="true"></span><span class="axo-dock-tooltip" id="dock-tip-'+id+'" role="tooltip">'+label+'</span></div>').join('')+
 '</nav></div><div class="dock-demo-status" id="dock-status" aria-live="polite">Aktivní: Poznámky. Demo nemění skutečnou navigaci aplikace.</div></section></div>';
}
/* React Bits-inspired distance magnification, vanilla JS spring, no dependencies. */
let dockFrame=0,dockMouseX=null,dockStates=[];
function dockBase(){return matchMedia("(max-width:650px)").matches?40:50}
function dockSetPointer(event){
 const dock=event.target.closest(".axo-dock");if(!dock||event.pointerType!=="mouse")return;
 dockMouseX=event.clientX;
 if(!dockFrame)dockFrame=requestAnimationFrame(dockAnimate);
}
function dockAnimate(){
 const dock=document.querySelector(".axo-dock");
 if(!dock||!dock.isConnected){dockFrame=0;dockStates=[];dockMouseX=null;return}
 const items=[...dock.querySelectorAll(".axo-dock-item")],base=dockBase();
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 let active=false;
 items.forEach((item,i)=>{
  const previous=dockStates[i]||{value:base,velocity:0};
  dockStates[i]=previous;
  const rect=item.getBoundingClientRect();
  const center=rect.left+rect.width/2;
  const distance=dockMouseX===null?Infinity:Math.abs(dockMouseX-center);
  const bell=Math.exp(-Math.pow(distance/105,2)*1.25);
  const desired=(reduced?base:base+20*bell);
  const force=(desired-previous.value)*.19;
  previous.velocity=(previous.velocity+force)*.68;
  previous.value+=previous.velocity;
  if(Math.abs(previous.value-desired)>.08||Math.abs(previous.velocity)>.08)active=true;
  item.style.setProperty("--dock-size",previous.value.toFixed(2)+"px");
 });
 if(active||dockMouseX!==null)dockFrame=requestAnimationFrame(dockAnimate);
 else dockFrame=0;
}
document.addEventListener("pointermove",dockSetPointer);
document.addEventListener("pointerout",event=>{
 const dock=event.target.closest(".axo-dock");
 if(dock&&!dock.contains(event.relatedTarget)){dockMouseX=null;if(!dockFrame)dockFrame=requestAnimationFrame(dockAnimate)}
});
document.addEventListener("click",event=>{
 const button=event.target.closest("[data-dock-id]");if(!button)return;
 dockSelected=button.dataset.dockId;
 document.querySelectorAll(".axo-dock-button").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
 document.getElementById("dock-status").textContent="Vybráno: "+dockItems.find(([id])=>id===dockSelected)[1]+". Demo nemění skutečnou navigaci aplikace.";
});
