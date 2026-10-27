/* Composition Lab · approved composition, Widget 6 Find Phrase design-only mockup. */
function renderCompositionLab(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
 const tiles=[["office","Axolotl Office"],...Array.from({length:6},(_,i)=>["w"+(i+1),"Widget "+(i+1)])];
 const findPhrase='<div class="composition-find"><div class="composition-find-heading"><span class="composition-find-eyebrow">FIND PHRASE</span><h3>Hledání na webu</h3><p>Najděte fráze a assety napříč webem.<br>Rychle zjistěte, na kterých stránkách se vyskytují.</p></div><div class="composition-find-form"><fieldset class="composition-find-modes"><legend>Režim vyhledávání</legend><label><input type="radio" name="composition-find-mode" value="asset" checked><span>Asset</span></label><label><input type="radio" name="composition-find-mode" value="phrase"><span>Fráze</span></label></fieldset><div class="composition-find-search-row"><div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">'+inputIcon("search")+'</span><input id="composition-find-query" type="search" aria-label="Hledat frázi nebo asset" placeholder="Hledat frázi nebo asset…" autocomplete="off" spellcheck="false"></div></div><button class="composition-find-ready" type="button" data-ready="true" aria-label="Web připraven (demonstrační stav). Kliknutím přepnout" title="Web připraveno · demo"><span class="composition-find-dot" aria-hidden="true"></span></button></div></div></div>';
 const qrWidget = `<div class="composition-qr" data-qr-stage="paste">
 <div class="composition-qr-heading"><span class="composition-qr-eyebrow">QR GENERÁTOR</span><h3>Generování QR kódu</h3><p>Vytvořte QR kód z URL adresy, upravte jeho vzhled a stáhněte si ho jako obrázek.</p></div>
 <div class="composition-qr-controls">
 <div class="composition-qr-entry"><label class="composition-qr-url" for="composition-qr-input"><input id="composition-qr-input" type="url" inputmode="url" aria-label="URL pro QR kód" placeholder="https://www.example.com/test"></label><button class="composition-qr-action" type="button" data-qr-action="generate" disabled aria-label="Generovat QR kód"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>
 <div class="composition-qr-result" hidden><div class="composition-qr-pattern" aria-label="Dekorativní náhled QR kódu, není skenovatelný"></div><div class="composition-qr-result-actions"><span>QR připraven · demo</span>${renderButton({label:"Stáhnout PNG",variant:"secondary",format:"icon-only",icon:actionIcon("download"),motion:"download",tooltip:"Stáhnout PNG"})}<button class="composition-qr-reset" type="button" data-qr-action="reset">Nová URL</button></div></div>
 </div></div>`;
 host.innerHTML='<div class="composition-lab"><div class="composition-lab-screen"><div class="composition-lab-header"><div id="header-nav-catalog"></div></div><div class="composition-lab-grid">'+tiles.map(([id,label])=>'<article class="composition-lab-tile '+id+'">'+(id==="w6"?findPhrase:id==="w2"?qrWidget:icon+'<h3>'+label+'</h3>')+'</article>').join("")+'</div></div></div>';
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
 const qrRoot=host.querySelector(".composition-qr");
 const qrInput=qrRoot.querySelector("#composition-qr-input");
 const qrGenerate=qrRoot.querySelector('[data-qr-action="generate"]');
 const qrResult=qrRoot.querySelector(".composition-qr-result");
 function validQrUrl(){try{const url=new URL(qrInput.value.trim());return (url.protocol==="https:"||url.protocol==="http:")&&Boolean(url.hostname)}catch{return false}}
 qrInput.addEventListener("input",()=>{
  const filled=Boolean(qrInput.value.trim());
  qrGenerate.disabled=!validQrUrl();
  qrRoot.dataset.qrStage=filled?"generate":"paste";
 });
 qrGenerate.addEventListener("click",()=>{
  if(!validQrUrl())return;
  qrRoot.dataset.qrStage="download";
  qrRoot.querySelector(".composition-qr-entry").hidden=true;
  qrResult.hidden=false;
  qrRoot.querySelector(".composition-qr-pattern").innerHTML=Array.from({length:81},(_,i)=>'<i class="'+((i*17+i*i*3)%11<5?"is-dark":"")+'"></i>').join("");
 });
 qrRoot.querySelector('[data-qr-action="reset"]').addEventListener("click",()=>{
  qrRoot.dataset.qrStage="paste";
  qrResult.hidden=true;
  qrRoot.querySelector(".composition-qr-entry").hidden=false;
  qrInput.value="";
  qrGenerate.disabled=true;
  qrInput.focus();
 });

}
