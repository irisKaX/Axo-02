/* Shared Dashboard widgets. Studio and Composition Lab use the same markup and controllers. */
function dashboardWidgetMarkup(type,{id="widget",size="dashboard"}={}){
 const prefix=escapeButtonText(id);
 let markup;
 if(type==="find")markup='<div class="composition-find"><div class="composition-find-heading"><span class="composition-find-eyebrow">FIND PHRASE</span><h3>Hledání na webu</h3><p>Najděte fráze a assety napříč webem.<br>Rychle zjistěte, na kterých stránkách se vyskytují.</p></div><div class="composition-find-form"><fieldset class="composition-find-modes"><legend>Režim vyhledávání</legend><label><input type="radio" name="'+prefix+'-find-mode" value="asset" checked><span>Asset</span></label><label><input type="radio" name="'+prefix+'-find-mode" value="phrase"><span>Fráze</span></label></fieldset><div class="composition-find-search-row"><div class="input-search-shell"><div class="input-search-inner"><span class="input-icon">'+inputIcon("search")+'</span><input id="'+prefix+'-find-query" type="search" aria-label="Hledat frázi nebo asset" placeholder="Hledat frázi nebo asset…" autocomplete="off" spellcheck="false"></div></div><button class="composition-find-ready" type="button" data-ready="true" aria-label="Web připraven (demonstrační stav). Kliknutím přepnout" title="Web připraveno · demo"><span class="composition-find-dot" aria-hidden="true"></span></button></div></div></div>';
 else if(type==="qr")markup=`<div class="composition-qr" data-qr-stage="paste">
 <div class="composition-qr-heading"><span class="composition-qr-eyebrow">QR GENERÁTOR</span><h3>Generování QR kódu</h3><p>Vytvořte QR kód z URL adresy, upravte jeho vzhled a stáhněte si ho jako obrázek.</p></div>
 <div class="composition-qr-controls">
 <div class="composition-qr-entry"><label class="composition-qr-url" for="${prefix}-qr-input"><input id="${prefix}-qr-input" type="url" inputmode="url" aria-label="URL pro QR kód" placeholder="https://www.example.com/test"></label>${renderButton({label:"Generovat",variant:"primary",format:"text",state:"disabled"})}</div>
 <div class="composition-qr-result" hidden><div class="composition-qr-pattern" role="img" aria-label="QR kód vytvořený z vložené URL"></div><div class="composition-qr-result-actions">${renderButton({label:"Stáhnout PNG",variant:"secondary",format:"icon-only",icon:actionIcon("download"),motion:"download",tooltip:"Stáhnout PNG"})}${renderButton({label:"Nová URL",variant:"ghost",format:"icon-only",icon:actionIcon("plus"),motion:"plus",tooltip:"Nová URL"})}</div></div>
 </div></div>`;
 else throw new RangeError("Unknown Dashboard widget");
 return markup.replace('class="composition-'+(type==="find"?"find":"qr")+'"','class="composition-'+(type==="find"?"find":"qr")+'" data-widget-size="'+escapeButtonText(size)+'"');
}
function mountFindWidget(root,initial={},options={}){
 const lifetime=new AbortController(),events={signal:lifetime.signal};
 const query=root.querySelector('input[type="search"]');
 root.querySelectorAll('input[type="radio"]').forEach(radio=>radio.addEventListener("change",()=>{
  if(radio.checked)query.placeholder=radio.value==="asset"?"Hledat asset…":"Hledat frázi…";
 },events));
 const ready=root.querySelector(options.readySelector||".composition-find-ready");
 function setReady(next){
  ready.dataset.ready=String(next);
  ready.setAttribute("aria-label",(next?"Web připraven":"Web není připraven")+", demonstrační stav. Kliknutím přepnout");
  ready.title=(next?"Web připraven":"Web není připraven")+" · demo";
 }
 ready.addEventListener("click",()=>setReady(ready.dataset.ready!=="true"),events);

 if(initial.mode){const radio=root.querySelector('input[value="'+(initial.mode==="phrase"?"phrase":"asset")+'"]');radio.checked=true;query.placeholder=initial.mode==="phrase"?"Hledat frázi…":"Hledat asset…"}
 if(initial.query!==undefined)query.value=initial.query;
 if(initial.ready===false)setReady(false);
 return {getState:()=>({mode:root.querySelector('input:checked').value,query:query.value,ready:ready.dataset.ready==="true"}),destroy(){lifetime.abort()}};
}
function mountQrWidget(root,initial={},options={}){
 const lifetime=new AbortController(),events={signal:lifetime.signal};
 const select=selector=>root.querySelector(options.selectors?.[selector]||selector);
 let disposed=false;
 const exports=new Set();
 const qrRoot=root;
 const qrInput=select('input[type="url"]');
 const qrEntry=select(".composition-qr-entry");
 const qrGenerate=qrEntry.querySelector(".axo-btn");
 const qrResult=select(".composition-qr-result");
 const qrDownload=qrResult.querySelector(".axo-btn--secondary");
 const qrReset=qrResult.querySelector(".axo-btn--ghost");
 let currentQr=null;
 function validQrUrl(){try{const u=new URL(qrInput.value.trim());return (u.protocol==="https:"||u.protocol==="http:")&&Boolean(u.hostname)}catch{return false}}
 function updateUrlState(){
  qrGenerate.disabled=!validQrUrl();
  qrRoot.dataset.qrStage=qrGenerate.disabled?"paste":"generate";
 }
 qrInput.addEventListener("input",updateUrlState,events);
 function generateQr(){
  if(!validQrUrl())return;
  try{
   currentQr=qrcode(0,"M");
   currentQr.addData(qrInput.value.trim());
   currentQr.make();
   const count=currentQr.getModuleCount(),margin=4,size=count+margin*2;
   let d="";
   for(let row=0;row<count;row++)for(let col=0;col<count;col++)if(currentQr.isDark(row,col))d+="M"+(col+margin)+" "+(row+margin)+"h1v1h-1z";
   select(".composition-qr-pattern").innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" shape-rendering="crispEdges" aria-hidden="true"><rect width="'+size+'" height="'+size+'" fill="#fff"/><path fill="#161622" d="'+d+'"/></svg>';
   qrRoot.dataset.qrStage="download";
   qrEntry.hidden=true;
   qrResult.hidden=false;
  }catch(error){currentQr=null;qrInput.setCustomValidity("QR kód nelze vytvořit, zkraťte URL.");qrInput.reportValidity();qrInput.setCustomValidity("")}
 }
 qrGenerate.addEventListener("click",generateQr,events);
 qrDownload.addEventListener("click",()=>{
  if(!currentQr)return;
  const count=currentQr.getModuleCount(),margin=4,scale=12,size=(count+margin*2)*scale;
  const canvas=document.createElement("canvas");canvas.width=size;canvas.height=size;
  const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,size,size);ctx.fillStyle="#161622";
  for(let row=0;row<count;row++)for(let col=0;col<count;col++)if(currentQr.isDark(row,col))ctx.fillRect((col+margin)*scale,(row+margin)*scale,scale,scale);
  canvas.toBlob(blob=>{
   if(!blob||disposed)return;
   const url=URL.createObjectURL(blob),a=document.createElement("a");
   exports.add(url);a.href=url;a.download="axo-qr.png";a.click();setTimeout(()=>{URL.revokeObjectURL(url);exports.delete(url)},1000);
  },"image/png");
 },events);
 qrReset.addEventListener("click",()=>{
  currentQr=null;qrRoot.dataset.qrStage="paste";qrResult.hidden=true;qrEntry.hidden=false;
  qrInput.value="";qrGenerate.disabled=true;qrInput.focus();
 },events);

 qrInput.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();qrGenerate.click()}},events);
 if(initial.query!==undefined){qrInput.value=initial.query;updateUrlState()}
 if(initial.stage==="download")generateQr();
 return {getState:()=>({query:qrInput.value,stage:qrRoot.dataset.qrStage}),destroy(){disposed=true;lifetime.abort();exports.forEach(url=>URL.revokeObjectURL(url));exports.clear();currentQr=null}};
}
function mountDashboardWidget(type,root,initial){return type==="find"?mountFindWidget(root,initial):mountQrWidget(root,initial)}
