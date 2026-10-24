/* Forms V1: tool controls, native inputs and accessible keyboard behavior */
function renderFormControls(){
const host=document.getElementById("form-controls");if(!host)return;
host.innerHTML='<div class="form-gallery"><h2 class="form-gallery-title">03 · Tool Form Controls</h2><div class="foundation-note">První stavební prvky nastavení nástrojů. Nativní ovládání, vlastní vzhled, klávesnice a dark/light.</div>'+
'<section class="input-card"><div><h2>01 · Select / Dropdown</h2><p>Například formát exportu nebo způsob řazení výsledků. Vlastní dropdown podle designu Axo 02.</p></div><div class="form-demo"><div class="form-field"><label for="axo-format" class="form-field-label">Výstupní formát</label><span class="form-select-wrap"><button class="form-select" id="axo-format" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="axo-format-list"><span id="axo-format-value">WebP</span><span class="form-select-chevron" aria-hidden="true">⌄</span></button><div class="form-select-menu" id="axo-format-list" role="listbox" aria-label="Výstupní formát" hidden>'+['WebP','PNG','JPEG','AVIF'].map((v,i)=>'<button class="form-select-option" type="button" role="option" data-format="'+v+'" aria-selected="'+(i===0)+'">'+v+'</button>').join('')+'</div></span><span class="form-state" id="axo-format-state" aria-live="polite">Vybráno: WebP</span></div><div class="form-field"><span class="form-field-label">Disabled</span><span class="form-select-wrap"><button class="form-select" type="button" disabled>PDF <span class="form-select-chevron" aria-hidden="true">⌄</span></button></span></div></div></section>'+
'<section class="input-card"><div><h2>02 · Checkbox / Radio</h2><p>Více voleb pro rozsah kontroly a jediná volba pro způsob prohledávání.</p></div><div class="form-demo"><fieldset class="form-choice-group"><legend>Rozsah kontroly</legend><label class="form-choice"><input type="checkbox" name="scan-subpages" checked> Zahrnout podstránky</label><label class="form-choice"><input type="checkbox" name="scan-assets"> Hledat i v assetech</label><label class="form-choice"><input type="checkbox" disabled> Nedostupná možnost</label></fieldset><fieldset class="form-choice-group"><legend>Režim prohledávání</legend><label class="form-choice"><input type="radio" name="scan-mode" value="phrase" checked> Fráze</label><label class="form-choice"><input type="radio" name="scan-mode" value="asset"> Asset ID</label><label class="form-choice"><input type="radio" name="scan-mode" value="regex"> Regulární výraz</label></fieldset></div><div class="form-state" id="axo-choice-state" aria-live="polite">Podstránky zapnuté · Fráze</div></section>'+
'<section class="input-card"><div><h2>03 · Switch / Toggle</h2><p>Rychlé zapnutí a vypnutí funkce, například automatické kontroly.</p></div><div class="form-demo"><label class="form-switch"><input id="axo-auto-check" type="checkbox" role="switch"> Automatická kontrola</label><label class="form-switch"><input type="checkbox" role="switch" checked> Zobrazovat upozornění</label><label class="form-switch"><input type="checkbox" role="switch" disabled> Nedostupná funkce</label></div><div class="form-state" id="axo-switch-state" aria-live="polite">Automatická kontrola vypnutá</div></section></div>';
}
document.addEventListener("change",e=>{
 if(e.target.matches('[name="scan-mode"],[name="scan-subpages"],[name="scan-assets"]')){
  const mode=document.querySelector('[name="scan-mode"]:checked');
  const parts=[document.querySelector('[name="scan-subpages"]').checked?"Podstránky zapnuté":"Podstránky vypnuté",document.querySelector('[name="scan-assets"]').checked?"Assety zapnuté":"Assety vypnuté",mode?.closest("label").textContent.trim()];
  const node=document.getElementById("axo-choice-state");if(node)node.textContent=parts.join(" · ");
 }
 if(e.target.id==="axo-auto-check"){document.getElementById("axo-switch-state").textContent=e.target.checked?"Automatická kontrola zapnutá":"Automatická kontrola vypnutá"}
});
function axoSelectClose(){const b=document.getElementById("axo-format"),m=document.getElementById("axo-format-list");if(b&&m){m.hidden=true;b.setAttribute("aria-expanded","false")}}
document.addEventListener("click",e=>{
const b=e.target.closest("#axo-format"),o=e.target.closest("[data-format]"),m=document.getElementById("axo-format-list");if(!m)return;
if(b){m.hidden=!m.hidden;b.setAttribute("aria-expanded",String(!m.hidden));return}
if(o){document.getElementById("axo-format-value").textContent=o.dataset.format;document.getElementById("axo-format-state").textContent="Vybráno: "+o.dataset.format;m.querySelectorAll("[data-format]").forEach(x=>x.setAttribute("aria-selected",String(x===o)));axoSelectClose();document.getElementById("axo-format").focus();return}
if(!e.target.closest("#axo-format-list"))axoSelectClose()
});

document.addEventListener("keydown",e=>{
const m=document.getElementById("axo-format-list");if(!m)return;
const trigger=e.target.closest("#axo-format"),option=e.target.closest("#axo-format-list [data-format]");
if(trigger&&["ArrowDown","ArrowUp"].includes(e.key)){e.preventDefault();m.hidden=false;trigger.setAttribute("aria-expanded","true");m.querySelector('[aria-selected="true"]').focus();return}
if(m.hidden)return;
if(e.key==="Escape"){e.preventDefault();axoSelectClose();document.getElementById("axo-format").focus();return}
if(!option)return;
const opts=[...m.querySelectorAll("[data-format]")],i=opts.indexOf(option);
if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();opts[(i+(e.key==="ArrowDown"?1:-1)+opts.length)%opts.length].focus()}
if(e.key==="Enter"||e.key===" "){e.preventDefault();option.click()}
if(e.key==="Tab")axoSelectClose()
});
