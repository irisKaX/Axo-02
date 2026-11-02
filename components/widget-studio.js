/* Widget Studio owns previews only. Widget Registry owns reusable compositions and lifecycle. */
const widgetStudioDrafts=new Map();
let widgetStudioSelection={widget:'metadata',size:'small',view:'single'};
let widgetStudioCleanup=()=>{};
function renderWidgetStudio(){
 widgetStudioCleanup();
 const host=document.getElementById('sectionContent'),registry=window.AxoWidgetRegistry;
 let {widget,size,view}=widgetStudioSelection,scenario='empty',interaction='default',instances=[];
 const lifetime=new AbortController(),events={signal:lifetime.signal};
 const button=(label,attrs,variant='secondary')=>renderButton({label,variant}).replace('<button','<button '+attrs);
 host.innerHTML=`<div class="widget-studio"><nav class="widget-studio-picker" aria-label="Knihovna widgetů">${registry.list().map(entry=>button(entry.name,`data-studio-widget="${entry.id}" aria-pressed="false"`)).join('')}</nav><div class="widget-studio-toolbar"><div class="widget-studio-sizes" role="group" aria-label="Velikost widgetu">${['small','large'].map(key=>button(key==='small'?'Small':'Large',`data-studio-size="${key}" aria-pressed="false"`)).join('')}</div><div class="widget-studio-views" role="group" aria-label="Zobrazení">${[['single','Samostatně'],['compare','Small + Large'],['library','Celá knihovna']].map(([key,label])=>button(label,`data-studio-view="${key}" aria-pressed="false"`,'ghost')).join('')}</div><span class="widget-studio-badge">20 variant · návrh ke schválení</span></div><div class="widget-studio-controls"><div class="widget-studio-states" role="group" aria-label="Stav obsahu"></div><div class="widget-studio-interactions" role="group" aria-label="Náhled interakce">${['default','hover','focus','pressed','disabled'].map(key=>button(key[0].toUpperCase()+key.slice(1),`data-studio-interaction="${key}" aria-pressed="false"`,'ghost')).join('')}</div></div><p class="widget-studio-note" id="studio-capability"></p><div class="widget-studio-stage" role="region" aria-label="Samostatné náhledy widgetů" tabindex="0"><div class="widget-studio-gallery"></div></div><p class="widget-studio-help">Pevné CSS rozměry, bez škálování. Na úzkém viewportu posouvejte náhled uvnitř pracovní plochy. Dark / Light ovládá přepínač katalogu. Prototypy používají pouze označená ukázková data.</p></div>`;
 const studio=host.querySelector('.widget-studio'),gallery=studio.querySelector('.widget-studio-gallery');
 function save(){instances.forEach(({instance,id,size})=>widgetStudioDrafts.set(id+':'+size,instance.getState()))}
 function dispose(){instances.forEach(({instance})=>instance.destroy());instances=[]}
 function applyInteraction(){
  for(const {mount} of instances){
   mount.querySelectorAll('button').forEach(b=>{if(interaction==='disabled'){if(!b.hasAttribute('data-interaction-disabled'))b.dataset.interactionDisabled=String(b.disabled);b.disabled=true}else if(b.hasAttribute('data-interaction-disabled')){b.disabled=b.dataset.interactionDisabled==='true';delete b.dataset.interactionDisabled;}b.classList.remove('demo-hover','demo-focus','demo-pressed');if(['hover','focus','pressed'].includes(interaction)&&!b.disabled)b.classList.add('demo-'+interaction)});
   mount.querySelectorAll('input').forEach(input=>{input.disabled=interaction==='disabled'});
   mount.querySelectorAll('.input-search-shell').forEach(shell=>shell.dataset.previewState=interaction);
  }
  if(interaction==='focus'&&view==='single')instances[0]?.mount.querySelector('input:not(:disabled)')?.focus({preventScroll:true});
  studio.querySelectorAll('[data-studio-interaction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.studioInteraction===interaction)));
 }
 function show(){
  dispose();gallery.replaceChildren();gallery.dataset.view=view;
  const tools=view==='library'?registry.list():[registry.get(widget)];
  tools.forEach(entry=>{
   const row=document.createElement('section');row.className='widget-studio-row';
   const heading=document.createElement('h2');heading.textContent=entry.name;row.append(heading);
   const pair=document.createElement('div');pair.className='widget-studio-pair';row.append(pair);
   (view==='single'?[size]:['small','large']).forEach(currentSize=>{
    const figure=document.createElement('figure');figure.className='widget-studio-figure';
    const caption=document.createElement('figcaption');caption.textContent=(currentSize==='small'?'Small · 320 × 280':'Large · 640 × 320')+' CSS px';
    const mount=document.createElement('div');mount.className='widget-studio-mount';figure.append(caption,mount);pair.append(figure);
    const initial=scenario==='live'?widgetStudioDrafts.get(entry.id+':'+currentSize):registry.fixture(entry.id,scenario);
    const instance=registry.create(entry.id,mount,{size:currentSize,state:initial});instances.push({instance,mount,id:entry.id,size:currentSize});
   });gallery.append(row);
  });
  applyInteraction();measure();
 }
 function measure(){instances.forEach(({mount,size})=>{const card=mount.firstElementChild,r=card.getBoundingClientRect();mount.dataset.geometry=r.width===(size==='small'?320:640)&&r.height===(size==='small'?280:320)?'stable':'changed';mount.dataset.overflow=String(card.scrollWidth>card.clientWidth+1||card.scrollHeight>card.clientHeight+1);mount.parentElement.querySelector('figcaption').textContent=(size==='small'?'Small · 320 × 280':'Large · 640 × 320')+' CSS px · '+(mount.dataset.geometry==='stable'&&mount.dataset.overflow==='false'?'obsah uvnitř':'Zkontrolovat rozměry / overflow')})}
 function refresh(){
  widgetStudioSelection={widget,size,view};
  for(const [attribute,value] of [['widget',widget],['size',size],['view',view]])studio.querySelectorAll('[data-studio-'+attribute+']').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset['studio'+attribute[0].toUpperCase()+attribute.slice(1)]===value)));
  studio.querySelector('.widget-studio-sizes').hidden=view!=='single';
  const stateLabels={live:'Rozepsané',empty:'Výchozí',filled:'Vyplněné',loading:'Zpracování · demo',result:'Výsledek',error:'Chyba'};
  const available=registry.get(view==='library'?'qr':widget).states;
  studio.querySelector('.widget-studio-states').innerHTML=['live',...available].map(key=>button(stateLabels[key],`data-studio-scenario="${key}" aria-pressed="${scenario===key}"`,'ghost')).join('');
  studio.querySelector('#studio-capability').textContent=view==='library'?'Celá knihovna: QR funguje lokálně. Zbývajících 9 nástrojů jsou nepřipojené interaktivní prototypy.':widget==='qr'?'Funkční lokální generování QR a export PNG. Směr B pro Small; finální vizuální schválení čeká.':'Interaktivní designový prototyp. Ukázková data; skutečný nástroj ani backend nejsou připojené.';
  show();
 }
 studio.addEventListener('click',event=>{
  const target=event.target.closest('button');if(!target)return;
  if(target.dataset.studioWidget){save();widget=target.dataset.studioWidget;scenario='live';interaction='default';refresh()}
  else if(target.dataset.studioSize){save();size=target.dataset.studioSize;scenario='live';interaction='default';refresh()}
  else if(target.dataset.studioView){save();view=target.dataset.studioView;scenario=view==='single'?'live':'result';interaction='default';refresh()}
  else if(target.dataset.studioScenario){save();scenario=target.dataset.studioScenario;refresh()}
  else if(target.dataset.studioInteraction){interaction=target.dataset.studioInteraction;applyInteraction()}
 },events);
 gallery.addEventListener('widget:change',()=>{save();measure()},events);
 const picker=studio.querySelector('.widget-studio-picker');
 picker.addEventListener('keydown',event=>{const buttons=[...picker.querySelectorAll('button')];let i=buttons.indexOf(document.activeElement);if(i<0)return;if(event.key==='ArrowRight')i=(i+1)%buttons.length;else if(event.key==='ArrowLeft')i=(i+buttons.length-1)%buttons.length;else if(event.key==='Home')i=0;else if(event.key==='End')i=buttons.length-1;else return;event.preventDefault();buttons[i].click();buttons[i].focus()},events);
 widgetStudioCleanup=()=>{save();dispose();lifetime.abort();widgetStudioCleanup=()=>{}};
 refresh();
}
