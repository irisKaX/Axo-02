/* Header Navigation V4: isolated demo inspired by original axolotl-2 layout. */
const headerNavGroups={
media:[["Konverze obrázků","Konverze"],["Obrázky z webu","Obrázky"],["PDF Scout","PDF"],["Screenshot","Screenshot"],["QR generátor","QR"]],
workspace:[["Notebook","Notebook"],["Úkoly","Úkoly"],["Kalendář","Kalendář"]],
kontrola:[["Metadata","Metadata"],["Nadpisy","Nadpisy"],["Strukturovaná data","Strukturovaná data"],["Hledání na webu","Find Phrase"],["Kontrola obrázků","Kontrola obrázků"]]
};
const headerNavIcons={
home:'<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
chevron:'<path d="m6 9 6 6 6-6"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18"/>',
copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
tabs:'<rect x="3" y="5" width="15" height="14" rx="2"/><path d="M7 2h12a2 2 0 0 1 2 2v12"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
moon:'<path d="M21 13a9 9 0 0 1-10-10A9 9 0 1 0 21 13Z"/>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
settings:'<path d="m9.5 3-.6 2a8 8 0 0 0-1.6.9l-2-.5-2.5 4.2 1.5 1.5a8 8 0 0 0 0 1.8l-1.5 1.5 2.5 4.2 2-.5a8 8 0 0 0 1.6.9l.6 2h5l.6-2a8 8 0 0 0 1.6-.9l2 .5 2.5-4.2-1.5-1.5a8 8 0 0 0 0-1.8l1.5-1.5-2.5-4.2-2 .5a8 8 0 0 0-1.6-.9l-.6-2h-5Z"></path><circle cx="12" cy="12" r="3"></circle>',
menu:'<path d="M4 8h16M4 16h16"/>',
media:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1"/><path d="m4 17 5-4 3 2 4-5 4 4"/>',
workspace:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>',
shield:'<path d="m12 2 9 4v6c0 6-4 9-9 10-5-1-9-4-9-10V6Z"/><path d="m8 12 3 3 5-6"/>'
};
// Existing rounded-stroke tool glyphs: reference Icon.tsx and Axo Dock; no icon package.
Object.assign(headerNavIcons,{
 convert:"<rect x=\"3\" y=\"3\" width=\"14\" height=\"14\" rx=\"3\"></rect><path d=\"m3 13 4-4 4 4m4 8h6m-3-3 3 3-3 3\"></path><circle cx=\"12\" cy=\"7\" r=\"1\"></circle>",
 webImages:"<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"></rect><path d=\"m3 16 5-5 4 4 3-3 6 6M8 4v3m8-3v3\"></path>",
 pdf:"<path d=\"M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M13 3v6h6l-6-6Z\"></path><circle cx=\"17\" cy=\"16\" r=\"3\"></circle><path d=\"m19 18 3 3M8 12h3m-3 4h2\"></path>",
 capture:"<path d=\"M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5\"></path><rect x=\"7\" y=\"7\" width=\"10\" height=\"10\" rx=\"2\"></rect>",
 qr:"<path d=\"M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h3v3h-6v-3m6-3v-3M12 3v3m0 6h3M3 12h3m6 6v3\"></path>",
 metadata:"<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"></rect><path d=\"M3 9h18M7 13h5m-5 3h10\"></path>",
 headings:"<path d=\"M5 5v14M15 5v14M5 12h10M19 15v4m-1-3 1-1\"></path>",
 structure:"<rect x=\"9\" y=\"3\" width=\"6\" height=\"5\" rx=\"1\"></rect><rect x=\"3\" y=\"16\" width=\"6\" height=\"5\" rx=\"1\"></rect><rect x=\"15\" y=\"16\" width=\"6\" height=\"5\" rx=\"1\"></rect><path d=\"M12 8v4H6v4m6-4h6v4\"></path>",
 imageCheck:"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"></rect><circle cx=\"8\" cy=\"8\" r=\"1.5\"></circle><path d=\"m21 15-5-5L5 21\"></path>",
 tasks:"<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><path d=\"m7 11 3 3 6-7\"/>",
 calendar:"<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M7 3v4M17 3v4M3 10h18\"/>",
 search:"<circle cx=\"10.8\" cy=\"10.8\" r=\"7.5\"/><path d=\"m16.4 16.4 5 5\"/>"
});
const headerToolIcons={"Notebook":"workspace","Úkoly":"tasks","Kalendář":"calendar","Konverze":"convert","Obrázky":"webImages","PDF":"pdf","Screenshot":"capture","QR":"qr","Metadata":"metadata","Nadpisy":"headings","Strukturovaná data":"structure","Find Phrase":"search","Kontrola obrázků":"imageCheck"};
const headerNavLabels={media:["Média","media"],kontrola:["Kontrola","shield"],workspace:["Můj workspace","workspace"]};
const headerNavOrder=["workspace","media","kontrola"];
let headerActive="home";
let headerDemoURL="https://www.o2.cz/osobni/oneplay";
let headerClockTimer=null,headerPreview="desktop",headerOpenMenu=null,headerLayoutCleanup=null,headerCloseTimer=0;
function headerNavIcon(name){return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+headerNavIcons[name]+'</svg>'}
function headerNavRows(key,compact=false){
 return headerNavGroups[key].map(([label,id])=>{
  const row='<button class="header-menu-item" '+(compact?'':'role="menuitem" tabindex="-1" ')+'type="button" data-h-pick="'+id+'">'+headerNavIcon(headerToolIcons[id])+'<span>'+label+'</span></button>';
  return compact?'<li>'+row+'</li>':row;
 }).join("");
}
function syncHeaderActive(){
 const header=document.querySelector(".header-demo");if(!header)return;
 function current(button,on,value){if(on)button.setAttribute("aria-current",value);else button.removeAttribute("aria-current")}
 header.querySelectorAll('[data-h-action="home"]').forEach(button=>current(button,headerActive==="home","page"));
 for(const key of headerNavOrder){
  const active=headerNavGroups[key].some(([,id])=>id===headerActive);
  header.querySelectorAll('[data-h-menu="'+key+'"],[data-h-group="'+key+'"]').forEach(button=>current(button,active,"true"));
 }
 header.querySelectorAll("[data-h-pick]").forEach(button=>current(button,button.dataset.hPick===headerActive,"page"));
}
function headerNavPanel(key,content,align="left"){
 return '<div class="header-menu-panel" id="h-panel-'+key+'" role="'+(key==="compact"?'dialog':'menu')+'" aria-labelledby="h-trigger-'+key+'" tabindex="-1" popover="manual" data-kind="'+key+'" data-align="'+align+'">'+content+'</div>';
}
function headerNavMenuAttrs(key){return ' id="h-trigger-'+key+'" data-h-menu="'+key+'" aria-expanded="false" aria-haspopup="'+(key==="compact"?'dialog':'menu')+'" aria-controls="h-panel-'+key+'"'}
function headerNavTip(label,icon,action,menu=false,input=false){
 return '<span class="'+(input?'input-tooltip-wrap':'header-tooltip-host')+'"><button type="button" class="'+(input?'input-action':'header-icon-button')+'" '+(menu?headerNavMenuAttrs(action):'data-h-action="'+action+'"')+' aria-label="'+label+'">'+headerNavIcon(icon)+'</button><span class="'+(input?'input-tooltip':'header-tooltip')+'" role="tooltip">'+label+'</span></span>';
}
function headerNavTheme(){
 const light=document.documentElement.dataset.theme==="light";
 return '<button class="theme-toggle" type="button" data-h-action="theme" aria-label="Přepnout světlý a tmavý režim" aria-pressed="'+light+'"><span class="option'+(light?' on':'')+'" aria-hidden="true">☀</span><span class="option'+(!light?' on':'')+'" aria-hidden="true">☾</span></button>';
}
function headerNavDropdown(key){
 const [label,icon]=headerNavLabels[key];
 return '<span class="header-menu-wrap"><button class="header-pill" type="button"'+headerNavMenuAttrs(key)+'>'+headerNavIcon(icon)+label+headerNavIcon("chevron")+'</button>'+headerNavPanel(key,headerNavRows(key))+'</span>';
}
function cancelHeaderClose(){clearTimeout(headerCloseTimer);headerCloseTimer=0}
function closeHeaderMenus(restore=false){
 cancelHeaderClose();if(!headerOpenMenu)return;
 const {trigger,panel}=headerOpenMenu;headerOpenMenu=null;
 trigger.setAttribute("aria-expanded","false");
 if(panel.matches(":popover-open"))panel.hidePopover();
 if(restore&&trigger.isConnected)trigger.focus({preventScroll:true});
}
function headerMenuItems(panel){
 const selector=panel.dataset.kind==="compact"?'button':'[role="menuitem"]';
 return [...panel.querySelectorAll(selector)].filter(item=>!item.closest("[hidden]"));
}
function positionHeaderMenu(){
 if(!headerOpenMenu)return;
 const {trigger,panel}=headerOpenMenu,r=trigger.getBoundingClientRect();
 const header=trigger.closest(".header-demo"),bar=header.getBoundingClientRect();
 const stage=header.closest(".header-lab-stage").getBoundingClientRect();
 if(bar.bottom<0||bar.bottom>innerHeight||r.right<stage.left||r.left>Math.min(stage.right,innerWidth)){closeHeaderMenus();return}
 const viewportWidth=document.documentElement.clientWidth;
 panel.style.width=Math.min(panel.dataset.kind==="compact"?bar.width:parseFloat(getComputedStyle(panel).getPropertyValue("--header-panel-width")),viewportWidth-24)+"px";
 panel.style.maxHeight=Math.max(0,innerHeight-bar.bottom-24)+"px";
 const box=panel.getBoundingClientRect(),left=panel.dataset.kind==="compact"?bar.left:panel.dataset.align==="right"?r.right-box.width:r.left;
 panel.style.left=Math.max(12,Math.min(left,viewportWidth-box.width-12))+"px";
 panel.style.top=(bar.bottom+12)+"px";
}
function openHeaderMenu(trigger,last=false,source="interaction"){
 const panel=document.getElementById(trigger.getAttribute("aria-controls"));if(!panel)return;
 closeHeaderMenus();
 const header=trigger.closest(".header-demo");
 // The reference opens down only. The catalog reserves space below its bar;
 // bring it into view for click/keyboard near the bottom; hover never scrolls.
 if(source!=="hover"&&innerHeight-header.getBoundingClientRect().bottom<180)header.scrollIntoView({block:"start",behavior:"instant"});
 headerOpenMenu={trigger,panel,source};
 trigger.setAttribute("aria-expanded","true");panel.showPopover();positionHeaderMenu();
 if(headerOpenMenu&&source!=="hover"){
  const items=headerMenuItems(panel);(last?items.at(-1):items[0])?.focus({preventScroll:true});
 }
}
function toggleHeaderGroup(button,expand){
 const panel=button.closest(".header-menu-panel");
 const opening=expand??button.getAttribute("aria-expanded")!=="true";
 panel.querySelectorAll("[data-h-group]").forEach(group=>{
  const on=group===button&&opening;
  group.setAttribute("aria-expanded",String(on));document.getElementById(group.getAttribute("aria-controls")).hidden=!on;
 });
 positionHeaderMenu();
}
function scheduleHeaderClose(){
 if(headerCloseTimer||headerOpenMenu?.source!=="hover")return;
 headerCloseTimer=setTimeout(()=>{headerCloseTimer=0;if(headerOpenMenu?.source==="hover")closeHeaderMenus()},150);
}
function headerHoverEnabled(trigger,event){
 return event.pointerType==="mouse"&&trigger?.closest('.header-demo[data-layout="desktop"]')&&!["compact","tabs"].includes(trigger.dataset.hMenu);
}
function updateHeaderClock(){
 const el=document.getElementById("h-clock");if(!el){clearInterval(headerClockTimer);headerClockTimer=null;return}
 const now=new Date();
 el.dateTime=now.toISOString();
 el.innerHTML='<span>'+new Intl.DateTimeFormat("cs-CZ",{timeZone:"Europe/Prague",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(now)+'</span><small>'+new Intl.DateTimeFormat("cs-CZ",{timeZone:"Europe/Prague",day:"numeric",month:"numeric",year:"numeric"}).format(now)+'</small>';
}
function mountHeaderLayout(header){
 const surface=header.parentElement,stage=surface.parentElement;
 let frame=0,alive=true;
 function measure(){
  frame=0;if(!alive||!header.isConnected)return;
  const previous=header.dataset.layout,active=document.activeElement;
  // Measure intrinsic desktop groups, including when Compact currently hides them.
  // No clones or viewport breakpoint: the input's readable minimum owns the fit.
  header.dataset.layout="desktop";
  const style=getComputedStyle(header),url=header.querySelector(".header-url-box"),urlStyle=getComputedStyle(url);
  const field=header.querySelector("#header-url-input"),clusterStyle=getComputedStyle(header.querySelector(".header-url-cluster"));
  const urlMinimum=header.querySelector(".header-web-icon").getBoundingClientRect().width+
   header.querySelector(".header-url-actions").getBoundingClientRect().width+parseFloat(getComputedStyle(field).minWidth)+
   2*parseFloat(urlStyle.columnGap)+parseFloat(urlStyle.paddingLeft)+parseFloat(urlStyle.paddingRight)+2*Math.max(2,parseFloat(urlStyle.borderLeftWidth));
  const minimum=Math.ceil(header.querySelector(".header-left").getBoundingClientRect().width+
   header.querySelector(".header-right").getBoundingClientRect().width+urlMinimum+
   header.querySelector(".header-index-badge").getBoundingClientRect().width+parseFloat(clusterStyle.columnGap)+
   2*parseFloat(style.columnGap)+parseFloat(style.paddingLeft)+parseFloat(style.paddingRight)+2*parseFloat(style.borderLeftWidth));
  const clusterMinimum=urlMinimum+header.querySelector(".header-index-badge").getBoundingClientRect().width+parseFloat(clusterStyle.columnGap);
  const comfortable=minimum+Math.max(0,352-clusterMinimum)+24;
  const mode=header.closest(".header-lab-embedded")?"auto":headerPreview;
  const required=mode==="desktop"?comfortable+"px":"0px";
  if(surface.style.getPropertyValue("--header-preview-min")!==required)surface.style.setProperty("--header-preview-min",required);
  const compact=mode==="compact"||(mode==="auto"&&surface.clientWidth<minimum);
  header.dataset.layout=compact?"compact":"desktop";
  if(previous!==header.dataset.layout){
   const menu=headerOpenMenu,owned=header.contains(active)||menu?.panel.contains(active);
   const candidate=menu?.panel.contains(active)?menu.trigger:active;
   closeHeaderMenus();
   if(owned){
    const hidden=compact?candidate.closest(".header-navigation"):candidate.closest(".header-compact-menu");
    const target=hidden?(compact?header.querySelector('[data-h-menu="compact"]'):header.querySelector('[data-h-action="home"]')):candidate;
    target.focus({preventScroll:true});
   }
  }else if(header.contains(active)&&document.activeElement!==active)active.focus({preventScroll:true});
  positionHeaderMenu();
 }
 function schedule(){if(!frame&&alive)frame=requestAnimationFrame(measure)}
 const observer=new ResizeObserver(schedule);
 for(const el of [stage,surface,header.querySelector(".header-left"),header.querySelector(".header-right")])observer.observe(el);
 const themeButton=header.querySelector('[data-h-action="theme"]');
 function syncTheme(){
  const light=document.documentElement.dataset.theme==="light";
  themeButton.setAttribute("aria-pressed",String(light));
  themeButton.querySelectorAll(".option").forEach((option,index)=>option.classList.toggle("on",index===(light?0:1)));
 }
 const themeObserver=new MutationObserver(syncTheme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});syncTheme();
 document.fonts.ready.then(schedule);document.fonts.addEventListener("loadingdone",schedule);
 measure();
 return ()=>{alive=false;cancelAnimationFrame(frame);observer.disconnect();themeObserver.disconnect();document.fonts.removeEventListener("loadingdone",schedule)};
}
function renderHeaderNav(host=document.getElementById("header-nav-catalog"),embedded=false){
 if(!host)return;
 closeHeaderMenus();headerLayoutCleanup?.();clearInterval(headerClockTimer);
 const compact='<nav aria-label="Kompaktní navigace"><button class="header-menu-item" data-h-action="home" type="button">'+headerNavIcon("home")+'Home</button>'+headerNavOrder.map(key=>'<section><button class="header-menu-item header-group-toggle" type="button" data-h-group="'+key+'" aria-expanded="false" aria-controls="h-group-'+key+'">'+headerNavIcon(headerNavLabels[key][1])+'<span>'+headerNavLabels[key][0]+'</span>'+headerNavIcon("chevron")+'</button><ul class="header-group-items" id="h-group-'+key+'" hidden>'+headerNavRows(key,true)+'</ul></section>').join("")+'</nav>';
 const tabs=[["Axo 02 · Katalog","https://iriskax.github.io/Axo-02/"],["O2 · Oneplay","https://www.o2.cz/osobni/oneplay"],["O2 · Internet","https://www.o2.cz/osobni/internet"]].map(([label,url])=>'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-url="'+url+'">'+label+'</button>').join("");
 host.innerHTML='<div class="header-lab'+(embedded?' header-lab-embedded':'')+'">'+(embedded?'':'<h2 class="header-lab-title">11 · Main Header Navigation</h2><p class="header-lab-description">Main Header V4 · Visual Proposal. Unified Floating Header · sjednocené materiály a navigační stavy.</p><div class="header-lab-controls" role="group" aria-label="Režim náhledu hlavičky">'+[["desktop","Desktop preview"],["auto","Auto"],["compact","Compact preview"]].map(([key,label])=>'<button type="button" data-h-preview="'+key+'" aria-pressed="'+(headerPreview===key)+'">'+label+'</button>').join("")+(embedded?'':'</div>')+'<div class="header-lab-stage" data-preview="'+(embedded?'auto':headerPreview)+'" role="region" aria-label="Náhled hlavičky; desktop lze vodorovně posouvat" tabindex="0"><div class="header-preview-surface"><header class="header-demo" data-layout="desktop" aria-label="Náhled hlavní navigace"><div class="header-left"><span class="header-demo-logo">'+renderLogo({size:32,animated:true,label:"Logo Axo 02"})+'</span><nav class="header-navigation" aria-label="Nástroje"><button class="header-icon-button" aria-current="page" aria-label="Home" type="button" data-h-action="home">'+headerNavIcon("home")+'</button>'+headerNavOrder.map(headerNavDropdown).join("")+'</nav><span class="header-menu-wrap header-compact-menu"><button class="header-pill" type="button" aria-label="Otevřít navigaci"'+headerNavMenuAttrs("compact")+'>'+headerNavIcon("menu")+'<span class="header-menu-label">Menu</span></button>'+headerNavPanel("compact",compact)+'</span></div>'+
 '<div class="header-url-cluster"><div class="input-shell header-url-box"><span class="input-icon header-web-icon">'+headerNavIcon("globe")+'</span><input id="header-url-input" aria-label="URL stránky" value="https://www.o2.cz/osobni/oneplay" placeholder="Vlož URL stránky" spellcheck="false" inputmode="url"/><span class="input-action-group header-url-actions">'+headerNavTip("Kopírovat URL","copy","copy",false,true)+'<span class="input-action-divider" aria-hidden="true"></span><span class="header-menu-wrap">'+headerNavTip("Vybrat kartu","tabs","tabs",true,true)+headerNavPanel("tabs",tabs,"right")+'</span></span></div><span class="header-index-badge header-tooltip-host" id="h-index-badge" data-state="index" tabindex="0" aria-label="Indexováno, demonstrační stav"><span class="header-index-dot" aria-hidden="true"></span><span class="header-tooltip" role="tooltip">Indexováno · demo</span></span></div>'+
 '<div class="header-right"><time class="header-clock" id="h-clock" aria-label="Čas a datum v Praze"></time><span class="header-right-divider" aria-hidden="true"></span>'+headerNavTheme()+'<span class="header-menu-wrap">'+headerNavTip("Upozornění","bell","notifications",true)+headerNavPanel("notifications",'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-pick="Upozornění">Žádná nová upozornění (demo)</button>',"right")+'</span><span class="header-menu-wrap">'+headerNavTip("Nastavení","settings","settings",true)+headerNavPanel("settings",'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-pick="Nastavení">Nastavení pracovního prostředí (demo)</button>',"right")+'</span></div></header></div></div><div class="header-demo-feedback" id="h-feedback" aria-live="polite">URL a výběr karet jsou demonstrační. Indexace i upozornění zatím nemají datové napojení.</div></div>';
 document.getElementById("header-url-input").value=headerDemoURL;
 syncHeaderActive();
 updateHeaderClock();headerClockTimer=setInterval(updateHeaderClock,30000);
 headerLayoutCleanup=mountHeaderLayout(host.querySelector(".header-demo"));
}
document.addEventListener("input",event=>{if(event.target.matches(".header-demo #header-url-input"))headerDemoURL=event.target.value});
document.addEventListener("click",async event=>{
 if(headerOpenMenu&&!headerOpenMenu.panel.contains(event.target)&&!headerOpenMenu.trigger.contains(event.target))closeHeaderMenus();
 const preview=event.target.closest("[data-h-preview]");
 if(preview){headerPreview=preview.dataset.hPreview;renderHeaderNav();document.querySelector('[data-h-preview="'+headerPreview+'"]').focus({preventScroll:true});return}
 const trigger=event.target.closest(".header-demo [data-h-menu]");
 if(trigger){
  if(headerOpenMenu?.trigger===trigger&&headerOpenMenu.source!=="hover")closeHeaderMenus();
  else if(headerOpenMenu?.trigger===trigger){headerOpenMenu.source="interaction";cancelHeaderClose();headerMenuItems(headerOpenMenu.panel)[0]?.focus({preventScroll:true})}
  else openHeaderMenu(trigger);
  return;
 }
 const group=event.target.closest(".header-menu-panel [data-h-group]");
 if(group){toggleHeaderGroup(group);return}
 const feedback=document.getElementById("h-feedback");if(!feedback)return;
 const selected=event.target.closest(".header-menu-panel [data-h-pick],.header-menu-panel [data-h-url]");
 if(selected){
  if(selected.dataset.hUrl){headerDemoURL=selected.dataset.hUrl;document.getElementById("header-url-input").value=headerDemoURL;feedback.textContent="Vybrána ukázková karta: "+selected.textContent+"."}
  else {
   if(headerNavOrder.some(key=>headerNavGroups[key].some(([,id])=>id===selected.dataset.hPick))){headerActive=selected.dataset.hPick;syncHeaderActive()}
   feedback.textContent="Zvolen nástroj: "+selected.dataset.hPick+" (demo).";
  }
  closeHeaderMenus(true);return;
 }
 const action=event.target.closest(".header-demo [data-h-action]");if(!action)return;
 const key=action.dataset.hAction;closeHeaderMenus();
 if(key==="theme"){
  document.getElementById("themeToggle")?.click();
  action.setAttribute("aria-pressed",String(document.documentElement.dataset.theme==="light"));
  feedback.textContent="Přepnut globální režim katalogu.";
 }else if(key==="copy"){
  try{await navigator.clipboard.writeText(document.getElementById("header-url-input").value);feedback.textContent="URL zkopírována."}
  catch{feedback.textContent="Kopírování není dostupné."}
 }else {headerActive="home";syncHeaderActive();feedback.textContent="Navigace · Home (demo).";}
});
document.addEventListener("pointerdown",event=>{
 if(headerOpenMenu&&!headerOpenMenu.panel.contains(event.target)&&!headerOpenMenu.trigger.contains(event.target))closeHeaderMenus();
});
document.addEventListener("focusin",event=>{
 if(!headerOpenMenu)return;
 if(headerOpenMenu.panel.contains(event.target)){headerOpenMenu.source="interaction";cancelHeaderClose()}
 else if(event.target!==headerOpenMenu.trigger)closeHeaderMenus();
});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&headerOpenMenu){
  event.preventDefault();const owned=headerOpenMenu.panel.contains(event.target)||headerOpenMenu.trigger===event.target;
  closeHeaderMenus(headerOpenMenu.source!=="hover"||owned);return;
 }
 if(event.key==="Tab"&&headerOpenMenu){
  const owned=headerOpenMenu.panel.contains(event.target)||headerOpenMenu.trigger===event.target;
  if(!owned||headerOpenMenu.panel.dataset.kind!=="compact"){closeHeaderMenus(owned);return}
 }
 const group=event.target.closest("[data-h-group]");
 if(group&&["ArrowRight","ArrowLeft"].includes(event.key)){event.preventDefault();toggleHeaderGroup(group,event.key==="ArrowRight");return}
 const groupItems=event.target.closest(".header-group-items");
 if(groupItems&&event.key==="ArrowLeft"){
  event.preventDefault();const owner=document.querySelector('[aria-controls="'+groupItems.id+'"]');owner.focus();toggleHeaderGroup(owner,false);return;
 }
 const trigger=event.target.closest(".header-demo [data-h-menu]");
 if(trigger&&(event.key==="ArrowDown"||event.key==="ArrowUp")){event.preventDefault();openHeaderMenu(trigger,event.key==="ArrowUp");return}
 if(!headerOpenMenu||!headerOpenMenu.panel.contains(event.target)||!["ArrowDown","ArrowUp","Home","End"].includes(event.key))return;
 event.preventDefault();
 const items=headerMenuItems(headerOpenMenu.panel),index=items.indexOf(document.activeElement);
 const next=event.key==="Home"?0:event.key==="End"?items.length-1:(index+(event.key==="ArrowDown"?1:-1)+items.length)%items.length;
 items[next]?.focus();
});
document.addEventListener("pointerover",event=>{
 const trigger=event.target.closest(".header-demo [data-h-menu]");
 if(headerHoverEnabled(trigger,event)&&!trigger.contains(event.relatedTarget)){
  cancelHeaderClose();
  if(headerOpenMenu?.trigger===trigger)return;
  if(headerOpenMenu?.source==="interaction"&&headerOpenMenu.panel.contains(document.activeElement))return;
  openHeaderMenu(trigger,false,"hover");
 }else if(headerOpenMenu?.panel.contains(event.target))cancelHeaderClose();
});
document.addEventListener("pointerout",event=>{
 if(!headerOpenMenu)return;
 const {trigger,panel}=headerOpenMenu,next=event.relatedTarget;
 if((trigger.contains(event.target)||panel.contains(event.target))&&!trigger.contains(next)&&!panel.contains(next))scheduleHeaderClose();
});
document.addEventListener("pointermove",event=>{
 if(headerOpenMenu?.source!=="hover"||event.pointerType!=="mouse")return;
 const {trigger,panel}=headerOpenMenu;
 if(trigger.contains(event.target)||panel.contains(event.target)){cancelHeaderClose();return}
 const r=trigger.getBoundingClientRect(),p=panel.getBoundingClientRect();
 // A continuous corridor bridges the bar's lower padding and the 12px gap.
 const corridor=event.clientY>=r.bottom&&event.clientY<=p.top&&event.clientX>=Math.min(r.left,p.left)-8&&event.clientX<=Math.max(r.right,p.right)+8;
 if(corridor)cancelHeaderClose();else scheduleHeaderClose();
});
window.addEventListener("scroll",positionHeaderMenu,true);
window.addEventListener("resize",positionHeaderMenu);
window.addEventListener("hashchange",()=>queueMicrotask(()=>{
 if(!document.querySelector(".header-demo")){closeHeaderMenus();headerLayoutCleanup?.();headerLayoutCleanup=null;clearInterval(headerClockTimer);headerClockTimer=null}
}));
