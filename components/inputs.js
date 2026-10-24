/* Axo 02 · Inputs V1, local demo only; no browser tab permissions */
const inputDemoTabs=[{title:"Axo 02 · Design Catalog",url:"https://iriskax.github.io/Axo-02/"},{title:"O2 · Úvodní stránka",url:"https://www.o2.cz/"},{title:"Ukázková stránka",url:"https://example.com/"}];
const inputSvg={
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18"/>',
copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
tabs:'<rect x="3" y="5" width="15" height="14" rx="2"/><path d="M7 2h12a2 2 0 0 1 2 2v12"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>'
};
function inputIcon(id){return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+inputSvg[id]+'</svg>'}
const searchHints=["Najít frázi na webu…","Vyhledat obrázek podle názvu…","Najít asset podle ID…","Zkontrolovat výskyt textu…"];
let hintTimer=null,hintIndex=0,hintPosition=0,hintDeleting=false;
function stopInputHints(){if(hintTimer!==null)clearTimeout(hintTimer);hintTimer=null}
function startInputHints(){
 stopInputHints();
 const input=document.getElementById("axo-search-input");
 if(!input||input.value||document.activeElement===input)return;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches){input.placeholder=searchHints[0];return}
 function tick(){
  if(!input.isConnected||input.value||document.activeElement===input){stopInputHints();return}
  const phrase=searchHints[hintIndex];
  hintPosition+=hintDeleting?-1:1;
  input.placeholder=phrase.slice(0,hintPosition);
  let delay=hintDeleting?45:85;
  if(hintPosition>=phrase.length&&!hintDeleting){hintDeleting=true;delay=1650}
  if(hintPosition<=0&&hintDeleting){hintDeleting=false;hintIndex=(hintIndex+1)%searchHints.length;delay=350}
  hintTimer=setTimeout(tick,delay);
 }
 tick();
}
function renderInputs(){
const root=document.getElementById("sectionContent");if(!root)return;
root.innerHTML='<div class="input-gallery"><div class="foundation-note">Dvě první varianty Inputů. URL výběr karet je pouze lokální demo; skutečné karty bude možné získat až přes browser extension.</div>'+
'<section class="input-card"><div><h2>01 · URL Input</h2><p>Zobrazení i ruční zadání URL, kopírování a výběr z demonstračních karet.</p></div><label class="input-label" for="axo-url-input">URL adresa</label>'+
'<div class="input-shell"><span class="input-icon">'+inputIcon("globe")+'</span><input id="axo-url-input" type="url" inputmode="url" spellcheck="false" value="https://iriskax.github.io/Axo-02/" placeholder="https://example.com/" aria-describedby="url-feedback">'+
'<div class="input-action-group"><span class="input-tooltip-wrap"><button class="input-action" id="axo-copy-url" type="button" aria-label="Kopírovat URL" aria-describedby="url-copy-tooltip">'+inputIcon("copy")+'</button><span class="input-tooltip" id="url-copy-tooltip" role="tooltip">Kopírovat URL</span></span><span class="input-action-divider" aria-hidden="true"></span>'+
'<div class="input-select-wrap"><span class="input-tooltip-wrap"><button class="input-action" id="axo-tab-trigger" type="button" aria-label="Vybrat kartu prohlížeče" aria-describedby="url-tabs-tooltip" aria-expanded="false" aria-controls="axo-tab-menu" aria-haspopup="listbox">'+inputIcon("tabs")+'</button><span class="input-tooltip" id="url-tabs-tooltip" role="tooltip">Vybrat kartu prohlížeče</span></span>'+
'<div class="input-tab-menu" id="axo-tab-menu" role="listbox" aria-label="Demonstrační karty" hidden><div class="input-tab-heading">Ukázkové karty · nejsou načtené z prohlížeče</div>'+
inputDemoTabs.map((tab,i)=>'<button class="input-tab-option" role="option" type="button" data-demo-tab="'+i+'" aria-selected="'+(i===0)+'">'+tab.title+'</button>').join('')+'</div></div></div></div>'+
'<div class="input-message" id="url-feedback" aria-live="polite">Adresu můžeš upravit ručně. Výběr karet používá vzorové údaje.</div></section>'+
'<section class="input-card"><div><h2>02 · Search Input · Animated Border</h2><p>Klasický textový input s ikonou lupy a nepřetržitě animovaným fialovo-růžovým borderem podle Primary 03.</p></div>'+
'<label class="input-label" for="axo-search-input">Vyhledávání</label><div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">'+inputIcon("search")+'</span><input type="search" id="axo-search-input" placeholder="Najít frázi na webu…" aria-label="Vyhledat frázi nebo asset na webu" autocomplete="off"></div></div><div class="input-message">Designová ukázka, zatím bez vyhledávacího indexu.</div></section></div>';
startInputHints();
}
function closeAxoTabs(focus=false){const trigger=document.getElementById("axo-tab-trigger"),menu=document.getElementById("axo-tab-menu");if(!trigger||!menu)return;menu.hidden=true;trigger.setAttribute("aria-expanded","false");if(focus)trigger.focus()}
document.addEventListener("click",async e=>{
const trigger=e.target.closest("#axo-tab-trigger");
if(trigger){const menu=document.getElementById("axo-tab-menu");const opening=menu.hidden;menu.hidden=!opening;trigger.setAttribute("aria-expanded",String(opening));if(opening)menu.querySelector('[role="option"]').focus();return}
const option=e.target.closest("[data-demo-tab]");
if(option){const i=Number(option.dataset.demoTab),inp=document.getElementById("axo-url-input");inp.value=inputDemoTabs[i].url;document.getElementById("url-feedback").textContent="Vybrána ukázková karta: "+inputDemoTabs[i].title;closeAxoTabs(true);return}
if(e.target.closest("#axo-copy-url")){const value=document.getElementById("axo-url-input").value;const msg=document.getElementById("url-feedback");try{await navigator.clipboard.writeText(value);msg.textContent="URL zkopírována."}catch(err){msg.textContent="Kopírování není dostupné. Označ URL a zkopíruj ji ručně."}return}
if(!e.target.closest(".input-select-wrap"))closeAxoTabs();
});
document.addEventListener("keydown",e=>{const m=document.getElementById("axo-tab-menu");if(!m||m.hidden)return;if(e.key==="Escape"){e.preventDefault();closeAxoTabs(true);return}const option=e.target.closest("[data-demo-tab]");if(!option)return;const opts=[...m.querySelectorAll("[data-demo-tab]")],index=opts.indexOf(option);if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();opts[(index+(e.key==="ArrowDown"?1:-1)+opts.length)%opts.length].focus()}else if(e.key==="Enter"||e.key===" "){e.preventDefault();option.click()}else if(e.key==="Tab"){closeAxoTabs()}});

document.addEventListener("focusin",event=>{if(event.target.id==="axo-search-input"){stopInputHints();if(!event.target.value)event.target.placeholder="Hledat frázi nebo asset…"}});
document.addEventListener("focusout",event=>{if(event.target.id==="axo-search-input"&&!event.target.value){hintPosition=0;hintDeleting=false;startInputHints()}});
document.addEventListener("input",event=>{if(event.target.id==="axo-search-input"&&event.target.value)stopInputHints()});
