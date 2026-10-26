/* Composition Lab · approved composition, Widget 6 Find Phrase design-only mockup. */
function renderCompositionLab(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
 const tiles=[["office","Axolotl Office"],...Array.from({length:6},(_,i)=>["w"+(i+1),"Widget "+(i+1)])];
 const findPhrase='<div class="composition-find"><div class="composition-find-top"><h3>Find Phrase</h3><button class="composition-find-ready" type="button" data-ready="true" aria-label="Stav webu: připraveno, ukázkový stav. Kliknutím přepnout" title="Demo: změnit stav webu"><span class="composition-find-dot" aria-hidden="true"></span><span class="composition-find-ready-label">Web ready</span></button></div><div class="composition-find-form"><fieldset class="composition-find-modes"><legend>Režim vyhledávání</legend><label><input type="radio" name="composition-find-mode" value="phrase" checked><span>Fráze</span></label><label><input type="radio" name="composition-find-mode" value="asset"><span>Asset</span></label></fieldset><div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">'+inputIcon("search")+'</span><input id="composition-find-query" type="search" placeholder="Zadejte hledanou frázi…" autocomplete="off" spellcheck="false"></div></div></div></div>';
 host.innerHTML='<div class="composition-lab"><div class="composition-lab-screen"><div class="composition-lab-header"><div id="header-nav-catalog"></div></div><div class="composition-lab-grid">'+tiles.map(([id,label])=>'<article class="composition-lab-tile '+id+'">'+(id==="w6"?findPhrase:icon+'<h3>'+label+'</h3>')+'</article>').join("")+'</div></div></div>';
 renderHeaderNav(host.querySelector("#header-nav-catalog"),true);
 const query=host.querySelector("#composition-find-query");
 host.querySelectorAll('input[name="composition-find-mode"]').forEach(radio=>radio.addEventListener("change",()=>{
  if(radio.checked)query.placeholder=radio.value==="asset"?"Zadejte asset ID…":"Zadejte hledanou frázi…";
 }));
 const ready=host.querySelector(".composition-find-ready");
 ready.addEventListener("click",()=>{
  const next=ready.dataset.ready!=="true";
  ready.dataset.ready=String(next);
  ready.querySelector(".composition-find-ready-label").textContent=next?"Web ready":"Web unavailable";
  ready.setAttribute("aria-label","Stav webu: "+(next?"připraveno":"nedostupné")+", ukázkový stav. Kliknutím přepnout");
 });
}
