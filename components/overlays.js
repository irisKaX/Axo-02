/* Dialogs & Popovers V1 · native dialog focus, custom popover */
function overlayButton(label,variant,id){return renderButton({label,variant}).replace("<button ","<button id=\""+id+"\" ")}
function renderOverlays(){
 const host=document.getElementById("sectionContent");if(!host)return;
 host.innerHTML='<div class="overlay-gallery"><div class="foundation-note">Interaktivní ukázky dialogů a popoverů pro pracovní nástroje. Používají společný Button System.</div>'+
 '<section class="overlay-card"><div><h2>01 · Confirm Dialog</h2><p>Potvrzení nevratné akce, například smazání uložených výsledků.</p></div><div class="overlay-demo">'+overlayButton("Smazat výsledky","destructive","overlay-open-confirm")+'</div><div class="overlay-feedback" id="overlay-confirm-result" aria-live="polite"></div></section>'+
 '<section class="overlay-card"><div><h2>02 · Information Dialog</h2><p>Vysvětlení limitů webové kontroly bez nutnosti opustit nástroj.</p></div><div class="overlay-demo">'+overlayButton("Zobrazit informace","secondary","overlay-open-info")+'</div></section>'+
 '<section class="overlay-card"><div><h2>03 · Action Popover</h2><p>Rychlá kontextová nabídka u výsledku kontroly webu.</p></div><div class="overlay-demo"><div class="overlay-pop-anchor">'+overlayButton("Možnosti výsledku","secondary","overlay-menu-trigger")+'<div class="overlay-popover" id="overlay-menu" hidden><div class="overlay-popover-title">AKCE S VÝSLEDKEM</div><button class="overlay-pop-item" type="button" data-overlay-action="Uloženo do notebooku">Uložit do notebooku</button><button class="overlay-pop-item" type="button" data-overlay-action="Odkaz zkopírován (demo)">Kopírovat odkaz</button><button class="overlay-pop-item" type="button" data-danger data-overlay-action="Výsledek označen k odebrání (demo)">Odebrat výsledek</button></div></div></div><div class="overlay-feedback" id="overlay-menu-result" aria-live="polite"></div></section></div>'+
 '<dialog class="overlay-dialog" id="overlay-confirm" aria-labelledby="overlay-confirm-title" aria-describedby="overlay-confirm-description"><h3 id="overlay-confirm-title">Smazat uložené výsledky?</h3><p id="overlay-confirm-description">Tuto akci nelze vrátit zpět. Jde o ukázku, žádná data se nesmažou.</p><div class="overlay-dialog-actions">'+overlayButton("Zrušit","secondary","overlay-confirm-cancel")+overlayButton("Smazat","destructive","overlay-confirm-accept")+'</div></dialog>'+
 '<dialog class="overlay-dialog" id="overlay-info" aria-labelledby="overlay-info-title" aria-describedby="overlay-info-description"><h3 id="overlay-info-title">Omezení webové kontroly</h3><p id="overlay-info-description">Při analýze rozsáhlého webu může nástroj kontrolovat jen část dostupných URL. Výsledky proto vždy zobrazí informaci o skutečném rozsahu kontroly.</p><div class="overlay-dialog-actions">'+overlayButton("Rozumím","primary","overlay-info-close")+'</div></dialog>';
 const trigger=document.getElementById("overlay-menu-trigger");trigger.setAttribute("aria-expanded","false");trigger.setAttribute("aria-controls","overlay-menu");trigger.setAttribute("aria-haspopup","true");
}
function closeOverlayMenu(restore=false){const m=document.getElementById("overlay-menu"),t=document.getElementById("overlay-menu-trigger");if(m&&t){m.hidden=true;t.setAttribute("aria-expanded","false");if(restore)t.focus()}}
document.addEventListener("click",event=>{
 const id=event.target.closest("button")?.id;
 if(id==="overlay-open-confirm")document.getElementById("overlay-confirm")?.showModal();
 if(id==="overlay-open-info")document.getElementById("overlay-info")?.showModal();
 if(id==="overlay-confirm-cancel"||id==="overlay-confirm-accept"){document.getElementById("overlay-confirm")?.close();if(id==="overlay-confirm-accept")document.getElementById("overlay-confirm-result").textContent="Ukázkové potvrzení, žádná data nebyla smazána."}
 if(id==="overlay-info-close")document.getElementById("overlay-info")?.close();
 if(id==="overlay-menu-trigger"){const m=document.getElementById("overlay-menu"),t=document.getElementById(id),open=m.hidden;m.hidden=!open;t.setAttribute("aria-expanded",String(open));if(open)m.querySelector(".overlay-pop-item").focus();return}
 const choice=event.target.closest("[data-overlay-action]");if(choice){document.getElementById("overlay-menu-result").textContent=choice.dataset.overlayAction;closeOverlayMenu(true);return}
 if(!event.target.closest(".overlay-pop-anchor"))closeOverlayMenu();
});
document.addEventListener("keydown",event=>{const m=document.getElementById("overlay-menu");if(!m||m.hidden)return;if(event.key==="Escape"){event.preventDefault();closeOverlayMenu(true)}if(event.key==="Tab"&&!event.target.closest(".overlay-pop-anchor"))closeOverlayMenu()});
document.addEventListener("click",event=>{const d=event.target.closest("dialog.overlay-dialog");if(!d)return;const r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)d.close()});
