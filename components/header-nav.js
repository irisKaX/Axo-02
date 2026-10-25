/* Header Navigation V1: isolated demo inspired by original axolotl-2 layout. */
const headerNavGroups={
media:[["Konverze obrázků","Konverze"],["Obrázky z webu","Obrázky"],["PDF Scout","PDF"],["Screenshot","Screenshot"],["QR generátor","QR"]],
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
shield:'<path d="m12 2 9 4v6c0 6-4 9-9 10-5-1-9-4-9-10V6Z"/><path d="m8 12 3 3 5-6"/>'
};
function headerNavIcon(name){return '<svg aria-hidden="true" viewBox="0 0 24 24">'+headerNavIcons[name]+'</svg>'}
function headerNavTip(label,icon,action){return '<span class="header-tooltip-host"><button type="button" class="header-icon-button" data-h-action="'+action+'" aria-label="'+label+'">'+headerNavIcon(icon)+'</button><span class="header-tooltip" role="tooltip">'+label+'</span></span>'}
function headerNavDropdown(key,label,icon){
 return '<span class="header-menu-wrap"><button class="header-pill" data-h-menu="'+key+'" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="h-panel-'+key+'">'+headerNavIcon(icon)+label+headerNavIcon("chevron")+'</button><div class="header-menu-panel" id="h-panel-'+key+'" hidden>'+headerNavGroups[key].map(([name,id])=>'<button class="header-menu-item" type="button" data-h-pick="'+id+'">'+name+'</button>').join("")+'</div></span>';
}
let headerClockTimer=null;
let headerPreview="desktop";
function closeHeaderMenus(restore=false){
 document.querySelectorAll(".header-demo [data-h-action=notifications],.header-demo [data-h-action=settings]").forEach(btn=>btn.setAttribute("aria-expanded","false"));
 for(const key of ["settings","notifications"]){const panel=document.getElementById("h-panel-"+key);if(panel)panel.hidden=true}
 document.querySelectorAll(".header-demo [data-h-menu]").forEach(btn=>{btn.setAttribute("aria-expanded","false");const p=document.getElementById("h-panel-"+btn.dataset.hMenu);if(p)p.hidden=true});
 if(restore)document.querySelector(".header-demo [data-h-menu]")?.focus();
}
function updateHeaderClock(){
 const el=document.getElementById("h-clock");if(!el){if(headerClockTimer)clearInterval(headerClockTimer);headerClockTimer=null;return}
 const now=new Date(),t=new Intl.DateTimeFormat("cs-CZ",{timeZone:"Europe/Prague",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(now);
 const d=new Intl.DateTimeFormat("cs-CZ",{timeZone:"Europe/Prague",day:"numeric",month:"numeric",year:"numeric"}).format(now);
 el.innerHTML='<span>'+t+'</span><small>'+d+'</small>';
}
function renderHeaderNav(){
 const host=document.getElementById("header-nav-catalog");if(!host)return;
 if(headerClockTimer)clearInterval(headerClockTimer);
 host.innerHTML='<div class="header-lab"><h2 class="header-lab-title">11 · Main Header Navigation</h2><p class="header-lab-description">Skládání hlavního headeru z existujících prvků Axo 02. Původní axolotl-2 slouží pouze jako reference rozložení.</p><div class="header-lab-controls"><button type="button" data-h-preview="desktop" aria-pressed="'+(headerPreview==="desktop")+'">Auto / Desktop</button><button type="button" data-h-preview="compact" aria-pressed="'+(headerPreview==="compact")+'">Compact preview</button></div><div class="header-lab-stage"><header class="header-demo" data-preview="'+headerPreview+'" aria-label="Náhled hlavní navigace"><div class="header-left">'+renderLogo({size:39,animated:true,label:"Logo Axo 02"})+'<nav class="header-navigation" aria-label="Nástroje"><button class="header-pill" aria-current="page" type="button" data-h-action="home">'+headerNavIcon("home")+'</button>'+headerNavDropdown("media","Média","media")+headerNavDropdown("kontrola","Kontrola","shield")+'</nav><span class="header-menu-wrap"><button class="header-pill header-compact-menu" data-h-menu="compact" type="button" aria-expanded="false" aria-controls="h-panel-compact">'+headerNavIcon("menu")+'Menu</button><div class="header-menu-panel" id="h-panel-compact" hidden><div class="header-menu-title">NAVIGACE</div><button class="header-menu-item" data-h-action="home" type="button">Domů</button>'+["media","kontrola"].flatMap(k=>headerNavGroups[k].map(([label,id])=>'<button class="header-menu-item" type="button" data-h-pick="'+id+'">'+(k==="media"?"Média · ":"Kontrola · ")+label+'</button>')).join("")+'</div></span></div>'+
 '<div class="header-url-cluster"><div class="header-url-box"><span class="header-web-icon">'+headerNavIcon("globe")+'</span><input id="header-url-input" aria-label="URL stránky" value="https://www.o2.cz/osobni/oneplay" placeholder="Vlož URL stránky" spellcheck="false" inputmode="url"/><span class="header-url-actions">'+headerNavTip("Kopírovat URL","copy","copy")+'<span class="header-url-divider" aria-hidden="true"></span>'+headerNavTip("Vybrat kartu","tabs","tabs")+'</span></div><span class="header-index-badge header-tooltip-host" id="h-index-badge" data-state="index" tabindex="0" aria-label="Indexováno, demonstrační stav"><span class="header-index-dot" aria-hidden="true"></span><span class="header-tooltip" role="tooltip">Indexováno · demo</span></span></div>'+
 '<div class="header-right"><time class="header-clock" id="h-clock"></time><span class="header-right-divider"></span>'+headerNavTip("Přepnout vzhled","moon","theme")+'<span class="header-menu-wrap">'+headerNavTip("Upozornění","bell","notifications")+'<div class="header-menu-panel" data-align="right" id="h-panel-notifications" hidden><div class="header-menu-title">UPOZORNĚNÍ</div><div class="header-menu-item">Žádná nová upozornění (demo)</div></div></span><span class="header-menu-wrap">'+headerNavTip("Nastavení","settings","settings")+'<div class="header-menu-panel" data-align="right" id="h-panel-settings" hidden><div class="header-menu-title">NASTAVENÍ</div><div class="header-menu-item">Nastavení pracovního prostředí (demo)</div></div></span></div></header></div><div class="header-demo-feedback" id="h-feedback" aria-live="polite">URL a karty prohlížeče jsou demonstrační. Indexace i upozornění zatím nemají datové napojení.</div></div>';
 updateHeaderClock();headerClockTimer=setInterval(updateHeaderClock,30000);
}
document.addEventListener("click",async event=>{
 const preview=event.target.closest("[data-h-preview]");
 if(preview){headerPreview=preview.dataset.hPreview;renderHeaderNav();return}
 const btn=event.target.closest(".header-demo [data-h-menu]");
 if(btn){const key=btn.dataset.hMenu,willOpen=btn.getAttribute("aria-expanded")!=="true";closeHeaderMenus();if(willOpen){btn.setAttribute("aria-expanded","true");document.getElementById("h-panel-"+key).hidden=false}return}
 const action=event.target.closest(".header-demo [data-h-action]");
 const feedback=document.getElementById("h-feedback");
 if(action&&feedback){
  const key=action.dataset.hAction;
  if(key==="theme"){document.getElementById("themeToggle")?.click();feedback.textContent="Přepnut globální režim katalogu."}
  else if(key==="copy"){try{await navigator.clipboard.writeText(document.getElementById("header-url-input").value);feedback.textContent="URL zkopírována."}catch{feedback.textContent="Kopírování není dostupné."}}
  else if(key==="tabs"){feedback.textContent="Výběr otevřených karet bude fungovat až v browser extension. Zatím demo."}
  else if(key==="settings"||key==="notifications"){const panel=document.getElementById("h-panel-"+key),opening=panel.hidden;closeHeaderMenus();if(opening){panel.hidden=false;action.setAttribute("aria-expanded","true")}feedback.textContent=key==="settings"?"Nastavení · lokální demo.":"Upozornění · lokální demo."}
  else {feedback.textContent="Navigace · "+key+" (demo)."}
  return;
 }
 const picked=event.target.closest(".header-demo [data-h-pick]");
 if(picked&&feedback){closeHeaderMenus();feedback.textContent="Zvolen nástroj: "+picked.dataset.hPick+" (demo).";return}
 if(!event.target.closest(".header-demo .header-menu-wrap"))closeHeaderMenus();
});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeHeaderMenus()});
document.addEventListener("focusin",event=>{if(document.querySelector(".header-demo")&&!event.target.closest(".header-demo .header-menu-wrap"))closeHeaderMenus()});
