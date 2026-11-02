/* Presentation-only lab. QR encoding, validation, PNG export and reset remain owned by mountQrWidget. */
const qrExplorationVariants=[
 {id:'a',title:'A · Klidný střed',description:'QR jako hlavní bod. Cílová adresa nahoře, obě čitelné akce pod kódem.'},
 {id:'b',title:'B · Velký formát',description:'Největší QR na souvislé bílé ploše. Kontext a ovládání v oddělené dolní liště.'},
 {id:'c',title:'C · Kontext po ruce',description:'Kód a cílová adresa vedle sebe. Nová URL nahoře, stažení přes celou šířku dole.'}
];
const qrExplorationUrl='https://example.com/axo-02';
const qrxText=escapeButtonText;

async function loadQrCatalogContext(){
 const response=await fetch('../../index.html');if(!response.ok)throw new Error('Nelze načíst stávající Foundations katalogu.');
 const catalog=new DOMParser().parseFromString(await response.text(),'text/html');
 const originalStyle=catalog.head.querySelector('style');if(!originalStyle)throw new Error('Katalog neobsahuje kanonické Foundations.');
 const style=document.createElement('style');style.textContent=originalStyle.textContent;style.dataset.qrxSource='catalog';document.head.prepend(style);
 const font=catalog.head.querySelector('link[href*="fonts.googleapis.com/css"]');if(font){const link=document.createElement('link');link.rel='stylesheet';link.href=font.getAttribute('href');document.head.append(link)}
 const theme=catalog.querySelector('.theme-toggle');if(!theme)throw new Error('Katalogový theme přepínač není dostupný.');document.getElementById('qrx-theme').append(document.importNode(theme,true));
 const button=document.querySelector('#qrx-theme button');
 function applyTheme(theme){document.documentElement.dataset.theme=theme;button.setAttribute('aria-pressed',String(theme==='light'));button.querySelector('#lightIcon').classList.toggle('on',theme==='light');button.querySelector('#darkIcon').classList.toggle('on',theme==='dark');try{localStorage.setItem('axo02-theme',theme)}catch{}}
 let saved;try{saved=localStorage.getItem('axo02-theme')}catch{}applyTheme(saved==='light'?'light':'dark');
 button.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
}
function buildQrExploration(variant){
 const study=document.createElement('section');study.className='qrx-study';study.dataset.qrxStudy=variant.id;
 study.innerHTML='<header class="qrx-study-heading"><h2>'+qrxText(variant.title)+'</h2><p>'+qrxText(variant.description)+'</p></header><div class="qrx-state-controls" role="group" aria-label="Stav varianty '+variant.id.toUpperCase()+'">'+[['empty','Výchozí'],['filled','Vyplněno'],['result','Výsledek']].map(([state,label])=>renderButton({label,variant:state==='result'?'primary':'secondary'}).replace('<button','<button data-qrx-state="'+state+'" aria-pressed="'+(state==='result')+'"')).join('')+'</div><div class="qrx-mount"></div>';
 const mount=study.querySelector('.qrx-mount');let controller;
 function render(state){
  const previousState=controller?.getState();const previous=previousState&&previousState.stage!=='paste'?previousState.query:qrExplorationUrl;mount.innerHTML=dashboardWidgetMarkup('qr',{id:'exploration-'+variant.id,size:'small'});
  const root=mount.firstElementChild;root.classList.add('qrx-widget');root.dataset.qrxVariant=variant.id;
  const content=root.querySelector('.composition-qr-controls');content.classList.add('qrx-content');
  const entry=root.querySelector('.composition-qr-entry');entry.classList.add('qrx-entry');
  const heading=root.querySelector('.composition-qr-heading');heading.className='qrx-entry-heading';heading.querySelector('span').remove();heading.querySelector('p').textContent='Vložte URL a vytvořte QR kód ke stažení.';entry.prepend(heading);
  const input=root.querySelector('input');const urlShell=input.parentElement;urlShell.classList.add('input-shell');urlShell.insertAdjacentHTML('afterbegin','<span class="input-icon">'+inputIcon('globe')+'</span>');
  const label=document.createElement('div');label.className='qrx-entry-label';label.append(document.createTextNode('URL adresa'),urlShell);heading.after(label);
  const result=root.querySelector('.composition-qr-result');result.classList.add('qrx-result');result.setAttribute('aria-live','polite');
  const code=root.querySelector('.composition-qr-pattern');code.classList.add('qrx-code');
  const context=document.createElement('div');context.className='qrx-result-heading';const title=document.createElement('h3'),destination=document.createElement('p');destination.className='qrx-destination';context.append(title,destination);
  const actions=root.querySelector('.composition-qr-result-actions');actions.classList.add('qrx-actions');
  actions.innerHTML=renderButton({label:'Stáhnout PNG',variant:'secondary',format:variant.id==='b'?'icon-only':'icon-text',icon:actionIcon('download'),motion:'download',tooltip:variant.id==='b'?'Stáhnout PNG':''})+renderButton({label:'Nová URL',variant:'ghost',format:variant.id==='b'?'icon-only':'text',icon:variant.id==='b'?actionIcon('plus'):'',motion:'plus',tooltip:variant.id==='b'?'Nová URL':''});
  if(variant.id==='c'){
   const toolbar=document.createElement('div');toolbar.className='qrx-result-toolbar';toolbar.innerHTML='<h3>QR je připraven</h3>';toolbar.append(actions.querySelector('.axo-btn--ghost'));result.prepend(toolbar);result.append(context);
  }else result.prepend(context);
  const initial=state==='empty'?{query:''}:{query:previous||qrExplorationUrl,stage:state==='result'?'download':'generate'};
  controller=mountQrWidget(root,initial);
  function sync(event){
   const current=controller.getState();let url;try{url=new URL(current.query)}catch{}
   title.textContent=variant.id==='a'?'QR je připraven':(url?.hostname||'Cílová adresa');title.title=current.query;destination.textContent=variant.id==='a'?(url?url.hostname+url.pathname+url.search+url.hash:current.query):(url?url.pathname+url.search+url.hash:current.query);destination.title=current.query;
   code.setAttribute('aria-label','QR kód pro '+current.query);
   study.querySelectorAll('[data-qrx-state]').forEach(button=>{const selected=button.dataset.qrxState===(current.stage==='download'?'result':current.stage==='generate'?'filled':'empty');button.setAttribute('aria-pressed',String(selected));button.classList.toggle('axo-btn--primary',selected);button.classList.toggle('axo-btn--secondary',!selected)});
   if(current.stage==='download'&&event?.target?.closest('.composition-qr-entry'))result.querySelector('.axo-btn--secondary').focus({preventScroll:true});
  }
  root.addEventListener('input',sync);root.addEventListener('click',sync);root.addEventListener('keydown',event=>{if(event.key==='Enter')sync(event)});sync();
 }
 study.addEventListener('click',event=>{const button=event.target.closest('[data-qrx-state]');if(button)render(button.dataset.qrxState)});render('result');return study;
}
async function startQrExploration(){
 try{await loadQrCatalogContext();document.getElementById('qrx-comparison').append(...qrExplorationVariants.map(buildQrExploration));document.getElementById('qr-exploration').hidden=false}
 catch(error){const message=document.getElementById('qrx-error');message.textContent='QR Lab se nepodařilo načíst: '+error.message;message.hidden=false;console.error(error)}
}
startQrExploration();
