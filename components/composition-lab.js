/* Composition Lab · approved composition, Widget 6 Find Phrase design-only mockup. */
function renderCompositionLab(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
 const tiles=[["office","Axolotl Office"],...Array.from({length:6},(_,i)=>["w"+(i+1),"Widget "+(i+1)])];
 const findPhrase='<div class="composition-find"><div class="composition-find-heading"><span class="composition-find-eyebrow">FIND PHRASE</span><h3>Hledání na webu</h3><p>Najděte fráze a assety napříč webem.<br>Rychle zjistěte, na kterých stránkách se vyskytují.</p></div><div class="composition-find-form"><fieldset class="composition-find-modes"><legend>Režim vyhledávání</legend><label><input type="radio" name="composition-find-mode" value="asset" checked><span>Asset</span></label><label><input type="radio" name="composition-find-mode" value="phrase"><span>Fráze</span></label></fieldset><div class="composition-find-search-row"><div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">'+inputIcon("search")+'</span><input id="composition-find-query" type="search" aria-label="Hledat frázi nebo asset" placeholder="Hledat frázi nebo asset…" autocomplete="off" spellcheck="false"></div></div><button class="composition-find-ready" type="button" data-ready="true" aria-label="Web připraven (demonstrační stav). Kliknutím přepnout" title="Web připraveno · demo"><span class="composition-find-dot" aria-hidden="true"></span></button></div></div></div>';
 host.innerHTML='<div class="composition-lab"><div class="composition-lab-screen"><div class="composition-lab-header"><div id="header-nav-catalog"></div></div><div class="composition-lab-grid">'+tiles.map(([id,label])=>'<article class="composition-lab-tile '+id+'">'+(id==="w6"?findPhrase:icon+'<h3>'+label+'</h3>')+'</article>').join("")+'</div></div></div>';
 renderHeaderNav(host.querySelector("#header-nav-catalog"),true);
 const query=host.querySelector("#composition-find-query");
 host.querySelectorAll('input[name="composition-find-mode"]').forEach(radio=>radio.addEventListener("change",()=>{
  if(radio.checked)query.placeholder=radio.value==="asset"?"Hledat asset…":"Hledat frázi…";
 }));
 const ready=host.querySelector(".composition-find-ready");
 ready.addEventListener("click",()=>{
  const next=ready.dataset.ready!=="true";
  ready.dataset.ready=String(next);
  ready.setAttribute("aria-label",(next?"Web připraven":"Web není připraven")+", demonstrační stav. Kliknutím přepnout");
  ready.title=(next?"Web připraven":"Web není připraven")+" · demo";
 });
}
