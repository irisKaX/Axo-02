/* Widget Studio · catalog workspace. All widget content and behavior are shared with the Dashboard. */
const widgetStudioCatalog={
 find:{name:"Find Phrase",note:"Asset / Fráze a stav webu jsou interaktivní demo. Vyhledávání zatím není napojené.",states:[["empty","Prázdné pole"],["asset","Vyplněný asset"],["phrase","Vyplněná fráze"],["unavailable","Web nedostupný"]]},
 qr:{name:"QR Generator",note:"Generování skutečného QR a stažení PNG funguje lokálně v prohlížeči.",states:[["empty","Vložení URL · disabled"],["valid","Platná URL · Generovat"],["invalid","Neplatná URL"],["result","QR + stažení PNG"]]}
};
const widgetStudioDrafts=new Map();
let widgetStudioSelection={widget:"find",size:"small"};
function renderWidgetStudio(){
 const host=document.getElementById("sectionContent");if(!host)return;
 let {widget,size}=widgetStudioSelection,controller,interaction="default",scenario="live";
 const button=(label,attributes,config={})=>renderButton({label,variant:"secondary",...config}).replace("<button","<button "+attributes);
 host.innerHTML='<div class="widget-studio"><div class="nav-tabs" role="tablist" aria-label="Widgety">'+Object.entries(widgetStudioCatalog).map(([key,item])=>'<button type="button" class="nav-tab" role="tab" id="studio-tab-'+key+'" aria-controls="widget-studio-workspace" aria-selected="'+(key===widget)+'" tabindex="'+(key===widget?0:-1)+'" data-studio-widget="'+key+'">'+item.name+'</button>').join("")+'</div><div id="widget-studio-workspace" class="widget-studio-workspace" role="tabpanel"><div class="widget-studio-toolbar"><div class="widget-studio-sizes" role="group" aria-label="Velikost widgetu">'+["small","large"].map(key=>button(key==="small"?"Small":"Large",'data-studio-size="'+key+'" aria-pressed="'+(key===size)+'"',{variant:key===size?"primary":"secondary"})).join("")+'</div><span class="widget-studio-measure" id="studio-measure"></span><span class="widget-studio-badge">Návrh ke schválení</span></div><div class="widget-studio-layout"><div class="widget-studio-stage" role="region" aria-label="Samostatný náhled widgetu"><article class="widget-studio-preview"></article></div><aside class="widget-studio-inspector" aria-label="Stavy widgetu"><div><h2>Stavy obsahu</h2><div class="widget-studio-states" role="group" aria-label="Stav obsahu"></div></div><div><h2>Interakce</h2><div class="widget-studio-interactions" role="group" aria-label="Náhled interakce"></div></div></aside></div><p class="widget-studio-note" id="studio-capability"></p><p class="widget-studio-help">Stav připraví náhled; ovládání uvnitř zůstává živé. Hover, Tab a stisk lze vyzkoušet přímo. Rozměry jsou v CSS px, bez škálování.</p></div></div>';
 const studio=host.querySelector(".widget-studio");
 const workspace=host.querySelector("#widget-studio-workspace"),preview=host.querySelector(".widget-studio-preview");
 const key=()=>widget+":"+size;
 function save(){if(controller)widgetStudioDrafts.set(key(),controller.getState())}
 function applyInteraction(){
  const search=preview.querySelector(".input-search-shell");if(search)search.dataset.previewState=interaction;
  preview.querySelectorAll(".axo-btn").forEach(b=>{b.classList.remove("demo-hover","demo-focus","demo-pressed");if(interaction!=="default"&&!b.disabled)b.classList.add("demo-"+interaction)});
  const url=preview.querySelector(".composition-qr-url");if(url)url.dataset.previewState=interaction;
  host.querySelectorAll("[data-studio-interaction]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.studioInteraction===interaction)));
 }
 function showWidget(initial){
  controller=null;
  preview.dataset.size=size;preview.setAttribute("aria-label",widgetStudioCatalog[widget].name+" · "+(size==="small"?"Small":"Large"));
  preview.innerHTML=dashboardWidgetMarkup(widget,{id:"studio-"+widget+"-"+size,size});
  controller=mountDashboardWidget(widget,preview.firstElementChild,initial??widgetStudioDrafts.get(key()));
  applyInteraction();
 }
 function refresh(){
  widgetStudioSelection={widget,size};scenario="live";interaction="default";
  workspace.setAttribute("aria-labelledby","studio-tab-"+widget);
  host.querySelectorAll("[data-studio-widget]").forEach(b=>{b.setAttribute("aria-selected",String(b.dataset.studioWidget===widget));b.tabIndex=b.dataset.studioWidget===widget?0:-1});
  host.querySelectorAll("[data-studio-size]").forEach(b=>{const selected=b.dataset.studioSize===size;b.setAttribute("aria-pressed",String(selected));b.classList.toggle("axo-btn--primary",selected);b.classList.toggle("axo-btn--secondary",!selected)});
  host.querySelector("#studio-measure").textContent=(size==="small"?"320 × 280":"640 × 320")+" CSS px";
  host.querySelector("#studio-capability").textContent=widgetStudioCatalog[widget].note;
  host.querySelector(".widget-studio-states").innerHTML=[["live","Živé ovládání"],...widgetStudioCatalog[widget].states].map(([key,label])=>button(label,'data-studio-scenario="'+key+'" aria-pressed="'+(key===scenario)+'"')).join("");
  host.querySelector(".widget-studio-interactions").innerHTML=[["default","Default"],["hover","Hover"],["focus","Focus"],...(widget==="qr"?[["pressed","Pressed"]]:[])].map(([key,label])=>button(label,'data-studio-interaction="'+key+'" aria-pressed="'+(key===interaction)+'"',{variant:"ghost"})).join("");
  showWidget();
 }
 function prepareState(next){
  save();scenario=next;
  let initial;
  if(next!=="live"){
   initial=widget==="find"?{mode:next==="phrase"?"phrase":"asset",query:next==="asset"?"oneplay":next==="phrase"?"Online televize":"",ready:next!=="unavailable"}:{query:next==="valid"||next==="result"?"https://www.example.com/test":next==="invalid"?"není-url":"",stage:next==="result"?"download":"paste"};
  }
  showWidget(initial);
  host.querySelectorAll("[data-studio-scenario]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.studioScenario===next)));
 }
 studio.addEventListener("click",event=>{
  const target=event.target.closest("button");if(!target)return;
  if(target.dataset.studioWidget){save();widget=target.dataset.studioWidget;refresh()}
  else if(target.dataset.studioSize){save();size=target.dataset.studioSize;refresh()}
  else if(target.dataset.studioScenario)prepareState(target.dataset.studioScenario);
  else if(target.dataset.studioInteraction){interaction=target.dataset.studioInteraction;applyInteraction()}
 });
 host.querySelector('[role="tablist"]').addEventListener("keydown",event=>{
  const tabs=Array.from(host.querySelectorAll('[role="tab"]'));let index=tabs.indexOf(document.activeElement);if(index<0)return;
  if(event.key==="ArrowRight")index=(index+1)%tabs.length;else if(event.key==="ArrowLeft")index=(index+tabs.length-1)%tabs.length;else if(event.key==="Home")index=0;else if(event.key==="End")index=tabs.length-1;else return;
  event.preventDefault();tabs[index].click();tabs[index].focus();
 });
 // Persist editable drafts on route changes without global listeners or a second controller.
 preview.addEventListener("input",save);preview.addEventListener("change",save);preview.addEventListener("click",()=>{save();applyInteraction()});
 refresh();
}
