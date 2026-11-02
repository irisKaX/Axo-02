/* Catalog Widget System. No backend calls; QR reuses the existing local encoder/export controller. */
(()=>{
 const escape=escapeButtonText;
 const sampleUrl='https://www.example.com/pruvodce';
 const states=Object.freeze(['empty','filled','loading','result','error']);
 const definitions=[
  ['metadata','Metadata','metadata','Titulek a popis stránky','Zkontrolujte, jak stránka vystupuje ve vyhledávání.'],
  ['headings','Nadpisy','headings','Struktura obsahu','Projděte hierarchii H1 až H6 na stránce.'],
  ['find','Find Phrase','find-phrase','Hledání na webu','Najděte fráze a assety napříč stránkami.'],
  ['screenshot','Screenshot','screenshot','Náhled stránky','Připravte snímek pro zvolené zařízení.'],
  ['webp','Obrázky do WebP','image-converter','Menší soubory pro web','Připravte obrázky k úspornějšímu exportu.'],
  ['images','Obrázky z URL','web-images','Obrázky na stránce','Projděte obrazové soubory a jejich formáty.'],
  ['pdf','PDF Scout','pdf-scout','Dokumenty na webu','Najděte a uspořádejte odkazy na PDF.'],
  ['qr','QR Generator','qr','Odkaz do jednoho kódu','Vytvořte QR a stáhněte PNG přímo v prohlížeči.'],
  ['structured','Strukturovaná data','structured-data','Data pro vyhledávače','Projděte typy a vlastnosti strukturovaných dat.'],
  ['trends','Trendy','trends','Témata v pohybu','Porovnejte zájem o vybraná témata.']
 ];
 const button=(label,action,variant='secondary',extra={})=>renderButton({label,variant,...extra}).replace('<button','<button data-widget-action="'+action+'"');
 const input=(id,type,value,label,placeholder)=>type==='search'?`<div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">${inputIcon('search')}</span><input id="${id}" type="search" value="${escape(value)}" aria-label="${label}" placeholder="${placeholder}" autocomplete="off"></div></div>`:`<label class="input-shell"><span class="input-icon">${inputIcon('globe')}</span><input id="${id}" type="url" value="${escape(value)}" aria-label="${label}" placeholder="https://example.com" autocomplete="off"></label>`;
 const rows=items=>'<ul class="aw-rows">'+items.map(([a,b])=>`<li><span>${escape(a)}</span><strong>${escape(b)}</strong></li>`).join('')+'</ul>';
 function details(id,size){
  const large=size==='large';
  switch(id){
   case 'metadata':return `<div class="aw-serp"><span>example.com / pruvodce</span><h4>Průvodce digitálním světem</h4><p>Praktické návody, nástroje a inspirace pro váš web.</p></div>${large?rows([['Title','29 / 60 znaků'],['Description','54 / 160 znaků'],['Canonical','Vlastní URL'],['Robots','index, follow']]):'<p class="aw-summary">Title 29 znaků · Description 54 znaků</p>'}`;
   case 'headings':return `<div><div class="aw-metrics"><span><strong>1</strong> H1</span><span><strong>4</strong> H2</span><span><strong>8</strong> H3</span></div>${rows([['H1','Průvodce digitálním světem'],['H2','Nástroje pro váš web'],...(large?[['H3','Jak začít'],['H2','Praktické návody']]:[])])}</div>${large?'<div class="aw-detail"><h4>Hierarchie nadpisů</h4><p>Jedno hlavní téma, čtyři obsahové sekce.</p><p>Ukázkové upozornění: v jedné sekci chybí H2.</p></div>':''}`;
   case 'find':return `<div><p class="aw-summary">3 shody · 2 stránky</p>${rows([['/pruvodce','2 shody'],['/nastroje','1 shoda']])}</div>${large?'<div class="aw-detail"><h4>Kontext nálezu</h4><p>„Praktické <mark>návody</mark> a nástroje pro váš web.“</p><p>Text stránky · ukázka zvýraznění fráze.</p></div>':''}`;
   case 'screenshot':return `<div class="aw-capture" aria-label="Ukázkový náhled stránky"><div>example.com</div><strong>Průvodce pro váš web</strong><span>Nástroje a praktické návody</span><div class="aw-capture-columns"><span>Obsah</span><span>Nástroje</span></div></div>${large?rows([['Zařízení','Desktop'],['Rozlišení','1366 × 768'],['Formát','PNG'],['Rozsah','Viditelná oblast']]):''}`;
   case 'webp':return `<div>${rows([['cover.jpg','840 kB → 218 kB'],['detail.png','320 kB → 96 kB'],...(large?[['logo.png','64 kB → 22 kB']]:[])])}<p class="aw-summary">Ukázka úspory 73 % · kvalita 80 %</p></div>${large?'<div class="aw-detail"><h4>Připraveno k exportu</h4><p>Tři ukázkové soubory. Skutečná konverze není připojena.</p><label>Kvalita <input type="range" min="1" max="100" value="80" aria-label="Ukázková kvalita WebP"></label></div>':''}`;
   case 'images':return `<div><p class="aw-summary">12 obrázků · 3 formáty</p>${rows([['cover.webp','1440 × 960'],['detail.jpg','800 × 600'],...(large?[['logo.svg','Vektor'],['social.png','1200 × 630']]:[])])}</div>${large?'<div class="aw-detail"><h4>Přehled formátů</h4>'+rows([['WebP','8 souborů'],['JPEG','3 soubory'],['PNG','1 soubor']])+'</div>':''}`;
   case 'pdf':return `<div><p class="aw-summary">3 dokumenty · 2,4 MB</p>${rows([['Průvodce.pdf','1,2 MB'],['Ceník.pdf','840 kB'],...(large?[['Podmínky.pdf','360 kB']]:[])])}</div>${large?'<div class="aw-detail"><h4>Odkazy na dokumenty</h4><p>Ukázková data z /dokumenty. Dostupnost a obsah PDF se v tomto prototypu neověřují.</p></div>':''}`;
   case 'structured':return `<div>${rows([['WebSite','4 vlastnosti'],['Organization','6 vlastností'],...(large?[['BreadcrumbList','3 položky']]:[])])}<p class="aw-summary">Ukázka: doplňte vlastnost logo.</p></div>${large?'<pre class="aw-json" aria-label="Ukázkový JSON-LD">{\n  "@type": "Organization",\n  "name": "Example",\n  "url": "https://example.com"\n}</pre>':''}`;
   case 'trends':return `${large?'<div class="aw-chart"><span>Ukázkový zájem · posledních 7 dní</span><svg viewBox="0 0 260 96" role="img" aria-label="Ukázkový trend zájmu roste z 24 na 68"><path d="M4 82 L46 64 L88 70 L130 34 L172 46 L214 20 L256 8" fill="none" stroke="currentColor" stroke-width="3"/><path d="M4 94H256" fill="none" stroke="currentColor" opacity=".25"/></svg><span>26. října — 1. listopadu</span></div>':''}<div>${rows([['Design systémy','+24 %'],['Přístupnost webu','+18 %'],['WebP obrázky','+12 %']])}${!large?'<p class="aw-summary">Ukázkový zájem za posledních 7 dní</p>':''}</div>`;
   default:return '';
  }
 }
 function normalState(entry,patch={},previous={}){
  const state={scenario:'empty',query:'',mode:'asset',ready:true,quality:80,...previous,...patch};
  if(!(entry.states||states).includes(state.scenario))throw new RangeError('Unsupported widget state');
  state.query=String(state.query??'');state.mode=state.mode==='phrase'?'phrase':'asset';state.ready=state.ready!==false;
  return {scenario:state.scenario,query:state.query,mode:state.mode,ready:state.ready,quality:Math.max(1,Math.min(100,Number(state.quality)||80))};
 }
 function markup(entry,{instanceId,size,state}){
  const id=escape(instanceId),large=size==='large',result=state.scenario==='result';
  const header=`<header class="aw-heading"><div><span class="aw-category">${escape(entry.name)}</span><h3>${escape(entry.title)}</h3></div><span class="aw-kind">${entry.id==='qr'?'Lokálně':'Prototyp'}</span></header>`;
  let content;
  if(entry.id==='qr'){
   content=`<div class="aw-qr-entry">${header}<p class="aw-description">${entry.description}</p><div class="aw-form">${input(id+'-query','url',state.query,'URL pro QR kód')}${button('Generovat','generate','primary')}</div><p class="aw-summary">Bez odesílání URL · PNG ke stažení</p><p class="aw-feedback" role="status"></p></div><div class="aw-qr-result" hidden><div class="aw-qr-pattern" role="img" aria-label="QR kód z vložené URL"></div><div class="aw-qr-context"><span class="aw-category">${large?'QR připraven · lokálně':''}</span><h3 data-qr-host></h3><p data-qr-path></p></div><div class="aw-qr-actions">${button('Stáhnout PNG','download','secondary',{format:large?'icon-text':'icon-only',icon:actionIcon('download'),tooltip:'Stáhnout PNG'})}${button('Nová URL','reset','ghost',{format:large?'text':'icon-only',icon:actionIcon('plus'),tooltip:'Nová URL'})}</div></div>`;
  }else{
   const search=entry.id==='find'||entry.id==='trends',file=entry.id==='webp';
   const field=file&&result?'<p class="aw-summary">Ukázková fronta obrázků</p>':file?`<div class="aw-file">${button('Vybrat obrázky','files','secondary')}<input type="file" accept="image/*" multiple hidden aria-label="Vybrat obrázky pro WebP"></div>`:input(id+'-query',search?'search':'url',state.query,entry.id==='find'?'Hledat frázi nebo asset':entry.id==='trends'?'Hledat téma':'URL stránky',entry.id==='find'?'Hledat frázi nebo asset…':'Hledat téma…');
   const modes=entry.id==='find'?`<fieldset class="aw-modes"><legend>Režim hledání</legend>${['asset','phrase'].map(mode=>`<label><input type="radio" name="${id}-mode" value="${mode}"${state.mode===mode?' checked':''}>${mode==='asset'?'Asset':'Fráze'}</label>`).join('')}<button class="aw-ready" type="button" data-ready="${state.ready}" aria-label="Přepnout ukázkovou dostupnost webu">${state.ready?'Web připraven':'Web nedostupný'}</button></fieldset>`:'';
   content=`${header}<div class="aw-body"><div class="aw-entry">${!result?'<p class="aw-description">'+entry.description+'</p>':''}${modes}<div class="aw-form">${field}${button(result?'Nový náhled':'Ukázat výsledek',result?'reset':'demo',result?'ghost':'secondary')}</div><p class="aw-feedback" role="status">${state.scenario==='loading'?'Ukázkové zpracování…':state.scenario==='error'?'Ukázka chyby: zdroj není dostupný.':state.scenario==='filled'?'Vstup připraven pro ukázku.':''}</p></div>${result?'<div class="aw-result">'+details(entry.id,size)+'</div>':''}</div><footer class="aw-disclaimer">Ukázková data · nástroj není připojen</footer>`;
  }
  return `<article class="axo-widget" data-widget-id="${entry.id}" data-size="${size}" data-scenario="${state.scenario}" aria-busy="${state.scenario==='loading'}" aria-label="${escape(entry.name)} · ${large?'Large':'Small'}">${content}</article>`;
 }
 let serial=0;
 const entries=definitions.map(([id,name,toolId,title,description])=>{
  const entry={id,name,toolId,title,description,supportedSizes:Object.freeze(['small','large']),defaultSize:'small',states:id==='qr'?Object.freeze(['empty','filled','result','error']):states,capabilities:Object.freeze({execution:id==='qr'?'local':'prototype',backendConnected:false,multipleInstances:true,resizable:true,serializable:true,download:id==='qr',fileInput:id==='webp'}),
   render(options={}){const size=options.size||entry.defaultSize;if(!entry.supportedSizes.includes(size))throw new RangeError('Unsupported widget size');return markup(entry,{instanceId:options.instanceId||'widget-'+(++serial),size,state:normalState(entry,options.state)})},
   mount(host,options={}){return mount(entry,host,options)},
   getState(instance){return instance.getState()},setState(instance,state){return instance.setState(state)},destroy(instance){instance.destroy()}
  };return Object.freeze(entry);
 });
 function mount(entry,host,options){
  const size=options.size||entry.defaultSize;
  if(!entry.supportedSizes.includes(size))throw new RangeError('Unsupported widget size');
  const instanceId=options.instanceId||'widget-'+(++serial);
  let state=normalState(entry,options.state),lifetime,qr,find,disposed=false;
  if(entry.id==='qr'&&state.scenario==='result'&&!state.query)state.query=sampleUrl;
  function read(){if(qr){const s=qr.getState();state.query=s.query;state.scenario=s.stage==='download'?'result':s.query?(state.scenario==='error'?'error':'filled'):'empty'}else{if(find)Object.assign(state,find.getState());const quality=host.querySelector('[type=range]');if(quality)state.quality=Number(quality.value);const q=host.querySelector('[type=search],[type=url]');if(q)state.query=q.value;const checked=host.querySelector('[type=radio]:checked');if(checked)state.mode=checked.value}return {...state}}
  function notify(){host.dispatchEvent(new CustomEvent('widget:change',{bubbles:true,detail:{id:entry.id,size,state:read()}}))}
  function cleanup(){lifetime?.abort();qr?.destroy();find?.destroy();qr=null;find=null}
  function paint(){
   cleanup();lifetime=new AbortController();const events={signal:lifetime.signal};
   host.innerHTML=entry.render({size,instanceId,state});const root=host.firstElementChild;
   if(entry.id==='qr'){
    qr=mountQrWidget(root,{query:state.query,stage:state.scenario==='result'?'download':'paste'},{selectors:{'.composition-qr-entry':'.aw-qr-entry','.composition-qr-result':'.aw-qr-result','.composition-qr-pattern':'.aw-qr-pattern'}});
    const sync=event=>{if(event?.type==='input')state.scenario='filled';const s=qr.getState();root.dataset.scenario=read().scenario;const feedback=root.querySelector('.aw-feedback');feedback.textContent=state.scenario==='error'?'Zadejte platnou HTTP(S) URL.':'';let url;try{url=new URL(s.query)}catch{}root.querySelector('[data-qr-host]').textContent=url?.hostname||'';const path=root.querySelector('[data-qr-path]');path.textContent=url?url.pathname+url.search:'';path.title=s.query;notify()};
    root.addEventListener('input',sync,events);root.addEventListener('click',sync,events);root.addEventListener('keydown',sync,events);sync();
   }else{
    if(entry.id==='find')find=mountFindWidget(root,state,{readySelector:'.aw-ready'});
    const quality=root.querySelector('[type=range]');if(quality)quality.value=state.quality;
    root.addEventListener('input',event=>{if(['empty','filled'].includes(state.scenario)){read();state.scenario=state.query?'filled':'empty';root.dataset.scenario=state.scenario}if(event.target.type==='file'){root.querySelector('.aw-feedback').textContent=event.target.files.length+' vybraných souborů · konverze není připojena'}notify()},events);
    root.addEventListener('change',notify,events);
    root.addEventListener('click',event=>{
     const action=event.target.closest('[data-widget-action]')?.dataset.widgetAction;
     if(action==='files')root.querySelector('[type=file]').click();
     if(action==='demo'){read();state.scenario='result';paint();notify()}
     if(action==='reset'){state=normalState(entry);paint();host.querySelector('input')?.focus();notify()}
     if(event.target.closest('.aw-ready')){read();root.querySelector('.aw-ready').textContent=state.ready?'Web připraven':'Web nedostupný';notify()}
    },events);
   }
  }
  paint();return Object.freeze({id:entry.id,size,getState(){return disposed?{...state}:read()},setState(patch){if(disposed)throw new Error('Widget instance destroyed');state=normalState(entry,patch,read());if(state.scenario==='result'&&!state.query&&entry.id==='qr')state.query=sampleUrl;paint();return read()},destroy(){if(disposed)return;read();disposed=true;cleanup();host.replaceChildren()}});
 }
 window.AxoWidgetRegistry=Object.freeze({version:1,list:()=>entries.slice(),get(id){const entry=entries.find(item=>item.id===id);if(!entry)throw new RangeError('Unknown widget: '+id);return entry},create(id,host,options={}){return this.get(id).mount(host,options)},fixture(id,scenario){const entry=this.get(id);if(!entry.states.includes(scenario))throw new RangeError('Unknown state');return {scenario,query:scenario==='empty'?'':id==='qr'&&scenario==='error'?'není-url':id==='find'?'návody':id==='trends'?'Design systémy':sampleUrl,mode:scenario==='empty'?'asset':'phrase',ready:!(id==='find'&&scenario==='error')}}});
})();
