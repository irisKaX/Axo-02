/* Other elements V1: scoped cursor playground; no global pointer overrides */
function renderOther(){
 const host=document.getElementById("sectionContent");if(!host)return;
 const rows=Array.from({length:15},(_,i)=>'<div class="other-scroll-row">Výsledek kontroly '+String(i+1).padStart(2,"0")+' · /osobni/oneplay</div>').join("");
 host.innerHTML='<div class="other-gallery"><div class="foundation-note">Další prvky · první návrh. Scrollbar má Primary Violet, efekty kurzoru fungují pouze uvnitř testovací plochy.</div>'+
 '<section class="other-card"><div><h2>01 · Primary Violet Scrollbar</h2><p>Jemný zaoblený scrollbar se zvýrazněním při hoveru. Ukázka uvnitř dlouhého seznamu, bez změny globálního scrollování katalogu.</p></div><div class="other-scroll-stage"><div class="other-scroll-pane" tabindex="0" aria-label="Scrollable seznam výsledků">'+rows+'</div></div><div class="other-caption">Barva: <code>--accent</code>. Nativní scrollování myší, trackpadem i klávesnicí.</div></section>'+
 '<section class="other-card"><div><h2>02 · Cursor Studio</h2><p>Glow Cursor a volitelný Click Burst. Efekty jsou izolované, takže nic nepřebírá kurzor ostatních sekcí.</p></div>'+
 '<div class="other-control-row"><label class="other-control"><input type="checkbox" id="other-glow" checked> Glow Cursor</label><label class="other-control"><input type="checkbox" id="other-burst" checked> Click Burst</label></div>'+
 '<div class="other-cursor-stage" id="other-cursor-stage"><div class="other-cursor-glow" id="other-cursor-glow" aria-hidden="true"></div><div class="other-cursor-hint">Pohybuj kurzorem v této ploše.<br>Klikni pro drobný fialový burst.</div></div>'+
 '<div class="other-caption" id="other-cursor-caption">Na dotykových zařízeních se efekty kurzoru nezobrazují. Reduced motion vypíná burst.</div></section></div>';
}
function otherPointerPosition(event,stage){const r=stage.getBoundingClientRect();return{x:event.clientX-r.left,y:event.clientY-r.top}}
document.addEventListener("pointermove",event=>{
 const stage=event.target.closest("#other-cursor-stage");if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-glow")?.checked)return;
 const p=otherPointerPosition(event,stage),glow=document.getElementById("other-cursor-glow");glow.style.left=p.x+"px";glow.style.top=p.y+"px";stage.dataset.active="true";
});
document.addEventListener("pointerout",event=>{const stage=event.target.closest("#other-cursor-stage");if(stage&&!stage.contains(event.relatedTarget))stage.dataset.active="false"});
document.addEventListener("change",event=>{if(event.target.id==="other-glow"&&!event.target.checked){const stage=document.getElementById("other-cursor-stage");if(stage)stage.dataset.active="false"}});
document.addEventListener("pointerdown",event=>{
 const stage=event.target.closest("#other-cursor-stage");if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-burst")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const p=otherPointerPosition(event,stage);
 for(let i=0;i<7;i++){const spark=document.createElement("span");spark.className="other-cursor-spark";spark.style.left=p.x+"px";spark.style.top=p.y+"px";const angle=i*Math.PI*2/7;spark.style.setProperty("--dx",Math.cos(angle)*31+"px");spark.style.setProperty("--dy",Math.sin(angle)*31+"px");spark.addEventListener("animationend",()=>spark.remove(),{once:true});stage.appendChild(spark)}
});
