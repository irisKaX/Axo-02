/* Fresh catalog: empty widget-library skeletons only. The Dashboard remains a separate preview.
   Each pair uses exact measured sizing derived from the Dashboard's current grid. */
(function(){
"use strict";
const tools=[
["metadata","Metadata"],["headings","Nadpisy"],["find","Find Phrase"],
["screenshot","Screenshot"],["webp","Obrázky do WebP"],["images","Obrázky z URL"],
["pdf","PDF Scout"],["qr","QR Generator"],["structured","Strukturovaná data"],["trends","Trendy"]
];
const stages=[["default","Výchozí"],["loading","Zpracování"],["result","Výsledek"],["error","Chyba"]];
const presets={laptop:{name:"Laptop",width:1366,height:768},desktop:{name:"Desktop",width:1920,height:1080},mobile:{name:"Mobil",width:390,height:844}};
let device="laptop",measurementFrame=null;
function updateSizes(){
 const root=document.getElementById("widget-library");
 if(!root||!measurementFrame?.contentDocument)return;
 const documentInside=measurementFrame.contentDocument;
 const small=documentInside.querySelector(".w1"),large=documentInside.querySelector(".w5");
 const grid=documentInside.querySelector(".dashboard-grid");
 if(!small||!large||!grid)return;
 const sr=small.getBoundingClientRect(),lr=large.getBoundingClientRect();
 const gap=parseFloat(getComputedStyle(grid).columnGap)||10;
 root.style.setProperty("--widget-gap",gap+"px");
 root.style.setProperty("--widget-small-width",sr.width+"px");
 root.style.setProperty("--widget-large-width",lr.width+"px");
 root.style.setProperty("--widget-small-height",sr.height+"px");
 root.style.setProperty("--widget-large-height",lr.height+"px");
 root.querySelectorAll("[data-widget-size-label]").forEach(label=>{
   const isSmall=label.dataset.widgetSizeLabel==="small";
   const r=isSmall?sr:lr;
   label.textContent=(isSmall?"Small":"Large")+" · "+Math.round(r.width*100)/100+" × "+Math.round(r.height*100)/100+" px";
 });
 root.querySelectorAll("[data-widget-device]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.widgetDevice===device)));
 root.querySelector("#widget-device-note").textContent=presets[device].name+" · "+presets[device].width+" × "+presets[device].height+" CSS px · měřeno přímo z Dashboardu";
}
function setDevice(key){
 if(!presets[key]||!measurementFrame)return;
 device=key;
 const {width,height}=presets[key];
 measurementFrame.style.width=width+"px";
 measurementFrame.style.height=height+"px";
 requestAnimationFrame(updateSizes);
}
function render(){
  const canvas=document.querySelector('.canvas');if(!canvas)return;
  let root=document.getElementById('widget-library');
  if(!root){
    root=document.createElement('div');root.id='widget-library';root.className='widget-library';
    const intro=document.createElement('div');intro.className='widget-library-intro';
    const p=document.createElement('p');p.textContent='Deset nástrojů, dvě velikosti a čtyři samostatné stavy. Karty jsou zatím prázdné a připravené k návrhu.';
    const shortcuts=document.createElement('nav');shortcuts.className='widget-library-shortcuts';shortcuts.setAttribute('aria-label','Přejít na widget');
    tools.forEach(([id,name])=>{const button=document.createElement('button');button.type='button';button.textContent=name;button.addEventListener('click',()=>root.querySelector('#widget-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}));shortcuts.append(button)});
    intro.append(p,shortcuts);root.append(intro);
    const devices=document.createElement("div");devices.className="widget-library-devices";devices.setAttribute("role","group");devices.setAttribute("aria-label","Rozměry podle Dashboardu");
    Object.entries(presets).forEach(([key,preset])=>{
      const button=document.createElement("button");button.type="button";button.dataset.widgetDevice=key;
      button.setAttribute("aria-pressed","false");button.textContent=preset.name+" · "+preset.width+" × "+preset.height;
      button.addEventListener("click",()=>setDevice(key));devices.append(button);
    });
    const note=document.createElement("p");note.id="widget-device-note";note.className="widget-library-hint";devices.append(note);root.append(devices);
    const metrics=document.createElement("iframe");metrics.className="widget-library-metrics";metrics.src="dashboard-frame.html";metrics.title="Technický náhled pro měření rozměrů karet";
    metrics.setAttribute("aria-hidden","true");metrics.tabIndex=-1;metrics.addEventListener("load",updateSizes);root.append(metrics);measurementFrame=metrics;
    tools.forEach(([id,name],index)=>{
      const section=document.createElement('section');section.className='widget-library-section';section.id='widget-'+id;
      const heading=document.createElement('div');heading.className='widget-library-heading';
      const h=document.createElement('h2');h.textContent=name;const sub=document.createElement('span');sub.textContent=String(index+1).padStart(2,'0')+' / 10 · Small & Large';heading.append(h,sub);
      const scroll=document.createElement('div');scroll.className='widget-library-scroll';
      const comparison=document.createElement('div');comparison.className='widget-library-comparison';
      stages.forEach(([state,label],n)=>{
        const row=document.createElement('div');row.className='widget-library-row';
        for(const size of ['small','large']){
          const figure=document.createElement('figure');figure.className='widget-library-cell';
          const caption=document.createElement('figcaption');const a=document.createElement('span');a.textContent=(size==='small'?'Small':'Large')+' · '+label;
          const b=document.createElement('span');b.className='widget-library-state';b.textContent=n===0?'Master':'Kopie';
          a.dataset.widgetSizeLabel=size;caption.append(a,b);
          const card=document.createElement('div');card.className='widget-library-card';card.dataset.size=size;card.dataset.state=state;
          card.setAttribute('role','img');card.setAttribute('aria-label',name+', '+size+', '+label+', prázdná karta');
          figure.append(caption,card);row.append(figure);
        }
        comparison.append(row);
      });
      scroll.append(comparison);section.append(heading,scroll);root.append(section);
    });
    canvas.append(root);
  }
  setDevice(device);
}
function hide(){
  document.getElementById('widget-library')?.remove();
  measurementFrame=null;
}
window.AxoFreshWidgetLibrary={render,hide};

})();