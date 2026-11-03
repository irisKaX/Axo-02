/* AXO Fresh · Button Studio. A single canonical button renderer and shared styles. */
(function(){
"use strict";
const icons={
download:'<path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 17v3h16v-3"/>',
copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
check:'<path d="m5 12 4 4L19 6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
arrow:'<path d="M4 12h16m-7-7 7 7-7 7"/>',
trash:'<path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18.4 7L20 12M4 12l1.6 5A7 7 0 0 0 18.5 15"/>'
};
const svg=name=>'<svg aria-hidden="true" viewBox="0 0 24 24">'+(icons[name]||icons.arrow)+'</svg>';
function btn(label,variant="primary",size="md",icon="",extra={}){
 const b=document.createElement("button");b.type="button";b.className="axo-action";b.dataset.variant=variant;b.dataset.size=size;
 if(extra.disabled)b.disabled=true;
 if(extra.preview)b.dataset.preview=extra.preview;
 if(extra.loading){b.disabled=true;b.dataset.loading="true";}
 if(extra.action)b.dataset.action=extra.action;
 const iconOnly=size.startsWith("icon");if(iconOnly)b.setAttribute("aria-label",label);
 if(extra.loading){const sp=document.createElement("span");sp.className="bs-spinner";sp.setAttribute("aria-hidden","true");b.append(sp)}
 else if(icon)b.insertAdjacentHTML("beforeend",svg(icon));
 if(!iconOnly){const span=document.createElement("span");span.textContent=label;b.append(span)}
 return b;
}
function el(tag,className,text){const x=document.createElement(tag);if(className)x.className=className;if(text!==undefined)x.textContent=text;return x}
function panel(title,note){const p=el("section","bs-panel"),h=el("div","bs-panel-head"),name=el("h3","",title),description=el("p","",note);h.append(name,description);p.append(h);return p}
function addRow(parent,...buttons){const row=el("div","bs-demo-row");row.append(...buttons);parent.append(row);return row}
function build(){
 const root=el("div","button-studio");root.id="button-studio";
 const intro=el("div","bs-heading"),text=el("div"),h=el("h2","","Button System"),p=el("p","","Jedna rodina tlačítek pro celý AXO-02. Barvy přebírá z Foundations a všechny varianty mají funkční hover, focus i pressed.");
 text.append(h,p);const controls=el("div","bs-controls");
 controls.append(btn("Demo", "outline","sm"));
 intro.append(text);root.append(intro);
 const variants=panel("01 · Typy tlačítek","Jedna kanonická komponenta, různé úrovně důležitosti");
 const grid=el("div","bs-grid");
 for(const [title,desc,variant,icon] of [["Primary","Hlavní akce","primary","arrow"],["Secondary","Doplňková akce","secondary","plus"],["Outline","Neutrální varianta","outline","refresh"],["Ghost","Tichá akce","ghost","arrow"],["Destructive","Potvrzené mazání","destructive","trash"]]){
  const family=el("div","bs-family"),top=el("div","bs-family-title"),label=el("span","",title),small=el("small","",desc);
  top.append(label,small);family.append(top);addRow(family,btn(title,variant,"md",icon));family.append(el("p","bs-sample-caption",variant+" · výchozí stav"));grid.append(family);
 }
 variants.append(grid);root.append(variants);
 const sizes=panel("02 · Velikosti a kulatá ikonová tlačítka","S / M / L a kompaktní akce pro widgety");
 addRow(sizes,btn("Small","primary","sm"),btn("Medium","primary","md"),btn("Large","primary","lg"));
 const iconsRow=addRow(sizes,btn("Stáhnout","primary","icon-sm","download"),btn("Stáhnout","secondary","icon","download"),btn("Kopírovat","outline","icon-lg","copy"),btn("Přidat","ghost","icon","plus"));
 iconsRow.style.marginTop="14px";root.append(sizes);
 const states=panel("03 · Interakční stavy","Hover / focus / pressed lze otestovat i bez myši");
 const matrix=el("div","bs-state-grid");
 for(const [name,opts] of [["Default",{}],["Hover",{preview:"hover"}],["Focus",{preview:"focus"}],["Pressed",{preview:"pressed"}],["Disabled",{disabled:true}],["Loading",{loading:true}]]){
  const cell=el("div","bs-state-cell");cell.append(el("span","",name),btn(name==="Loading"?"Zpracovávám":"Pokračovat","primary","md","",opts));matrix.append(cell);
 }
 states.append(matrix);root.append(states);
 const actions=panel("04 · Akční tlačítka","Stažení a kopírování fungují přímo v prohlížeči");
 const row=el("div","bs-copy-output"),code=el("code","","https://iriskax.github.io/Axo-02/fresh-catalog/"),copy=btn("Kopírovat URL","secondary","md","copy",{action:"copy"}),download=btn("Stáhnout ukázku","primary","md","download",{action:"download"});
 row.append(code,copy,download);actions.append(row);
 const message=el("p","bs-message","Vyzkoušej tlačítka. Ukázkový soubor se stáhne jako TXT.");message.setAttribute("role","status");message.setAttribute("aria-live","polite");actions.append(message);root.append(actions);
 const spec=panel("05 · Design tokens","Připravené pro všechny budoucí komponenty");
 const chips=el("div","bs-spec");
 ["Primary · --primary","Secondary · --secondary","Focus · --ring","Radius · --radius","Font · Poppins","S 36 px","M 44 px","L 52 px","Icon · kruh","Disabled · 46 %"].forEach(x=>chips.append(el("span","",x)));spec.append(chips);root.append(spec);
 root.addEventListener("click",async event=>{
  const b=event.target.closest("[data-action]");if(!b)return;
  if(b.dataset.action==="copy"){
   const value=code.textContent;
   try{await navigator.clipboard.writeText(value);message.textContent="Odkaz zkopírován do schránky.";b.replaceChildren();b.insertAdjacentHTML("beforeend",svg("check"));b.append(document.createTextNode("Zkopírováno"));}
   catch{message.textContent="Kopírování není dostupné. Označ a zkopíruj adresu ručně."; }
  }
  if(b.dataset.action==="download"){
   const blob=new Blob(["AXO Design Catalog · Button System\nUkázkový soubor pro otestování tlačítka Stáhnout.\n"],{type:"text/plain;charset=utf-8"});
   const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="axo-button-demo.txt";document.body.append(link);link.click();link.remove();URL.revokeObjectURL(url);message.textContent="Ukázkový TXT soubor připraven ke stažení.";
  }
 });
 return root;
}
function render(){const canvas=document.querySelector(".canvas");if(!canvas)return;canvas.querySelector("#button-studio")?.remove();canvas.append(build())}
function hide(){document.getElementById("button-studio")?.remove()}
window.AxoFreshButtons={render,hide};
})();
