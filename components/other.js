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
 o2BubbleFrame=o2Bubbles.length?requestAnimationFrame(animateO2Bubbles):0;
}
function addO2Bubble(event,stage){
 if(event.pointerType!=="mouse"||!document.getElementById("other-bubbles")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const now=performance.now();if(o2BubblePointer&&now-o2BubblePointer.at<65)return;
 const p=otherPointerPosition(event,stage);o2BubblePointer={at:now};
 if(o2Bubbles.length>=30)o2Bubbles.shift();
 o2Bubbles.push({x:p.x+(Math.random()-.5)*12,y:p.y,vx:(Math.random()-.5)*.4,vy:-.35-Math.random()*.45,radius:3+Math.random()*4,age:0,life:85+Math.random()*35});
 if(!o2BubbleFrame)o2BubbleFrame=requestAnimationFrame(animateO2Bubbles);
}
/* O2 Shimmer: original fine-light trail inspired by Custom Cursor Glitter, no copied artwork. */
let shimmerParticles=[],shimmerFrame=0,shimmerTime=0,shimmerPointerTime=0;
function stopO2Shimmer(){
 if(shimmerFrame)cancelAnimationFrame(shimmerFrame);
 shimmerFrame=0;shimmerParticles=[];shimmerTime=0;shimmerPointerTime=0;
 const canvas=document.getElementById("other-shimmer-canvas");
 if(canvas)canvas.getContext("2d")?.clearRect(0,0,canvas.width,canvas.height);
}
function animateO2Shimmer(time){
 const canvas=document.getElementById("other-shimmer-canvas"),stage=document.getElementById("other-cursor-stage");
 if(!canvas||!stage||!document.getElementById("other-shimmer")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches){stopO2Shimmer();return}
 const rect=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);
 if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}
 const ctx=canvas.getContext("2d");if(!ctx){stopO2Shimmer();return}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,rect.width,rect.height);
 const dt=Math.min(2,(time-(shimmerTime||time))/16.67);shimmerTime=time;
 shimmerParticles=shimmerParticles.filter(p=>p.age<p.life);
 for(const p of shimmerParticles){
  p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.988;
  const t=Math.min(1,p.age/p.life),opacity=.62*Math.sin(Math.PI*t),radius=p.size*(1-t*.4);
  ctx.save();ctx.globalAlpha=opacity;ctx.translate(p.x,p.y);ctx.rotate(p.rotation+t*.5);
  ctx.strokeStyle=p.color;ctx.lineWidth=.75;
  ctx.beginPath();ctx.moveTo(-radius,0);ctx.lineTo(radius,0);ctx.moveTo(0,-radius);ctx.lineTo(0,radius);ctx.stroke();
  ctx.beginPath();ctx.fillStyle=p.color;ctx.arc(0,0,.65,0,Math.PI*2);ctx.fill();
  ctx.restore();
 }
 shimmerFrame=shimmerParticles.length?requestAnimationFrame(animateO2Shimmer):0;
}
function addO2Shimmer(event,stage){
 if(event.pointerType!=="mouse"||!document.getElementById("other-shimmer")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const now=performance.now();if(now-shimmerPointerTime<48)return;shimmerPointerTime=now;
 const p=otherPointerPosition(event,stage);
 for(let i=0;i<2;i++){
  if(shimmerParticles.length>=38)shimmerParticles.shift();
  shimmerParticles.push({x:p.x+(Math.random()-.5)*13,y:p.y+(Math.random()-.5)*13,vx:(Math.random()-.5)*.48,vy:-.13-Math.random()*.28,size:1.7+Math.random()*2.5,rotation:Math.random()*Math.PI,age:0,life:32+Math.random()*26,color:Math.random()<.55?"#B29AFF":"#78B2FF"});
 }
 if(!shimmerFrame)shimmerFrame=requestAnimationFrame(animateO2Shimmer);
}
function renderOther(){
 stopAmbientGlow();stopO2Bubbles();stopO2Shimmer();
 const host=document.getElementById("sectionContent");if(!host)return;
 const rows=Array.from({length:15},(_,i)=>'<div class="other-scroll-row">Výsledek kontroly '+String(i+1).padStart(2,"0")+' · /osobni/oneplay</div>').join("");
 host.innerHTML='<div class="other-gallery"><div class="foundation-note">Další prvky · první návrh. Scrollbar má Primary Violet, efekty kurzoru fungují pouze uvnitř testovací plochy.</div>'+
 '<section class="other-card"><div><h2>01 · Primary Violet Scrollbar</h2><p>Jemný zaoblený scrollbar se zvýrazněním při hoveru. Ukázka uvnitř dlouhého seznamu, bez změny globálního scrollování katalogu.</p></div><div class="other-scroll-stage"><div class="other-scroll-pane" tabindex="0" aria-label="Scrollable seznam výsledků">'+rows+'</div></div><div class="other-caption">Barva: <code>--accent</code>. Nativní scrollování myší, trackpadem i klávesnicí.</div></section>'+
 '<section class="other-card"><div><h2>02 · Cursor Studio</h2><p>Ambient Glow, Click Burst, O2 Bubble a O2 Shimmer. Efekty jsou izolované, takže nic nepřebírá kurzor ostatních sekcí.</p></div>'+
 '<div class="other-control-row"><label class="other-control"><input type="checkbox" id="other-glow" checked> Ambient Glow</label><label class="other-control"><input type="checkbox" id="other-burst" checked> Click Burst</label><label class="other-control"><input type="checkbox" id="other-bubbles"> O2 Bubble</label><label class="other-control"><input type="checkbox" id="other-shimmer"> O2 Shimmer</label></div>'+
 '<div class="other-cursor-stage" id="other-cursor-stage"><canvas class="other-cursor-bubbles" id="other-bubble-canvas" aria-hidden="true"></canvas><canvas class="other-cursor-bubbles" id="other-shimmer-canvas" aria-hidden="true"></canvas><div class="other-cursor-glow" id="other-cursor-glow" aria-hidden="true"></div><div class="other-cursor-hint">Pohybuj kurzorem v této ploše.<br>Klikni pro drobný fialový burst.</div></div>'+
 '<div class="other-caption" id="other-cursor-caption">Na dotykových zařízeních se efekty kurzoru nezobrazují. Reduced motion vypíná burst, bublinky i třpytky.</div></section></div>';
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
 const bubbleStage=event.target.closest("#other-cursor-stage");if(bubbleStage){addO2Bubble(event,bubbleStage);addO2Shimmer(event,bubbleStage)}
 const stage=event.target.closest("#other-cursor-stage");
 if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-glow")?.checked)return;
 const point=otherPointerPosition(event,stage);
 if(!ambientPos){ambientPos={x:point.x,y:point.y,tx:point.x,ty:point.y};ambientFrame=requestAnimationFrame(animateAmbientGlow)}
 else{ambientPos.tx=point.x;ambientPos.ty=point.y}
 stage.dataset.active="true";
});
document.addEventListener("pointerout",event=>{const stage=event.target.closest("#other-cursor-stage");if(stage&&!stage.contains(event.relatedTarget)){stage.dataset.active="false";stopAmbientGlow()}});
document.addEventListener("change",event=>{if(event.target.id==="other-bubbles"&&!event.target.checked)stopO2Bubbles();if(event.target.id==="other-shimmer"&&!event.target.checked)stopO2Shimmer();if(event.target.id==="other-glow"&&!event.target.checked){const stage=document.getElementById("other-cursor-stage");if(stage)stage.dataset.active="false";stopAmbientGlow()}});
document.addEventListener("pointerdown",event=>{
 const stage=event.target.closest("#other-cursor-stage");if(!stage||event.pointerType!=="mouse"||!document.getElementById("other-burst")?.checked||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const p=otherPointerPosition(event,stage);
 for(let i=0;i<7;i++){const spark=document.createElement("span");spark.className="other-cursor-spark";spark.style.left=p.x+"px";spark.style.top=p.y+"px";const angle=i*Math.PI*2/7;spark.style.setProperty("--dx",Math.cos(angle)*31+"px");spark.style.setProperty("--dy",Math.sin(angle)*31+"px");spark.addEventListener("animationend",()=>spark.remove(),{once:true});stage.appendChild(spark)}
});
