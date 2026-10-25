/* Notebook Dock V2 · isolated catalog demo, no app navigation */
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
// Motion/layout adapted from the supplied React Bits Dock source:
// https://reactbits.dev/components/dock — no React or animation dependency.
const dockConfig={base:50,peak:70,distance:200,panelHeight:68,gap:10,roundness:.5,mass:.1,stiffness:150,damping:12};
let dockCleanup=null;
function renderDock(){
 dockCleanup?.();
 const host=document.getElementById("dock-catalog");if(!host)return;
 host.innerHTML='<div class="dock-catalog"><section class="dock-demo-card"><div><h2>10 · Notebook Dock</h2><p>Notebook Dock V2 · Návrh ke schválení. Plovoucí ikonová navigace pro budoucí Notebook, s aktivní položkou, tooltipy a stavovými indikátory.</p></div><div class="dock-stage"><nav class="axo-dock" aria-label="Notebook Dock demo">'+
 dockItems.map(([id,label])=> (id==="trash"?'<span class="axo-dock-divider" aria-hidden="true"></span>':'')+
 '<button type="button" class="axo-dock-item axo-dock-button" data-dock-id="'+id+'" aria-label="'+label+'" aria-pressed="'+(id===dockSelected)+'" aria-describedby="dock-tip-'+id+'"><span class="axo-dock-tile"><span class="axo-dock-face">'+dockIcon(id)+'</span>'+(id==="tasks"?'<span class="axo-dock-count" aria-hidden="true">3</span>':id==="notes"?'<span class="axo-dock-notification" aria-hidden="true"></span>':'')+'</span><span class="axo-dock-indicator" aria-hidden="true"></span><span class="axo-dock-tooltip" id="dock-tip-'+id+'" role="tooltip">'+label+'</span></button>').join('')+
 '</nav></div><div class="dock-demo-status" id="dock-status" aria-live="polite">Aktivní: '+dockItems.find(([id])=>id===dockSelected)[1]+'. Demo nemění skutečnou navigaci aplikace.</div></section></div>';
 dockCleanup=mountDock(host.querySelector(".axo-dock"));
}
function dockWeight(focus,rest,distance){
 const reach=Math.abs(focus-rest)/distance;
 return reach<1?Math.cos(reach*Math.PI/2)**2:0;
}
function mountDock(dock){
 const stage=dock.parentElement,items=[...dock.querySelectorAll(".axo-dock-item")];
 const entries=[...dock.children];
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 const config=dockConfig;
 const spans=entries.map(e=>e.matches(".axo-dock-divider")?1:config.base);
 const contentLength=spans.reduce((sum,span)=>sum+span,0)+config.gap*(spans.length-1);
 let cursor=-contentLength/2;
 const rest=entries.flatMap((e,i)=>{
  const center=cursor+spans[i]/2;cursor+=spans[i]+config.gap;
  return e.matches(".axo-dock-item")?[center]:[];
 });
 // Reserve concurrent neighbour growth as well as the focused tile. Sample
 // the static cosine envelope at <=1px intervals; the derivative bound
 // covers the unsampled half-step, so resizing never depends on hover.
 const samples=Math.ceil(rest.at(-1)-rest[0]);
 const step=(rest.at(-1)-rest[0])/samples;
 let maxWeight=0;
 for(let i=0;i<=samples;i++){
  const focus=rest[0]+i*step;
  maxWeight=Math.max(maxWeight,rest.reduce((sum,center)=>sum+dockWeight(focus,center,config.distance),0));
 }
 const safety=items.length*Math.PI/(2*config.distance)*step/2;
 const maxLength=contentLength+config.panelHeight-config.base+(config.peak-config.base)*(maxWeight+safety);
 const states=items.map(()=>({size:config.base,velocity:0}));
 let fit=1,pointer=null,focused=-1,frame=0,last=0,alive=true;
 function draw(){
  items.forEach((item,i)=>{
   const size=states[i].size;
   item.style.width=size+"px";
   item.style.height=size+"px";
   item.firstElementChild.style.transform="scale("+size/(config.base*fit)+")";
  });
 }
 function tick(now){
  frame=0;
  if(!alive||!dock.isConnected){cleanup();return}
  const dt=Math.min(1/30,Math.max(.001,(now-last)/1000));last=now;
  const steps=Math.max(1,Math.ceil(dt*240)),h=dt/steps;
  const k=config.stiffness/config.mass,c=config.damping/config.mass;
  const rect=dock.getBoundingClientRect();
  const focus=pointer!==null?pointer-(rect.left+rect.width/2):focused>=0?rest[focused]*fit:null;
  let moving=false;
  states.forEach((state,i)=>{
   const base=config.base*fit;
   const target=base+(reduced.matches||focus===null?0:(config.peak-config.base)*fit*dockWeight(focus,rest[i]*fit,config.distance*fit));
   if(reduced.matches){state.size=base;state.velocity=0}
   else for(let j=0;j<steps;j++){
    state.velocity=(state.velocity+h*k*(target-state.size))/(1+h*c+h*h*k);
    state.size+=state.velocity*h;
   }
   if(Math.abs(state.velocity)<.01&&Math.abs(target-state.size)<.01){state.size=target;state.velocity=0}
   else moving=true;
  });
  draw();
  if(moving)frame=requestAnimationFrame(tick);
 }
 function wake(){if(!frame&&alive){last=performance.now();frame=requestAnimationFrame(tick)}}
 function measure(){
  const style=getComputedStyle(stage);
  const room=stage.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
  const next=Math.min(1,Math.max(1,room)/maxLength);
  if(next!==fit){
   const ratio=next/fit;states.forEach(state=>{state.size*=ratio;state.velocity*=ratio});fit=next;
  }
  const base=config.base*fit;
  dock.style.setProperty("--dock-base",base+"px");
  dock.style.setProperty("--dock-gap",config.gap*fit+"px");
  dock.style.setProperty("--dock-panel-height",config.panelHeight*fit+"px");
  dock.style.setProperty("--dock-pad",(config.panelHeight-config.base)/2*fit+"px");
  dock.style.setProperty("--dock-fit",fit);
  dock.style.setProperty("--dock-reach",(config.peak-config.base)*fit+"px");
  dock.style.setProperty("--dock-round",config.roundness);
  draw();wake();
 }
 function onMove(event){if(event.pointerType!=="mouse")return;pointer=event.clientX;wake()}
 function onLeave(){pointer=null;wake()}
 function onFocus(event){
  const index=items.indexOf(event.target);
  if(index>=0&&event.target.matches(":focus-visible")){focused=index;wake()}
 }
 function onBlur(){focused=-1;wake()}
 function onKey(event){
  const index=items.indexOf(event.target);if(index<0)return;
  let next;
  if(event.key==="ArrowLeft")next=(index-1+items.length)%items.length;
  else if(event.key==="ArrowRight")next=(index+1)%items.length;
  else if(event.key==="Home")next=0;
  else if(event.key==="End")next=items.length-1;
  if(next===undefined)return;
  event.preventDefault();items[next].focus();
 }
 function onClick(event){
  const button=event.target.closest("[data-dock-id]");if(!button)return;
  dockSelected=button.dataset.dockId;
  items.forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
  document.getElementById("dock-status").textContent="Vybráno: "+dockItems.find(([id])=>id===dockSelected)[1]+". Demo nemění skutečnou navigaci aplikace.";
 }
 function onReduced(){
  states.forEach(state=>{state.size=config.base*fit;state.velocity=0});draw();wake();
 }
 function onRoute(){queueMicrotask(()=>{if(!dock.isConnected)cleanup()})}
 function cleanup(){
  if(!alive)return;alive=false;cancelAnimationFrame(frame);observer.disconnect();
  dock.removeEventListener("pointermove",onMove);dock.removeEventListener("pointerleave",onLeave);
  dock.removeEventListener("focusin",onFocus);dock.removeEventListener("focusout",onBlur);
  dock.removeEventListener("keydown",onKey);dock.removeEventListener("click",onClick);
  reduced.removeEventListener("change",onReduced);window.removeEventListener("hashchange",onRoute);
 }
 const observer=new ResizeObserver(measure);observer.observe(stage);
 dock.addEventListener("pointermove",onMove);dock.addEventListener("pointerleave",onLeave);
 dock.addEventListener("focusin",onFocus);dock.addEventListener("focusout",onBlur);
 dock.addEventListener("keydown",onKey);dock.addEventListener("click",onClick);
 reduced.addEventListener("change",onReduced);window.addEventListener("hashchange",onRoute);
 measure();return cleanup;
}
