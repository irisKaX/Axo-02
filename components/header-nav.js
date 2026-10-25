/* Header Navigation V2: isolated demo inspired by original axolotl-2 layout. */
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
settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
menu:'<path d="M4 8h16M4 16h16"/>',
media:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1"/><path d="m4 17 5-4 3 2 4-5 4 4"/>',
workspace:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>',
shield:'<path d="m12 2 9 4v6c0 6-4 9-9 10-5-1-9-4-9-10V6Z"/><path d="m8 12 3 3 5-6"/>'
};
const headerNavLabels={media:["Média","media"],kontrola:["Kontrola","shield"],workspace:["Můj workspace","workspace"]};
const headerNavOrder=["media","kontrola","workspace"];
let headerDemoURL="https://www.o2.cz/osobni/oneplay";
let headerClockTimer=null,headerPreview="desktop",headerOpenMenu=null,headerLayoutCleanup=null;
function headerNavIcon(name){return '<svg aria-hidden="true" viewBox="0 0 24 24">'+headerNavIcons[name]+'</svg>'}
function headerNavRows(key){
 return headerNavGroups[key].map(([label,id])=>'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-pick="'+id+'">'+label+'</button>').join("");
}
function headerNavPanel(key,content,align="left"){
 return '<div class="header-menu-panel" id="h-panel-'+key+'" role="menu" aria-labelledby="h-trigger-'+key+'" tabindex="-1" popover="manual" data-align="'+align+'">'+content+'</div>';
}
function headerNavMenuAttrs(key){return ' id="h-trigger-'+key+'" data-h-menu="'+key+'" aria-expanded="false" aria-haspopup="menu" aria-controls="h-panel-'+key+'"'}
function headerNavTip(label,icon,action,menu=false){
 return '<span class="header-tooltip-host"><button type="button" class="header-icon-button" '+(menu?headerNavMenuAttrs(action):'data-h-action="'+action+'"')+' aria-label="'+label+'"'+(action==="theme"?' aria-pressed="'+(document.documentElement.dataset.theme==="light")+'"':'')+'>'+headerNavIcon(icon)+'</button><span class="header-tooltip" role="tooltip">'+label+'</span></span>';
}
function headerNavDropdown(key){
 const [label,icon]=headerNavLabels[key];
 return '<span class="header-menu-wrap"><button class="header-pill" type="button"'+headerNavMenuAttrs(key)+'>'+headerNavIcon(icon)+label+headerNavIcon("chevron")+'</button>'+headerNavPanel(key,headerNavRows(key))+'</span>';
}
function closeHeaderMenus(restore=false){
 if(!headerOpenMenu)return;
 const {trigger,panel}=headerOpenMenu;headerOpenMenu=null;
 trigger.setAttribute("aria-expanded","false");
 if(panel.matches(":popover-open"))panel.hidePopover();
 if(restore&&trigger.isConnected)trigger.focus({preventScroll:true});
}
function positionHeaderMenu(){
 if(!headerOpenMenu)return;
 const {trigger,panel}=headerOpenMenu,r=trigger.getBoundingClientRect();
 const stage=trigger.closest(".header-lab-stage").getBoundingClientRect();
 if(r.bottom<0||r.top>innerHeight||r.right<stage.left||r.left>Math.min(stage.right,innerWidth)){closeHeaderMenus();return}
 panel.style.maxHeight=(innerHeight-16)+"px";
 const box=panel.getBoundingClientRect(),below=innerHeight-r.bottom-16,above=r.top-16;
 const up=below<box.height&&above>below,room=Math.max(0,up?above:below);
 panel.style.maxHeight=Math.floor(room)+"px";
 const height=panel.getBoundingClientRect().height;
 const left=panel.dataset.align==="right"?r.right-box.width:r.left;
 panel.style.left=Math.max(8,Math.min(left,innerWidth-box.width-8))+"px";
 panel.style.top=(up?r.top-height-8:r.bottom+8)+"px";
}
function openHeaderMenu(trigger,last=false){
 const panel=document.getElementById(trigger.getAttribute("aria-controls"));if(!panel)return;
 closeHeaderMenus();headerOpenMenu={trigger,panel};
 trigger.setAttribute("aria-expanded","true");panel.showPopover();positionHeaderMenu();
 if(headerOpenMenu){const items=panel.querySelectorAll('[role="menuitem"]');(last?items[items.length-1]:items[0])?.focus({preventScroll:true})}
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
  const field=header.querySelector("input"),clusterStyle=getComputedStyle(header.querySelector(".header-url-cluster"));
  const urlMinimum=header.querySelector(".header-web-icon").getBoundingClientRect().width+
   header.querySelector(".header-url-actions").getBoundingClientRect().width+parseFloat(getComputedStyle(field).minWidth)+
   2*parseFloat(urlStyle.columnGap)+parseFloat(urlStyle.paddingLeft)+parseFloat(urlStyle.paddingRight)+2*parseFloat(urlStyle.borderLeftWidth);
  const minimum=Math.ceil(header.querySelector(".header-left").getBoundingClientRect().width+
   header.querySelector(".header-right").getBoundingClientRect().width+urlMinimum+
   header.querySelector(".header-index-badge").getBoundingClientRect().width+parseFloat(clusterStyle.columnGap)+
   2*parseFloat(style.columnGap)+parseFloat(style.paddingLeft)+parseFloat(style.paddingRight)+2*parseFloat(style.borderLeftWidth));
  const required=headerPreview==="desktop"?minimum+"px":"0px";
  if(surface.style.getPropertyValue("--header-preview-min")!==required)surface.style.setProperty("--header-preview-min",required);
  const compact=headerPreview==="compact"||(headerPreview==="auto"&&surface.clientWidth<minimum);
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
 function syncTheme(){themeButton.setAttribute("aria-pressed",String(document.documentElement.dataset.theme==="light"))}
 const themeObserver=new MutationObserver(syncTheme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});syncTheme();
 document.fonts.ready.then(schedule);document.fonts.addEventListener("loadingdone",schedule);
 measure();
 return ()=>{alive=false;cancelAnimationFrame(frame);observer.disconnect();themeObserver.disconnect();document.fonts.removeEventListener("loadingdone",schedule)};
}
function renderHeaderNav(){
 const host=document.getElementById("header-nav-catalog");if(!host)return;
 closeHeaderMenus();headerLayoutCleanup?.();clearInterval(headerClockTimer);
 const compact='<button class="header-menu-item" role="menuitem" tabindex="-1" data-h-action="home" type="button">Home</button>'+headerNavOrder.map(key=>'<section role="group" aria-labelledby="h-group-'+key+'"><h3 class="header-menu-title" id="h-group-'+key+'">'+headerNavLabels[key][0]+'</h3>'+headerNavRows(key)+'</section>').join("");
 const tabs=[["Axo 02 · Katalog","https://iriskax.github.io/Axo-02/"],["O2 · Oneplay","https://www.o2.cz/osobni/oneplay"],["O2 · Internet","https://www.o2.cz/osobni/internet"]].map(([label,url])=>'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-url="'+url+'">'+label+'</button>').join("");
 host.innerHTML='<div class="header-lab"><h2 class="header-lab-title">11 · Main Header Navigation</h2><p class="header-lab-description">Main Header V2 · Návrh ke schválení. Logo, navigace, URL a pravé ovládání v jednom desktopovém řádku.</p><div class="header-lab-controls" role="group" aria-label="Režim náhledu hlavičky">'+[["desktop","Desktop preview"],["auto","Auto"],["compact","Compact preview"]].map(([key,label])=>'<button type="button" data-h-preview="'+key+'" aria-pressed="'+(headerPreview===key)+'">'+label+'</button>').join("")+'</div><div class="header-lab-stage" data-preview="'+headerPreview+'" role="region" aria-label="Náhled hlavičky; desktop lze vodorovně posouvat" tabindex="0"><div class="header-preview-surface"><header class="header-demo" data-layout="desktop" aria-label="Náhled hlavní navigace"><div class="header-left"><span class="header-demo-logo">'+renderLogo({size:39,animated:true,label:"Logo Axo 02"})+'</span><nav class="header-navigation" aria-label="Nástroje"><button class="header-icon-button" aria-current="page" aria-label="Home" type="button" data-h-action="home">'+headerNavIcon("home")+'</button>'+headerNavOrder.map(headerNavDropdown).join("")+'</nav><span class="header-menu-wrap header-compact-menu"><button class="header-pill" type="button"'+headerNavMenuAttrs("compact")+'>'+headerNavIcon("menu")+'Menu</button>'+headerNavPanel("compact",compact)+'</span></div>'+
 '<div class="header-url-cluster"><div class="header-url-box"><span class="header-web-icon">'+headerNavIcon("globe")+'</span><input id="header-url-input" aria-label="URL stránky" value="https://www.o2.cz/osobni/oneplay" placeholder="Vlož URL stránky" spellcheck="false" inputmode="url"/><span class="header-url-actions">'+headerNavTip("Kopírovat URL","copy","copy")+'<span class="header-url-divider" aria-hidden="true"></span><span class="header-menu-wrap">'+headerNavTip("Vybrat kartu","tabs","tabs",true)+headerNavPanel("tabs",tabs,"right")+'</span></span></div><span class="header-index-badge header-tooltip-host" id="h-index-badge" data-state="index" tabindex="0" aria-label="Indexováno, demonstrační stav"><span class="header-index-dot" aria-hidden="true"></span><span class="header-tooltip" role="tooltip">Indexováno · demo</span></span></div>'+
 '<div class="header-right"><time class="header-clock" id="h-clock" aria-label="Čas a datum v Praze"></time><span class="header-right-divider" aria-hidden="true"></span>'+headerNavTip("Přepnout vzhled","moon","theme")+'<span class="header-menu-wrap">'+headerNavTip("Upozornění","bell","notifications",true)+headerNavPanel("notifications",'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-pick="Upozornění">Žádná nová upozornění (demo)</button>',"right")+'</span><span class="header-menu-wrap">'+headerNavTip("Nastavení","settings","settings",true)+headerNavPanel("settings",'<button class="header-menu-item" role="menuitem" tabindex="-1" type="button" data-h-pick="Nastavení">Nastavení pracovního prostředí (demo)</button>',"right")+'</span></div></header></div></div><div class="header-demo-feedback" id="h-feedback" aria-live="polite">URL a výběr karet jsou demonstrační. Indexace i upozornění zatím nemají datové napojení.</div></div>';
 document.getElementById("header-url-input").value=headerDemoURL;
 updateHeaderClock();headerClockTimer=setInterval(updateHeaderClock,30000);
 headerLayoutCleanup=mountHeaderLayout(host.querySelector(".header-demo"));
}
document.addEventListener("input",event=>{if(event.target.matches(".header-demo #header-url-input"))headerDemoURL=event.target.value});
document.addEventListener("click",async event=>{
 if(headerOpenMenu&&!headerOpenMenu.panel.contains(event.target)&&!headerOpenMenu.trigger.contains(event.target))closeHeaderMenus();
 const preview=event.target.closest("[data-h-preview]");
 if(preview){headerPreview=preview.dataset.hPreview;renderHeaderNav();document.querySelector('[data-h-preview="'+headerPreview+'"]').focus({preventScroll:true});return}
 const trigger=event.target.closest(".header-demo [data-h-menu]");
 if(trigger){if(headerOpenMenu?.trigger===trigger)closeHeaderMenus();else openHeaderMenu(trigger);return}
 const feedback=document.getElementById("h-feedback");if(!feedback)return;
 const selected=event.target.closest(".header-menu-panel [data-h-pick],.header-menu-panel [data-h-url]");
 if(selected){
  if(selected.dataset.hUrl){headerDemoURL=selected.dataset.hUrl;document.getElementById("header-url-input").value=headerDemoURL;feedback.textContent="Vybrána ukázková karta: "+selected.textContent+"."}
  else feedback.textContent="Zvolen nástroj: "+selected.dataset.hPick+" (demo).";
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
 }else feedback.textContent="Navigace · Home (demo).";
});
document.addEventListener("pointerdown",event=>{
 if(headerOpenMenu&&!headerOpenMenu.panel.contains(event.target)&&!headerOpenMenu.trigger.contains(event.target))closeHeaderMenus();
});
document.addEventListener("focusin",event=>{
 if(headerOpenMenu&&!headerOpenMenu.panel.contains(event.target)&&event.target!==headerOpenMenu.trigger)closeHeaderMenus();
});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&headerOpenMenu){event.preventDefault();closeHeaderMenus(true);return}
 if(event.key==="Tab"&&headerOpenMenu){closeHeaderMenus(true);return}
 const trigger=event.target.closest(".header-demo [data-h-menu]");
 if(trigger&&(event.key==="ArrowDown"||event.key==="ArrowUp")){event.preventDefault();openHeaderMenu(trigger,event.key==="ArrowUp");return}
 if(!headerOpenMenu||!headerOpenMenu.panel.contains(event.target)||!["ArrowDown","ArrowUp","Home","End"].includes(event.key))return;
 event.preventDefault();
 const items=[...headerOpenMenu.panel.querySelectorAll('[role="menuitem"]')],index=items.indexOf(document.activeElement);
 const next=event.key==="Home"?0:event.key==="End"?items.length-1:(index+(event.key==="ArrowDown"?1:-1)+items.length)%items.length;
 items[next]?.focus();
});
window.addEventListener("scroll",positionHeaderMenu,true);
window.addEventListener("resize",positionHeaderMenu);
window.addEventListener("hashchange",()=>queueMicrotask(()=>{
 if(!document.querySelector(".header-demo")){closeHeaderMenus();headerLayoutCleanup?.();headerLayoutCleanup=null;clearInterval(headerClockTimer);headerClockTimer=null}
}));
