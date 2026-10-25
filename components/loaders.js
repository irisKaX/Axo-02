/* Loaders V1 · reusable renderer, CSS-only motion */
function loaderMarkup(type,size="m",tone="violet"){
 const count=type==="dots"?8:type==="blades"?12:0;
 const pieces=Array.from({length:count},(_,i)=>'<span class="axo-loader-'+(type==="dots"?"dot":"blade")+'" style="--'+(type==="dots"?"dot":"blade")+'-index:'+i+'"></span>').join("");
 return '<span class="axo-loader'+(type==="ring"?" axo-loader-ring":"")+'" data-size="'+size+'" data-tone="'+tone+'" aria-hidden="true">'+pieces+'</span>';
}
const loaderSelections={type:"dots",size:"m",tone:"violet"};
function loaderSelect(key,label,options,selected){
 const chosen=options.find(([value])=>value===selected);
 const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
 return '<div class="axo-loader-control"><span class="axo-loader-control-label" id="axo-loader-label-'+key+'">'+label+'</span><span class="form-select-wrap"><button type="button" class="form-select" data-loader-select="'+key+'" aria-labelledby="axo-loader-label-'+key+' axo-loader-value-'+key+'" aria-haspopup="listbox" aria-expanded="false" aria-controls="axo-loader-list-'+key+'"><span id="axo-loader-value-'+key+'">'+chosen[1]+'</span><span class="form-select-chevron">'+arrow+'</span></button><div class="form-select-menu" id="axo-loader-list-'+key+'" role="listbox" aria-labelledby="axo-loader-label-'+key+'" hidden>'+options.map(([value,text])=>'<button type="button" class="form-select-option" role="option" data-loader-option="'+key+'" data-value="'+value+'" aria-selected="'+(value===selected)+'">'+text+'</button>').join('')+'</div></span></div>';
}
function closeLoaderSelect(focusKey){
 document.querySelectorAll(".axo-loader-controls [data-loader-select]").forEach(button=>{button.setAttribute("aria-expanded","false");const menu=document.getElementById(button.getAttribute("aria-controls"));if(menu)menu.hidden=true});
 if(focusKey)document.querySelector('[data-loader-select="'+focusKey+'"]')?.focus();
}
function updateLoaderPlayground(){
 const {type,size,tone}=loaderSelections;
 const target=document.getElementById("axo-loader-playground");if(target)target.innerHTML=loaderMarkup(type,size,tone);
}
function renderLoaders(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const designs=[["dots","01 · Dot Spinner","Osm postupně pulzujících teček, podle dodané reference."],["blades","02 · Blade Spinner","Dvanáct jemných paprsků s postupným zeslabováním."],["ring","03 · Gradient Ring","Kruhový gradientní spinner s klidnější rotací."]];
 host.innerHTML='<div class="axo-loader-gallery"><div class="foundation-note">Loaders V1 · tři varianty podle dodaných referencí, sjednocené s Foundations. Animace jsou pouze vizuální; běžící nástroj musí svůj stav oznámit také textem.</div>'+
 designs.map(([type,title,desc])=>'<section class="axo-loader-card"><div><h2>'+title+'</h2><p>'+desc+'</p></div><div class="axo-loader-preview">'+["s","m","l"].map(size=>'<div class="axo-loader-sample">'+loaderMarkup(type,size)+'<span>'+size.toUpperCase()+'</span></div>').join("")+'</div></section>').join("")+
 '<section class="axo-loader-card"><div><h2>04 · Playground</h2><p>Vyber typ, velikost a barevnou variantu. Nastavení platí jen pro tuto ukázku.</p></div><div class="axo-loader-controls">'+
 loaderSelect("type","Typ",[["dots","Dot Spinner"],["blades","Blade Spinner"],["ring","Gradient Ring"]],"dots")+
 loaderSelect("size","Velikost",[["s","S"],["m","M"],["l","L"]],"m")+
 loaderSelect("tone","Barva",[["violet","Primary"],["neutral","Neutral"]],"violet")+
 '</div><div class="axo-loader-preview" id="axo-loader-playground">'+loaderMarkup("dots")+'</div><span class="axo-loader-note" role="status">Načítání · demonstrační stav</span></section></div>';

}
document.addEventListener("click",e=>{
 const trigger=e.target.closest("[data-loader-select]");
 if(trigger){
  const key=trigger.dataset.loaderSelect,opening=trigger.getAttribute("aria-expanded")!=="true";
  closeLoaderSelect();
  if(opening){const menu=document.getElementById("axo-loader-list-"+key);menu.hidden=false;trigger.setAttribute("aria-expanded","true");menu.querySelector('[aria-selected="true"]')?.focus()}
  return;
 }
 const option=e.target.closest("[data-loader-option]");
 if(option){
  const key=option.dataset.loaderOption;
  loaderSelections[key]=option.dataset.value;
  document.getElementById("axo-loader-value-"+key).textContent=option.textContent;
  document.querySelectorAll('[data-loader-option="'+key+'"]').forEach(el=>el.setAttribute("aria-selected",String(el===option)));
  closeLoaderSelect(key);updateLoaderPlayground();return;
 }
 if(!e.target.closest(".axo-loader-controls"))closeLoaderSelect();
});
document.addEventListener("keydown",e=>{
 const trigger=e.target.closest("[data-loader-select]");
 if(trigger&&["ArrowDown","ArrowUp"].includes(e.key)){
  e.preventDefault();const key=trigger.dataset.loaderSelect;closeLoaderSelect();const menu=document.getElementById("axo-loader-list-"+key);menu.hidden=false;trigger.setAttribute("aria-expanded","true");const options=[...menu.querySelectorAll("[data-loader-option]")];(e.key==="ArrowUp"?options[options.length-1]:menu.querySelector('[aria-selected="true"]'))?.focus();return;
 }
 const option=e.target.closest("[data-loader-option]");
 if(!option)return;const key=option.dataset.loaderOption,menu=document.getElementById("axo-loader-list-"+key),options=[...menu.querySelectorAll("[data-loader-option]")],i=options.indexOf(option);
 if(e.key==="Escape"){e.preventDefault();closeLoaderSelect(key)}
 else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();options[(i+(e.key==="ArrowDown"?1:-1)+options.length)%options.length].focus()}
 else if(e.key==="Home"||e.key==="End"){e.preventDefault();options[e.key==="Home"?0:options.length-1].focus()}
 else if(e.key==="Enter"||e.key===" "){e.preventDefault();option.click()}
 else if(e.key==="Tab")closeLoaderSelect();
});
