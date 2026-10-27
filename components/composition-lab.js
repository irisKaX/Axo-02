/* Composition Lab · approved composition, Widget 6 Find Phrase design-only mockup. */
function renderCompositionLab(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
 const tiles=[["office","Axolotl Office"],...Array.from({length:6},(_,i)=>["w"+(i+1),"Widget "+(i+1)])];
 const findPhrase='<div class="composition-find"><div class="composition-find-heading"><span class="composition-find-eyebrow">FIND PHRASE</span><h3>Hledání na webu</h3><p>Najděte fráze a assety napříč webem.<br>Rychle zjistěte, na kterých stránkách se vyskytují.</p></div><div class="composition-find-form"><fieldset class="composition-find-modes"><legend>Režim vyhledávání</legend><label><input type="radio" name="composition-find-mode" value="asset" checked><span>Asset</span></label><label><input type="radio" name="composition-find-mode" value="phrase"><span>Fráze</span></label></fieldset><div class="composition-find-search-row"><div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">'+inputIcon("search")+'</span><input id="composition-find-query" type="search" aria-label="Hledat frázi nebo asset" placeholder="Hledat frázi nebo asset…" autocomplete="off" spellcheck="false"></div></div><button class="composition-find-ready" type="button" data-ready="true" aria-label="Web připraven (demonstrační stav). Kliknutím přepnout" title="Web připraveno · demo"><span class="composition-find-dot" aria-hidden="true"></span></button></div></div></div>';
 const qrWidget = `<div class="composition-qr" data-qr-stage="paste">
 <div class="composition-qr-heading"><span class="composition-qr-eyebrow">QR GENERÁTOR</span><h3>Generování QR kódu</h3><p>Vytvořte QR kód z URL adresy, upravte jeho vzhled a stáhněte si ho jako obrázek.</p></div>
 <div class="composition-qr-controls">
 <div class="composition-qr-entry"><label class="composition-qr-url" for="composition-qr-input"><input id="composition-qr-input" type="url" inputmode="url" aria-label="URL pro QR kód" placeholder="https://www.example.com/test"></label>${renderButton({label:"Generovat",variant:"primary",format:"text",state:"disabled"})}</div>
 <div class="composition-qr-result" hidden><div class="composition-qr-pattern" role="img" aria-label="QR kód vytvořený z vložené URL"></div><div class="composition-qr-result-actions">${renderButton({label:"Stáhnout PNG",variant:"secondary",format:"icon-only",icon:actionIcon("download"),motion:"download",tooltip:"Stáhnout PNG"})}${renderButton({label:"Nová URL",variant:"ghost",format:"icon-only",icon:actionIcon("plus"),motion:"plus",tooltip:"Nová URL"})}</div></div>
 </div></div>`
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
 const qrEntry=qrRoot.querySelector(".composition-qr-entry");
 const qrGenerate=qrEntry.querySelector(".axo-btn");
 const qrResult=qrRoot.querySelector(".composition-qr-result");
 const qrDownload=qrResult.querySelector(".axo-btn--secondary");
 const qrReset=qrResult.querySelector(".axo-btn--ghost");
 let currentQr=null;
 function validQrUrl(){try{const u=new URL(qrInput.value.trim());return (u.protocol==="https:"||u.protocol==="http:")&&Boolean(u.hostname)}catch{return false}}
 qrInput.addEventListener("input",()=>{
  qrGenerate.disabled=!validQrUrl();
  qrRoot.dataset.qrStage=qrGenerate.disabled?"paste":"generate";
 });
 qrGenerate.addEventListener("click",()=>{
  if(!validQrUrl())return;
  try{
   currentQr=qrcode(0,"M");
   currentQr.addData(qrInput.value.trim());
   currentQr.make();
   const count=currentQr.getModuleCount(),margin=4,size=count+margin*2;
   let d="";
   for(let row=0;row<count;row++)for(let col=0;col<count;col++)if(currentQr.isDark(row,col))d+="M"+(col+margin)+" "+(row+margin)+"h1v1h-1z";
   qrRoot.querySelector(".composition-qr-pattern").innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" shape-rendering="crispEdges" aria-hidden="true"><rect width="'+size+'" height="'+size+'" fill="#fff"/><path fill="#161622" d="'+d+'"/></svg>';
   qrRoot.dataset.qrStage="download";
   qrEntry.hidden=true;
   qrResult.hidden=false;
  }catch(error){currentQr=null;qrInput.setCustomValidity("QR kód nelze vytvořit, zkraťte URL.");qrInput.reportValidity();qrInput.setCustomValidity("")}
 });
 qrDownload.addEventListener("click",()=>{
  if(!currentQr)return;
  const count=currentQr.getModuleCount(),margin=4,scale=12,size=(count+margin*2)*scale;
  const canvas=document.createElement("canvas");canvas.width=size;canvas.height=size;
  const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,size,size);ctx.fillStyle="#161622";
  for(let row=0;row<count;row++)for(let col=0;col<count;col++)if(currentQr.isDark(row,col))ctx.fillRect((col+margin)*scale,(row+margin)*scale,scale,scale);
  canvas.toBlob(blob=>{
   if(!blob)return;
   const url=URL.createObjectURL(blob),a=document.createElement("a");
   a.href=url;a.download="axo-qr.png";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  },"image/png");
 });
 qrReset.addEventListener("click",()=>{
  currentQr=null;qrRoot.dataset.qrStage="paste";qrResult.hidden=true;qrEntry.hidden=false;
  qrInput.value="";qrGenerate.disabled=true;qrInput.focus();
 });

}
