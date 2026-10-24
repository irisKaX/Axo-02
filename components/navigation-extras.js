/* Axo 02: standalone Tabs and Breadcrumbs catalog samples */
const tabGroups={pill:0,underline:0};
const tabNames=["Přehled","Aktivita","Nastavení"];
function renderTabGroup(kind){
 const id="axo-tabs-"+kind;
 return '<div class="nav-tabs '+(kind==="underline"?'nav-tabs--underline':'')+'" role="tablist" aria-label="'+(kind==="pill"?"Kapslové záložky":"Podtržené záložky")+'" id="'+id+'">'+
 tabNames.map((name,i)=>'<button type="button" class="nav-tab" role="tab" id="'+id+'-'+i+'" aria-selected="'+(i===tabGroups[kind])+'" aria-controls="'+id+'-panel" tabindex="'+(i===tabGroups[kind]?0:-1)+'" data-tab-group="'+kind+'" data-tab-index="'+i+'">'+name+'</button>').join('')+
 '</div><div class="nav-tab-panel" role="tabpanel" id="'+id+'-panel" aria-labelledby="'+id+'-'+tabGroups[kind]+'" tabindex="0">Obsah záložky: <strong>'+tabNames[tabGroups[kind]]+'</strong>. Ukázkový panel pro návrh komponenty.</div>';
}
function breadcrumb(items){
 return '<nav class="nav-crumbs" aria-label="Drobečková navigace"><ol>'+
 items.map((item,i)=>'<li>'+(i?'<span class="nav-crumb-sep" aria-hidden="true">›</span>':'')+(i===items.length-1?'<span aria-current="page">'+item+'</span>':'<a href="#navigation" data-crumb-demo="true">'+item+'</a>')+'</li>').join('')+
 '</ol></nav>';
}
function renderNavigationExtras(){
 const holder=document.getElementById("navigation-extras");if(!holder)return;
 holder.innerHTML='<div class="nav-extras">'+
 '<section class="pagination-card"><div><h2>04 · Pill Tabs</h2><p>Kapslové záložky se zvýrazněným výběrem.</p></div><div id="tabs-pill"></div></section>'+
 '<section class="pagination-card"><div><h2>05 · Underline Tabs</h2><p>Minimalistická podtržená navigace v obsahu.</p></div><div id="tabs-underline"></div></section>'+
 '<section class="pagination-card"><div><h2>06 · Breadcrumbs</h2><p>Základní hierarchická cesta a kompaktní varianta pro delší strukturu.</p></div>'+
 breadcrumb(["Dashboard","Workspace","Dokumenty","Detail dokumentu"])+
 breadcrumb(["Domů","…","Detail souboru"])+
 '<div class="nav-extras-note">Odkazy Breadcrumbs jsou zatím pouze ukázkové a nepřecházejí do skutečných obrazovek. Tabs jsou interaktivní, podporují klávesnici a používají barevné role Foundations.</div></section></div>';
 for(const kind of ["pill","underline"]){const el=document.getElementById("tabs-"+kind);if(el)el.innerHTML=renderTabGroup(kind)}
}
function selectTab(kind,index){
 tabGroups[kind]=(index+tabNames.length)%tabNames.length;
 const el=document.getElementById("tabs-"+kind);
 if(el){el.innerHTML=renderTabGroup(kind);el.querySelector('[data-tab-index="'+tabGroups[kind]+'"]').focus()}
}
document.addEventListener("click",e=>{
 const tab=e.target.closest("[data-tab-group]");
 if(tab){selectTab(tab.dataset.tabGroup,Number(tab.dataset.tabIndex));return}
 if(e.target.closest("[data-crumb-demo]"))e.preventDefault();
});
document.addEventListener("keydown",e=>{
 const tab=e.target.closest('[role="tab"][data-tab-group]');if(!tab)return;
 const key=e.key;
 if(!["ArrowLeft","ArrowRight","Home","End"].includes(key))return;
 e.preventDefault();
 const kind=tab.dataset.tabGroup,old=Number(tab.dataset.tabIndex);
 selectTab(kind,key==="Home"?0:key==="End"?tabNames.length-1:old+(key==="ArrowRight"?1:-1));
});
