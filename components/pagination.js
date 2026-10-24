/* Axo 02 Navigation: three pagination demos, no framework */
const paginationState={numbered:{page:3,total:18},compact:{page:1,total:12},table:{page:1,total:10,count:93,size:10}};
function paginationButton(label,page,model,options={}){
 const {disabled=false,current=false,aria="",numbered=false}=options;
 const attrs=(disabled?" disabled":"")+(current?' aria-current="page"':"")+(aria?' aria-label="'+aria+'"':"");
 return '<button type="button" class="page-btn'+(numbered?' page-btn--number':'')+'" data-model="'+model+'" data-page="'+page+'"'+attrs+'>'+label+'</button>';
}
function paginationNumbers(page,total){
 const pages=[...new Set([1,total,page-1,page,page+1].filter(n=>n>0&&n<=total))].sort((a,b)=>a-b);
 const out=[];
 for(let i=0;i<pages.length;i++){if(i&&pages[i]-pages[i-1]>1)out.push("…");out.push(pages[i])}
 return out;
}
function paginationView(model){
 const state=paginationState[model],p=state.page,t=state.total;
 if(model==="numbered")return '<nav class="pagination-controls" aria-label="Stránkování výsledků">'+
 paginationButton("‹",p-1,model,{disabled:p===1,aria:"Předchozí stránka"})+
 paginationNumbers(p,t).map(n=>n==="…"?'<span class="page-ellipsis" aria-hidden="true">…</span>':paginationButton(n,n,model,{current:n===p,numbered:true,aria:"Stránka "+n})).join("")+
 paginationButton("›",p+1,model,{disabled:p===t,aria:"Další stránka"})+'</nav>';
 const controls='<nav class="pagination-controls" aria-label="Stránkování">'+
 paginationButton("‹ Předchozí",p-1,model,{disabled:p===1})+
 '<span class="page-meta">Stránka '+p+' z '+t+'</span>'+
 paginationButton("Další ›",p+1,model,{disabled:p===t})+'</nav>';
 if(model!=="table")return controls;
 return '<div class="page-tablebar"><div class="page-size"><span id="pagination-size-label">Řádků na stránku</span>'+
 '<button type="button" class="page-size-trigger" id="pagination-size-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="pagination-size-list" aria-labelledby="pagination-size-label pagination-size-value"><span id="pagination-size-value">'+state.size+'</span>'+paginationSizeIcon("chevron")+'</button>'+
 '<div class="page-size-list" id="pagination-size-list" role="listbox" aria-labelledby="pagination-size-label" tabindex="-1" popover="manual">'+
 paginationSizes.map(n=>'<div class="page-size-option" id="pagination-size-option-'+n+'" role="option" aria-selected="'+(n===state.size)+'" data-size="'+n+'">'+n+paginationSizeIcon("check")+'</div>').join("")+
 '</div></div><span class="page-meta">'+((p-1)*state.size+1)+'–'+Math.min(p*state.size,state.count)+' z '+state.count+' záznamů</span>'+controls+'</div>';
}
function renderPagination(){
 const node=document.getElementById("sectionContent");
 if(!node)return;
 node.innerHTML='<div class="pagination-catalog">'+
 '<div class="foundation-note">Tři varianty Pagination v základním stylu Axo 02, všechny funkční v dark i light režimu.</div>'+
 [['numbered','Klasická Pagination','Číselné stránky, aktivní výběr, zkrácení rozsahu.'],['compact','Compact Pagination','Předchozí a další stránka v úsporném provedení.'],['table','Table Pagination','Rozsah záznamů a výběr počtu řádků.']].map(([id,title,desc],i)=>
 '<section class="pagination-card"><div><h2>0'+(i+1)+' · '+title+'</h2><p>'+desc+'</p></div><div id="pagination-'+id+'"></div></section>').join("")+
 '</div>';
 refreshPagination();
}
function refreshPagination(){
 closePaginationSize();
 for(const model of Object.keys(paginationState)){const el=document.getElementById("pagination-"+model);if(el)el.innerHTML=paginationView(model)}
}
document.addEventListener("click",event=>{
 const trigger=event.target.closest("#pagination-size-trigger");
 if(trigger){if(paginationSizeMenu)closePaginationSize();else openPaginationSize();return}
 const option=event.target.closest(".page-size-option");
 if(option&&paginationSizeMenu){selectPaginationSize(Number(option.dataset.size));return}
 const btn=event.target.closest("[data-model][data-page]");
 if(!btn||btn.disabled)return;
 const state=paginationState[btn.dataset.model],page=Number(btn.dataset.page);
 if(page>=1&&page<=state.total){state.page=page;refreshPagination()}
});
const paginationSizes=[10,20,50];
let paginationSizeMenu=null;
function paginationSizeIcon(kind){
 const path=kind==="chevron"?'m6 9 6 6 6-6':'m5 12 4 4L19 6';
 return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+path+'"/></svg>';
}
function setPaginationSizeActive(index){
 const menu=paginationSizeMenu;
 menu.index=(index+paginationSizes.length)%paginationSizes.length;
 const options=menu.panel.querySelectorAll('[role="option"]');
 options.forEach((option,i)=>option.dataset.active=String(i===menu.index));
 menu.panel.setAttribute("aria-activedescendant",options[menu.index].id);
 options[menu.index].scrollIntoView({block:"nearest"});
}
function positionPaginationSize(){
 const menu=paginationSizeMenu;
 if(!menu)return;
 const {trigger,panel}=menu;
 if(!trigger.isConnected){closePaginationSize();return}
 const rect=trigger.getBoundingClientRect(),style=getComputedStyle(panel);
 const gutter=parseFloat(style.getPropertyValue("--space-2")),gap=parseFloat(style.getPropertyValue("--space-1"));
 const viewport=window.visualViewport;
 const left=viewport?viewport.offsetLeft:0,top=viewport?viewport.offsetTop:0;
 const width=viewport?viewport.width:innerWidth,height=viewport?viewport.height:innerHeight;
 if(rect.bottom<=top||rect.top>=top+height||rect.right<=left||rect.left>=left+width){closePaginationSize();return}
 const below=Math.max(0,top+height-rect.bottom-gap-gutter),above=Math.max(0,rect.top-top-gap-gutter);
 const upwards=below<panel.scrollHeight&&above>below;
 panel.style.maxHeight=Math.max(0,upwards?above:below)+"px";
 panel.style.left=Math.max(left+gutter,Math.min(rect.left,left+width-panel.offsetWidth-gutter))+"px";
 panel.style.top=(upwards?rect.top-gap-panel.offsetHeight:rect.bottom+gap)+"px";
}
function openPaginationSize(index=paginationSizes.indexOf(paginationState.table.size)){
 const trigger=document.getElementById("pagination-size-trigger"),panel=document.getElementById("pagination-size-list");
 if(!trigger||!panel)return;
 paginationSizeMenu={trigger,panel,index};
 trigger.setAttribute("aria-expanded","true");
 panel.showPopover();
 positionPaginationSize();
 if(!paginationSizeMenu)return;
 setPaginationSizeActive(index);
 panel.focus({preventScroll:true});
}
function closePaginationSize(restoreFocus=false){
 const menu=paginationSizeMenu;
 if(!menu)return;
 paginationSizeMenu=null;
 menu.trigger.setAttribute("aria-expanded","false");
 if(menu.panel.matches(":popover-open"))menu.panel.hidePopover();
 if(restoreFocus&&menu.trigger.isConnected)menu.trigger.focus({preventScroll:true});
}
function selectPaginationSize(size){
 if(!paginationSizes.includes(size))return;
 const state=paginationState.table;
 state.size=size;state.total=Math.ceil(state.count/size);state.page=1;
 refreshPagination();
 document.getElementById("pagination-size-trigger").focus({preventScroll:true});
}
document.addEventListener("keydown",event=>{
 const onTrigger=event.target.closest("#pagination-size-trigger");
 if(onTrigger&&(event.key==="Enter"||event.key===" ")){
  event.preventDefault();
  if(event.key==="Enter"){if(paginationSizeMenu)closePaginationSize();else openPaginationSize()}
  return;
 }
 if(!paginationSizeMenu){
  if(onTrigger&&["ArrowDown","ArrowUp"].includes(event.key)){
   event.preventDefault();openPaginationSize(event.key==="ArrowUp"?paginationSizes.length-1:0);
  }
  return;
 }
 if(event.key==="Escape"){event.preventDefault();closePaginationSize(true);return}
 if(event.key==="Tab"){
  // Let the browser move focus in DOM order before hiding the focused listbox.
  setTimeout(()=>closePaginationSize(),0);return;
 }
 if(event.target!==paginationSizeMenu.panel)return;
 const index=paginationSizeMenu.index;
 if(["ArrowDown","ArrowUp","Home","End","Enter"," "].includes(event.key)){
  event.preventDefault();
  if(event.key==="Enter")selectPaginationSize(paginationSizes[index]);
  else if(event.key===" ")return;
  else setPaginationSizeActive(event.key==="Home"?0:event.key==="End"?paginationSizes.length-1:index+(event.key==="ArrowDown"?1:-1));
 }
});
// Commit Space on keyup so its release cannot activate the restored trigger.
document.addEventListener("keyup",event=>{
 if(event.key===" "&&event.target.closest("#pagination-size-trigger")){
  event.preventDefault();
  if(paginationSizeMenu)closePaginationSize();else openPaginationSize();
 }else if(event.key===" "&&paginationSizeMenu&&event.target===paginationSizeMenu.panel){
  event.preventDefault();selectPaginationSize(paginationSizes[paginationSizeMenu.index]);
 }
});
document.addEventListener("pointerdown",event=>{
 if(paginationSizeMenu&&!event.target.closest(".page-size"))closePaginationSize();
});
document.addEventListener("focusin",event=>{
 if(paginationSizeMenu&&!event.target.closest(".page-size"))closePaginationSize();
});
addEventListener("hashchange",()=>closePaginationSize());
addEventListener("resize",positionPaginationSize);
addEventListener("scroll",positionPaginationSize,true);
if(window.visualViewport){
 visualViewport.addEventListener("resize",positionPaginationSize);
 visualViewport.addEventListener("scroll",positionPaginationSize);
}
