/* Other elements V1: scoped cursor playground; no global pointer overrides */
let ambientFrame=0;
let ambientPos=null;
function stopAmbientGlow(){if(ambientFrame)cancelAnimationFrame(ambientFrame);ambientFrame=0;ambientPos=null}
function renderOther(){
 stopAmbientGlow();
 const host=document.getElementById("sectionContent");if(!host)return;
 const rows=Array.from({length:15},(_,i)=>'<div class="other-scroll-row">Výsledek kontroly '+String(i+1).padStart(2,"0")+' · /osobni/oneplay</div>').join("");
 host.innerHTML='<div class="other-gallery"><div class="foundation-note">Další prvky · první návrh. Scrollbar má Primary Violet, efekty kurzoru fungují pouze uvnitř testovací plochy.</div>'+
 '<section class="other-card"><div><h2>01 · Primary Violet Scrollbar</h2><p>Jemný zaoblený scrollbar se zvýrazněním při hoveru. Ukázka uvnitř dlouhého seznamu, bez změny globálního scrollování katalogu.</p></div><div class="other-scroll-stage"><div class="other-scroll-pane" tabindex="0" aria-label="Scrollable seznam výsledků">'+rows+'</div></div><div class="other-caption">Barva: <code>--accent</code>. Nativní scrollování myší, trackpadem i klávesnicí.</div></section>'+
 '<section class="other-card"><div><h2>02 · Cursor Studio</h2><p>Ambient Glow a volitelný Click Burst. Efekty jsou izolované, takže nic nepřebírá kurzor ostatních sekcí.</p></div>'+
 '<div class="other-control-row"><label class="other-control"><input type="checkbox" id="other-glow" checked> Ambient Glow</label><label class="other-control"><input type="checkbox" id="other-burst" checked> Click Burst</label></div>'+
 '<div class="other-cursor-stage" id="other-cursor-stage"><div class="other-cursor-glow" id="other-cursor-glow" aria-hidden="true"></div><div class="other-cursor-hint">Pohybuj kurzorem v této ploše.<br>Klikni pro drobný fialový burst.</div></div>'+
 '<div class="other-caption" id="other-cursor-caption">Na dotykových zařízeních se efekty kurzoru nezobrazují. Reduced motion vypíná burst.</div></section></div>';
}
function otherPointerPosition(event,stage){const r=stage.getBoundingClientRect();return{x:event.clientX-r.left,y:event.clientY-r.top}}
function animateAmbientGlow(){
 const stage=document.getElementById("other-cursor-stage"),glow=document.getElementById("other-cursor-glow");
 if(!stage||!glow||!ambientPos||!document.getElementById("other-glow")?.checked){stopAmbientGlow();return}
 const p=ambientPos;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches){p.x=p.tx;p.y=p.ty}else{p.x+=(p.tx-p.x)*.14;p.y+=(p.ty-p.y)*.14}
 const dx=p.tx-p.x,dy=p.ty-p.y,speed=Math.hypot(dx,dy);
 glow.style.left=p.x+"px";glow.style.top=p.y+"px";
 glow.style.setProperty("--glow-angle",Math.atan2(dy,dx)+"rad");
 glow.style.setProperty("--glow-stretch",String(1+Math.min(.25,speed/160)));
 ambientFrame=requestAnimationFrame(animateAmbientGlow);
}
document.addEventListener("pointermove",event=>{
 const stage=event.target.closest("#other-cursor-stage");
 if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-glow")?.checked)return;
 const point=otherPointerPosition(event,stage);
 if(!ambientPos){ambientPos={x:point.x,y:point.y,tx:point.x,ty:point.y};ambientFrame=requestAnimationFrame(animateAmbientGlow)}
 else{ambientPos.tx=point.x;ambientPos.ty=point.y}
 stage.dataset.active="true";
});
document.addEventListener("pointerout",event=>{const stage=event.target.closest("#other-cursor-stage");if(stage&&!stage.contains(event.relatedTarget)){stage.dataset.active="false";stopAmbientGlow()}});
document.addEventListener("change",event=>{if(event.target.id==="other-glow"&&!event.target.checked){const stage=document.getElementById("other-cursor-stage");if(stage)stage.dataset.active="false";stopAmbientGlow()}});
document.addEventListener("pointerdown",event=>{
 const stage=event.target.closest("#other-cursor-stage");if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-burst")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const p=otherPointerPosition(event,stage);
 for(let i=0;i<7;i++){const spark=document.createElement("span");spark.className="other-cursor-spark";spark.style.left=p.x+"px";spark.style.top=p.y+"px";const angle=i*Math.PI*2/7;spark.style.setProperty("--dx",Math.cos(angle)*31+"px");spark.style.setProperty("--dy",Math.sin(angle)*31+"px");spark.addEventListener("animationend",()=>spark.remove(),{once:true});stage.appendChild(spark)}
});
