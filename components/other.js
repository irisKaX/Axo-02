/* Other elements V1: scoped cursor playground; no global pointer overrides */
let ambientFrame=0;
let ambientPos=null;
function stopAmbientGlow(){if(ambientFrame)cancelAnimationFrame(ambientFrame);ambientFrame=0;ambientPos=null}
/* O2 Bubble: inspired by tholman/cursor-effects bubbleCursor (MIT), newly implemented for Axo 02. */
let o2Bubbles=[],o2BubbleFrame=0,o2BubbleLast=0,o2BubblePointer=null;
function stopO2Bubbles(){
 if(o2BubbleFrame)cancelAnimationFrame(o2BubbleFrame);
 o2BubbleFrame=0;o2Bubbles=[];o2BubblePointer=null;o2BubbleLast=0;
 const c=document.getElementById("other-bubble-canvas");
 if(c)c.getContext("2d")?.clearRect(0,0,c.width,c.height);
}
function animateO2Bubbles(time){
 const canvas=document.getElementById("other-bubble-canvas"),stage=document.getElementById("other-cursor-stage");
 if(!canvas||!stage||!document.getElementById("other-bubbles")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches){stopO2Bubbles();return}
 const rect=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
 const width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);
 if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}
 const ctx=canvas.getContext("2d");if(!ctx){stopO2Bubbles();return}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,rect.width,rect.height);
 const dt=Math.min(2,(time-(o2BubbleLast||time))/16.67);o2BubbleLast=time;
 o2Bubbles=o2Bubbles.filter(b=>b.age<b.life);
 for(const b of o2Bubbles){
  b.age+=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;
  const progress=Math.min(1,b.age/b.life),alpha=.35*Math.sin(Math.PI*progress);
  const radius=b.radius*(.8+progress*.45);
  ctx.beginPath();ctx.arc(b.x,b.y,radius,0,Math.PI*2);
  ctx.strokeStyle="rgba(102,150,255,"+(alpha*.9)+")";ctx.lineWidth=1.2;ctx.stroke();
  ctx.beginPath();ctx.arc(b.x-radius*.29,b.y-radius*.36,Math.max(.8,radius*.24),Math.PI,Math.PI*1.6);
  ctx.strokeStyle="rgba(215,195,255,"+(alpha*.62)+")";ctx.lineWidth=.8;ctx.stroke();
 }
 o2BubbleFrame=requestAnimationFrame(animateO2Bubbles);
}
function addO2Bubble(event,stage){
 if(event.pointerType!=="mouse"||!document.getElementById("other-bubbles")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const now=performance.now();if(o2BubblePointer&&now-o2BubblePointer.at<65)return;
 const p=otherPointerPosition(event,stage);o2BubblePointer={at:now};
 if(o2Bubbles.length>=30)o2Bubbles.shift();
 o2Bubbles.push({x:p.x+(Math.random()-.5)*12,y:p.y,vx:(Math.random()-.5)*.4,vy:-.35-Math.random()*.45,radius:3+Math.random()*4,age:0,life:85+Math.random()*35});
 if(!o2BubbleFrame)o2BubbleFrame=requestAnimationFrame(animateO2Bubbles);
}
function renderOther(){
 stopAmbientGlow();stopO2Bubbles();
 const host=document.getElementById("sectionContent");if(!host)return;
 const rows=Array.from({length:15},(_,i)=>'<div class="other-scroll-row">Výsledek kontroly '+String(i+1).padStart(2,"0")+' · /osobni/oneplay</div>').join("");
 host.innerHTML='<div class="other-gallery"><div class="foundation-note">Další prvky · první návrh. Scrollbar má Primary Violet, efekty kurzoru fungují pouze uvnitř testovací plochy.</div>'+
 '<section class="other-card"><div><h2>01 · Primary Violet Scrollbar</h2><p>Jemný zaoblený scrollbar se zvýrazněním při hoveru. Ukázka uvnitř dlouhého seznamu, bez změny globálního scrollování katalogu.</p></div><div class="other-scroll-stage"><div class="other-scroll-pane" tabindex="0" aria-label="Scrollable seznam výsledků">'+rows+'</div></div><div class="other-caption">Barva: <code>--accent</code>. Nativní scrollování myší, trackpadem i klávesnicí.</div></section>'+
 '<section class="other-card"><div><h2>02 · Cursor Studio</h2><p>Ambient Glow, Click Burst a jemné O2 Bubble. Efekty jsou izolované, takže nic nepřebírá kurzor ostatních sekcí.</p></div>'+
 '<div class="other-control-row"><label class="other-control"><input type="checkbox" id="other-glow" checked> Ambient Glow</label><label class="other-control"><input type="checkbox" id="other-burst" checked> Click Burst</label><label class="other-control"><input type="checkbox" id="other-bubbles"> O2 Bubble</label></div>'+
 '<div class="other-cursor-stage" id="other-cursor-stage"><canvas class="other-cursor-bubbles" id="other-bubble-canvas" aria-hidden="true"></canvas><div class="other-cursor-glow" id="other-cursor-glow" aria-hidden="true"></div><div class="other-cursor-hint">Pohybuj kurzorem v této ploše.<br>Klikni pro drobný fialový burst.</div></div>'+
 '<div class="other-caption" id="other-cursor-caption">Na dotykových zařízeních se efekty kurzoru nezobrazují. Reduced motion vypíná burst i bublinky.</div></section></div>';
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
 const bubbleStage=event.target.closest("#other-cursor-stage");if(bubbleStage)addO2Bubble(event,bubbleStage);
 const stage=event.target.closest("#other-cursor-stage");
 if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-glow")?.checked)return;
 const point=otherPointerPosition(event,stage);
 if(!ambientPos){ambientPos={x:point.x,y:point.y,tx:point.x,ty:point.y};ambientFrame=requestAnimationFrame(animateAmbientGlow)}
 else{ambientPos.tx=point.x;ambientPos.ty=point.y}
 stage.dataset.active="true";
});
document.addEventListener("pointerout",event=>{const stage=event.target.closest("#other-cursor-stage");if(stage&&!stage.contains(event.relatedTarget)){stage.dataset.active="false";stopAmbientGlow()}});
document.addEventListener("change",event=>{if(event.target.id==="other-bubbles"&&!event.target.checked)stopO2Bubbles();if(event.target.id==="other-glow"&&!event.target.checked){const stage=document.getElementById("other-cursor-stage");if(stage)stage.dataset.active="false";stopAmbientGlow()}});
document.addEventListener("pointerdown",event=>{
 const stage=event.target.closest("#other-cursor-stage");if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-burst")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const p=otherPointerPosition(event,stage);
 for(let i=0;i<7;i++){const spark=document.createElement("span");spark.className="other-cursor-spark";spark.style.left=p.x+"px";spark.style.top=p.y+"px";const angle=i*Math.PI*2/7;spark.style.setProperty("--dx",Math.cos(angle)*31+"px");spark.style.setProperty("--dy",Math.sin(angle)*31+"px");spark.addEventListener("animationend",()=>spark.remove(),{once:true});stage.appendChild(spark)}
});
