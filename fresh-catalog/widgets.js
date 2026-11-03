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
let observer;
function updateSizes(stage){
  if(!stage || !stage.isConnected)return;
  const width=stage.clientWidth;
  const gap=Math.min(20,Math.max(10,window.innerWidth*0.012));
  let smallWidth,largeWidth,smallHeight,largeHeight;
  if(window.innerWidth<=900){
    smallWidth=(width-gap)/2;largeWidth=width;smallHeight=155;largeHeight=205;
  }else{
    const unit=(width-13*gap)/14;
    smallWidth=3*unit+2*gap;largeWidth=7*unit+6*gap;
    const height=Math.min(760,Math.max(470,innerHeight*0.65));
    const rowUnit=(height-2*gap)/3.45;
    smallHeight=rowUnit;largeHeight=1.45*rowUnit;
  }
  stage.style.setProperty('--widget-gap',gap+'px');
  stage.style.setProperty('--widget-small-width',smallWidth+'px');
  stage.style.setProperty('--widget-large-width',largeWidth+'px');
  stage.style.setProperty('--widget-small-height',smallHeight+'px');
  stage.style.setProperty('--widget-large-height',largeHeight+'px');
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
          caption.append(a,b);
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
  if(observer)observer.disconnect();
  observer=new ResizeObserver(()=>updateSizes(root));observer.observe(root);
  updateSizes(root);
}
function hide(){
  if(observer){observer.disconnect();observer=null;}
  document.getElementById('widget-library')?.remove();
}
window.AxoFreshWidgetLibrary={render,hide};
window.addEventListener('resize',()=>{const root=document.getElementById('widget-library');if(root)updateSizes(root)});
})();