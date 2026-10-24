/* Feedback & Status V1: demos without background jobs or persistence */
let feedbackTick=null;
function feedbackButton(label,variant,id){return renderButton({label,variant}).replace("<button ","<button id=\""+id+"\" ")}
function stopFeedbackProgress(){if(feedbackTick!==null){clearInterval(feedbackTick);feedbackTick=null}}
function renderFeedback(){
 stopFeedbackProgress();
 const host=document.getElementById("sectionContent");if(!host)return;
 host.innerHTML='<div class="feedback-gallery"><div class="foundation-note">Zpětná vazba pro webové kontroly, exporty a pracovní úkoly. Všechna data i průběhy jsou pouze demonstrační.</div>'+
 '<section class="feedback-card"><div><h2>01 · Inline Notices</h2><p>Informace, úspěch, upozornění a chyba. Bez barevné plochy přes celou kartu, stav značí především border a ikona.</p></div><div class="feedback-stack">'+
 '<div class="feedback-notice" data-tone="info" role="status"><span class="feedback-notice-icon" aria-hidden="true">ⓘ</span><div class="feedback-notice-copy"><strong>Kontrola připravena</strong><span>Vyber rozsah URL a spusť hledání fráze.</span></div></div>'+
 '<div class="feedback-notice" data-tone="success" role="status"><span class="feedback-notice-icon" aria-hidden="true">✓</span><div class="feedback-notice-copy"><strong>Export dokončen</strong><span>Výsledky jsou připravené ke stažení.</span></div></div>'+
 '<div class="feedback-notice" data-tone="warning" role="status"><span class="feedback-notice-icon" aria-hidden="true">!</span><div class="feedback-notice-copy"><strong>Kontrola s omezením</strong><span>Část URL nebyla dostupná. Výsledky mohou být neúplné.</span></div></div>'+
 '<div class="feedback-notice" data-tone="error" role="alert"><span class="feedback-notice-icon" aria-hidden="true">×</span><div class="feedback-notice-copy"><strong>Nepodařilo se načíst stránku</strong><span>Zkontroluj URL a opakuj požadavek.</span></div></div></div></section>'+
 '<section class="feedback-card"><div><h2>02 · Progress / Processing</h2><p>Průběh kontroly stránek se simulovaným počítadlem a možností zastavení.</p></div>'+
 '<div class="feedback-progress-meta"><strong id="feedback-progress-label">Připraveno ke skenování</strong><span id="feedback-progress-count">0 / 120 URL</span></div>'+
 '<div class="feedback-progress-track" id="feedback-progress-track" role="progressbar" aria-label="Průběh kontroly URL" aria-valuemin="0" aria-valuemax="120" aria-valuenow="0"><div class="feedback-progress-fill" id="feedback-progress-fill"></div></div>'+
 '<div class="feedback-progress-actions">'+feedbackButton("Spustit demo","primary","feedback-progress-start")+feedbackButton("Zastavit","secondary","feedback-progress-stop")+'</div><div class="feedback-progress-result" id="feedback-progress-result" aria-live="polite">Simulace, žádné skutečné URL se nenačítají.</div></section>'+
 '<section class="feedback-card"><div><h2>03 · Status Badges</h2><p>Kompaktní stavové indikátory pro tabulky a výsledkové karty.</p></div><div class="feedback-badges"><span class="feedback-badge"><span class="feedback-badge-dot"></span>Čeká</span><span class="feedback-badge" data-tone="success"><span class="feedback-badge-dot"></span>Dokončeno</span><span class="feedback-badge" data-tone="warning"><span class="feedback-badge-dot"></span>S omezeními</span><span class="feedback-badge" data-tone="error"><span class="feedback-badge-dot"></span>Chyba</span></div></section>'+
 '<section class="feedback-card"><div><h2>04 · Empty State</h2><p>Když hledání nenašlo žádný výskyt.</p></div><div class="feedback-empty"><span class="feedback-empty-icon" aria-hidden="true">⌕</span><strong>Žádné výsledky</strong><span>Zkus upravit hledanou frázi, asset ID nebo rozsah kontrolovaných URL.</span>'+feedbackButton("Upravit hledání","secondary","feedback-empty-edit")+'</div><div class="feedback-progress-result" id="feedback-empty-response" aria-live="polite"></div></section>'+
 '<section class="feedback-card"><div><h2>05 · Toast</h2><p>Krátká neblokující zpráva po akci v nástroji.</p></div><div class="feedback-toast-stage">'+feedbackButton("Zobrazit toast","secondary","feedback-toast-show")+'<div class="feedback-toast" id="feedback-toast" role="status" hidden><span>✓ Nastavení bylo uloženo (demo).</span><button type="button" id="feedback-toast-close" aria-label="Zavřít oznámení">×</button></div></div></section></div>';
}
function updateFeedbackProgress(value){
 const bar=document.getElementById("feedback-progress-track");if(!bar){stopFeedbackProgress();return}
 bar.setAttribute("aria-valuenow",String(value));
 document.getElementById("feedback-progress-fill").style.width=(value/120*100)+"%";
 document.getElementById("feedback-progress-count").textContent=value+" / 120 URL";
}
document.addEventListener("click",event=>{
 const id=event.target.closest("button")?.id;
 if(id==="feedback-progress-start"){
  stopFeedbackProgress();let value=0;updateFeedbackProgress(value);
  document.getElementById("feedback-progress-label").textContent="Probíhá kontrola";
  document.getElementById("feedback-progress-result").textContent="Ukázkový průběh skenování…";
  feedbackTick=setInterval(()=>{value=Math.min(120,value+4);updateFeedbackProgress(value);if(value===120){stopFeedbackProgress();document.getElementById("feedback-progress-label").textContent="Dokončeno";document.getElementById("feedback-progress-result").textContent="Simulace dokončena, skutečné URL se neprohledávaly."}},140);
 }
 if(id==="feedback-progress-stop"){stopFeedbackProgress();const n=document.getElementById("feedback-progress-label");if(n)n.textContent="Zastaveno";}
 if(id==="feedback-empty-edit")document.getElementById("feedback-empty-response").textContent="V aplikaci tato akce otevře nastavení hledání.";
 if(id==="feedback-toast-show")document.getElementById("feedback-toast").hidden=false;
 if(id==="feedback-toast-close")document.getElementById("feedback-toast").hidden=true;
});
